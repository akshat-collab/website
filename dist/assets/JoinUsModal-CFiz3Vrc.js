import{r as o,j as r}from"./vendor-ui-CN8WKm1l.js";import{c as l,X as i}from"./index-gDkUcazU.js";import"./vendor-react-Bte3Nn5F.js";const m=l("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]),c=o.memo(({isOpen:t,onClose:a})=>{o.useEffect(()=>{const e=n=>{n.key==="Escape"&&t&&a()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,a]),o.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[t]);const s=()=>{window.open("https://forms.gle/4u6dUZqP4RT9S3FLA","_blank","noopener,noreferrer")};return t?r.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",style:{background:"rgba(0, 0, 0, 0.6)",backdropFilter:"blur(6px)",animation:"fadeIn 0.2s ease-out"},onClick:a,children:[r.jsx("div",{className:"relative w-full max-w-md",style:{animation:"modalSlideIn 0.3s ease-out"},onClick:e=>e.stopPropagation(),children:r.jsxs("div",{className:"join-us-modal-card relative rounded-2xl p-6 sm:p-8",style:{background:"var(--theme-card-bg)",border:"1px solid var(--theme-border-primary)",boxShadow:"0 20px 60px var(--theme-shadow-primary), 0 0 40px var(--theme-glow-tertiary)",backdropFilter:"blur(20px)"},children:[r.jsx("button",{onClick:a,className:"absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation",style:{background:"rgba(0, 194, 255, 0.1)",border:"1px solid rgba(0, 194, 255, 0.3)",color:"var(--theme-accent)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(0, 194, 255, 0.2)",e.currentTarget.style.borderColor="rgba(0, 194, 255, 0.5)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(0, 194, 255, 0.1)",e.currentTarget.style.borderColor="rgba(0, 194, 255, 0.3)"},"aria-label":"Close modal",children:r.jsx(i,{className:"w-5 h-5"})}),r.jsx("div",{className:"w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto",style:{background:"var(--theme-card-hover-bg)",border:"1px solid var(--theme-accent)",color:"var(--theme-accent)"},children:r.jsx(m,{className:"w-7 h-7 sm:w-8 sm:h-8"})}),r.jsx("h2",{className:"font-heading text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4",style:{color:"var(--theme-text-primary)"},children:"We're Hiring"}),r.jsx("p",{className:"font-body text-sm sm:text-base text-center mb-6 sm:mb-8 leading-relaxed",style:{color:"var(--theme-text-secondary)"},children:"Join our team of innovators building the future of competitive coding. We're looking for passionate developers, designers, and problem-solvers ready to make an impact."}),r.jsx("button",{onClick:s,className:"w-full inline-flex items-center justify-center px-6 py-3 sm:py-4 text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-300 touch-manipulation",style:{borderRadius:"9999px",color:"#0B0F14",fontWeight:"600",fontFamily:"var(--font-heading)",background:"var(--theme-accent)",boxShadow:"0 0 20px var(--theme-glow-primary), 0 4px 12px var(--theme-glow-secondary)"},onMouseEnter:e=>{e.currentTarget.style.filter="brightness(0.9)",e.currentTarget.style.boxShadow="0 0 40px var(--theme-glow-primary), 0 8px 24px var(--theme-glow-secondary)",e.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:e=>{e.currentTarget.style.filter="brightness(1)",e.currentTarget.style.boxShadow="0 0 20px var(--theme-glow-primary), 0 4px 12px var(--theme-glow-secondary)",e.currentTarget.style.transform="translateY(0)"},children:"Apply Now"})]})}),r.jsx("style",{children:`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .join-us-modal-card {
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .join-us-modal-card {
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeIn {
            from, to {
              opacity: 1;
            }
          }

          @keyframes modalSlideIn {
            from, to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `})]}):null});c.displayName="JoinUsModal";export{c as default};
