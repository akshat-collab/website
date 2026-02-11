import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PressKit = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Press Kit
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>
            Our press kit provides journalists and media partners with up-to-date, approved assets and company information.
          </p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Includes:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Company overview and fact sheet</li>
            <li>Leadership bios</li>
            <li>Brand guidelines</li>
            <li>Logos and product screenshots</li>
            <li>Press releases and media coverage</li>
          </ul>
          <p>For media inquiries, contact: <a href="mailto:support@techmasterai.in" className="underline" style={{ color: 'var(--theme-accent)' }}>support@techmasterai.in</a></p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PressKit;
