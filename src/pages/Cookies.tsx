import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cookies = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Cookies
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>We use cookies and similar technologies to optimize user experience and platform performance.</p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Types of cookies used:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Essential cookies for core functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Preference cookies to personalize experience</li>
          </ul>
          <p>Users can manage cookie preferences through browser settings or our cookie management tools.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Cookies;
