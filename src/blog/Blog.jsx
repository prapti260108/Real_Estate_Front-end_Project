"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Correct API base URL - Same as admin panel
const API_BASE_URL = "http://localhost:3000/api"

export default function Blog() {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0)
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch blog posts from backend
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/blog`)

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`)
        }

        const data = await response.json()
        console.log("Blog API Response:", data)

        // Handle different response formats
        const blogArray = Array.isArray(data) ? data : data.data ? data.data : []

        // Transform the data to match the expected format
        const transformedPosts = blogArray.map((post, index) => ({
          id: post._id || index + 1,
          title: post.title,
          image: post.image
            ? post.image.startsWith("http")
              ? post.image
              : `http://localhost:3000/uploads/${post.image}`
            : "https://via.placeholder.com/400x250?text=Blog+Image",
          description: post.description,
          link: "#",
        }))

        if (transformedPosts.length > 0) {
          setBlogPosts(transformedPosts)
          setError(null)
        } else {
          throw new Error("No blog posts found")
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError(`Failed to load blog posts: ${err.message}. Showing sample data instead.`)

        // Fallback to static data if API fails
        const fallbackPosts = [
          {
            id: 1,
            title: "Adani Realty: Redefining Urban Luxury in Ahmedabad",
            image:
              "https://www.adanirealty.com/-/media/project/realty/commercial/ahmedabad/inspire-corporate-capital/outdoor/copy-of-cam_01-1920x1080_.ashx",
            description:
              "Adani Realty is renowned for its iconic projects like Shantigram, the largest integrated township in Gujarat. With sprawling green spaces, world-class amenities, and contemporary architecture, Adani sets the benchmark for luxury living in Ahmedabad.",
            link: "#",
          },
          {
            id: 2,
            title: "Shivalik: Timeless Residences for Modern Families",
            image: "https://i.ytimg.com/vi/Hu0G9cOdLJY/maxresdefault.jpg",
            description:
              "Shivalik Group is known for its premium residential projects such as Shivalik Shilp and Shivalik Edge, which combine modern design with thoughtful amenities.",
            link: "#",
          },
          {
            id: 3,
            title: "Godrej Garden City: Green Living in the City",
            image:
              "https://oss-brigade.s3.ap-southeast-1.amazonaws.com/property/godrej-garden-city/banner__01e6de50-d969-4e68-a7c4-68ba8f10cd71.webp",
            description:
              "Godrej Garden City is a landmark township in Ahmedabad, offering over 40 acres of greenery and sustainable living.",
            link: "#",
          },
          {
            id: 4,
            title: "Pacifica Companies: International Standards, Local Expertise",
            image: "https://www.pacificarealestate.com/wp-content/uploads/2018/09/3_Agoura-2-1.jpg",
            description:
              "Pacifica Companies brings global expertise to Ahmedabad with projects like Reflections and Green Acres.",
            link: "#",
          },
          {
            id: 5,
            title: "Bakeri Group: Heritage Meets Modernity",
            image: "https://www.bakeri.com/wp-content/uploads/2022/04/1q-1024x576.jpg",
            description:
              "Bakeri Group, with a legacy of over 60 years, is celebrated for projects like Bakeri City and Serenity Pastures.",
            link: "#",
          },
          {
            id: 6,
            title: "Goyal & Co.: Crafting Iconic Skylines",
            image: "https://goyalco.com/wp-content/uploads/2020/10/our-legacy.jpg",
            description:
              "Goyal & Co. is behind some of Ahmedabad's most recognizable residential and commercial landmarks.",
            link: "#",
          },
          {
            id: 7,
            title: "Sun Builders: Sustainable Luxury Living",
            image:
              "https://vital-space-media.s3.ap-south-1.amazonaws.com/project_gallery/webthumb/projectGallery-194365-11-03-2024.webp",
            description:
              "Sun Builders is a pioneer in sustainable luxury, with projects like Sun South Winds and Sun Prima.",
            link: "#",
          },
          {
            id: 8,
            title: "Arvind SmartSpaces: Smart Homes for a Smart City",
            image: "https://www.arvindsmartspaces.com/wp-content/uploads/2023/09/04.jpg",
            description:
              "Arvind SmartSpaces leads the way in intelligent living with projects like Uplands and Arvind Citadel.",
            link: "#",
          },
        ]
        setBlogPosts(fallbackPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  // If no blog posts available
  if (blogPosts.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No blog posts available at the moment.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  const mainPost = blogPosts[selectedPostIndex]
  const recentPosts = blogPosts.filter((_, idx) => idx !== selectedPostIndex)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20">
      {/* Error message if API failed but fallback data is shown */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Page Heading */}
      <div className="w-full max-w-5xl mx-auto pt-12 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 text-left">Calm Real Estate Blog</h1>
        <p className="text-base md:text-lg text-gray-600 text-left max-w-2xl">
          Gentle insights, peaceful homes, and soft advice for buyers, sellers, and families seeking comfort in every
          corner.
        </p>
      </div>

      {/* Main Blog Section as Slider */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 px-4 py-10">
        {/* Left Column: Main Post */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300">
            <img
              src={mainPost.image || "/placeholder.svg"}
              alt={mainPost.title}
              className="w-full h-64 object-cover filter grayscale hover:grayscale-0 transition duration-300"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x250?text=Image+Not+Available"
              }}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-2">{mainPost.title}</h2>
              <p className="text-gray-700 text-base mb-4">{mainPost.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Posts as Thumbnails */}
        <div className="w-full md:w-80 flex flex-col gap-6 mt-8 md:mt-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h4 className="text-black font-bold mb-4 text-base tracking-wide">Recent Posts</h4>
            {recentPosts.map((post) => {
              const idx = blogPosts.findIndex((b) => b.id === post.id)
              return (
                <button
                  key={post.id}
                  onClick={() => setSelectedPostIndex(idx)}
                  className={`flex gap-3 items-center mb-4 last:mb-0 w-full text-left rounded transition-all duration-200 hover:bg-gray-50`}
                  style={{ outline: "none" }}
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className={`w-12 h-12 rounded object-cover filter grayscale transition duration-200`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/48x48?text=Image"
                    }}
                  />
                  <div>
                    <div className={`font-medium text-black text-sm mb-1`}>{post.title}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Blog Tips & Resources Section */}
      <div className="w-full border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Resources & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 mb-6">
                <svg
                  className="w-8 h-8 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6.379a9.003 9.003 0 01-9 0M12 3v1.5m0 0a9 9 0 00-9 9v.75c0 1.243.504 2.436 1.4 3.3A4.5 4.5 0 0012 21a4.5 4.5 0 007.6-3.45c.896-.864 1.4-2.057 1.4-3.3V13.5a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Investment Guide</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Expert insights on real estate investment strategies and market analysis for informed decision-making.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white border border-slate-200 shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 mb-6">
                <svg
                  className="w-8 h-8 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-1.5A9 9 0 1112 3v1.5m0 0a9 9 0 00-9 9v.75c0 1.243.504 2.436 1.4 3.3A4.5 4.5 0 0012 21a4.5 4.5 0 007.6-3.45c.896-.864 1.4-2.057 1.4-3.3V13.5a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Luxury Living</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Discover the latest trends in luxury real estate and premium lifestyle amenities.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white border border-slate-200  shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 mb-6">
                <svg
                  className="w-8 h-8 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Market Trends</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stay updated with the latest market trends and property insights in Ahmedabad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Section */}
      <div className="w-full bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Discover Premium Real Estate</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Experience luxury living with Ahmedabad's most prestigious properties and exclusive developments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
