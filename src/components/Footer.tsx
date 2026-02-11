import { Mail, Linkedin, Twitter } from 'lucide-react';
import { memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = memo(() => {
  const { theme } = useTheme();

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Roadmap', 'Changelog'],
    Community: ['Discord', 'Twitter', 'GitHub', 'Blog'],
    Company: ['About', 'Careers', 'Contact', 'Press Kit'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  };

  return (
    <>
      {/* Footer Section - Compressed */}
      <footer className="footer-container relative">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">

        {/* Footer Links - Compressed Spacing, Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 max-w-5xl mx-auto">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer-heading font-heading font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">{category}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="footer-link font-body text-xs sm:text-sm transition-colors hover:text-primary leading-tight"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-px mb-4 sm:mb-6" />

        {/* Bottom Section - Compressed, Responsive Stack */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <img 
                src={theme === 'dark' ? '/tmai-logo.png' : '/tmai-logo-dark.png'}
                alt="TechMasterAI" 
                className="footer-brand-logo w-7 h-7 sm:w-8 sm:h-8 rounded"
                style={{
                  objectFit: 'contain',
                  filter: theme === 'dark' ? 'brightness(1.1)' : 'brightness(1)',
                }}
                onError={(e) => {
                  // Fallback to default logo if theme-specific logo fails to load
                  e.currentTarget.src = '/tmai-logo.png';
                }}
              />
              <span className="footer-brand-text font-heading font-bold text-xs sm:text-sm">
                TECHMASTER<span className="footer-brand-accent">AI</span>
              </span>
            </div>
            <p className="footer-text font-body text-[10px] sm:text-xs leading-tight text-center md:text-left">
              Empowering developers to compete and grow
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="footer-icon-button w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:scale-110 touch-manipulation"
              aria-label="Twitter"
            >
              <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="#"
              className="footer-icon-button w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:scale-110 touch-manipulation"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="mailto:techmaster.hub@gmail.com"
              className="footer-icon-button w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:scale-110 touch-manipulation"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>

          <p className="footer-text font-body text-[10px] sm:text-xs text-center md:text-right">
            © 2026 TechMasterAI. All rights reserved.
          </p>
        </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
