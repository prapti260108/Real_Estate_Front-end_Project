"use client"

import { useEffect, useState, useRef } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactFormModal from "../about/ContactFormModal "

// Correct API URL - Same as admin panel
const API_BASE_URL = "https://real-estate-back-end-project-2.onrender.com"

// FadeUp Component With Delay
const FadeUp = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })

    if (domRef.current) {
      observer.observe(domRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  )
}

// Media Item Component with Hover Effect
const MediaItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Fix image URL construction
  const getImageUrl = (item) => {
    if (!item.image) return "/placeholder.svg?height=200&width=300&text=Media+Image"
    
    // Handle different image path formats
    if (typeof item.image === "string") {
      if (item.image.startsWith("http")) {
        return item.image
      } else if (item.image.startsWith("/uploads/")) {
        return `${API_BASE_URL}${item.image}`
      } else {
        return `${API_BASE_URL}/uploads/${item.image}`
      }
    } else if (item.image.filename) {
      return `${API_BASE_URL}/uploads/${item.image.filename}`
    }
    
    return "/placeholder.svg?height=200&width=300&text=Media+Image"
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center h-40 border border-gray-200 bg-white">
        <img
          src={getImageUrl(item) || "/placeholder.svg"}
          alt={item.title || "Media Item"}
          className="max-h-12 object-contain transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=200&width=300&text=Media+Image"
          }}
        />
      </div>
      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-white bg-opacity-95 transition-all duration-300 ${
          isHovered ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center p-4 text-center">
          <h3 className="text-sm font-medium text-gray-800 mb-3 leading-tight">
            {item.title || "Media Title"}
          </h3>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            {item.description || "Media Description"}
          </p>
          <p className="text-xs text-gray-400 font-light">
            {item.subtitle || "Media Subtitle"}
          </p>
        </div>
      </div>
    </div>
  )
}

const ContactSection = ({ setShowModal }) => {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.3 }
    )

    if (btnRef.current) observer.observe(btnRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full bg-white py-20 px-4 md:px-12">
      <div
        className="max-w-7xl mx-auto flex flex-col items-start justify-center h-full relative z-20"
        data-aos="fade-up"
        data-aos-duration="900"
      >
        <h1 className="text-xl md:text-3xl font-normal text-black mb-6 mt-10">
          Let's talk about <br /> your project!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-lg mb-10">
          We are ready to share with you our design vision and lead
          you into the exciting world of creativity.
        </p>
        <div className="p-10">
          <button
            ref={btnRef}
            onClick={() => setShowModal(true)}
            className="relative px-24 py-4 text-sm font-normal uppercase tracking-wider text-black hover:bg-black hover:text-white hover:font-bold overflow-hidden"
          >
            <span
              className={`inline-block ${visible ? "animate-text" : "opacity-0"}`}
            >
              SEND REQUEST
            </span>
            <span
              className={`absolute left-0 top-0 h-[2px] bg-black ${visible ? "animate-top w-full" : "w-0"}`}
            ></span>
            <span
              className={`absolute right-0 top-0 w-[2px] bg-black ${visible ? "animate-right h-full" : "h-0"}`}
            ></span>
            <span
              className={`absolute right-0 bottom-0 h-[2px] bg-black ${visible ? "animate-bottom w-full" : "w-0"}`}
            ></span>
            <span
              className={`absolute left-0 bottom-0 w-[2px] bg-black ${visible ? "animate-left h-full" : "h-0"}`}
            ></span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Media() {
  const [mediaItems, setMediaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedCity] = useState("Ahmedabad")

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    })

    // Fetch media items from backend with correct URL
    const fetchMediaItems = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/media`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch media items: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Media API Response:", data)
        
        // Handle different response formats
        const mediaArray = Array.isArray(data) ? data : (data.data ? data.data : [])
        setMediaItems(mediaArray)
        setError(null)
      } catch (err) {
        console.error("Error fetching media items:", err)
        setError("Failed to load media items. Please try again later.")
        
        // Fallback data
        setMediaItems([
          {
            _id: "fallback-1",
            title: "Sample Media 1",
            description: "Sample description",
            subtitle: "Sample subtitle",
            image: "/placeholder.svg?height=200&width=300&text=Sample+Media"
          },
          {
            _id: "fallback-2", 
            title: "Sample Media 2",
            description: "Sample description",
            subtitle: "Sample subtitle",
            image: "/placeholder.svg?height=200&width=300&text=Sample+Media"
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMediaItems()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading media items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white">
      {/* Error message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1
            className="text-4xl font-bold mb-10 text-center md:text-left"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            Our Esteemed Builders
          </h1>
          
          {mediaItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No media items available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
              {mediaItems.map((item, index) => (
                <FadeUp key={item._id || index} delay={index * 100}>
                  <MediaItem item={item} />
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactSection setShowModal={setShowModal} />

      {showModal && (
        <ContactFormModal
          selectedCity={selectedCity}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
