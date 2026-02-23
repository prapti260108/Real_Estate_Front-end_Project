"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  BedSingle,
  Bath,
  Ruler,
  CheckCircle,
  ChevronDown,
  X,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// Sub-Components
const HeroSection = ({ property, onContactClick }) => (
  <section
    className="relative min-h-screen bg-cover bg-center flex flex-col justify-end"
    style={{ backgroundImage: `url(${property.image})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    <motion.div
      className="relative z-10 text-white w-full max-w-7xl mx-auto px-6 md:px-8 pb-20 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <img
          src={property.builderLogo}
          alt={`${property.builder} Logo`}
          className="h-14 w-14 bg-white p-1 rounded-full object-contain"
        />
        <span className="text-lg font-semibold">{property.builder}</span>
      </motion.div>
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold tracking-tight"
      >
        {property.name}
      </motion.h1>
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg"
      >
        <div className="flex items-center">
          <MapPin size={20} className="mr-2 opacity-80" />
          <span>{property.location}</span>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
      >
        {property.isResidential ? (
          <>
            <div className="flex flex-col items-center">
              <BedSingle size={32} />
              <span className="mt-1 text-lg">{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath size={32} />
              <span className="mt-1 text-lg">{property.bathrooms} Baths</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Building2 size={32} />
            <span className="mt-1 text-lg">{property.propertyType}</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <Ruler size={32} />
          <span className="mt-1 text-lg">{property.areaSqFt} sq.ft</span>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="pt-4">
        <button
          onClick={onContactClick}
          className="bg-white text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transform hover:scale-105 transition-transform duration-300"
        >
          Schedule a Visit
        </button>
      </motion.div>
    </motion.div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <ChevronDown
        className="text-white h-10 w-10 animate-bounce"
        strokeWidth={1}
      />
    </div>
  </section>
);

const OverviewSection = ({ property, onContactClick }) => {
  const [galleryImage, setGalleryImage] = useState(property.image);
  const images = [
    property.image,
    ...(property.availablePlans?.map((p) => p.image) || []).slice(0, 2),
  ].filter(Boolean);

  return (
    <section className="bg-white text-[#1A1A1A] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 sticky top-24"
        >
          <img
            src={galleryImage || "/placeholder.svg"}
            alt="Property View"
            className="rounded-xl shadow-xl w-full h-auto object-cover aspect-video filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img || "/placeholder.svg"}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setGalleryImage(img)}
                className={`rounded-lg cursor-pointer transition-all duration-500 filter grayscale hover:grayscale-0 ${
                  galleryImage === img
                    ? "ring-2 ring-offset-2 ring-[#1A1A1A]"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">
              Inside the Property
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-[#1A1A1A]">
              Key Features
            </h3>
            <ul className="space-y-4">
              {property.planFeatures?.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-lg text-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle
                    size={22}
                    className="text-[#1A1A1A] mr-4 flex-shrink-0"
                  />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onContactClick
              className="bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-colors duration-300"
            >
              Request a Brochure
            </button>
            <button
              onClick={onContactClick}
              className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
            >
              Get Price Details
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FloorPlanCard = ({ plan }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    <div className="overflow-hidden">
      <img
        src={plan.image}
        alt={plan.name}
        className="w-full h-64 object-cover group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all duration-500"
      />
    </div>
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-bold mb-2 text-[#1A1A1A]">{plan.name}</h3>
      <p className="text-gray-600 mb-4">
        {plan.area} • {plan.propertyType}
      </p>
      <p className="text-2xl font-semibold text-black">{plan.price}</p>
    </div>
  </motion.div>
);

const AvailablePlansSection = ({ property }) => {
  if (!property.availablePlans || property.availablePlans.length === 0) {
    return null;
  }
  return (
    <section className="bg-gray-100 py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1A1A1A]">
          Available Floor Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {property.availablePlans.map((plan, index) => (
            <FloorPlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFormModal = ({ propertyName, projectId, projectType, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.enquiryType === 'price_details') {
        const payload = {
          propertyType: projectType || projectId || propertyName || 'Unknown',
          fullName: formData.fullName,
          email: formData.email,
          phone: Number(String(formData.phone).replace(/\D/g, '')) || formData.phone,
        };
        const response = await axios.post('https://real-estate-back-end-project-2.onrender.com/api/pricingRequest', payload);
        console.log('Pricing request response:', response.status);
        alert(`Thank you, ${formData.fullName}! Your pricing request for ${propertyName} has been received.`);
        setFormData({ fullName: '', email: '', phone: '', enquiryType: '' });
        onClose();
        return;
      }

      const payload = {
        name: formData.fullName,
        mobileNo: formData.phone,
        emailId: formData.email,
        projectId: projectId,
        projectType: projectType,
      };
      const response = await axios.post('https://real-estate-back-end-project-2.onrender.com/api/brochure_requests', payload);
      console.log('Response status:', response.status);
      alert(`Thank you, ${formData.fullName}! Your enquiry for ${propertyName} has been received.`);
      setFormData({ fullName: '', email: '', phone: '', enquiryType: '' });
      onClose();
    } catch (err) {
      console.error("Form submission error:", err.response?.status, err.response?.data, err.message);
      alert("Failed to submit enquiry. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 font-sans"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#1C1C1C] rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-lg relative text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">
          Don't hesitate to contact us
        </h3>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Location: Your Project Inquiry City
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="enquiryType"
              className="block text-white text-sm font-medium mb-1"
            >
              Nature of Enquiry
            </label>
            <select
              id="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-white text-white appearance-none pr-8"
              required
            >
              <option value="" disabled className="text-gray-400">
                Please select
              </option>
              <option value="site_visit" className="text-white">
                Schedule a Site Visit
              </option>
              <option value="price_details" className="text-white">
                Get Price Details
              </option>
              <option value="brochure_request" className="text-white">
                Request a Brochure
              </option>
              <option value="general_inquiry" className="text-white">
                General Inquiry
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center mt-8 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-[#1C1C1C] px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors duration-300"
          >
            SEND REQUEST
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Main Component
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        console.log("Fetching project with ID:", id); // Debug log
        const response = await axios.get(
          `https://real-estate-back-end-project-2.onrender.com/api/projects/${id}`
        );
        console.log("API Response:", response.data); // Debug log
        const project = response.data;

        // Map backend data to frontend structure
        const mappedProperty = {
          id: project._id,
          name: project.companyName,
          builder: project.companyName,
          builderLogo: project.builderLogo || "/placeholder.svg",
          location: project.location,
          propertyType: project.propertyType,
          areaRange: `${project.superArea.min}-${project.superArea.max} sq.ft`,
          status: project.status
            ? project.status.charAt(0).toUpperCase() +
              project.status.slice(1).replace(/_/g, " ")
            : "N/A",
          image: project.imageUrl || "/placeholder.svg",
          price: `₹${project.priceRange.min / 100000}L onwards`,
          isResidential: project.projectCategory === "Residential",
          bedrooms: project.projectCategory === "Residential" && project.propertyType.includes("BHK")
            ? project.propertyType.split(" ")[0]
            : "N/A",
          bathrooms: project.projectCategory === "Residential" && project.propertyType.includes("BHK")
            ? project.propertyType.split(" ")[0]
            : "N/A",
          areaSqFt: Math.round((project.superArea.min + project.superArea.max) / 2).toString(),
          description: project.description || "No description available.",
          planFeatures: [
            ...(project.amenities?.parking ? ["Parking"] : []),
            ...(project.amenities?.garden ? ["Garden"] : []),
            ...(project.amenities?.swimmingPool ? ["Swimming Pool"] : []),
            ...(project.amenities?.security ? ["Security"] : []),
            ...(project.amenities?.lift ? ["Lift"] : []),
          ].length > 0
            ? [
                ...(project.amenities?.parking ? ["Parking"] : []),
                ...(project.amenities?.garden ? ["Garden"] : []),
                ...(project.amenities?.swimmingPool ? ["Swimming Pool"] : []),
                ...(project.amenities?.security ? ["Security"] : []),
                ...(project.amenities?.lift ? ["Lift"] : []),
              ]
            : ["Modern Infrastructure", "High-Speed Connectivity"],
          availablePlans: project.screenshots?.map((img, index) => ({
            name: `${project.propertyType} Plan ${index + 1}`,
            area: `${project.superArea.min + index * 100} sq.ft`,
            propertyType: project.projectCategory === "Residential" ? project.propertyType : "Commercial",
            price: `₹${(project.priceRange.min + index * 500000) / 100000}L`,
            image: img || "/placeholder.svg",
          })) || [],
        };

        setProperty(mappedProperty);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Fetch error:", err.response?.status, err.response?.data, err.message); // Debug log
        setError("Failed to fetch property details. Please try again later.");
        setLoading(false);
        navigate("/404");
      }
    };

    fetchProperty();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <p className="text-xl animate-pulse">Loading Property Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!property) {
    return null; // Fallback, handled by navigate("/404")
  }

  return (
    <div className="bg-white font-sans">
      <HeroSection
        property={property}
        onContactClick={() => setShowModal(true)}
      />
      <OverviewSection
        property={property}
        onContactClick={() => setShowModal(true)}
      />
      <AvailablePlansSection property={property} />
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Interested in this Property?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Our team is ready to provide you with more information, schedule a
            site visit, or answer any questions you may have.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transform hover:scale-105 transition-transform duration-300"
            >
              Contact Us Now
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-gray-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
            >
              Explore Other Projects
            </button>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showModal && (
          <ContactFormModal
            propertyName={property.name}
            projectId={property.id}
            projectType={property.propertyType}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyDetails;