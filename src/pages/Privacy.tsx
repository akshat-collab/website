import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Privacy
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>We are committed to protecting user privacy and handling personal data responsibly.</p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Data we collect:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account and contact information</li>
            <li>Usage and device data</li>
            <li>Communication and support data</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>How we use data:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service delivery and improvement</li>
            <li>Security and fraud prevention</li>
            <li>Legal and compliance obligations</li>
          </ul>
          <p>We do not sell personal data and implement industry-standard safeguards to protect information.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
