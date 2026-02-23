"use client"

import { useState, useRef, useEffect } from "react"
import { Home, Building2, Layout, Calculator, FileText, MessageCircle, PlaySquare, MapPin, Map } from "lucide-react"
import ContactFormModal from "./ContactFormModal "
import AOS from "aos"
import "aos/dist/aos.css"
import resolveImage from "../lib/resolveImage"

const API_BASE_URL = "http://localhost:3000/api"

const About = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedCity] = useState("Ahmedabad")

  const [teamMembers, setTeamMembers] = useState([])
  const [sliderImages, setSliderImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const teamResponse = await fetch(`${API_BASE_URL}/team`)
        let teamData = []

        if (teamResponse.ok) {
          const rawTeamData = await teamResponse.json()
          console.log("Team API Response:", rawTeamData)

          // Handle different response formats
          const teamArray = rawTeamData.data ? rawTeamData.data : Array.isArray(rawTeamData) ? rawTeamData : []

          // Helper to produce a usable image URL from backend values
          const makeImgUrl = (img) => {
            if (!img) return null
            if (typeof img !== "string") return null
            if (img.startsWith("http://") || img.startsWith("https://")) return img
            // If already contains uploads path, keep it; otherwise assume filename stored and prefix uploads
            if (img.includes("uploads") || img.startsWith("/")) return `http://localhost:3000/${img.replace(/^\//, "")}`
            return `http://localhost:3000/uploads/${img}`
          }

          // Transform team data to match expected format
          teamData = teamArray.map((member, index) => ({
            name: member.title || `Team Member ${index + 1}`,
            role: index < 2 ? "Co-founders" : "Managing Partners",
            img: makeImgUrl(member.image) || `https://via.placeholder.com/180x220?text=Team+Member+${index + 1}`,
          }))
        }

        // Fetch slider images
        const sliderResponse = await fetch(`${API_BASE_URL}/slider`)
        let sliderData = []

        if (sliderResponse.ok) {
          const rawSliderData = await sliderResponse.json()
          console.log("Slider API Response:", rawSliderData)

          // Handle different response formats
          const sliderArray = rawSliderData.data
            ? rawSliderData.data
            : Array.isArray(rawSliderData)
              ? rawSliderData
              : []

          // Transform slider data to match expected format
          sliderData = sliderArray.map((slider) => {
            if (slider.image) {
              return slider.image.startsWith("http") ? slider.image : makeImgUrl(slider.image)
            }
            return "https://via.placeholder.com/1400x700?text=Slider+Image"
          })
        }

        // Set data or fallback
        if (teamData.length > 0) {
          setTeamMembers(teamData)
        } else {
          // Fallback team data
          setTeamMembers([
            {
              name: "John Smith",
              role: "Co-founders",
              img: "https://yodezeen.com/wp-content/uploads/2017/11/3-1-773x1024.jpg",
            },
            {
              name: "David Johnson",
              role: "Co-founders",
              img: "https://yodezeen.com/wp-content/uploads/2017/11/UN4B3849-copy-683x1024.jpg",
            },
            {
              name: "Emily Davis",
              role: "Managing Partners",
              img: "https://yodezeen.com/wp-content/uploads/2017/11/DSC01174-copy-684x1024.jpg",
            },
            {
              name: "Sophia Lee",
              role: "Managing Partners",
              img: "https://yodezeen.com/wp-content/uploads/2019/06/3-1.jpg",
            },
          ])
        }

        if (sliderData.length > 0) {
          setSliderImages(sliderData)
        } else {
          // Fallback slider data
          setSliderImages([
            "https://yodezeen.com/wp-content/uploads/2017/11/1-1-2880x1924.jpg",
            "https://yodezeen.com/wp-content/uploads/2017/11/2-2880x1924.jpg",
            "https://yodezeen.com/wp-content/uploads/2017/11/3-2880x1924.jpg",
          ])
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load some data. Showing sample content.")

        // Set fallback data
        setTeamMembers([
          {
            name: "John Smith",
            role: "Co-founders",
            img: "https://yodezeen.com/wp-content/uploads/2017/11/3-1-773x1024.jpg",
          },
          {
            name: "David Johnson",
            role: "Co-founders",
            img: "https://yodezeen.com/wp-content/uploads/2017/11/UN4B3849-copy-683x1024.jpg",
          },
          {
            name: "Emily Davis",
            role: "Managing Partners",
            img: "https://yodezeen.com/wp-content/uploads/2017/11/DSC01174-copy-684x1024.jpg",
          },
          {
            name: "Sophia Lee",
            role: "Managing Partners",
            img: "https://yodezeen.com/wp-content/uploads/2019/06/3-1.jpg",
          },
        ])

        setSliderImages([
          "https://yodezeen.com/wp-content/uploads/2017/11/1-1-2880x1924.jpg",
          "https://yodezeen.com/wp-content/uploads/2017/11/2-2880x1924.jpg",
          "https://yodezeen.com/wp-content/uploads/2017/11/3-2880x1924.jpg",
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Rest of your component code remains the same...
  const awards = [
    {
      year: "2023",
      left: {
        title: "Omniyat Sales Pavilion",
        subtitle: "Winner CGI & Visualization Middle East",
      },
      right: {
        title: "SBID International Design Awards",
        subtitle: "",
        logo: "https://yodezeen.com/wp-content/uploads/2024/05/%D0%91%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B8-2.png",
      },
    },
    // ... rest of awards data
  ]

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const totalSlides = sliderImages.length

  const goToPrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const getDisplaySlideNumber = (index) => {
    return (index + 1).toString().padStart(2, "0")
  }

  const getDisplayTotalSlides = (total) => {
    return total.toString().padStart(2, "0")
  }

  const features = [
    {
      icon: <Home className="w-8 h-8 text-black" />,
      title: "Real Estate",
      subtitle: "Residential & Commercial",
      desc: "We offer a wide range of real estate services covering residential and commercial properties with expert guidance.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-black" />,
      title: "Architecture",
      subtitle: "",
      desc: "Innovative architecture solutions designed to meet both aesthetic and functional needs.",
    },
    {
      icon: <Layout className="w-8 h-8 text-black" />,
      title: "Interior",
      subtitle: "",
      desc: "Transform your space with bespoke interior design that reflects your style and purpose.",
    },
    {
      icon: <Calculator className="w-8 h-8 text-black" />,
      title: "Loan Assistant",
      subtitle: "& EMI Calculator",
      desc: "Integrated loan assistance and EMI calculator to help you plan your investment easily.",
    },
    {
      icon: <FileText className="w-8 h-8 text-black" />,
      title: "Legal Services",
      subtitle: "Property Registration & Agreements",
      desc: "Comprehensive legal services including property registration and agreements under one roof.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-black" />,
      title: "Live Chat",
      subtitle: "",
      desc: "Instant support through live chat to resolve your queries and guide you anytime.",
    },
    {
      icon: <PlaySquare className="w-8 h-8 text-black" />,
      title: "Video Walkthrough",
      subtitle: "",
      desc: "Get a virtual tour of properties through detailed video walkthroughs for better decision making.",
    },
    {
      icon: <Map className="w-8 h-8 text-black" />,
      title: "Map View",
      subtitle: "",
      desc: "Interactive map view to explore properties by location and surroundings.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-black" />,
      title: "Location Based Listing",
      subtitle: "",
      desc: "Smart location-based property listings for quick and relevant results.",
    },
  ]

  const [visibleCount, setVisibleCount] = useState(4)
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, awards.length))
  }

  const [visible, setVisible] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    // Initialize AOS here
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.3 },
    )

    if (btnRef.current) observer.observe(btnRef.current)
    return () => observer.disconnect()
  }, [])

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Error message if API failed but fallback data is shown */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* ======= Section 1 – About ======= */}
      <section className="relative w-full bg-white py-20 px-6 md:px-20">
        {/* Big background text */}
        <h1
          className="absolute inset-0 flex justify-center items-center pointer-events-none select-none font-normal text-[25vw] md:text-[20vw] text-gray-100 tracking-widest leading-none opacity-70"
          data-aos="fade"
          data-aos-delay="50"
          data-aos-duration="1500"
        >
          ABOUT
        </h1>

        {/* Two-column layout */}
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 ml-14 leading-[3.5rem]">
              Company <br />
              <span className="mt-4 inline-block">Philosophy</span>
            </h2>
            <p className="text-gray-600 text-lg leading-10 md:mt-[7.5rem]">
              YODEZEEN's philosophy is a testament to our belief in the transformative power of design. We view each
              project as an opportunity to create not just spaces, but experiences that enrich lives and inspire
              emotions. Grounded in a deep understanding of human behavior and environmental context, our approach seeks
              harmony between form, function, and emotion. YODEZEEN values the art of storytelling through design,
              crafting narratives that resonate with the essence of each space and its inhabitants.
            </p>
          </div>

          {/* Right content */}
          <div data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">
            <p className="text-gray-600 text-lg leading-10 mt-8 md:mt-[13.5rem]">
              YODEZEEN's design philosophy revolves around the concept of pushing boundaries and redefining norms. We
              believe in fearlessly exploring new ideas and pushing the limits of creativity to create spaces that
              inspire awe and admiration. With a relentless pursuit of perfection and a commitment to excellence,
              YODEZEEN strives to exceed expectations with our every project.
            </p>
          </div>
        </div>
      </section>

      {/* ======= Section 2 – Slider Section ======= */}
      <section className="w-full py-16 mt-20 px-6">
        <div
          className="relative max-w-[1400px] mx-auto overflow-hidden mb-8 shadow-xl"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          {sliderImages.length > 0 ? (
            <img
              src={sliderImages[currentSlideIndex] || "/placeholder.svg"}
              alt={`Slide ${currentSlideIndex + 1}`}
              className="w-full h-[700px] object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1400x700?text=Image+Not+Available"
              }}
            />
          ) : (
            <div className="w-full h-[700px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No slider images available</p>
            </div>
          )}
        </div>

        {sliderImages.length > 0 && (
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 text-gray-700 text-sm font-light uppercase tracking-wide">
            <button
              onClick={goToPrev}
              className="group flex items-center space-x-3 focus:outline-none transition-colors p-2 -ml-2 rounded"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <span className="block w-12 h-px bg-gray-500 transition-colors duration-300 group-hover:bg-black"></span>
              <span className="text-gray-500 text-sm font-medium transition-colors duration-300 group-hover:text-black">
                Previous
              </span>
            </button>

            <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="200">
              <span className="text-gray-800 text-xl">{getDisplaySlideNumber(currentSlideIndex)}</span>
              <span className="block w-8 h-px bg-gray-400"></span>
              <span className="text-gray-800 text-xl">{getDisplayTotalSlides(totalSlides)}</span>
            </div>

            <button
              onClick={goToNext}
              className="group flex items-center space-x-3 focus:outline-none transition-colors p-2 -mr-2 rounded"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <span className="text-gray-500 text-sm font-medium transition-colors duration-300 group-hover:text-black">
                Next
              </span>
              <span className="block w-12 h-px bg-gray-500 transition-colors duration-300 group-hover:bg-black"></span>
            </button>
          </div>
        )}
      </section>

      {/* ======= Section 3 – Our Strengths ======= */}
      <section className="relative w-full bg-[#fafafa] py-16 px-4 md:px-12">
        {/* Top faint background numbers */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none">
          <div className="max-w-6xl mx-auto w-full flex justify-between items-start mt-8">
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              7
            </span>
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="150"
              data-aos-duration="1000"
            >
              2401000
            </span>
          </div>
        </div>

        {/* Middle faint background numbers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="250"
              data-aos-duration="1000"
            >
              45
            </span>
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="350"
              data-aos-duration="1000"
            >
              8800
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-6xl mx-auto text-left relative z-10" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Our Strengths</h2>
          <p className="mt-4 text-gray-500 max-w-xl leading-relaxed">
            A powerful combination of services to help you with every aspect of property buying, selling and design.
          </p>
        </div>

        {/* Bottom faint background numbers */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none">
          <div className="max-w-6xl mx-auto w-full flex justify-between items-end">
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="450"
              data-aos-duration="1000"
            >
              9
            </span>
            <span
              className="text-[15vw] lg:text-[10rem] font-normal text-gray-200 opacity-40"
              data-aos="fade"
              data-aos-delay="550"
              data-aos-duration="1000"
            >
              2025
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div className="relative z-10 mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-16 text-left">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-start p-6 rounded-lg transition-colors duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={100 * idx}
              data-aos-duration="800"
            >
              <div className="flex items-center space-x-3 mb-4">
                {item.icon}
                <h3 className="text-lg font-bold text-black transition-colors duration-300 group-hover:text-gray-500">
                  {item.title}
                  {item.subtitle && (
                    <>
                      <br />
                      <span className="font-semibold transition-colors duration-300 group-hover:text-gray-500">
                        {item.subtitle}
                      </span>
                    </>
                  )}
                </h3>
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= Section 4 – TEAM ======= */}
      <section className="relative w-full bg-[#1a1a1a] pt-16 pb-24 px-4 md:px-12">
        {/* Center line */}
        <div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gray-700"
          data-aos="fade-down"
          data-aos-duration="800"
        ></div>

        {/* Background TEAM text */}
        <div className="relative z-0 max-w-7xl mx-auto flex justify-center items-center h-32 md:h-48 mt-12 md:mt-16">
          <h1
            className="absolute w-full text-center text-[15vw] md:text-[10vw] text-gray-800 leading-none opacity-20 font-bold tracking-[3vw] whitespace-nowrap"
            data-aos="zoom-out"
            data-aos-duration="1000"
            data-aos-delay="50"
          >
            T E A M
          </h1>
        </div>

        {/* Images + labels - all aligned left with no gaps */}
        <div className="relative z-10 max-w-7xl mx-auto mt-20 flex items-center justify-start overflow-hidden">
          {teamMembers.length > 0 ? (
            <>
              {/* Co-founders Label Box */}
              <div
                className="w-[180px] h-[220px] bg-[#2c2c2c] flex items-center justify-center text-white text-sm md:text-base font-semibold text-center"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="800"
              >
                Co-founders
              </div>

              {/* Co-founder Images */}
              {teamMembers.slice(0, 2).map((member, index) => (
                <div
                  key={index}
                  className="relative w-[180px] h-[220px] overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                  data-aos-duration="800"
                >
                  <img
                    src={member.img || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/180x220?text=Team+Member"
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.name}
                  </div>
                </div>
              ))}

              {/* Managing Partners Label Box */}
              <div
                className="w-[180px] h-[220px] bg-[#2c2c2c] flex items-center justify-center text-white text-sm md:text-base font-semibold text-center"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="800" qsff4d
              >
                Managing Partners
              </div>

              {/* Managing Partner Images */}
              {teamMembers.slice(2, 4).map((member, index) => (
                <div
                  key={index + 2}
                  className="relative w-[180px] h-[220px] overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                  data-aos-duration="800"
                >
                  <img
                    src={member.img || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/180x220?text=Team+Member"
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.name}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-gray-400 text-lg">No team members available</p>
            </div>
          )} 
        </div>
      </section>

      {/* ======= Section 5 – AWARDS ======= */}
      <section className="relative w-full bg-white pt-24 pb-32 px-4 md:px-12">
        {/* Vertical Line */}
        <div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[2px] h-24 bg-gray-700"
          data-aos="fade-down"
          data-aos-duration="800"
        ></div>

        {/* Big background AWARDS text */}
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none z-0 pt-16">
          <h1
            className="w-[90%] text-center text-[20vw] md:text-[14vw] lg:text-[12vw] font-light text-gray-300 opacity-5 tracking-[4vw] select-none whitespace-nowrap"
            data-aos="zoom-out"
            data-aos-duration="1000"
            data-aos-delay="50"
          >
            A W A R D S
          </h1>
        </div>

        {/* Foreground Text */}
        <div
          className="relative z-10 mt-48 mb-24 pr-4 md:pr-14 flex justify-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="w-full md:w-1/2 text-right md:mr-8">
            <h2 className="text-2xl md:text-4xl font-semibold text-black mb-4">Our awards</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              How can there be no awards, when such a creative team
              <br />
              oversees the market?
            </p>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Full-height vertical center line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-300 z-0" />

          {/* Timeline entries */}
          <div className="relative z-10 space-y-20">
            {awards.slice(0, visibleCount).map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between relative"
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={100 * i}
                data-aos-duration="800"
              >
                {/* Left Side */}
                <div className="w-[45%] text-right pr-8">
                  {item.left && (
                    <div className="inline-block max-w-xs ml-auto">
                      {item.left.logo && (
                        <img
                          src={item.left.logo || "/placeholder.svg"}
                          alt="logo"
                          className="w-12 h-auto mb-2 mx-auto md:ml-auto md:mr-0"
                        />
                      )}
                      <h3 className="font-semibold text-sm md:text-base">{item.left.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm">{item.left.subtitle}</p>
                    </div>
                  )}
                </div>

                {/* Dot (on center line) */}
                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-400 hover:border-black transition duration-200" />
                </div>

                {/* Right Side */}
                <div className="w-[45%] text-left pl-8">
                  {item.right && (
                    <div className="inline-block max-w-xs">
                      {item.right.logo && (
                        <img
                          src={item.right.logo || "/placeholder.svg"}
                          alt="logo"
                          className="w-12 h-auto mb-2 mx-auto md:mr-auto"
                        />
                      )}
                      <h3 className="font-semibold text-sm md:text-base">{item.right.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm">{item.right.subtitle}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load more button */}
        {visibleCount < awards.length && (
          <div className="relative mt-24 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-transparent text-black text-sm font-semibold uppercase tracking-wide transition-none hover:bg-transparent hover:text-black cursor-pointer"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="800"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* ======= Section 6 – Let's Talk About Your Project! ======= */}
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
            We are ready to share with you our design vision and lead you into the exciting world of creativity.
          </p>
          <div className="p-10">
            <button
              ref={btnRef}
              onClick={() => setShowModal(true)}
              className="relative px-24 py-4 text-sm font-normal uppercase tracking-wider text-black hover:bg-black hover:text-white hover:font-bold overflow-hidden"
            >
              <span className={`inline-block ${visible ? "animate-text" : "opacity-0"}`}>SEND REQUEST</span>
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

      {/* MODAL */}
      {showModal && <ContactFormModal selectedCity={selectedCity} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default About
