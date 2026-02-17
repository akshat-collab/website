import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SeoHead } from '../components/SeoHead';

const Contact = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <SeoHead
      title="Contact"
      description="Get in touch with TechMasterAI. General inquiries, support, and business partnerships. Email: support@techmasterai.in"
      path="/contact"
    />
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Contact
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>
            We value open communication and timely engagement.
          </p>
          <div className="space-y-2">
            <p><strong>General inquiries:</strong> <a href="mailto:support@techmasterai.in" className="underline" style={{ color: 'var(--theme-accent)' }}>support@techmasterai.in</a></p>
            <p><strong>Support:</strong> <a href="mailto:support@techmasterai.in" className="underline" style={{ color: 'var(--theme-accent)' }}>support@techmasterai.in</a></p>
            <p><strong>Business partnerships:</strong> <a href="mailto:support@techmasterai.in" className="underline" style={{ color: 'var(--theme-accent)' }}>support@techmasterai.in</a></p>
          </div>
          <p>Our team aims to respond to all inquiries within standard business hours.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
