import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Security = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Security
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>Security is embedded into our operational and product design processes.</p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Our approach includes:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption in transit and at rest</li>
            <li>Access controls and authentication</li>
            <li>Regular security audits and monitoring</li>
            <li>Incident response and recovery planning</li>
          </ul>
          <p>We continuously assess and enhance our security posture to mitigate evolving risks.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Security;
