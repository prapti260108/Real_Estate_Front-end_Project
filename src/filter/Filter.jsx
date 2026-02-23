import React, { useState, useMemo, useEffect } from "react";
import resolveImage from "../lib/resolveImage";
import { FiMapPin, FiSearch, FiCalendar, FiRepeat } from "react-icons/fi";
import { FaBed, FaBuilding, FaRupeeSign } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="relative">
      <Link to={`/project/${property.id}`}>
        <img
          className="w-full h-56 object-cover cursor-pointer"
          src={property.imageUrl}
          alt={`View of ${property.name}`}
        />
      </Link>
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {property.status}
      </div>
    </div>
    <div className="p-6">
      <p className="text-sm font-semibold text-gray-600 tracking-wider">
        {property.type} • {property.postedBy}
      </p>
      <h3 className="text-xl font-bold text-gray-900 mt-1">{property.name}</h3>
      <p className="text-gray-700 mt-2">{property.location}, Ahmedabad</p>
      <p className="text-2xl font-black text-black mt-4">
        ₹{property.price.toLocaleString()}
      </p>
    </div>
  </div>
);

const FilterPanel = ({
  filters,
  onFilterChange,
  onNestedFilterChange,
  onMultiSelectChange,
  onResetFilters,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg w-full border border-gray-200">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
      <button
        onClick={onResetFilters}
        className="text-sm text-gray-600 hover:text-black flex items-center transition-colors"
      >
        <FiRepeat className="mr-1" /> Reset
      </button>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FiMapPin className="mr-2" /> Location
      </label>
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Location..."
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className="w-full pl-10 p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FaRupeeSign className="mr-2" /> Price Range (in Lakhs)
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={filters.price.min}
          onChange={(e) => onNestedFilterChange("price", "min", e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={filters.price.max}
          onChange={(e) => onNestedFilterChange("price", "max", e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FaBuilding className="mr-2" /> Super Area (sq.ft)
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={filters.superArea.min}
          onChange={(e) =>
            onNestedFilterChange("superArea", "min", e.target.value)
          }
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={filters.superArea.max}
          onChange={(e) =>
            onNestedFilterChange("superArea", "max", e.target.value)
          }
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FaBuilding className="mr-2" /> Carpet Area (sq.ft)
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={filters.carpetArea.min}
          onChange={(e) =>
            onNestedFilterChange("carpetArea", "min", e.target.value)
          }
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={filters.carpetArea.max}
          onChange={(e) =>
            onNestedFilterChange("carpetArea", "max", e.target.value)
          }
          className="w-1/2 p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FaBed className="mr-2" /> Property Type
      </label>
      <div className="grid grid-cols-3 gap-2">
        {[
          "1 BHK",
          "2 BHK",
          "3 BHK",
          "4+ BHK",
          "Villa",
          "Bungalow",
          "Duplex",
        ].map((type) => (
          <button
            key={type}
            onClick={() => onMultiSelectChange("propertyType", type)}
            className={`p-2 text-xs text-center rounded-lg border-2 transition-colors ${
              filters.propertyType.includes(type)
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <BsBuilding className="mr-2" /> Floors Required
      </label>
      <select
        value={filters.floors}
        onChange={(e) => onFilterChange("floors", e.target.value)}
        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="All">All Floors</option>
        <option>G+1</option>
        <option>G+2</option>
        <option>G+3</option>
        <option>G+4+</option>
      </select>
    </div>

    <div className="mb-8">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FiCalendar className="mr-2" /> Project Timeline
      </label>
      <select
        value={filters.timeline}
        onChange={(e) => onFilterChange("timeline", e.target.value)}
        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="All">Any Timeline</option>
        <option>Ready to Move</option>
        <option>Just Started</option>
        <option>Under Construction</option>
        <option>Launching Soon</option>
      </select>
    </div>

    <div className="relative mt-4">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        Suggestion
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Any suggestion"
          className="w-full pl-3 border-0 border-b border-gray-400 focus:border-black focus:outline-none py-2 placeholder:text-gray-600 bg-transparent"
        />
      </div>
    </div>
  </div>
);

export default function RealEstatePage() {
  const initialFilters = {
    propertyType: [],
    superArea: { min: "", max: "" },
    carpetArea: { min: "", max: "" },
    price: { min: "", max: "" },
    location: "",
    furnishing: [],
    status: "All",
    postedBy: [],
    floors: "All",
    timeline: "All",
    amenities: [],
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Raw API response (properties):", data);
        // Ensure data is an array
        const propertiesArray = Array.isArray(data) ? data : [data];
        // Map backend fields to frontend expectations
        const mappedProperties = propertiesArray
          .map((project) => {
            if (!project._id) {
              console.warn("Project missing _id:", project);
              return null;
            }
            return {
              id: project._id,
              name: project.companyName || "Untitled Project",
              price: project.priceRange?.max || 0, // Use max price for display
              type: project.propertyType || "Unknown Type",
              furnishing: project.furnishing || "Unfurnished", // Default if not provided
              location: project.location
                ? project.location.charAt(0).toUpperCase() + project.location.slice(1)
                : "Unknown Location",
              status: project.status || "New",
              postedBy: project.postedBy || "Builder", // Default if not provided
              superArea: project.superArea?.max || 0,
              carpetArea: project.carpetArea?.max || 0,
              floors: project.floorsRequired || "All Floors",
              timeline: project.projectTimeline || "Any Timeline",
              amenities: [
                project.amenities?.parking ? "Parking" : "",
                project.amenities?.garden ? "Garden" : "",
                project.amenities?.swimmingPool ? "Swimming Pool" : "",
              ].filter(Boolean),
              imageUrl: resolveImage(project.imageUrl),
            };
          })
          .filter((project) => project !== null);
        setProperties(mappedProperties);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(`Failed to load properties: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const {
        propertyType,
        superArea,
        carpetArea,
        price,
        location,
        furnishing,
        status,
        postedBy,
        floors,
        timeline,
        amenities,
      } = filters;

      if (
        location &&
        !p.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (propertyType.length > 0 && !propertyType.includes(p.type))
        return false;
      if (furnishing.length > 0 && !furnishing.includes(p.furnishing))
        return false;
      if (postedBy.length > 0 && !postedBy.includes(p.postedBy)) return false;
      if (status !== "All" && p.status !== status) return false;
      if (floors !== "All" && p.floors !== floors) return false;
      if (timeline !== "All" && p.timeline !== timeline) return false;

      const minPrice = price.min ? parseFloat(price.min) * 100000 : 0;
      const maxPrice = price.max ? parseFloat(price.max) * 100000 : Infinity;
      if (p.price < minPrice || p.price > maxPrice) return false;

      const minSuperArea = superArea.min ? parseFloat(superArea.min) : 0;
      const maxSuperArea = superArea.max ? parseFloat(superArea.max) : Infinity;
      if (p.superArea < minSuperArea || p.superArea > maxSuperArea)
        return false;

      const minCarpetArea = carpetArea.min ? parseFloat(carpetArea.min) : 0;
      const maxCarpetArea = carpetArea.max
        ? parseFloat(carpetArea.max)
        : Infinity;
      if (p.carpetArea < minCarpetArea || p.carpetArea > maxCarpetArea)
        return false;

      if (
        amenities.length > 0 &&
        !amenities.every((amenity) => p.amenities.includes(amenity))
      )
        return false;

      return true;
    });
  }, [filters, properties]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedFilterChange = (key, nestedKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [nestedKey]: value,
      },
    }));
  };

  const handleMultiSelectChange = (key, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[key]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [key]: Array.from(newSet) };
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Loading properties...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <main className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onNestedFilterChange={handleNestedFilterChange}
                onMultiSelectChange={handleMultiSelectChange}
                onResetFilters={handleResetFilters}
              />
            </div>
          </aside>

          {isFilterVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
              onClick={() => setIsFilterVisible(false)}
            >
              <div
                className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl z-50 p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setIsFilterVisible(false)}
                    className="text-3xl text-gray-600 hover:text-black"
                  >
                    &times;
                  </button>
                </div>
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onNestedFilterChange={handleNestedFilterChange}
                  onMultiSelectChange={handleMultiSelectChange}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          )}

          <section className="w-full lg:w-2/3 xl:w-3/4 mt-16">
            <div className="flex justify-between items-baseline mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Properties in Ahmedabad
              </h1>
              <p className="font-semibold text-gray-700">
                {filteredProperties.length} results found
              </p>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  No Properties Found
                </h2>
                <p className="text-gray-600 mt-2">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}