import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactFormModal from "../about/ContactFormModal "; 

const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad"); 

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setModalOpen(true); 
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* Get in Touch Section */}
      <section
        className="min-h-[110vh] bg-[#151515] flex items-end justify-center px-6 md:px-12 lg:px-20 pt-20 pb-20"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="w-full max-w-6xl text-white text-left">
          <h2 className="text-4xl md:text-6xl leading-tight mb-16 tracking-wide font-bold" data-aos="fade-up">
            Get in touch
            <br />
            with us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="text-[#666666] mb-1 text-sm uppercase tracking-widest">General Inquiries</p>
              <p className="text-white text-lg">info@laxmiconveyors.com</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <p className="text-[#666666] mb-1 text-sm uppercase tracking-widest">Business Relations</p>
              <p className="text-white text-lg">sales@laxmiconveyors.com</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="600">
              <p className="text-[#666666] mb-1 text-sm uppercase tracking-widest">Careers</p>
              <p className="text-white text-lg">hr@laxmiconveyors.com</p>
            </div>
          </div>

          <p className="text-[#888888] text-lg leading-relaxed mb-12 max-w-lg" data-aos="fade-up" data-aos-delay="800">
            We are ready to share our vision and lead you into the exciting world of creativity and engineering.
          </p>

          <div data-aos="fade-up" data-aos-delay="1000">
            <button
              className="relative w-[280px] py-5 uppercase text-xs font-bold tracking-[0.2em] text-white border border-white transition-all duration-500 hover:bg-white hover:text-black"
              onClick={handleOpenModal}
            >
              Send Request
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full h-screen bg-[#111111] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
            alt="World Map Overlay"
            className="w-full h-full object-cover opacity-20 grayscale pointer-events-none"
          />
        </div>

        <div className="relative z-10 w-full h-full">
            <div
                onClick={() => handleCityClick("Ahmedabad")}
                className="absolute left-[70%] top-[50%] cursor-pointer group transition-all duration-300"
            >
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#00d26a]">Ahmedabad</h2>
                </div>
                <div className="ml-8 text-gray-400 text-sm leading-relaxed">
                    <p className="text-white font-semibold">Maruti Estate</p>
                    <p>Ahmedabad, Gujarat</p>
                    <p>India - 382415</p>
                </div>
            </div>

            {/* Other Global Locations (Example markers) */}
            <div onClick={() => handleCityClick("London")} className="absolute left-[45%] top-[30%] cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-white"></div>
                    <span className="text-gray-500 group-hover:text-white text-xs uppercase tracking-widest">London</span>
                </div>
            </div>

            <div onClick={() => handleCityClick("Miami")} className="absolute left-[25%] top-[60%] cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-white"></div>
                    <span className="text-gray-500 group-hover:text-white text-xs uppercase tracking-widest">Miami</span>
                </div>
            </div>
        </div>

        {/* Map UI Label */}
        <div className="absolute bottom-10 left-10 text-white/20 text-8xl font-black uppercase pointer-events-none select-none">
            Our Presence
        </div>
      </section>

      {/* Modal Integration */}
      {modalOpen && (
        <ContactFormModal
          onClose={handleCloseModal}
          selectedCity={selectedCity}
        />
      )}
    </>
  );
};

export default ContactSection;