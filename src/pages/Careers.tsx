import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SeoHead } from '../components/SeoHead';

const Careers = () => (
  <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
    <SeoHead
      title="Careers"
      description="Join TechMasterAI. We're hiring high-performing professionals. Competitive compensation, flexible work, learning programs, inclusive workplace."
      path="/careers"
    />
    <Header />
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--theme-accent)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--theme-text-primary)' }}>
          Careers
        </h1>
        <div className="space-y-6" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>
            We are always looking for high-performing, mission-aligned professionals who thrive in fast-paced, collaborative environments. Our culture emphasizes autonomy, accountability, and growth.
          </p>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>What we offer:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Competitive compensation and benefits</li>
            <li>Flexible work arrangements</li>
            <li>Learning and development programs</li>
            <li>Inclusive and diverse workplace</li>
            <li>Clear career progression and performance feedback</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8" style={{ color: 'var(--theme-text-primary)' }}>Hiring process:</h2>
          <p>Application review → Initial screening → Technical/functional interviews → Culture fit discussion → Offer and onboarding.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Careers;
