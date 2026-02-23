"use client";

import { useState, useEffect } from "react";

const GetBrochure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "", // Changed to match backend
    emailId: "",  // Changed to match backend
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/projects", {
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
          .map((project) => {
            if (!project._id) {
              console.warn("Project missing _id:", project);
              return null;
            }
            return {
              id: project._id,
              name: project.companyName || "Untitled Project",
              projectType: project.propertyType || "Unknown Type",
              location: project.location || "Unknown Location",
              image: project.imageUrl || "https://via.placeholder.com/400x300",
              brochureUrl: project.brochureUrl || null,
            };
          })
          .filter((project) => project !== null);
        setProjects(mappedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(`Failed to load projects: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setFormData({ name: "", mobileNo: "", emailId: "" });
    setIsSubmitting(false);
  };

  const handleMouseEnter = (project) => setHoveredProject(project);
  const handleMouseLeave = () => setHoveredProject(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectDownload = (project, event) => {
    event.stopPropagation();
    if (project.brochureUrl) {
      const link = document.createElement("a");
      link.href = project.brochureUrl;
      link.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}-brochure.pdf`;
      link.click();
    } else {
      // Fallback to generating a text-based brochure
      const brochureContent = `Project Brochure for: ${project.name}\nType: ${project.projectType}\nLocation: ${project.location}`;
      const blob = new Blob([brochureContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}-brochure.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.mobileNo && formData.emailId) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: formData.name,
          mobileNo: formData.mobileNo,
          emailId: formData.emailId,
          projectId: selectedProject.id,
          projectType: selectedProject.projectType, // Added to match backend requirement
        };
        console.log("Submitting form with payload:", payload);
        const response = await fetch("https://real-estate-1-t7m0.onrender.com/api/brochure_requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error text:", errorText);
          if (response.status === 404) {
            console.warn("Brochure request endpoint not found, falling back to direct download.");
            alert("Brochure request service is unavailable. Downloading brochure directly...");
            handleDirectDownload(selectedProject, e);
            closeModal();
            return;
          }
          throw new Error(`Failed to submit consultation: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Response data:", result);
        alert(`Brochure request for ${selectedProject.name} submitted successfully!`);
        closeModal();
      } catch (err) {
        console.error("Error submitting consultation:", err);
        alert(`Failed to submit: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill all required fields");
      setIsSubmitting(false);
    }
  };

  // Effect to handle Escape key press for closing modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Loading projects...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1C1C1C]">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 relative">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-light text-black mb-2">
          Get Brochure
          <sup className="text-lg font-normal">({projects.length})</sup>
        </h1>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-8 mb-8 pb-4 border-b border-gray-300">
        <div className="text-gray-500 text-sm font-medium tracking-wider">NAME</div>
        <div className="text-gray-500 text-sm font-medium tracking-wider">PROJECT TYPE</div>
        <div className="text-gray-500 text-sm font-medium tracking-wider">LOCATION</div>
        <div className="text-gray-500 text-sm font-medium tracking-wider text-right pr-2">DOWNLOAD</div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-4 gap-8 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openModal(project)}
          >
            {/* Project Name with Image */}
            <div className="flex items-center space-x-4">
              {hoveredProject && hoveredProject.id === project.id && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-16 h-12 object-cover rounded transition-all duration-300 ease-in-out"
                  style={{ animation: "slideIn 0.3s ease-out" }}
                />
              )}
              <span className="text-lg font-medium text-black">{project.name}</span>
            </div>

            {/* Project Type */}
            <div className="flex items-center">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                {project.projectType}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <span className="text-gray-600 text-sm font-medium">{project.location}</span>
            </div>

            {/* Download Button */}
            <div className="flex items-center justify-end">
              <button
                className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={(e) => handleDirectDownload(project, e)}
                title={`Download Brochure for ${project.name}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-[#1C1C1C] text-white rounded-lg shadow-2xl p-8 max-w-md w-full m-4 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Brochure for {selectedProject?.name}</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Fill the details to receive the brochure on WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">Mobile No *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
                  placeholder="Enter your WhatsApp number"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email ID *</label>
                <input
                  type="email"
                  id="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full bg-[#2a2a2a] border-gray-600 rounded-md px-3 py-2 focus:ring-1 focus:ring-white focus:outline-none transition"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black font-bold py-2.5 px-4 mt-2 rounded-md hover:bg-gray-200 transition-colors duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Submitting..." : "Receive Brochure"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GetBrochure;