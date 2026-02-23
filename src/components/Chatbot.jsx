"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  X,
  Send,
  Layers,
  Layout,
  Landmark,
  ScrollText,
  Building2,
  Home,
  Map,
  Phone,
} from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const chatEndRef = useRef(null);

  const serviceOptions = [
    { text: "Architecture", icon: <Landmark size={20} />, handler: "handleService" },
    { text: "Interior Design", icon: <Layout size={20} />, handler: "handleService" },
    { text: "Loan Assistance", icon: <ScrollText size={20} />, handler: "handleService" },
    { text: "Legal Documentation", icon: <Layers size={20} />, handler: "handleService" },
    { text: "Property Interest", icon: <Building2 size={20} />, handler: "handlePropertyInterest" },
    { text: "Contact", icon: <Phone size={20} />, handler: "handleContact" },
  ];

  const propertyOptions = [
    { text: "Commercial", icon: <Map size={20} />, handler: "handlePropertyType" },
    { text: "Residential", icon: <Home size={20} />, handler: "handlePropertyType" },
    { text: "Plotting", icon: <Map size={20} />, handler: "handlePropertyType" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, messages.length]);

  const addMessage = (text, sender, options = []) => {
    setMessages((prev) => [...prev, { text, sender }]);
    setCurrentOptions(options);
  };

  const initializeChat = () => {
    addMessage("👋 Welcome! Please select a service you're interested in:", "bot", serviceOptions);
  };

  const resetToMainMenu = () => {
    addMessage("Would you like help with anything else?", "bot", serviceOptions);
  };

  const conversationHandlers = {
    handleService: (service) => {
      addMessage(
        <>
          You selected <strong>{service}</strong>. Visit our service page here:{" "}
          <Link
            to="/projects/services"
            className="underline text-blue-600 hover:text-blue-800"
          >
            View Services
          </Link>
        </>,
        "bot"
      );
      setTimeout(resetToMainMenu, 2000);
    },
    handlePropertyInterest: () => {
      addMessage("Are you interested in Commercial, Residential, or Plotting properties?", "bot", propertyOptions);
    },
    handlePropertyType: (type) => {
      let url = "/projects/services";
      if (type === "Commercial") url = "/projects/commercial";
      else if (type === "Residential") url = "/projects/residential";
      else if (type === "Plotting") url = "/projects/PlottingPage";

      addMessage(
        <>
          You selected <strong>{type}</strong> property. Learn more here:{" "}
          <Link
            to={url}
            className="underline text-blue-600 hover:text-blue-800"
          >
            View {type} Properties
          </Link>
        </>,
        "bot"
      );
      setTimeout(resetToMainMenu, 2000);
    },
    handleContact: () => {
      addMessage(
        <>
          You selected <strong>Contact</strong>. Reach out to us here:{" "}
          <Link
            to="/contact"
            className="underline text-blue-600 hover:text-blue-800"
          >
            Contact Page
          </Link>
        </>,
        "bot"
      );
      setTimeout(resetToMainMenu, 2000);
    },
  };

  const handleOptionClick = (option) => {
    addMessage(option.text, "user");
    const handler = conversationHandlers[option.handler];
    if (handler) handler(option.text);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    addMessage(userInput, "user");
    setUserInput("");
    addMessage(
      "Thanks for your message! Please select one of the services above or let us know how we can assist.",
      "bot",
      serviceOptions
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 sm:right-8 z-50 w-[calc(100%-2rem)] sm:w-96 h-[70vh] sm:h-[34rem] bg-white rounded-2xl shadow-2xl flex flex-col font-sans"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="font-bold text-lg">Yodezeen Assistance</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-black ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {!isLoading && currentOptions.length > 0 && (
                <motion.div
                  className="rounded-xl mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentOptions.map((option, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left p-3 text-blue-600 hover:bg-gray-200/50 flex items-center gap-3 transition-colors duration-200"
                      >
                        {option.icon}
                        <span>{option.text}</span>
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="p-3 border-t border-gray-200 flex items-center bg-white rounded-b-2xl"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write a message..."
                className="w-full px-3 py-2 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-8 bg-gray-900 text-white rounded-full p-4 shadow-xl hover:bg-black z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={28} />
      </motion.button>
    </>
  );
};

export default Chatbot;
