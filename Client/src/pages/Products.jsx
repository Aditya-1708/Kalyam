import { Link } from 'react-router-dom';
import Reveal from './../components/Reveal';

const ProductsPage = () => {
  return (
    <div className="page-transition pt-24">
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <Reveal><p className="section-label">Our Catalog</p></Reveal>
            <Reveal delayClass="delay-100"><h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ink mb-6">Our pharma Products</h1></Reveal>
            <Reveal delayClass="delay-200"><div className="divider mx-auto mb-8"></div></Reveal>
            <Reveal delayClass="delay-200">
              <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">Kalyam Pharma provides a diverse portfolio of high-quality formulations across human and veterinary divisions, engineered for optimal therapeutic outcomes.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products/human" className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-border p-8 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-8 h-8 text-emerald" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.24-34.65-42.44-57.07-71.56-49.92-22.12 5.41-40.78 22.97-46.72 43.91-5.94 20.94 2.21 43.27 19.22 54.67l-7.28 7.28c-40.37 40.37-40.37 105.81 0 146.18 40.37 40.37 105.81 40.37 146.18 0l7.28-7.28c11.41-17.01 33.73-25.16 54.67-19.22 20.94-5.94 38.5-24.6 43.91-46.72 7.15-29.12-15.27-61.32-49.92-71.56l-7.28-7.28c-40.37-40.37-105.81-40.37-146.18 0l-7.28 7.28z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-bold text-ink group-hover:text-emerald transition-colors">Human pharma Division</h2>
              </div>
              <p className="text-muted">Explore our wide range of pharma products for human healthcare, including antibiotics, multivitamins, immunity boosters, and more.</p>
              <div className="mt-6 flex items-center text-emerald font-semibold">
                <span>View Products</span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M190.5 66.5l270 162c30.2 18.1 30.2 66.4 0 84.5L190.5 414c-18.1 30.2-66.4 30.2-84.5 0-18.1-30.2-18.1-66.4 0-84.5l238.7-238.7L106 69.5c-18.1-30.2-18.1-66.4 0-84.5 30.2-18.1 66.4-18.1 84.5 0z"></path>
                </svg>
              </div>
            </Link>

            <Link to="/products/veterinary" className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-border p-8 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-8 h-8 text-gold" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 32c-88.37 0-160 71.63-160 160 0 35.41 11.19 68.52 30.06 96.32l-23.52 23.52c-28.18 28.18-36.64 68.52-23.52 104.32 13.12 35.8 48.52 60.72 88.98 60.72 40.46 0 75.86-24.92 88.98-60.72 13.12-35.8 4.66-76.14-23.52-104.32l-23.52-23.52C404.81 260.52 416 227.41 416 192c0-88.37-71.63-160-160-160zm0 272c-61.65 0-112-50.35-112-112 0-61.65 50.35-112 112-112 61.65 0 112 50.35 112 112 0 61.65-50.35 112-112 112z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-bold text-ink group-hover:text-emerald transition-colors">Veterinary Division</h2>
              </div>
              <p className="text-muted">Discover our animal health products including supplements, deworming solutions, and wellness products for livestock and pets.</p>
              <div className="mt-6 flex items-center text-emerald font-semibold">
                <span>View Products</span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M190.5 66.5l270 162c30.2 18.1 30.2 66.4 0 84.5L190.5 414c-18.1 30.2-66.4 30.2-84.5 0-18.1-30.2-18.1-66.4 0-84.5l238.7-238.7L106 69.5c-18.1-30.2-18.1-66.4 0-84.5 30.2-18.1 66.4-18.1 84.5 0z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;