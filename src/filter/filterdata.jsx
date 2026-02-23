import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // not used in current version, but okay to keep

const FilterData = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: value.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data.results);
      setResults(data.results || []);
      setError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Something went wrong. Try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Search Properties</h1>
      <input
        type="text"
        placeholder="Search by company name..."
        value={query}
        onChange={handleSearch}
        className="w-full border px-4 py-2 rounded mb-6"
      />
      {loading && <p className="text-gray-500 animate-pulse">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && results.length === 0 && query && <p>No results found.</p>}

      <ul className="space-y-4">
        {results.map((property) => (
          <li
            key={property._id}
            className="border p-4 rounded shadow hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{property.companyName}</h2>
            <p className="text-gray-600">{property.location || "No location provided"}</p>
            <Link
              to={`/project/${property._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterData;
