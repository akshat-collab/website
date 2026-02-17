import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SeoHead } from '../components/SeoHead';

const About = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <SeoHead
      title="About Us"
      description="TechMasterAI - Technology-driven organization focused on scalable, secure solutions. Mission: Empower businesses through reliable technology. Vision: Globally trusted platform for innovation."
      path="/about"
    />
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          About
        </h1>
        <div className="prose prose-invert max-w-none space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>
            Our company is a technology-driven organization focused on delivering scalable, secure, and customer-centric solutions. We operate with a long-term vision, prioritizing sustainable growth, operational excellence, and continuous innovation. Our teams collaborate across functions to solve complex problems, create measurable impact, and build products that drive real-world value for our customers and partners.
          </p>
          <p><strong>Mission:</strong> To empower businesses and individuals through reliable, forward-looking technology solutions.</p>
          <p><strong>Vision:</strong> To become a globally trusted platform recognized for innovation, integrity, and impact.</p>
          <p><strong>Values:</strong> Customer obsession, ownership mindset, transparency, inclusion, and continuous improvement.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
