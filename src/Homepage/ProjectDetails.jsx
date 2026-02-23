"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapPin, BedSingle, Bath, Ruler, CheckCircle, X } from "lucide-react" // ChevronDown removed
import { motion, AnimatePresence } from "framer-motion"

// --- Sample gridData (assuming this comes from "./PortfolioGallery" as per your original code) ---
// This is a minimal example to make the component runnable.
// Ensure your actual PortfolioGallery.js exports a similar structure.
const gridData = [
  {
    id: 1,
    title: "The Grand Residency",
    subtitle: "Luxury Apartments in Downtown",
    description:
      "Experience unparalleled luxury and comfort in the heart of the city with spacious layouts and premium finishes.",
    imageUrl: "/placeholder.svg?height=600&width=800",
    alt: "Luxury Apartment Building",
    type: "Apartment",
    location: "Downtown",
    status: "Ready to Move",
    price: "₹1.5 Cr onwards",
    areaRange: "1500-2000 sq.ft",
  },
  {
    id: 2,
    title: "City View Towers",
    subtitle: "Modern Living with Panoramic Views",
    description: "Enjoy breathtaking cityscapes from your contemporary apartment.",
    imageUrl: "/placeholder.svg?height=600&width=800",
    alt: "Modern City Apartment",
    type: "Apartment",
    location: "Uptown",
    status: "New Launch",
    price: "₹1.2 Cr onwards",
    areaRange: "1200-1800 sq.ft",
  },
  {
    id: 3,
    title: "Green Oasis Villas",
    subtitle: "Serene Villas Amidst Nature",
    description: "Escape to tranquility with spacious villas surrounded by lush greenery.",
    imageUrl: "/placeholder.svg?height=600&width=800",
    alt: "Green Villa Community",
    type: "Villa",
    location: "Suburbs",
    status: "Under Construction",
    price: "₹2.0 Cr onwards",
    areaRange: "2500-3500 sq.ft",
  },
]

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

