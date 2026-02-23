"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { builderData } from "../lib/builder-data";

const ExploreProjects = () => {
  const { builderId } = useParams();
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [builder, setBuilder] = useState(null);
  const location = useLocation();
  const navState = (location && location.state) || {};
  const decodedBuilderId = decodeURIComponent(builderId || "").trim();
  const placeholderHero = "/placeholder.svg";
  const params = new URLSearchParams(location.search || "");
  const rawQp = params.get("img");
  const qpImg = rawQp ? decodeURIComponent(rawQp) : null;

  // Image Path Fixer Function
  const normalizeImgUrl = (u) => {
    if (!u) return null;
    const s = String(u).replace(/\\/g, "/");
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.includes("uploads/")) {
      return s.startsWith("/") ? `http://localhost:3000${s}` : `http://localhost:3000/${s}`;
    }
    return `http://localhost:3000/uploads/${s.replace(/^\//, "")}`;
  };

  const resolvedImageUrl = 
    (navState && normalizeImgUrl(navState.imageUrl)) || 
    normalizeImgUrl(qpImg) || 
    (builder && normalizeImgUrl(builder.imageUrl)) || 
    placeholderHero;

  const displayBuilder = {
    title: (builder && builder.title) || (navState && navState.title) || decodedBuilderId || "Explore",
    imageUrl: resolvedImageUrl,
    description: (builder && builder.description) || ""
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const mappedProjects = Object.keys(builderData).flatMap((key) => {
        const b = builderData[key];
        return (b.currentProjects || []).map((proj, idx) => ({
          id: `${key}-${idx}`,
          title: b.name,
          builderKey: key,
        }));
      });

      let selectedBuilder = null;
      if (decodedBuilderId) {
        selectedBuilder = Object.keys(builderData).map(k => ({ key: k, name: builderData[k].name }))
          .find(b => b.name === decodedBuilderId || b.key === decodedBuilderId || b.key === decodeURIComponent(decodedBuilderId));
        
        if (!selectedBuilder) {
          const lower = decodedBuilderId.toLowerCase();
          const matchKey = Object.keys(builderData).find(k => builderData[k].name.toLowerCase().includes(lower) || k.toLowerCase().includes(lower));
          if (matchKey) selectedBuilder = { key: matchKey, name: builderData[matchKey].name };
        }
      }

      if (selectedBuilder) {
        setBuilder({ title: selectedBuilder.name, imageUrl: builderData[selectedBuilder.key].heroImage });
        setProjects(mappedProjects.filter((p) => p.title === selectedBuilder.name));
        setLoading(false);
        setHeroVisible(true);
        return;
      } else {
        setBuilder(null);
        if (decodedBuilderId) {
          (async () => {
            try {
              setLoading(true);
              const resp = await fetch("http://localhost:3000/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyName: decodedBuilderId }),
              });
              if (resp.ok) {
                const data = await resp.json();
                const projectsArray = Array.isArray(data?.results) ? data.results : [];
                if (projectsArray.length > 0) {
                  setBuilder({ title: decodedBuilderId, imageUrl: normalizeImgUrl(projectsArray[0].imageUrl) });
                  setProjects(projectsArray);
                } 
              }
            } catch (err) {
              console.error("Error fetching projects for builder from backend:", err);
            } finally {
              setLoading(false);
              setHeroVisible(true);
            }
          })();
          return;
        }
      }
    } catch (err) {
      console.error("Error building local projects:", err);
      setLoading(false);
    }
  }, [builderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-medium text-white tracking-widest uppercase">Loading Builder Profile...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] relative font-sans">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] md:h-screen bg-cover bg-center bg-no-repeat pt-20"
        style={{ backgroundImage: `url('${displayBuilder.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#121212]"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 text-white">
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {displayBuilder.title}
          </h1>
          <p
            className={`text-lg md:text-2xl mb-12 max-w-3xl font-light text-gray-300 transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover exceptional properties crafted with precision, luxury, and unmatched architectural brilliance.
          </p>
          
          <div
            className={`flex flex-wrap justify-center gap-8 md:gap-16 text-white transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">{projects.length > 0 ? projects.length + '+' : '2+'}</div>
              <div className="text-xs md:text-sm tracking-widest uppercase text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">15+</div>
              <div className="text-xs md:text-sm tracking-widest uppercase text-gray-400">Years Exp.</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">4.9</div>
              <div className="text-xs md:text-sm tracking-widest uppercase text-gray-400">Star Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: About Builder / Legacy Section */}
      <section className="py-24 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image */}
          <div className={`relative h-[500px] rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
            <img
              src={displayBuilder.imageUrl}
              alt={displayBuilder.title}
              className="absolute inset-0 w-full h-full object-cover filter grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block mb-3 shadow-lg">
                Trusted Legacy
              </div>
              <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                Building Dreams & Changing Skylines
              </h3>
            </div>
          </div>
          
          {/* Right Side: Content */}
          <div className={`transition-all duration-1000 delay-300 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}>
            <h2 className="text-sm tracking-widest uppercase text-[#00d26a] mb-3 font-bold">About The Developer</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {displayBuilder.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">
              {displayBuilder.description || `${displayBuilder.title} is synonymous with premium real estate and architectural excellence. With a strong commitment to quality, timely delivery, and unparalleled design, we create spaces that define modern luxury living. Our legacy is built on the trust of thousands of happy families and successful investors.`}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-bold text-white mb-1">Premium</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Quality</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">Timely</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">Modern</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Amenities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">Prime</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Locations</div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-black px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
            >
              Inquire Now
            </button>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#121212] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl text-white font-semibold mb-6">Want to explore more developers?</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="bg-transparent text-white border border-white/30 px-8 py-3 rounded font-medium hover:bg-white hover:text-black transition-colors"
            >
              Back to Main Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreProjects;