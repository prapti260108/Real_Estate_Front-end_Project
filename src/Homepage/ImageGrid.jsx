"use client"; // Required for Next.js App Router

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ContactFormModal from "../about/ContactFormModal "; // Import the ContactFormModal component

// ContactSection Component
function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity] = useState("Your Project Inquiry City"); // Example city, adjust as needed

  useEffect(() => {
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
    <>
      <section id="contact-section" className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h4
            className={`text-4xl md:text-3xl lg:text-4xl font-bold text-black mb-8 leading-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
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
          >
            We are ready to share with you our design vision and lead you into the exciting world of creativity.
          </p>
          <button
            onClick={handleOpenModal}
            className={`border border-black px-10 py-3 text-black font-light text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            SEND REQUEST
          </button>
        </div>
      </section>

      {modalOpen && <ContactFormModal onClose={handleCloseModal} selectedCity={selectedCity} />}
    </>
  );
}

// ImageGrid Component
export function ImageGrid() {
  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);
  const [mainImage, setMainImage] = useState({
    url: "https://southcoastimprovement.com/wp-content/uploads/2025/03/8254661.jpg",
    alt: "Construction site background",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for the backend (adjust as needed)
  const BASE_URL = "http://localhost:3000/";

  // Fetch main image and grid data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch main background image
        const mainImageResponse = await fetch("http://localhost:3000/api/image");
        if (!mainImageResponse.ok) {
          throw new Error("Failed to fetch main image");
        }
        const mainImageData = await mainImageResponse.json();
        setMainImage({
          url: mainImageData.url || mainImage.url,
          alt: mainImageData.alt || mainImage.alt,
        });

        // Fetch grid images
        const gridResponse = await fetch("http://localhost:3000/api/image");
        if (!gridResponse.ok) {
          throw new Error("Failed to fetch grid images");
        }
        const rawGridData = await gridResponse.json();

        // Transform backend data to match expected structure
        const transformedGridData = rawGridData.map((item) => {
          const rawPath = (item.path || item.filename || "").replace(/\\/g, "/");
          let imageUrl = "";
          if (!rawPath) {
            imageUrl = `${BASE_URL}uploads/placeholder.svg`;
          } else if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
            imageUrl = rawPath;
          } else if (rawPath.startsWith("uploads")) {
            imageUrl = `${BASE_URL}${rawPath.replace(/^\//, "")}`;
          } else {
            imageUrl = `${BASE_URL}uploads/${rawPath.replace(/^\//, "")}`;
          }

          return {
            id: item._id,
            imageUrl,
            alt: item.filename || "Grid image",
            title: item.builderGroup || "Untitled Project",
          };
        });

        setGridData(transformedGridData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGridClick = (index) => {
    const item = gridData[index];
    // Navigate to builder explore page using the builderGroup/title
    const builderKey = encodeURIComponent(item.title);
    // pass the image URL and title in navigation state and as a query param
    // so the explore page can show the same image even after refresh
    const encodedImg = encodeURIComponent(item.imageUrl || "");
    navigate(`/explore/${builderKey}?img=${encodedImg}`, { state: { imageUrl: item.imageUrl, title: item.title } });
  };

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">Error: {error}</div>;
  }

  return (
    <div className="relative w-full bg-gray-900 font-sans">
      {/* Background Image and Grid */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Clickable Grid Container */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 grid-rows-6 md:grid-rows-3 w-full h-full">
          {gridData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleGridClick(index)}
              className="group relative border border-white cursor-pointer overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex items-end justify-start p-4 text-white text-lg font-bold text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}