// --- Sub-Components for a Cleaner Structure ---
const HeroSection = ({ property, onContactClick }) => (
  <section
    className="relative min-h-screen bg-cover bg-center flex flex-col justify-end"
    style={{ backgroundImage: `url(${property.image})` }}
  >
    <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay for readability */}
    <motion.div
      className="relative z-10 text-white w-full max-w-7xl mx-auto px-6 md:px-8 pb-20 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        {/* Placeholder for builder logo and name as they are not in your original gridData */}
        <img
          src={"/placeholder.svg?height=56&width=56&query=builder logo"}
          alt={"Builder Logo"}
          className="h-14 w-14 bg-white p-1 rounded-full object-contain filter grayscale"
        />
        <span className="text-lg font-semibold">{"Premier Builders"}</span>
      </motion.div>
      <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight">
        {property.name}
      </motion.h1>
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg">
        <div className="flex items-center">
          <MapPin size={20} className="mr-2 opacity-80" />
          <span>{property.location}</span>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
        {property.bedrooms !== "N/A" && (
          <div className="flex flex-col items-center">
            <BedSingle size={32} />
            <span className="mt-1 text-lg">{property.bedrooms} Beds</span>
          </div>
        )}
        {property.bathrooms !== "N/A" && (
          <div className="flex flex-col items-center">
            <Bath size={32} />
            <span className="mt-1 text-lg">{property.bathrooms} Baths</span>
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
          className="bg-white text-[#1C1C1C] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transform hover:scale-105 transition-transform duration-300"
        >
          Schedule a Visit
        </button>
      </motion.div>
      {/* ChevronDown icon removed as requested */}
    </motion.div>
  </section>
)

const OverviewSection = ({ property, onContactClick }) => {
  const [galleryImage, setGalleryImage] = useState(property.image)
  // Use property.availablePlans for gallery thumbnails
  const images = [galleryImage, ...(property.availablePlans?.map((p) => p.image).slice(0, 2) || [])]

  return (
    <section className="bg-white text-[#1C1C1C] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Side: Gallery */}
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
            className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="grid grid-cols-3 gap-4">
            {images.map(
              (img, idx) =>
                img && (
                  <img
                    key={idx}
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setGalleryImage(img)}
                    className={`rounded-lg cursor-pointer transition-all duration-300 filter grayscale hover:grayscale-0 ${
                      galleryImage === img ? "ring-2 ring-offset-2 ring-[#1C1C1C]" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ),
            )}
          </div>
        </motion.div>
        {/* Right Side: Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Inside the Property</h2>
            <p className="text-lg text-[#1C1C1C] leading-relaxed">{property.description}</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Key Features</h3>
            <ul className="space-y-4">
              {property.planFeatures?.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-lg text-[#1C1C1C]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle size={22} className="text-[#1C1C1C] mr-4" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={onContactClick}
              className="bg-[#1C1C1C] text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-80 transition-colors duration-300"
            >
              Request a Brochure
            </button>
            <button className="border border-[#1C1C1C] text-[#1C1C1C] px-8 py-3 rounded-lg font-bold hover:bg-[#1C1C1C] hover:text-white transition-colors duration-300">
              Get Price Details
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

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
        src={plan.image || "/placeholder.svg"}
        alt={plan.name}
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
      />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-[#1C1C1C] mb-4">
        {plan.area} • {plan.bedrooms}
      </p>
      <p className="text-2xl font-semibold text-[#1C1C1C]">{plan.price}</p>
    </div>
  </motion.div>
)

const AvailablePlansSection = ({ property }) => {
  if (!property.availablePlans || property.availablePlans.length === 0) {
    return null
  }
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1C1C1C]">Available Floor Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {property.availablePlans.map((plan, index) => (
            <FloorPlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactFormModal = ({ propertyName, propertyType, onClose }) => {
  // State to manage form inputs (optional, but good practice for controlled components)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.enquiryType) {
      // simple client-side alert (could be improved)
      alert('Please fill all fields')
      return
    }

    try {
      if (formData.enquiryType === 'price_details') {
        // Send pricing request to backend
        const resp = await fetch('https://real-estate-back-end-project-2.onrender.com/api/pricingRequest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            propertyType: propertyType || propertyName || '',
            fullName: formData.fullName,
            email: formData.email,
            phone: Number(String(formData.phone).replace(/\D/g, '')) || formData.phone,
          }),
        })
        if (!resp.ok) {
          const errText = await resp.text()
          throw new Error(`Server responded ${resp.status}: ${errText}`)
        }
        // success
        onClose()
        return
      }

      // Fallback: other enquiry types - keep current behaviour (log & close)
      console.log('Form submitted:', formData)
      onClose()
    } catch (err) {
      console.error('Error submitting pricing request:', err)
      alert('Failed to send request. Please try again later.')
    }
  }

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
     <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
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
         <label htmlFor="fullName" className="sr-only">Full Name</label>
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
         <label htmlFor="email" className="sr-only">Email</label>
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
         <label htmlFor="phone" className="sr-only">Phone</label>
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
         <label htmlFor="enquiryType" className="block text-white text-sm font-medium mb-1">
           Nature of Enquiry
         </label>
         <select
           id="enquiryType"
           value={formData.enquiryType}
           onChange={handleChange}
           className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-white text-white appearance-none pr-8"
           required
         >
           <option value="" disabled className="text-gray-400">Please select</option>
           <option value="site_visit" className="text-white">Schedule a Site Visit</option>
           <option value="price_details" className="text-white">Get Price Details</option>
           <option value="brochure_request" className="text-white">Request a Brochure</option>
           <option value="general_inquiry" className="text-white">General Inquiry</option>
         </select>
 
         {/* Custom Arrow */}
         <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center mt-8 text-white">
           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
  )
}

// --- Main Project Page Component ---
const ProjectDetails = () => {
  const { id, planId } = useParams()
  const navigate = useNavigate()

  // Sample floor plans data (from your original code)
  const floorPlans = [
    {
      id: 1,
      name: "2 BHK Premium",
      area: "1,200 sq ft",
      price: "₹85 Lakhs",
      bedrooms: 2,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      features: [
        "Spacious Living Room",
        "Modern Kitchen",
        "Master Bedroom with Attached Bath",
        "Balcony",
        "Parking Space",
      ],
    },
    {
      id: 2,
      name: "3 BHK Deluxe",
      area: "1,650 sq ft",
      price: "₹1.2 Crores",
      bedrooms: 3,
      bathrooms: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      features: [
        "Large Living & Dining Area",
        "Modular Kitchen",
        "3 Spacious Bedrooms",
        "3 Modern Bathrooms",
        "2 Balconies",
        "Reserved Parking",
      ],
    },
    {
      id: 3,
      name: "4 BHK Luxury",
      area: "2,200 sq ft",
      price: "₹1.8 Crores",
      bedrooms: 4,
      bathrooms: 4,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      features: [
        "Grand Living Room",
        "Premium Kitchen",
        "Master Suite with Walk-in Closet",
        "Guest Bedrooms",
        "Study Room",
        "Multiple Balconies",
        "2 Parking Spaces",
      ],
    },
  ]

  const project = gridData.find((p) => p.id === Number.parseInt(id))
  const selectedPlan = floorPlans.find((plan) => plan.id === Number.parseInt(planId)) || floorPlans[0]

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Scroll to top on new property load
    window.scrollTo(0, 0)
  }, [id, planId]) // Re-run effect if project or plan ID changes

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Project not found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1C1C1C] text-white px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  // Map your existing data to the structure expected by the new UI components
  const propertyForUI = {
    id: project.id,
    name: project.title,
    builder: "Premier Builders", // Placeholder, as not in your original gridData
    builderLogo: "/placeholder.svg?height=56&width=56", // Placeholder
    location: project.location,
    propertyType: project.type,
    areaRange: project.areaRange,
    status: project.status,
    image: selectedPlan.image, // Use selectedPlan's image for the main hero
    price: selectedPlan.price, // Use selectedPlan's price
    bedrooms: selectedPlan.bedrooms.toString(), // Ensure string format
    bathrooms: selectedPlan.bathrooms.toString(), // Ensure string format
    areaSqFt: selectedPlan.area.replace(" sq ft", ""), // Clean up area string
    description: project.description,
    planFeatures: selectedPlan.features, // Use selectedPlan's features
    availablePlans: floorPlans.map((plan) => ({
      // Map your floorPlans to the expected structure
      name: plan.name,
      area: plan.area,
      bedrooms: `${plan.bedrooms} BHK`,
      price: plan.price,
      image: plan.image,
    })),
  }

  const handleContactUsClick = () => {
    navigate("/contact"); // Navigate to the /contact route
  };

  return (
    <div className="bg-white font-sans">
      <HeroSection property={propertyForUI} onContactClick={() => setShowModal(true)} />
      <OverviewSection property={propertyForUI} onContactClick={() => setShowModal(true)} />
      <AvailablePlansSection property={propertyForUI} />
      {/* Final Call to Action Section */}
      <section className="bg-[#1C1C1C] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Interested in this Property?</h2>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8">
            Our team is ready to provide you with more information, schedule a site visit, or answer any questions you
            may have.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={handleContactUsClick} // Use the new handler here
              className="bg-white text-[#1C1C1C] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transform hover:scale-105 transition-transform duration-300"
            >
              Contact Us Now
            </button>
            <button
              onClick={() =>
                navigate(`/explore/${project.id}?img=${encodeURIComponent(propertyForUI.image)}`, {
                  state: { imageUrl: propertyForUI.image, title: propertyForUI.name },
                })
              }
              className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1C1C1C] transition-colors duration-300"
            >
              Explore Other Projects
            </button>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showModal && (
            <ContactFormModal
              propertyName={propertyForUI.name}
              propertyType={propertyForUI.propertyType}
              onClose={() => setShowModal(false)}
            />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectDetails