const l={javascript:[`function add(a, b) {
  return a + b;
}

const result = add(2, 3);
console.log(result);`,"const multiply = (x, y) => x * y;\nconst square = n => n * n;\nconst greet = name => `Hello, ${name}`;",`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,`const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = doubled.reduce((a, b) => a + b, 0);`,`const items = [10, 20, 30, 40];
const filtered = items.filter(x => x > 25);
const found = items.find(x => x === 30);`,`const arr = [1, 2, 3];
const copy = [...arr];
const merged = [...arr, 4, 5, 6];`,`const nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b);
const reversed = [...nums].reverse();`,`const matrix = [[1, 2], [3, 4]];
const flat = matrix.flat();
const mapped = matrix.flatMap(row => row);`,`async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();
  return data;
}`,`const loadData = () => {
  return fetch("/api/data")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
};`,`async function fetchAll(urls) {
  const results = await Promise.all(
    urls.map(url => fetch(url).then(r => r.json()))
  );
  return results;
}`,`if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}`,`for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

for (const item of arr) {
  console.log(item);
}`,`const status = score >= 60 ? "pass" : "fail";
const name = user?.profile?.name ?? "Guest";`,`switch (day) {
  case "mon":
    return "Monday";
  case "tue":
    return "Tuesday";
  default:
    return "Unknown";
}`,`class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}`,`const user = {
  name: "Alice",
  age: 25,
  greet() {
    return \`Hello, \${this.name}\`;
  }
};`,`class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}`,`const { name, age } = user;
const [first, second, ...rest] = arr;

function log(...args) {
  console.log(args);
}`,'const config = { host: "localhost", port: 3000 };\nconst { host, port } = config;\nconst url = `http://${host}:${port}`;',`try {
  const data = JSON.parse(input);
  return data;
} catch (e) {
  console.error("Parse failed", e);
  return null;
}`,`if (!value) throw new Error("Value is required");
if (typeof id !== "number") return;

const safe = value ?? defaultValue;`,`const now = new Date();
const iso = now.toISOString();
const stamp = Date.now();`,`const str = "hello world";
const upper = str.toUpperCase();
const words = str.split(" ");
const joined = words.join("-");`,`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,`const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const search = debounce((q) => fetchResults(q), 300);`],typescript:[`function add(a: number, b: number): number {
  return a + b;
}

const result = add(2, 3);`,`interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = { id: 1, name: "Alice" };`,`const fetchUser = async (id: number): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();
  return data;
};`,`type Status = "pending" | "success" | "error";

const setStatus = (s: Status) => {
  state.status = s;
};`,`function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);
const str = identity("hello");`,`class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(\`\${this.baseUrl}\${path}\`);
    return res.json();
  }
}`,`const map = new Map<string, number>();
map.set("a", 1);
map.set("b", 2);
const val = map.get("a");`,`type Handler = (event: Event) => void;

const handlers: Handler[] = [];
handlers.push((e) => console.log(e));`,`enum HttpStatus {
  Ok = 200,
  NotFound = 404,
  ServerError = 500,
}

const handleResponse = (status: HttpStatus) => {
  switch (status) {
    case HttpStatus.Ok:
      return "Success";
    default:
      return "Error";
  }
};`,`interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function request<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  const data = await res.json();
  return { data, status: res.status };
}`],html:[`<div class="container">
  <h1>Welcome</h1>
  <p>Hello, world!</p>
  <button onclick="submit()">Submit</button>
</div>`,`<form action="/login" method="post">
  <input type="email" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <button type="submit">Log in</button>
</form>`,`<ul class="list">
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</ul>`,`<nav class="navbar">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`,`<section class="hero">
  <h1>Welcome to the site</h1>
  <p>Build something great.</p>
  <button class="cta">Get started</button>
</section>`,`<article class="post">
  <header>
    <h2>Post title</h2>
    <time datetime="2025-01-01">Jan 1, 2025</time>
  </header>
  <p>Content goes here.</p>
</article>`,`<table>
  <thead>
    <tr><th>Name</th><th>Score</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>95</td></tr>
    <tr><td>Bob</td><td>87</td></tr>
  </tbody>
</table>`,`<img src="photo.jpg" alt="Description" width="400" height="300" />

<a href="https://example.com" target="_blank" rel="noopener">
  Visit site
</a>`,`<div class="card">
  <img src="thumb.png" alt="Card" />
  <div class="card-body">
    <h3>Card title</h3>
    <p>Card description text.</p>
  </div>
</div>`,`<header>
  <h1>Site name</h1>
  <nav aria-label="Main">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>
<main>Content</main>
<footer>&copy; 2025</footer>`,`<label for="username">Username</label>
<input id="username" type="text" name="username" required />

<select name="country">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>`,`<script src="app.js" defer><\/script>
<link rel="stylesheet" href="styles.css" />

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />`],python:[`def add(a: int, b: int) -> int:
    return a + b

result = add(2, 3)
print(result)`,`def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,`numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
total = sum(doubled)`,`def fetch_user(user_id: int):
    response = requests.get(f"/api/users/{user_id}")
    return response.json()`,`with open("data.txt") as f:
    lines = f.readlines()
for line in lines:
    print(line.strip())`,`class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1`],sql:[`SELECT id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;`,`SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;`,`INSERT INTO products (name, price, category)
VALUES ('Widget', 19.99, 'tools');`,`UPDATE users
SET last_login = NOW()
WHERE id = :user_id;`,`SELECT * FROM orders
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31'
LIMIT 100;`,`CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  start_time TIMESTAMP
);`]};function h(s){const r=l[s];return r[Math.floor(Math.random()*r.length)]}const u=new Set(["const","let","var","function","return","if","else","for","while","class","extends","constructor","async","await","new","this","true","false","null","undefined","in","of","try","catch","finally","import","export","default"]);function c(s){const r=[];let e=0;const o=s.length;for(;e<o;){const a=s[e];if(a==="/"&&s[e+1]==="/"){let t=e+2;for(;t<o&&s[t]!==`
`;)t++;r.push({type:"comment",start:e,end:t,value:s.slice(e,t)}),e=t;continue}if(a==="/"&&s[e+1]==="*"){let t=e+2;for(;t<o-1&&(s[t]!=="*"||s[t+1]!=="/");)t++;t+=2,r.push({type:"comment",start:e,end:t,value:s.slice(e,t)}),e=t;continue}if(a==='"'){let t=e+1;for(;t<o;)if(s[t]==="\\")t+=2;else if(s[t]==='"'){t++;break}else t++;r.push({type:"string",start:e,end:t,value:s.slice(e,t)}),e=t;continue}if(a==="`"||a==="'"){const t=a;let n=e+1;for(;n<o;)if(s[n]==="\\")n+=2;else if(s[n]===t){n++;break}else n++;r.push({type:"string",start:e,end:n,value:s.slice(e,n)}),e=n;continue}if(/\d/.test(a)){let t=e;for(;t<o&&/[\d.]/.test(s[t]);)t++;r.push({type:"number",start:e,end:t,value:s.slice(e,t)}),e=t;continue}if(/[a-zA-Z_$]/.test(a)){let t=e;for(;t<o&&/[a-zA-Z0-9_$]/.test(s[t]);)t++;const n=s.slice(e,t),i=u.has(n)||n==="function"?"keyword":"default";r.push({type:i,start:e,end:t,value:n}),e=t;continue}if(/[+\-*/%=<>!&|.,;:?{}()[\]\\]/.test(a)){r.push({type:"operator",start:e,end:e+1,value:a}),e++;continue}r.push({type:"default",start:e,end:e+1,value:s[e]}),e++}return r}function d(s){const r=[];let e=0;const o=s.length;for(;e<o;){const a=s[e];if(a==="<"){let t=e+1;for(s[t]==="/"&&t++;t<o&&/[a-zA-Z0-9-]/.test(s[t]);)t++;r.push({type:"keyword",start:e,end:t,value:s.slice(e,t)}),e=t;continue}if(a==='"'||a==="'"){const t=a;let n=e+1;for(;n<o&&s[n]!==t;)n++;n++,r.push({type:"string",start:e,end:n,value:s.slice(e,n)}),e=n;continue}r.push({type:"default",start:e,end:e+1,value:s[e]}),e++}return r}function m(s,r){const e=r==="html"?d(s):c(s),o=new Array(s.length).fill("ty-syntax-default");for(const a of e){const t=`ty-syntax-${a.type}`;for(let n=a.start;n<a.end;n++)o[n]=t}return o}export{m as a,h as g};
