import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';


const BASE_URL = "https://real-estate-back-end-project-2.onrender.com";
// --- Icons ---
const VRIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// --- Error Boundary Component ---
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-400 p-6">
          <h2 className="text-2xl font-bold">Something went wrong.</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Pricing Request Form Modal ---
const PricingFormModal = ({ isOpen, onClose, plan }) => {
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
      planName: plan.name,
    };

    // Client-side validation
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('All fields are required.');
      setIsSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      setFormError('Please enter a valid phone number (10-15 digits).');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const response = await fetch('https://real-estate-back-end-project-2.onrender.com/api/brochure_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Details: ${errorText}`);
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      alert(`Thank you for your interest in the ${plan.name}! Our team will contact you shortly with the pricing details.`);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      let errorMessage = 'Failed to submit request. Please try again later.';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again later.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS issue: The server does not allow requests from this origin. Contact support.';
      } else {
        errorMessage = `Failed to submit request: ${error.message}`;
      }
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-zinc-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block">
              <img
                src={plan.image}
                alt={plan.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
            </div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-black tracking-tighter uppercase text-white">Request Pricing</h2>
              <p className="text-gray-400 mt-1 mb-6">
                For: <span className="text-white font-bold">{plan.name}</span>
              </p>
              {formError && <div className="text-red-400 mb-4">{formError}</div>}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    className="peer w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-white outline-none transition"
                    required
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    className="peer w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-white outline-none transition"
                    required
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder=" "
                    className="peer w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-white outline-none transition"
                    required
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                    Phone Number
                  </label>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-4 py-4 bg-white text-black font-bold rounded-lg text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main PlottingPage Component ---
const PlottingPage = () => {
  const [floorPlansData, setFloorPlansData] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://real-estate-back-end-project-2.onrender.com/api/plottingFloral', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        const floorPlans = Array.isArray(data) ? data : [data];
        if (floorPlans.length === 0) {
          console.log('No floor plans found in response');
          setError('No floor plans available.');
          setFloorPlansData([]);
          setActivePlan(null);
          setIsLoading(false);
          return;
        }

        const validatedPlans = floorPlans.map((plan, index) => ({
          id: plan._id || `plan-${index}`,
          name: plan.bhkType ? `${plan.bhkType} (${plan._id?.slice(-4) || index + 1})` : `Plan ${index + 1}`,
          // image: plan.image && !plan.image.startsWith('http')
          //   ? `https://real-estate-1-t7m0.onrender.com/uploads/${plan.image}`
          //   : plan.image || 'https://via.placeholder.com/400',
          imageUrl: project.image ? `${BASE_URL}/${plan.image}` : "https://via.placeholder.com/300x200",
          area: plan.area || 'Unknown Area',
          details: Array.isArray(plan.facilities) ? plan.facilities : [],
        }));
        console.log('Validated Plans:', validatedPlans);
        setFloorPlansData(validatedPlans);
        setActivePlan(validatedPlans[0] || null);
      } catch (error) {
        console.error('Error fetching floor plans:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
        setError(`Failed to load floor plans: ${error.message}. Please try again later.`);
        setFloorPlansData([]);
        setActivePlan(null);
      } finally {
        setIsLoading(false);
        console.log('Loading state set to false, floorPlansData:', floorPlansData, 'activePlan:', activePlan);
      }
    };
    fetchFloorPlans();
  }, []);

  const heroLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  return (
    <ErrorBoundary>
      <div className="font-sans bg-white text-black overflow-x-hidden">
        {/* --- Hero Section --- */}
        <section className="h-screen min-h-[800px] relative flex flex-col justify-center items-center text-center p-6">
          <div className="absolute inset-0 z-0">
            <img
              src="https://real-estate-back-end-project-2.onrender.com/api/plotting"
              alt="Luxury real estate project"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800';
              }}
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="absolute inset-0 z-10 overflow-hidden">
            <motion.svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
              <motion.path
                d="M-200 400 L1640 400"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                variants={heroLineVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              />
              <motion.path
                d="M720 -100 L720 900"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                variants={heroLineVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              />
            </motion.svg>
          </div>
          <div className="relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-shadow-lg text-white"
            >
              Elysian Fields
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl text-shadow"
            >
              A meticulously planned canvas for your future home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-10 flex justify-center"
            >
              <Link
                to="/vr"
                className="group border-2 border-white/50 bg-black/20 backdrop-blur-sm rounded-md px-8 py-3 font-bold flex items-center justify-center transition-all duration-300 hover:border-white hover:bg-white/10 text-white"
              >
                <VRIcon /> Virtual Tour
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- Floor Plan Explorer Section --- */}
        <section className="py-24 px-6 bg-[#1A1A1A]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                Floor Plan Explorer
              </h2>
              <p className="mt-3 text-lg text-gray-400">
                Visualize your future. Select a configuration to view the layout.
              </p>
            </div>
            {isLoading ? (
              <div className="text-center text-white">Loading floor plans...</div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : floorPlansData.length === 0 ? (
              <div className="text-center text-gray-400">No floor plans available.</div>
            ) : (
              <>
                <div className="flex justify-center mb-12 border-b border-gray-800">
                  {floorPlansData.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setActivePlan(plan)}
                      className={`relative w-1/3 py-4 text-lg font-bold uppercase tracking-wider transition-colors duration-300 ${
                        activePlan?.id === plan.id ? 'text-white' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {plan.name}
                      {activePlan?.id === plan.id && (
                        <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-white" layoutId="underline" />
                      )}
                    </button>
                  ))}
                </div>
                {activePlan && (
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePlan.id + '-image'}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3 h-[500px] w-full"
                      >
                        <img
                          src={activePlan.image}
                          alt={activePlan.name}
                          className="w-full h-full object-cover rounded-xl shadow-2xl"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400';
                          }}
                        />
                      </motion.div>
                      <motion.div
                        key={activePlan.id + '-details'}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-2 p-8 bg-black rounded-xl h-full flex flex-col text-white"
                      >
                        <h3 className="text-3xl font-bold tracking-tight">{activePlan.name}</h3>
                        <p className="text-xl mt-1 text-gray-400">{activePlan.area}</p>
                        <div className="border-t border-gray-700 my-6"></div>
                        <ul className="space-y-4 flex-grow">
                          {Array.isArray(activePlan.details) && activePlan.details.length > 0 ? (
                            activePlan.details.map((detail) => (
                              <li key={detail} className="flex items-center text-lg">
                                <CheckIcon />
                                <span>{detail}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-lg text-gray-400">No facilities available.</li>
                          )}
                        </ul>
                        <motion.button
                          onClick={() => setIsFormOpen(true)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full mt-8 py-4 bg-white text-black font-bold rounded-lg text-lg"
                        >
                          Request Pricing
                        </motion.button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </section>

        {/* --- Core Features Section --- */}
        <section className="py-24 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Core Features</h2>
            <p className="mt-3 text-lg text-gray-400">Engineered for a superior living experience.</p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                {
                  title: 'Gated Community',
                  description: 'Experience unparalleled security and privacy in an exclusive, well-guarded enclave.',
                },
                {
                  title: '24/7 Security',
                  description: 'State-of-the-art surveillance and round-the-clock personnel ensure your safety.',
                },
                {
                  title: 'Grand Clubhouse',
                  description: 'A luxurious space for recreation, social gatherings, and fitness activities.',
                },
                {
                  title: 'Landscaped Parks',
                  description: 'Lush green spaces and manicured gardens designed for relaxation and tranquility.',
                },
                {
                  title: 'Sports Facilities',
                  description: 'Modern courts and facilities for tennis, basketball, and other outdoor sports.',
                },
                {
                  title: 'Yoga & Meditation Deck',
                  description: 'A serene, dedicated area to rejuvenate your mind, body, and soul.',
                },
              ].map((feature) => (
                <div key={feature.title} className="p-8 border border-gray-800 bg-black hover:bg-zinc-900 transition-colors">
                  <h3 className="font-bold text-xl text-white">{feature.title}</h3>
                  <p className="text-gray-500 mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {activePlan && <PricingFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} plan={activePlan} />}
    </ErrorBoundary>
  );
};

export default PlottingPage;