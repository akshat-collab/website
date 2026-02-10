# Deploy TechMaster on Hostinger VPS (Ubuntu 24.04 LTS)

Step-by-step guide to run the TechMaster DSA platform on a **Hostinger VPS** with **Ubuntu 24.04 LTS**. The backend is production-ready (rate limits, security, profile photo in DB, ~10k users/day).

## Prerequisites

- Hostinger VPS with Ubuntu 24.04 LTS
- SSH access (root or sudo user)
- A domain pointing to your VPS IP (optional but recommended for SSL)
- Firebase project (for auth)
- PostgreSQL: on the same VPS, or external (Neon, Supabase, etc.)

---

## 1. Connect and update the server

```bash
ssh root@YOUR_VPS_IP
# or: ssh your_user@YOUR_VPS_IP
```

```bash
apt update && apt upgrade -y
```

---

## 2. Install Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs
node -v   # v20.x.x
npm -v
```

---

## 3. Install PostgreSQL (optional – skip if using external DB)

If you want PostgreSQL on the same VPS:

```bash
apt install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER techmaster WITH PASSWORD 'YOUR_SECURE_PASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE techmaster OWNER techmaster;"
```

Connection string (local):

```text
DATABASE_URL=postgresql://techmaster:YOUR_SECURE_PASSWORD@localhost:5432/techmaster
```

---

## 4. Install Nginx and PM2

```bash
apt install -y nginx
npm install -g pm2
```

---

## 5. Clone the project and install dependencies

```bash
cd /var/www
git clone https://github.com/YOUR_ORG/techmaster-nexus.git
cd techmaster-nexus
npm ci
```

(If you don’t use Git, upload the project via SFTP/rsync to e.g. `/var/www/techmaster-nexus` and run `npm ci` there.)

---

## 6. Environment variables

Create `.env` in the project root (e.g. `/var/www/techmaster-nexus/.env`):

```bash
nano .env
```

**Backend (required):**

```env
NODE_ENV=production
PORT=3001

# PostgreSQL (use your real URL)
DATABASE_URL=postgresql://techmaster:YOUR_PASSWORD@localhost:5432/techmaster

# Firebase (backend token verification)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...paste full JSON one line...}
```

**Production backend (recommended):**

```env
TRUST_PROXY=1
CORS_ORIGIN=https://yourdomain.com
# Optional: for ~10k users/day
# DB_POOL_MAX=50
# RATE_LIMIT_MAX_PER_WINDOW=500
```

**Optional:**

```env
GROQ_API_KEY=your_groq_key
```

**Frontend build** – set before building (see step 8):

- `VITE_API_URL=https://api.yourdomain.com` (or `https://yourdomain.com` if API is same origin)
- All `VITE_FIREBASE_*` from Firebase Console (same as in `.env.example`)

Get Firebase config: Firebase Console → Project settings → General → Your web app.  
Get service account: Project settings → Service accounts → Generate new private key; paste the JSON (single line) into `FIREBASE_SERVICE_ACCOUNT_JSON`.

---

## 7. Database setup

Runs `schema.sql` and all migrations (including `005_profile_photo` for profile avatars):

```bash
cd /var/www/techmaster-nexus
npm run db:init
npm run db:seed
```

---

## 8. Build frontend

Set the API URL and build (replace with your real backend URL):

```bash
export VITE_API_URL=https://api.yourdomain.com
# If you use a .env.production, put VITE_API_URL and VITE_FIREBASE_* there
npm run build
```

Static files will be in `dist/`. We’ll serve them with Nginx.

---

## 9. Run backend with PM2

```bash
cd /var/www/techmaster-nexus
pm2 start server.production.js --name techmaster-api
pm2 save
pm2 startup
```

Check:

```bash
pm2 status
curl -s http://127.0.0.1:3001/api/health
```

---

## 10. Nginx: reverse proxy and static files

Create a site config (replace `yourdomain.com` and paths):

```bash
nano /etc/nginx/sites-available/techmaster
```

Paste (adjust `server_name`, `root`, and `proxy_pass` if your port is not 3001):

```nginx
# Redirect HTTP to HTTPS (after SSL is set up, uncomment)
# server {
#     listen 80;
#     server_name yourdomain.com www.yourdomain.com;
#     return 301 https://$server_name$request_uri;
# }

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/techmaster-nexus/dist;
    index index.html;

    # Frontend (SPA: all routes to index.html)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket (duels)
    location /ws/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Enable and test:

```bash
ln -s /etc/nginx/sites-available/techmaster /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

If API is on a subdomain (e.g. `api.yourdomain.com`), use a separate `server` block that only does `proxy_pass` to `http://127.0.0.1:3001` for `/api/` and `/ws/`, and set `VITE_API_URL=https://api.yourdomain.com` when building.

---

## 11. SSL with Let’s Encrypt (recommended)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Then uncomment the HTTP→HTTPS redirect block in the Nginx config and reload:

```bash
systemctl reload nginx
```

---

## 12. Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

## Quick checklist

| Step | Action |
|------|--------|
| 1 | SSH, `apt update && apt upgrade` |
| 2 | Install Node.js 20 LTS |
| 3 | (Optional) Install and create PostgreSQL DB |
| 4 | Install Nginx and PM2 |
| 5 | Clone repo, `npm ci` |
| 6 | Create `.env` (DATABASE_URL, FIREBASE_*, PORT, TRUST_PROXY=1, CORS_ORIGIN) |
| 7 | `npm run db:init` and `npm run db:seed` |
| 8 | Set `VITE_API_URL` (and Firebase), then `npm run build` |
| 9 | `pm2 start server.production.js`, `pm2 save`, `pm2 startup` |
| 10 | Nginx: serve `dist/`, proxy `/api/` and `/ws/` to `127.0.0.1:3001` |
| 11 | `certbot --nginx -d yourdomain.com` |
| 12 | `ufw allow Nginx Full`, `ufw enable` |

---

## Useful commands

- **Logs:** `pm2 logs techmaster-api`
- **Restart API:** `pm2 restart techmaster-api`
- **Rebuild and reload:**  
  `cd /var/www/techmaster-nexus && npm run build && pm2 restart techmaster-api`

For backend security, rate limits, and capacity tuning, see [BACKEND-PRODUCTION.md](./BACKEND-PRODUCTION.md).
