"use client"
import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import Header from "./components/Header"
import FooterSection from "./components/Footer"
import Loader from "./components/Loader"
import Chatbot from "./components/Chatbot"
import About from "./about/About"
import ContactSection from "./contact/ContactSection"
import Media from "./media/Media"
import BlogGrid from "./blog/Blog"
import LoanCalculator from "./Homepage/LoanCalculator"
import ProjectPage from "./Homepage/ProjectPage"
import ExploreProjects from "./Homepage/ExploreProjects"
import Commercial from "./megha-Menu/Commercial"
import ResidentialPage from "./megha-Menu/ResidentialPage"
import ContactFormModel from "./about/ContactFormModal "
import OurProjectsPage from "./project/OurProjectsPage"
import ServicesPage from "./megha-Menu/ServicesPage"
import PlottingPage from "./megha-Menu/PlottingPage"
import Vr from "./megha-Menu/vr"
import { ImageGrid } from "./Homepage/ImageGrid"
import RealEstatePage from "./filter/Filter"
import Filterdata from "./filter/filterdata"
import UnifiedDetailsPage from "./components/UnifiedDetailsPage"

function ScrollToTopWrapper({ children }) {
  const location = useLocation()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timeout = setTimeout(() => setShouldRender(true), 0)
    return () => {
      setShouldRender(false)
      clearTimeout(timeout)
    }
  }, [location.pathname])

  return shouldRender ? children : null
}

const pagesWithBlackTextHeader = ["/about", "/media", "/blog", "/loan-calculator", "/Filter"]

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true) 
  const [isScrolled, setIsScrolled] = useState(false)


  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1500) 
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const needsBlackTextAtTop = pagesWithBlackTextHeader.includes(location.pathname)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header isScrolled={isScrolled} needsBlackTextAtTop={needsBlackTextAtTop} />
      <main>
        <ScrollToTopWrapper>
          <Routes>
            <Route path="/" element={<ImageGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/media" element={<Media />} />
            <Route path="/blog" element={<BlogGrid />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/ContactFormModel" element={<ContactFormModel />} />
            <Route path="/Projects" element={<OurProjectsPage />} />
            <Route path="/vr" element={<Vr />} />
            <Route path="/Filter" element={<RealEstatePage />} />
            <Route path="/property/:id" element={<Filterdata />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/explore/:builderId" element={<ExploreProjects />} />
            <Route path="/projects/commercial" element={<Commercial />} />
            <Route path="/projects/residential" element={<ResidentialPage />} />
            <Route path="/projects/services" element={<ServicesPage />} />
            <Route path="/projects/PlottingPage" element={<PlottingPage />} />
            <Route path="/details/:id" element={<UnifiedDetailsPage />} />
            <Route path="/project/:id/details/:planId" element={<UnifiedDetailsPage />} />
            <Route path="/Commercial/details/:id" element={<UnifiedDetailsPage />} />
            <Route path="/Residential/details/:id" element={<UnifiedDetailsPage />} />
          </Routes>
        </ScrollToTopWrapper>
      </main>
      <section id="footer" className="relative">
        <FooterSection />
      </section>
      <Chatbot />
    </div>
  )
}

export default App;