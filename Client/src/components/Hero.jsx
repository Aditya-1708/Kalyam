import { useCounter } from "../hooks/useCounter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const StatItem = ({ num, suffix, label }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const count = useCounter(num, isVisible, 1500);

  return (
    <div ref={ref} className="border-l-2 border-gold pl-4">
      <span className="font-serif text-[2rem] font-bold text-emerald block leading-none">
        {count}
        {suffix}
      </span>
      <span className="text-xs text-muted uppercase tracking-[0.06em] mt-1 block">
        {label}
      </span>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center pt-22 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-10 sm:gap-12 md:gap-16 relative overflow-hidden text-center md:text-left">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_60%_50%,rgba(46,125,50,0.07)_0%,transparent_70%)] pointer-events-none -z-10"></div>

      <div>
        <div className="mb-4">
          <img
            src="/images/logo.png"
            alt="Kalyam Pharma Logo"
            className="h-[70px] w-auto mix-blend-multiply bg-white rounded-2xl p-1 shadow-md"
          />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-[#0668c9] mb-6 font-bold mt-4">
          Kalyam Pharma
        </h1>
        <p className="text-base sm:text-[1.0625rem] text-muted leading-[1.75] mb-8 max-w-[500px] mx-auto md:mx-0">
          Trusted Healthcare Solutions for Humans &amp; Animals
        </p>
        <div className="flex flex-wrap gap-6 sm:gap-8 justify-center md:justify-start">
          <StatItem num={28} label="States Covered" />
          <StatItem num={500} suffix="+" label="Distributors" />
          <StatItem num={20} suffix="+" label="Years Research" />
        </div>
      </div>

      <div className="relative hidden md:flex justify-center items-center">
        <div className="w-full max-w-[560px] rounded-2xl overflow-hidden relative shadow-[0_32px_80px_rgba(46,125,50,0.15)]">
          <img
            src="/images/home.jpeg"
            alt="Doctor providing pharmaceutical care"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "auto" }}
          />
        </div>

        <div className="absolute bg-white border border-border rounded-xl py-3.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-3 text-[0.8125rem] font-medium -bottom-4 -left-8 animate-float">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-light">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="w-[18px] h-[18px] text-[#2E7D32]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-ink leading-[1.2]">
              GMP Certified
            </div>
            <div className="text-[0.7rem] text-muted">
              ISO Verified Manufacturing
            </div>
          </div>
        </div>

        <div
          className="absolute bg-white border border-border rounded-xl py-3.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-3 text-[0.8125rem] font-medium top-6 -right-8 animate-float"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gold-light">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="w-[18px] h-[18px] text-[#1565C0]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z"></path>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-ink leading-[1.2]">
              R&amp;D Pipeline
            </div>
            <div className="text-[0.7rem] text-muted">
              12 Active Formulations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
