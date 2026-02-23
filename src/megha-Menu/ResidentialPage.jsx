import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaDraftingCompass,
  FaCouch,
  FaCalculator,
  FaBalanceScale,
  FaComments,
  FaVideo,
  FaMapMarkedAlt,
  FaMapSigns,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const ResidentialPage = () => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    budgetRange: "",
    bedrooms: "",
    projectStatus: "",
    builder: "",
    searchTerm: "",
  });
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch residential projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/projects", {
          params: { projectCategory: "Residential" },
        });

        // Map backend data to frontend structure
        const mappedProjects = response.data.map((project) => {
          // Derive budget range from priceRange.min
          const priceInLakhs = project.priceRange.min / 100000;
          let budget;
          if (priceInLakhs <= 30) budget = "20-30 Lakh";
          else if (priceInLakhs <= 40) budget = "30-40 Lakh";
          else if (priceInLakhs <= 50) budget = "40-50 Lakh";
          else if (priceInLakhs <= 60) budget = "50-60 Lakh";
          else if (priceInLakhs <= 70) budget = "60-70 Lakh";
          else if (priceInLakhs <= 80) budget = "70-80 Lakh";
          else if (priceInLakhs <= 90) budget = "80-90 Lakh";
          else if (priceInLakhs <= 100) budget = "90 Lakh-1 Cr";
          else budget = "1 Cr+";

          // Derive bedrooms from propertyType
          const bedrooms = project.propertyType.includes("BHK")
            ? project.propertyType.split(" ")[0]
            : "4+"; // For Villas, Bungalows, etc.

          return {
            id: project._id,
            name: project.companyName,
            location: project.location,
            type: project.propertyType,
            status: "Available", // Static as backend doesn't provide this
            price: `₹${priceInLakhs} Lakh`,
            budget,
            bedrooms,
            projectStatus: project.status.charAt(0).toUpperCase() + project.status.slice(1).replace(/_/g, " "), // e.g., "under_construction" → "Under Construction"
            builder: project.companyName,
            image: project.imageUrl || "https://via.placeholder.com/800",
            builderLogo: "/placeholder.svg", // Backend doesn't provide builderLogo
            description: project.description || "No description available.",
            area: `${project.superArea.min}-${project.superArea.max} sq.ft`,
            amenities: [
              ...(project.amenities.parking ? ["Parking"] : []),
              ...(project.amenities.garden ? ["Garden"] : []),
              ...(project.amenities.swimmingPool ? ["Swimming Pool"] : []),
            ],
            rera: project.reraNo || "N/A",
            possession: project.possessionDate || "N/A",
          };
        });

        setProjects(mappedProjects);
        setFilteredProjects(mappedProjects);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch residential projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on user input
  useEffect(() => {
    let result = projects;

    if (filters.location) {
      result = result.filter((p) => p.location.toLowerCase() === filters.location.toLowerCase());
    }
    if (filters.propertyType) {
      result = result.filter((p) => p.type === filters.propertyType);
    }
    if (filters.budgetRange) {
      result = result.filter((p) => p.budget === filters.budgetRange);
    }
    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms === filters.bedrooms);
    }
    if (filters.projectStatus) {
      result = result.filter((p) => p.projectStatus.toLowerCase() === filters.projectStatus.toLowerCase());
    }
    if (filters.builder) {
      result = result.filter((p) => p.builder.toLowerCase() === filters.builder.toLowerCase());
    }
    if (filters.searchTerm) {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          p.builder.toLowerCase().includes(lowerCaseSearchTerm) ||
          p.location.toLowerCase().includes(lowerCaseSearchTerm) ||
          p.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredProjects(result);
  }, [filters, projects]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      budgetRange: "",
      bedrooms: "",
      projectStatus: "",
      builder: "",
      searchTerm: "",
    });
  };

  const scrollToProjects = () => {
    document.getElementById("projects-grid-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <p className="text-xl animate-pulse">Loading Residential Projects...</p>
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

  return (
    <div className="bg-white text-gray-900 min-h-screen relative">
      {/* HERO */}
      <section className="group relative h-[700px] md:h-[800px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Residential"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg text-white">
            Find Your Dream Home
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore residential projects with world-class amenities and flexible plans.
          </p>
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-black text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-black transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Explore Projects
          </button>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id="projects-grid-section" className="relative z-20 max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Residential Projects</h2>
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 text-xl font-medium">
            No residential projects found matching your criteria. Please adjust your filters.
          </p>
        )}
        {/* FILTER BAR */}
        <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by project name or builder..."
              className="flex-1 min-w-[250px] p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="">All Locations</option>
              {[...new Set(projects.map((p) => p.location))].sort().map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            >
              <option value="">Property Type</option>
              {[...new Set(projects.map((p) => p.type))].sort().map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.budgetRange}
              onChange={(e) => handleFilterChange("budgetRange", e.target.value)}
            >
              <option value="">Budget Range</option>
              {[...new Set(projects.map((p) => p.budget))].sort().map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            >
              <option value="">Bedrooms</option>
              {[...new Set(projects.map((p) => p.bedrooms))].sort().map((bedrooms) => (
                <option key={bedrooms} value={bedrooms}>
                  {bedrooms}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.projectStatus}
              onChange={(e) => handleFilterChange("projectStatus", e.target.value)}
            >
              <option value="">Project Status</option>
              {[...new Set(projects.map((p) => p.projectStatus))].sort().map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={filters.builder}
              onChange={(e) => handleFilterChange("builder", e.target.value)}
            >
              <option value="">All Builders</option>
              {[...new Set(projects.map((p) => p.builder))].sort().map((builder) => (
                <option key={builder} value={builder}>
                  {builder}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              <span className="font-bold">{filteredProjects.length}</span> properties found
            </p>
            <button
              onClick={handleClearFilters}
              className="text-indigo-600 hover:text-indigo-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <span className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full shadow-md bg-white text-black">
                  {proj.projectStatus}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1">{proj.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{proj.location}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-gray-400">Built by:</p>
                  <div className="h-6">
                    <img
                      src={proj.builderLogo}
                      alt="Builder Logo"
                      className="h-full object-contain"
                    />
                  </div>
                </div>
                <div className="mt-auto border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{proj.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{proj.area}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {proj.price} onwards
                  </p>
                </div>
                <Link
                  to={`/Residential/details/${proj.id}`}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4 block text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResidentialPage;