"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Data for each service
const servicesData = [
  {
    title: "Architecture",
    subtitle: "Designing Tomorrow's Landmarks",
    description:
      "Our philosophy is to create spaces that are not only visually stunning but also deeply functional and sustainable. We focus on light, space, and material to build structures that inspire.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Interior Design",
    subtitle: "Crafting Your Inner World",
    description:
      "An interior is the natural projection of the soul. Our designers work closely with you to craft spaces that reflect your personality and lifestyle, ensuring every detail is perfect.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Loan Assistance",
    subtitle: "Your Financial Blueprint to Success",
    description:
      "Navigating the world of property finance can be daunting. Our expert advisors simplify the process, connecting you with the best lending options tailored to your needs.",
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Legal Documentation",
    subtitle: "Securing Your Investment with Integrity",
    description:
      "In real estate, every detail matters. Our legal team ensures that all your documentation is flawless and your interests are protected, giving you complete peace of mind.",
    image: "https://img.freepik.com/free-photo/realtor-giving-keys-new-owner_23-2147764253.jpg",
  },
]

// Modal Form Component (Updated to accept serviceTitle)
const ContactFormModal = ({ isOpen, onClose, serviceTitle }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Form Submitted for ${serviceTitle}:`, formData)
    alert(
      `Thank you for your inquiry about ${serviceTitle}! Your message has been sent. We will get in touch with you shortly.`,
    )
    onClose()
  }

  const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } }
  const modalVariants = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hidden: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-[#1A1A1A] text-white w-full max-w-lg p-8 rounded-xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-2 text-white">Inquire About {serviceTitle}</h2>
            <p className="text-gray-400 mb-8">Please fill out the form below and we'll get back to you.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id={`name-${serviceTitle}`}
                  placeholder=" "
                  onChange={handleChange}
                  className="peer w-full p-3 bg-[#2A2A2A] border-b-2 border-gray-700 focus:border-white outline-none transition rounded-t-lg text-white"
                  required
                />
                <label
                  htmlFor={`name-${serviceTitle}`}
                  className="absolute left-3 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Full Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id={`email-${serviceTitle}`}
                  placeholder=" "
                  onChange={handleChange}
                  className="peer w-full p-3 bg-[#2A2A2A] border-b-2 border-gray-700 focus:border-white outline-none transition rounded-t-lg text-white"
                  required
                />
                <label
                  htmlFor={`email-${serviceTitle}`}
                  className="absolute left-3 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id={`phone-${serviceTitle}`}
                  placeholder=" "
                  onChange={handleChange}
                  className="peer w-full p-3 bg-[#2A2A2A] border-b-2 border-gray-700 focus:border-white outline-none transition rounded-t-lg text-white"
                />
                <label
                  htmlFor={`phone-${serviceTitle}`}
                  className="absolute left-3 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Phone Number (Optional)
                </label>
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  id={`message-${serviceTitle}`}
                  placeholder=" "
                  rows="4"
                  onChange={handleChange}
                  className="peer w-full p-3 bg-[#2A2A2A] border-b-2 border-gray-700 focus:border-white outline-none transition rounded-t-lg text-white"
                  required
                ></textarea>
                <label
                  htmlFor={`message-${serviceTitle}`}
                  className="absolute left-3 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  How can we help you with {serviceTitle}?
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
              >
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Service Section Component (Modified to include its own modal)
const ServiceSection = ({ service, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const textX = useTransform(scrollYProgress, [0.1, 0.4], ["-20%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])
  const imageScale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.2])
  const isEven = index % 2 === 0

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.section ref={ref} className="h-screen flex items-center justify-center overflow-hidden">
      <div
        className={`relative w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isEven ? "md:grid-flow-col-dense" : ""}`}
      >
        <motion.div
          style={{ x: isEven ? textX : 0, opacity: textOpacity }}
          className={`space-y-4 ${isEven ? "md:order-2" : "md:order-1"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <span className="text-gray-600 font-mono">0{index + 1}.</span> {service.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-light text-gray-300">{service.subtitle}</h3>
          <p className="text-gray-400 text-lg leading-relaxed">{service.description}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
          >
            Inquire Now
          </button>
        </motion.div>
        <motion.div
          style={{ x: !isEven ? textX : 0 }}
          className={`relative h-80 md:h-[500px] rounded-lg overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </motion.div>
      </div>
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceTitle={service.title} />
    </motion.section>
  )
}

// Main Services Page Component
const ServicesPage = () => {
  // The main "Get In Touch" button at the bottom will still open the generic modal
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false)

  return (
    <>
      <div className="bg-[#1A1A1A] text-white font-sans">
        {/* Hero Section */}
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            A Complete Real Estate Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl"
          >
            From architectural dreams to legal realities, we orchestrate every step with precision and care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
            className="mt-16 text-gray-500"
          >
            <span className="text-lg">Scroll to explore</span>
            <svg className="w-6 h-6 mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>

        {/* Individual Service Sections */}
        <div>
          {servicesData.map((service, index) => (
            <ServiceSection key={index} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="h-screen bg-white text-black flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Ready to Build Your Vision?</h2>
          <p className="mt-4 text-xl md:text-2xl text-gray-700 max-w-2xl">
            Let's start the conversation and turn your property goals into a remarkable success story.
          </p>
          <button
            onClick={() => setIsGenericModalOpen(true)}
            className="mt-8 px-10 py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>
      {/* Generic Contact Modal for the final CTA */}
      <ContactFormModal
        isOpen={isGenericModalOpen}
        onClose={() => setIsGenericModalOpen(false)}
        serviceTitle="General Inquiry"
      />
    </>
  )
}

export default ServicesPage
