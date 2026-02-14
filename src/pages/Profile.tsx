import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Camera, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import * as localAuth from '@/lib/localAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
  });
  const [previewPhoto, setPreviewPhoto] = useState('');

  useEffect(() => {
    const session = localAuth.getSession();
    const userStr = localStorage.getItem('techmasterai_user');
    if (!session && !userStr) {
      toast.error('Please login to access your profile');
      navigate('/login');
      return;
    }
    try {
      const user = userStr ? JSON.parse(userStr) : { name: session?.username, email: session?.email, phone: '', photo: session?.profilePhoto };
      setProfileData({
        name: user.name || session?.username || '',
        email: user.email || session?.email || '',
        phone: user.phone || '',
        photo: user.photo || session?.profilePhoto || '',
      });
      setPreviewPhoto(user.photo || session?.profilePhoto || '');
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewPhoto(base64String);
        setProfileData({ ...profileData, photo: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Limit phone number to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setProfileData({ ...profileData, [name]: numericValue });
      }
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update local auth session (username, profilePhoto)
    localAuth.updateProfile({
      username: profileData.name,
      profilePhoto: profileData.photo || null,
    });

    // Update techmasterai_user for header/profile
    localStorage.setItem('techmasterai_user', JSON.stringify({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      photo: profileData.photo,
    }));

    // Update users array if exists
    const existingData = JSON.parse(localStorage.getItem('techmasterai_users') || '[]');
    const updatedData = existingData.map((user: { email?: string }) => {
      if (user.email === profileData.email) {
        return { ...user, ...profileData, updatedAt: new Date().toISOString() };
      }
      return user;
    });
    localStorage.setItem('techmasterai_users', JSON.stringify(updatedData));

    setIsLoading(false);
    toast.success('Profile updated successfully!');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background scanline">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" style={{ zIndex: 1 }} />

        <div className="relative z-10 w-full max-w-2xl">
          <div className="glass-panel neon-border rounded-lg p-8 relative" style={{ boxShadow: '0 0 20px rgba(0, 194, 255, 0.5), 0 0 40px rgba(0, 194, 255, 0.3), 0 0 60px rgba(0, 194, 255, 0.15)' }}>
            <h1 className="font-orbitron text-3xl font-bold text-center theme-accent mb-2">
              User Profile
            </h1>
            <p className="font-rajdhani text-center theme-text-secondary mb-8">
              Manage your account information
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div 
                    className="w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300"
                    style={{ 
                      borderColor: 'var(--theme-accent)',
                      background: 'var(--theme-card-hover-bg)',
                    }}
                  >
                    {previewPhoto ? (
                      <img 
                        src={previewPhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16" style={{ color: 'var(--theme-accent)', opacity: 0.5 }} />
                      </div>
                    )}
                  </div>
                  
                  {/* Camera Icon Overlay */}
                  <label 
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{
                      background: 'var(--theme-accent)',
                      boxShadow: '0 0 10px var(--theme-glow-secondary)',
                    }}
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-3 text-xs theme-text-secondary text-center">
                  Click camera icon to upload photo (Max 2MB)
                </p>
              </div>

              {/* Name Input */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: 'var(--theme-accent)', opacity: 0.5 }} />
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-4 theme-input rounded-lg font-rajdhani text-lg"
                  style={{ 
                    color: 'var(--theme-text-primary)',
                  }}
                />
              </div>

              {/* Email Input (Read-only) */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: 'var(--theme-accent)', opacity: 0.5 }} />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  readOnly
                  className="w-full pl-12 pr-4 py-4 theme-input rounded-lg font-rajdhani text-lg opacity-60 cursor-not-allowed"
                  style={{ 
                    color: 'var(--theme-text-primary)',
                  }}
                />
                <p className="mt-1 text-xs theme-text-secondary ml-12">Email cannot be changed</p>
              </div>

              {/* Phone Input */}
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: 'var(--theme-accent)', opacity: 0.5 }} />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (10 digits)"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="w-full pl-12 pr-4 py-4 theme-input rounded-lg font-rajdhani text-lg"
                  style={{ 
                    color: 'var(--theme-text-primary)',
                  }}
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 theme-button-primary rounded-lg flex items-center justify-center gap-3 disabled:opacity-50 font-rajdhani font-semibold text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </form>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: 'var(--theme-accent)' }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: 'var(--theme-accent)' }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: 'var(--theme-accent)' }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: 'var(--theme-accent)' }} />
          </div>

          {/* Back to Home */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 theme-text-secondary hover:theme-accent transition-all duration-200 font-rajdhani text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="group-hover:underline">Back to Home</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
