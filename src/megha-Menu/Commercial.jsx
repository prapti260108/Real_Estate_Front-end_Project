"use client";
import React, { useState, useEffect, useMemo } from "react";
import resolveImage from "../lib/resolveImage";
import {
  MapPin,
  Building2,
  SquareArrowOutUpRight,
  ArrowUpRight,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Commercial = () => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    budget: "",
    status: "",
    builder: "",
    searchTerm: "",
  });
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch commercial projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://real-estate-back-end-project-2.onrender.com/api/projects", {
          params: { projectCategory: "Commercial" },
        });
        console.log("Commercial API Response:", response.data); // Debug log

        // Map backend data to frontend structure
        const mappedProjects = response.data.map((project) => {
          // Derive budget range from priceRange.min
          const priceInLakhs = project.priceRange.min / 100000;
          let budget;
          if (priceInLakhs <= 75) budget = "50-75";
          else if (priceInLakhs <= 100) budget = "75-100";
          else budget = "100+";

            return {
            id: project._id,
            name: project.companyName,
            location: project.location,
            type: project.propertyType,
            status: "Available", // Static as backend doesn't provide this
            price: `₹${priceInLakhs}L-${project.priceRange.max / 100000}L`,
            budget,
            projectStatus: project.status.charAt(0).toUpperCase() + project.status.slice(1).replace(/_/g, " "), // e.g., "under_construction" → "Under Construction"
            builder: project.companyName,
            image: resolveImage(project.imageUrl),
            builderLogo: "/placeholder.svg", // Backend doesn't provide builderLogo
            description: project.description || "No description available.",
            area: `${project.superArea.min}-${project.superArea.max} sq.ft`,
            amenities: [
              ...(project.amenities.parking ? ["Parking"] : []),
              ...(project.amenities.garden ? ["Garden"] : []),
              ...(project.amenities.swimmingPool ? ["Swimming Pool"] : []),
              ...(project.amenities.security ? ["Security"] : []),
              ...(project.amenities.lift ? ["Lift"] : []),
            ].length > 0 ? [
              ...(project.amenities.parking ? ["Parking"] : []),
              ...(project.amenities.garden ? ["Garden"] : []),
              ...(project.amenities.swimmingPool ? ["Swimming Pool"] : []),
              ...(project.amenities.security ? ["Security"] : []),
              ...(project.amenities.lift ? ["Lift"] : []),
            ] : ["Modern Infrastructure", "High-Speed Connectivity"], // Fallback for commercial
          };
        });

        setProjects(mappedProjects);
        setFilteredProjects(mappedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response?.status, err.message); // Debug log
        setError("Failed to fetch commercial projects. Please try again later.");
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
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType.toLowerCase());
    }
    if (filters.budget) {
      result = result.filter((p) => p.budget === filters.budget);
    }
    if (filters.status) {
      result = result.filter((p) => p.projectStatus.toLowerCase() === filters.status.toLowerCase());
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      budget: "",
      status: "",
      builder: "",
      searchTerm: "",
    });
  };

  // Memoize unique filter options
  const uniqueLocations = useMemo(() => {
    return [...new Set(projects.map((p) => p.location))].sort();
  }, [projects]);

  const uniquePropertyTypes = useMemo(() => {
    return [...new Set(projects.map((p) => p.type))].sort();
  }, [projects]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(projects.map((p) => p.projectStatus))].sort();
  }, [projects]);

  const availableBuilders = useMemo(() => {
    return [...new Set(projects.map((p) => p.builder))].sort();
  }, [projects]);

  // Placeholder builder logos
  const builderLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/e/ed/Lodha---New-LOgo.png",
    "https://media.licdn.com/dms/image/v2/C4D0BAQFkYd49JE86Dg/company-logo_200_200/company-logo_200_200/0/1630538535381/dlf_logo?e=2147483647&v=beta&t=qCoIJDJk9yeGrjOAns8tjCgIHgJm2m80TMUP7jkoEmU",
    "https://www.livemint.com/lm-img/img/2024/11/28/original/Godrej_new_logo_1732796773986.jpeg",
    "https://bl-i.thgim.com/public/incoming/epo0je/article26643855.ece/alternates/LANDSCAPE_1200/oberoi-hotelspng",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTziPf-BUgsQHa_0RkLFDlLfJLZcAhH7a3EIQ&s",
    "https://www.big5global.com/wp-content/uploads/2023/10/GIA-VVIP-Partner-Sobha-Constructions.png",
  ];

  if (loading) {
    return <div className="text-center py-20 text-gray-900">Loading Commercial Projects...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white text-black font-sans">
      <main>
        {/* Hero Section */}
        <section
          className="relative h-[90vh] bg-cover bg-center text-white flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Find Your Next
              <br />
              Premium Commercial Property
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover exclusive commercial projects from the most reputed builders in Ahmedabad.
            </p>
            <button
              onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
              className="mt-8 inline-block bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              Explore Projects
            </button>
          </div>
        </section>

        {/* Projects & Filters Section */}
        <section id="projects" className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Featured Commercial Projects</h2>
            <p className="text-center text-gray-500 mb-12">
              Curated commercial properties that define functionality and prestige.
            </p>

            {/* Filter Section */}
            <section className="py-8 bg-gray-50 border-b">
              <div className="max-w-7xl mx-auto px-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by project name or builder..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-lg"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Property Type</option>
                    {uniquePropertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.budget}
                    onChange={(e) => handleFilterChange("budget", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Budget Range</option>
                    <option value="50-75">₹50-75 Lakhs</option>
                    <option value="75-100">₹75L-1Cr</option>
                    <option value="100+">₹1Cr+</option>
                  </select>

                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Project Status</option>
                    {uniqueStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.builder}
                    onChange={(e) => handleFilterChange("builder", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Builders</option>
                    {availableBuilders.map((builder) => (
                      <option key={builder} value={builder}>
                        {builder}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="w-5 h-5" />
                    <span>{filteredProjects.length} properties found</span>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-black font-semibold hover:text-gray-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </section>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer mt-12">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 col-span-full">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    No Commercial Properties Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-64 object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{project.name}</h3>
                        <p className="text-sm text-gray-300 flex items-center mt-1">
                          <MapPin size={14} className="mr-1.5" />
                          {project.location}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {project.projectStatus}
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={20} className="text-black" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">Built by:</p>
                        <img
                          src={builderLogos[index % builderLogos.length]}
                          alt={project.builder}
                          className="h-10 w-auto filter grayscale"
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={16} className="text-gray-500" />
                          <span className="font-medium">{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <SquareArrowOutUpRight size={16} className="text-gray-500" />
                          <span className="font-medium">{project.area}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-lg font-bold text-green-600">
                          {project.price}
                        </div>
                      </div>
                      <Link
                        to={`/Commercial/details/${project.id}`}
                        className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4 block text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Builder Logos Section */}
        <section id="builders" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Our Esteemed Builders</h2>
            <p className="text-center text-gray-500 mb-12">
              Partnering with the best to build the future of Ahmedabad.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {builderLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Builder logo ${index + 1}`}
                  className="h-14 w-auto transition-opacity duration-300 filter hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Commercial;