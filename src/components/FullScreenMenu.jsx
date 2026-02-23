"use client"

import { useState } from "react"
import { X, Search } from 'lucide-react'

const FullScreenMenu = ({ isOpen, onClose, headerTheme }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigationItems = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Media", href: "#media" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ]

  const contactInfo = [
    {
      label: "General Inquiries:",
      email: "info@yodezeen.com",
    },
    {
      label: "PR&Collaborations:",
      email: "pr@yodezeen.com",
    },
    {
      label: "Careers:",
      email: "hr@yodezeen.com",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 border-2 border-white grid grid-cols-2 gap-0.5">
                <div className="bg-white"></div>
                <div className="border border-white"></div>
                <div className="border border-white"></div>
                <div className="bg-white"></div>
              </div>
              <span className="ml-2 tracking-wider text-white">YODEZEEN</span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-[calc(100vh-200px)]">
          {/* Left Side - Contact Information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              {/* Contact Info */}
              {contactInfo.map((contact, index) => (
                <div key={index}>
                  <p className="text-gray-400 text-sm mb-2">{contact.label}</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white hover:text-gray-300 transition-colors text-lg"
                  >
                    {contact.email}
                  </a>
                </div>
              ))}

              {/* Description */}
              <div className="mt-12">
                <p className="text-gray-400 leading-relaxed max-w-md">
                  For each project the approach rests on a careful understanding of the space, or the site's.
                </p>
              </div>
            </div>

            {/* Send Request Button */}
            <div className="mt-8">
              <button className="px-8 py-3 border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-colors duration-300">
                SEND REQUEST
              </button>
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div className="flex flex-col justify-between">
            {/* Navigation Menu */}
            <nav className="space-y-6">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="block text-4xl md:text-5xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="mt-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
                <button className="absolute right-0 top-0 text-white hover:text-gray-300 transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenMenu
