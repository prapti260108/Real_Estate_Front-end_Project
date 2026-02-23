"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OurProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [heroVisible, setHeroVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";

  // Fetch initial projects data
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
              status: project.status || "Unknown Status",
              location: project.location || "Unknown Location",
               imageUrl: project.imageUrl ? `${BASE_URL}/${project.imageUrl}` : "https://via.placeholder.com/300x200",
              alt: `Image of ${project.companyName || "project"}`,
            };
          })
          .filter(project => project !== null);
        setProjects(mappedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(`Failed to load projects: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProjects();
    setHeroVisible(true);
    const timer = setTimeout(() => setProjectsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch filtered projects when searchTerm, filterType, or filterStatus changes
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (filterType !== "All") queryParams.append("type", filterType);
        if (filterStatus !== "All") queryParams.append("status", filterStatus);

        const response = await fetch(
          `http://localhost:3000/api/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch filtered projects: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Raw API response (filtered):", data);
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
              status: project.status || "Unknown Status",
              location: project.location || "Unknown Location",
             imageUrl: project.imageUrl ? `${BASE_URL}/${project.imageUrl}` : "https://via.placeholder.com/300x200",
              alt: `Image of ${project.companyName || "project"}`,
            };
          })
          .filter(project => project !== null);
        // Only update projects if there are valid results
        if (mappedProjects.length > 0) {
          setProjects(mappedProjects);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching filtered projects:", err);
        setError(`Failed to load filtered projects: ${err.message}`);
        setLoading(false);
      }
    };

    // Only fetch if filters are applied
    if (searchTerm || filterType !== "All" || filterStatus !== "All") {
      fetchFilteredProjects();
    }
  }, [searchTerm, filterType, filterStatus]);

  // Compute unique types and statuses for filters
  const uniqueTypes = useMemo(() => {
    const types = new Set(projects.map(item => item.type));
    return ["All", ...Array.from(types)].sort();
  }, [projects]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(projects.map(item => item.status));
    return ["All", ...Array.from(statuses)].sort();
  }, [projects]);

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat pt-20"
        style={{ backgroundImage: `url('https://www.sekene.com/wp-content/uploads/2024/02/image-1-2.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 text-white">
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our Projects Portfolio
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-3xl transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Explore our diverse portfolio of architectural marvels, each a
            testament to our commitment to innovation and design excellence.
          </p>
          <div
            className={`flex space-x-12 text-white transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div>
              <div className="text-3xl font-bold">{projects.length}+</div>
              <div className="text-sm">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-sm">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
                projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Explore Our Projects
            </h2>
            <p
              className={`text-gray-300 text-lg max-w-3xl mx-auto transition-all duration-1000 ${
                projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Discover our trending projects, from pre-launch opportunities to residences currently under construction
              that are shaping the future of luxury living.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search by builder name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 bg-[#2C2C2C] text-white border border-[#444] rounded-md p-2 focus:border-white focus:ring-white"
            />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full sm:w-[180px] bg-[#2C2C2C] text-white border border-[#444] rounded-md p-2 focus:ring-white"
            >
              <option value="All">Filter by Type</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full sm:w-[180px] bg-[#2C2C2C] text-white border border-[#444] rounded-md p-2 focus:ring-white"
            >
              <option value="All">Filter by Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="col-span-full text-center text-gray-300 text-lg py-10">
              Loading projects...
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500 text-lg py-10">
              {error}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Link
                  to={`/project/${project.id}`}
                  key={project.id}
                  className={`group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-1000 ${
                    projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="relative h-80 bg-black">
                    <img
                      src={project.imageUrl}
                      alt={project.alt}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-white text-black">
                      {project.status}
                    </div>
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">{project.title}</h3>
                      <p className="text-sm mb-3 text-gray-300">{project.subtitle}</p>
                      <div className="flex items-center mb-2">
                        <span className="text-sm">🏠 {project.type}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <span className="text-sm">📍 {project.location}</span>
                      </div>
                      <button className="w-full bg-transparent text-white border border-white py-2 rounded font-medium transition-colors duration-300 hover:bg-white hover:text-black">
                        View Project Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg py-10">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}