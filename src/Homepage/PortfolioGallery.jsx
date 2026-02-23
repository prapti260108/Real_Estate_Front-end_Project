"use client"; // Required for Next.js App Router

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImageGrid } from "./imgGrid"; // Import ImageGrid component

// ContactFormModal Component
const ContactFormModal = ({ onClose, selectedCity }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryNature: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.enquiryNature.trim()) {
      newErrors.enquiryNature = "Please select an enquiry type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Send form data to backend
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, city: selectedCity }),
        });
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        console.log("✅ Form submitted:", formData, "City:", selectedCity);
        onClose();
        navigate("/thank-you");
      } catch (err) {
        console.error("Submission error:", err);
        setErrors({ submit: "Failed to submit form. Please try again." });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-[#1f1f1f] text-white p-8 rounded-lg w-full max-w-2xl relative shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-light hover:scale-110 transition-transform"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-4 text-center">
          Don’t hesitate to contact us
        </h2>

        {selectedCity && (
          <p className="text-center text-gray-400 mb-6 text-sm">
            Location: <strong>{selectedCity}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 bg-transparent border ${
                errors.fullName ? "border-red-500" : "border-gray-600"
              } rounded focus:outline-none focus:border-white text-base`}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 bg-transparent border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } rounded focus:outline-none focus:border-white text-base`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              className={`w-full px-4 py-3 bg-transparent border ${
                errors.phone ? "border-red-500" : "border-gray-600"
              } rounded focus:outline-none focus:border-white text-base`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-2">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Nature of Enquiry</label>
            <select
              name="enquiryNature"
              className={`w-full px-4 py-3 bg-transparent border ${
                errors.enquiryNature ? "border-red-500" : "border-gray-600"
              } rounded appearance-none focus:outline-none focus:border-white text-base`}
              value={formData.enquiryNature}
              onChange={handleChange}
            >
              <option className="bg-[#111111]" value="">
                Please select
              </option>
              <option className="bg-[#111111]" value="General Inquiry">
                General Inquiry
              </option>
              <option className="bg-[#111111]" value="Careers">
                Careers
              </option>
              <option className="bg-[#111111]" value="PR & Collaborations">
                PR & Collaborations
              </option>
            </select>
            {errors.enquiryNature && (
              <p className="text-red-500 text-xs mt-2">{errors.enquiryNature}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-xs mt-2">{errors.submit}</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full border border-white py-3 rounded-md hover:bg-white hover:text-black transition-all duration-300 font-semibold uppercase tracking-wider"
          >
            SEND REQUEST
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Contact Section Component
function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
    const section = document.getElementById("contact-section");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
    console.log("Modal opened from Contact Section!");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    console.log("Modal closed from Contact Section!");
  };

  return (
    <section id="contact-section" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h4
          className={`text-4xl md:text-3xl lg:text-4xl font-bold text-black mb-8 leading-tight transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-aos="fade-up"
        >
          Let's talk about
          <br />
          your project!
        </h4>
        <p
          className={`text-gray-500 text-lg font-light text-[14px] mb-12 leading-relaxed max-w-xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          We are ready to share with you our design vision and lead you into the exciting world of creativity.
        </p>
        <button
          onClick={handleOpenModal}
          className={`border border-black px-10 py-3 text-black font-light text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          SEND REQUEST
        </button>
      </div>

      {modalOpen && (
        <ContactFormModal
          onClose={handleCloseModal}
          selectedCity="Your Project Inquiry City"
        />
      )}
    </section>
  );
}

// Main Portfolio Gallery Component
export default function PortfolioGallery() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [galleryHeaderVisible, setGalleryHeaderVisible] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
    const heroSection = document.getElementById("hero-section");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          heroObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (heroSection) heroObserver.observe(heroSection);

    const galleryHeaderSection = document.getElementById("gallery-header");
    const galleryHeaderObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryHeaderVisible(true);
          galleryHeaderObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (galleryHeaderSection) galleryHeaderObserver.observe(galleryHeaderSection);

    return () => {
      if (heroSection) heroObserver.unobserve(heroSection);
      if (galleryHeaderSection) galleryHeaderObserver.unobserve(galleryHeaderSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        id="hero-section"
        className="hidden md:block relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden"
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1
            className={`text-4xl md:text-6xl font-bold transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-aos="fade-up"
          >
            Innovative Spaces, Timeless Designs
          </h1>
          <p
            className={`mt-4 text-lg md:text-xl transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Explore Our Architectural Showcase
          </p>
          <div
            className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link
              to="/Projects"
              className="border border-white px-8 py-3 text-white font-light text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Our Projects
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white px-8 py-3 text-black font-light text-sm uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <section id="gallery-header" className="bg-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className={`text-3xl md:text-4xl font-bold text-black mb-4 transition-all duration-1000 ${
              galleryHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-aos="fade-up"
          >
            Our Curated Collection
          </h2>
          <p
            className={`text-gray-600 text-lg max-w-2xl mx-auto transition-all duration-1000 ${
              galleryHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Each project is a testament to our commitment to excellence and innovation. Hover over the tiles to reveal a
            glimpse into our world.
          </p>
        </div>
      </section>

      <ImageGrid />

      <ContactSection />
    </div>
  );
}