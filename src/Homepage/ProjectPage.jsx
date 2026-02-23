"use client";

// 1. IMPORTS
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GetBrochure from "./GetBrochure";
import resolveImage from "../lib/resolveImage";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(true);
  const [featuredVisible, setFeaturedVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);
  const [project, setProject] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://real-estate-back-end-project-2.onrender.com/api/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Raw API response (projects):", data);
        // Ensure data is an array
        const projectsArray = Array.isArray(data) ? data : [data];
        // Map backend fields to frontend expectations
        const mappedProjects = projectsArray
          .map(project => {
            if (!project._id) {
              console.warn("Project missing _id:", project);
              return null;
            }
            return {
              id: project._id,
              title: project.companyName || "Untitled Project",
              subtitle: project.description || "No description available",
              type: project.propertyType || "Unknown Type",
              status: project.status || "unknown",
              location: project.location || "Unknown Location",
              imageUrl: resolveImage(project.imageUrl),
              alt: `Image of ${project.companyName || "project"}`,
              description: project.details?.overview || "No overview available",
            };
          })
          .filter(project => project !== null);

        // Find the project by id
        const selectedProject = mappedProjects.find(p => p.id === id);
        setProject(selectedProject);
        // Set featured projects (exclude the current project, take up to 3)
        const featured = mappedProjects.filter(p => p.id !== id).slice(0, 3);
        setFeaturedProjects(featured);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(`Failed to load projects: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProjects();
    setHeroVisible(true);

    const observeSection = (sectionId, setVisible) => {
      const section = document.getElementById(sectionId);
      if (!section) return () => {};
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => {
        observer.unobserve(section);
      };
    };

    const cleanups = [
      observeSection("about-section", setAboutVisible),
      observeSection("featured-section", setFeaturedVisible),
      observeSection("contact-section", setContactVisible),
    ];

    return () => cleanups.forEach(cleanup => cleanup());
  }, [id]);

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case "under construction":
        return "bg-yellow-500";
      case "launching soon":
        return "bg-blue-500";
      case "pre-launch":
        return "bg-purple-500";
      case "new":
        return "bg-green-500";
      case "Resale":
        return "bg-gray-500";
      default:
        return "bg-white";
    }
  };

  const specialStatuses = ["under construction", "launching soon", "pre-launch"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Loading project...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1C1C1C]">{error}</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1C1C1C] text-white px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
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
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white font-sans">
        {/* Hero Section */}
        <section
          id="hero-section"
          className="relative h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 flex flex-col justify-end items-start h-full max-w-6xl mx-auto px-8 md:px-16 pb-24">
            <div
              className={`mb-4 transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-black/60 text-white">
                ⭐ 15+ Years of Excellence
              </span>
            </div>
            <h1
              className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {project.title}
            </h1>
            <p
              className={`text-xl md:text-2xl text-white mb-8 transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {project.subtitle}
            </p>
            <p
              className={`text-lg text-gray-200 mb-12 max-w-2xl transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {project.description}
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <button
                className="bg-transparent text-white border border-white px-8 py-3 font-medium rounded transition-colors duration-300 hover:bg-white hover:text-black"
                onClick={() =>
                  navigate(`/explore/${encodeURIComponent(project.title)}?img=${encodeURIComponent(project.imageUrl)}`, {
                    state: { imageUrl: project.imageUrl, title: project.title },
                  })
                }
              >
                EXPLORE PROJECTS →
              </button>
            </div>
            <div
              className={`flex space-x-12 text-white transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div>
                <div className="text-3xl font-bold">45+</div>
                <div className="text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm">Ongoing</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-black">
            <div>
              <h2
                className={`text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-6 transition-all duration-1000 ${
                  aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Building Dreams Since 2010
                {project.overview}
              </h2>
              <p
                className={`text-gray-600 text-lg mb-8 leading-relaxed transition-all duration-1000 ${
                  aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {project.description}
              </p>
            </div>
            <div
              className={`relative transition-all duration-1000 ${
                aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <img
                src={project.imageUrl}
                alt={project.alt}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="featured-section" className="py-20 bg-[#1C1C1C]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
                  featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Featured Projects
              </h2>
              <p
                className={`text-gray-300 text-lg max-w-3xl mx-auto transition-all duration-1000 ${
                  featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Explore our trending projects, from pre-launch opportunities to
                residences currently under construction that are shaping the
                future of luxury living.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((p, index) => {
                const isSpecial = specialStatuses.includes(p.status);
                return (
                  <div
                    key={p.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer group shadow-lg transition-all duration-1000 ${
                      featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                    onClick={() => navigate(`/project/${p.id}`)}
                  >
                    <div className="relative h-96 bg-black">
                      <img
                        src={p.imageUrl}
                        alt={p.alt}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          isSpecial ? "filter grayscale group-hover:grayscale-0" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(p.status)} text-black`}
                      >
                        {p.status}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-2xl font-bold mb-2">{p.title.toUpperCase()}</h3>
                        <div className="flex items-center mb-2">
                          <span className="text-sm">🏠 {p.type}</span>
                        </div>
                        <div className="flex items-center mb-4">
                          <span className="text-sm">📍 {p.location}</span>
                        </div>
                        <button
                          className="w-full bg-transparent text-white border border-white py-2 rounded font-medium transition-colors duration-300 hover:bg-white hover:text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/project/${p.id}/details/1`);
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <button
                className={`bg-transparent text-white border border-white px-8 py-3 font-medium rounded hover:bg-white hover:text-black transition-colors duration-200 ${
                  featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "1000ms" }}
                onClick={() =>
                  navigate(`/explore/${encodeURIComponent(project.title)}?img=${encodeURIComponent(project.imageUrl)}`, {
                    state: { imageUrl: project.imageUrl, title: project.title },
                  })
                }
              >
                VIEW ALL PROJECTS
              </button>
            </div>
          </div>
        </section>

        <GetBrochure />

        {/* Contact Section */}
        <section id="contact-section" className="py-20 bg-[#1C1C1C]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
                contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Ready to Build Your Dream?
            </h2>
            <p
              className={`text-gray-300 text-lg mb-12 max-w-3xl mx-auto transition-all duration-1000 ${
                contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Join thousands of satisfied customers who trusted us with their
              most important investment. Let's create something extraordinary
              together.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${
                contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <button
                className="bg-transparent text-white border border-white px-8 py-3 text-sm uppercase tracking-widest font-light hover:bg-white hover:text-black transition-all duration-300 rounded"
                onClick={() => setIsFormOpen(true)}
              >
                ✉️ Get Free Consultation
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        projectName={project.title}
      />
    </>
  );
};

// 2. CONSULTATION FORM COMPONENT (Modal)
const ConsultationForm = ({ isOpen, onClose, projectName }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: projectName,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("https://real-estate-back-end-project-2.onrender.com/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to submit consultation: ${response.status} ${response.statusText}`);
      }
      alert(`Thank you, ${formData.name}! Your request for ${formData.project} has been sent.`);
      setFormData({ name: "", email: "", phone: "", project: projectName, message: "" });
      onClose();
    } catch (err) {
      console.error("Error submitting consultation:", err);
      setSubmitError(`Failed to submit: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1C1C] text-white rounded-lg shadow-2xl p-8 max-w-md w-full m-4 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center">
          Get a Free Consultation
        </h2>
        <p className="text-gray-400 mb-6 text-center text-sm">
          Interested in "{projectName}"? Let's talk.
        </p>
        {submitError && (
          <p className="text-red-500 text-center mb-4">{submitError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
              placeholder="+91 12345 67890"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-white text-black font-bold py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectPage;