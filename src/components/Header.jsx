// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, Calculator } from "lucide-react";

// const Header = ({ isScrolled, needsBlackTextAtTop }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);

//   const location = useLocation();

//   const navigation = [
//     { name: "About", key: "about", href: "/about" },
//     { name: "Media", key: "media", href: "/media" },
//     { name: "Blog", key: "blog", href: "/blog" },
//     { name: "Filter", key: "Filter", href: "/Filter" },
//     { name: "Contact", key: "contact", href: "/contact" },
//   ];
  
//   const projectCategories = [
//     { name: "Commercial", key: "commercial", href: "/projects/commercial" },
//     { name: "Residential", key: "residential", href: "/projects/residential" },
//     { name: "Services", key: "services", href: "/projects/services" },
//     { name: "Plotting", key: "plotting", href: "/projects/PlottingPage" },
//   ];

//   const closeAllMenus = () => {
//     setIsMobileMenuOpen(false);
//     setIsProjectsMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => closeAllMenus();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     closeAllMenus();
//   }, [location]);

//   const useBlackText = isScrolled || needsBlackTextAtTop;

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/95 backdrop-blur-sm shadow-md"
//           : "bg-transparent"
//       } ${useBlackText ? "text-black" : "text-white"}`} 
//     >
//       <div
//         className="container mx-auto px-6 py-6"
//       >
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold cursor-pointer" onClick={closeAllMenus}>
//             <div className="flex items-center space-x-1">
//               <div
//                 className={`w-6 h-6 border-2 grid grid-cols-2 gap-0.5 ${
//                   useBlackText ? "border-black" : "border-white" 
//                 }`}
//               >
//                 <div className={useBlackText ? "bg-black" : "bg-white"}></div>
//                 <div className={`border ${useBlackText ? "border-black" : "border-white"}`}></div>
//                 <div className={`border ${useBlackText ? "border-black" : "border-white"}`}></div>
//                 <div className={useBlackText ? "bg-black" : "bg-white"}></div>
//               </div>
//               <span className={`ml-2 tracking-wider ${useBlackText ? "text-black" : "text-white"}`}> 
//                 REAL ESTATE
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <div className="relative">
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setIsProjectsMenuOpen(!isProjectsMenuOpen)}
//                   className={`${useBlackText ? "hover:text-gray-600" : "hover:text-gray-300"}`} 
//                 >
//                   <Menu size={16} />
//                 </button>
//                 <Link
//                   to="/Projects"
//                   className={`text-sm font-medium ${useBlackText ? "hover:text-gray-600" : "hover:text-gray-300"}`} 
//                 >
//                   Projects
//                 </Link>
//               </div>
//               {isProjectsMenuOpen && (
//                 <div
//                   className={`absolute top-full left-0 mt-2 w-48 backdrop-blur-sm border rounded-sm ${
//                     useBlackText 
//                       ? "bg-white/95 border-gray-200"
//                       : "bg-[#1A1A1A]/95 border-white/10"
//                   }`}
//                 >
//                   <ul className="py-2">
//                     {projectCategories.map((cat) => (
//                       <li key={cat.key}>
//                         <Link
//                           to={cat.href}
//                           onClick={closeAllMenus}
//                           className={`block w-full text-left px-4 py-2 text-sm ${
//                             useBlackText
//                               ? "text-black hover:bg-gray-100"
//                               : "text-white hover:bg-white/10"
//                           }`}
//                         >
//                           {cat.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//             {navigation.map((item) => (
//               <Link
//                 key={item.key}
//                 to={item.href}
//                 className={`text-sm font-medium ${useBlackText ? "hover:text-gray-600" : "hover:text-gray-300"}`} 
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <Link to="/loan-calculator" onClick={closeAllMenus}>
//               <Calculator
//                 className={`w-5 h-5 cursor-pointer ${useBlackText ? "hover:text-gray-600" : "hover:text-gray-300"}`} 
//               />
//             </Link>
//           </div>
          
//           {/* Mobile Menu Button */}
//           <button
//             className={`lg:hidden ${useBlackText ? "text-black" : "text-white"}`} 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calculator, ChevronRight } from "lucide-react";

const Header = ({ isScrolled, needsBlackTextAtTop }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);

  const location = useLocation();

  const navigation = [
    { name: "About", key: "about", href: "/about" },
    { name: "Media", key: "media", href: "/media" },
    { name: "Blog", key: "blog", href: "/blog" },
    { name: "Filter", key: "Filter", href: "/Filter" },
    { name: "Contact", key: "contact", href: "/contact" },
  ];
  
  const projectCategories = [
    { name: "Commercial", key: "commercial", href: "/projects/commercial" },
    { name: "Residential", key: "residential", href: "/projects/residential" },
    { name: "Services", key: "services", href: "/projects/services" },
    { name: "Plotting", key: "plotting", href: "/projects/PlottingPage" },
  ];

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProjectsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    closeAllMenus();
  }, [location]);

  // Mobile menu open hone par background scroll lock karein
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const useBlackText = isScrolled || needsBlackTextAtTop;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
      } ${useBlackText && !isMobileMenuOpen ? "text-black" : "text-white"}`} 
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold z-[110]" onClick={closeAllMenus}>
            <div className="flex items-center space-x-1">
              <div className={`w-6 h-6 border-2 grid grid-cols-2 gap-0.5 ${useBlackText && !isMobileMenuOpen ? "border-black" : "border-white"}`}>
                <div className={useBlackText && !isMobileMenuOpen ? "bg-black" : "bg-white"}></div>
                <div className={`border ${useBlackText && !isMobileMenuOpen ? "border-black" : "border-white"}`}></div>
                <div className={`border ${useBlackText && !isMobileMenuOpen ? "border-black" : "border-white"}`}></div>
                <div className={useBlackText && !isMobileMenuOpen ? "bg-black" : "bg-white"}></div>
              </div>
              <span className={`ml-2 tracking-widest ${useBlackText && !isMobileMenuOpen ? "text-black" : "text-white"}`}> 
                REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
             <div className="relative group">
                <button onClick={() => setIsProjectsMenuOpen(!isProjectsMenuOpen)} className="text-sm font-semibold uppercase tracking-widest flex items-center gap-1">
                   Projects <Menu size={14} />
                </button>
                {isProjectsMenuOpen && (
                   <div className="absolute top-full left-0 mt-4 w-56 bg-white text-black shadow-2xl rounded-sm py-4 border-t-2 border-black">
                      {projectCategories.map(cat => (
                        <Link key={cat.key} to={cat.href} className="block px-6 py-2 hover:bg-gray-100 text-sm" onClick={closeAllMenus}>{cat.name}</Link>
                      ))}
                   </div>
                )}
             </div>
             {navigation.map((item) => (
              <Link key={item.key} to={item.href} className="text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity">
                {item.name}
              </Link>
            ))}
            <Link to="/loan-calculator"><Calculator size={20} /></Link>
          </div>
          
          {/* Mobile Toggle Button */}
          <button
            className={`lg:hidden z-[110] p-2 ${isMobileMenuOpen ? "text-white" : (useBlackText ? "text-black" : "text-white")}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY (Standard Tailwind) --- */}
      <div 
        className={`fixed inset-0 bg-[#0A0A0A] z-[105] lg:hidden flex flex-col px-10 pt-32 pb-10 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-8">
          <div className="border-b border-white/10 pb-4">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">Our Portfolio</p>
            <div className="grid grid-cols-2 gap-4">
              {projectCategories.map((cat) => (
                <Link 
                  key={cat.key} 
                  to={cat.href} 
                  onClick={closeAllMenus} 
                  className="text-white text-lg font-light flex items-center justify-between group"
                >
                  {cat.name} <ChevronRight size={16} className="text-white/30" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2">Navigation</p>
            {navigation.map((item) => (
              <Link 
                key={item.key} 
                to={item.href} 
                onClick={closeAllMenus}
                className="text-3xl font-extralight tracking-tight text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-10 flex justify-between items-center text-white">
          <Link to="/loan-calculator" onClick={closeAllMenus} className="flex items-center gap-3">
            <Calculator size={24} strokeWidth={1} />
            <span className="text-sm uppercase tracking-widest">Financial Tools</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;