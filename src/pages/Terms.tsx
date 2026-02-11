import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Terms of Service
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>Our Terms of Service define the contractual relationship between the company and users.</p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Key points:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>User responsibilities and acceptable use</li>
            <li>Account registration and termination</li>
            <li>Fees, billing, and refunds (if applicable)</li>
            <li>Disclaimers and limitation of liability</li>
          </ul>
          <p>Continued use of our services constitutes acceptance of these terms.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
