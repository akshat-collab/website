import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Legal = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Legal
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>
            This section outlines the legal framework governing the use of our products and services. By accessing or using our platform, users agree to comply with all applicable laws and regulations.
          </p>
          <p>Key areas include intellectual property rights, limitation of liability, dispute resolution, and jurisdiction.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <Link to="/privacy" className="p-4 rounded-lg border hover:border-[var(--theme-accent)] transition-colors" style={{ borderColor: 'var(--theme-border-primary)', color: 'var(--theme-text-primary)' }}>
              Privacy Policy →
            </Link>
            <Link to="/terms" className="p-4 rounded-lg border hover:border-[var(--theme-accent)] transition-colors" style={{ borderColor: 'var(--theme-border-primary)', color: 'var(--theme-text-primary)' }}>
              Terms of Service →
            </Link>
            <Link to="/security" className="p-4 rounded-lg border hover:border-[var(--theme-accent)] transition-colors" style={{ borderColor: 'var(--theme-border-primary)', color: 'var(--theme-text-primary)' }}>
              Security →
            </Link>
            <Link to="/cookies" className="p-4 rounded-lg border hover:border-[var(--theme-accent)] transition-colors" style={{ borderColor: 'var(--theme-border-primary)', color: 'var(--theme-text-primary)' }}>
              Cookies →
            </Link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Legal;
