import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ContactFormModal = ({ onClose, selectedCity, propertyType, propertyName }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    natureOfEnquiry: "",
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
    if (!formData.natureOfEnquiry.trim()) {
      newErrors.natureOfEnquiry = "Please select an enquiry type";
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
      console.log("✅ Form submitted:", formData, "City:", selectedCity);
      try {
        // If user requested price details, send to pricingRequest endpoint
        const wantsPrice = String(formData.natureOfEnquiry || "").toLowerCase().includes("price");
        if (wantsPrice) {
          const resp = await fetch("https://real-estate-back-end-project-2.onrender.com/api/pricingRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyType: propertyType || propertyName || formData.propertyType || "Unknown",
              fullName: formData.fullName,
              email: formData.email,
              phone: Number(String(formData.phone).replace(/\D/g, "")) || formData.phone,
            }),
          });
          if (!resp.ok) {
            const text = await resp.text();
            throw new Error(`Pricing request failed: ${resp.status} ${text}`);
          }
          const json = await resp.json();
          console.log("Pricing request successful:", json);
          if (typeof onClose === "function") onClose();
          navigate("/thank-you");
          return;
        }

        // Default: submit as a general contact submission (backend expects /api/contact)
        const response = await fetch("https://real-estate-back-end-project-2.onrender.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            selectedCity: selectedCity || null,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        const data = await response.json();
        console.log("Form submission successful:", data);
        if (typeof onClose === "function") onClose();
        navigate("/thank-you");
      } catch (error) {
        console.error("Error submitting form:", error);
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
          onClick={() => typeof onClose === "function" ? onClose() : console.warn("onClose is not a function")}
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
            <label className="block text-sm mb-2 text-gray-300">
              Nature of Enquiry
            </label>
            <select
              name="natureOfEnquiry"
              className={`w-full px-4 py-3 bg-transparent border ${
                errors.natureOfEnquiry ? "border-red-500" : "border-gray-600"
              } rounded appearance-none focus:outline-none focus:border-white text-base`}
              value={formData.natureOfEnquiry}
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
              <option className="bg-[#111111]" value="Get Price Details">
                Get Price Details
              </option>
            </select>
            {errors.natureOfEnquiry && (
              <p className="text-red-500 text-xs mt-2">{errors.natureOfEnquiry}</p>
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

ContactFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedCity: PropTypes.string,
  propertyType: PropTypes.string,
  propertyName: PropTypes.string,
};

ContactFormModal.defaultProps = {
  selectedCity: null,
  propertyType: null,
  propertyName: null,
};

export default ContactFormModal;