import React from 'react';

const Vr = () => {
    return (
        <div>
            <section className=" bg-white">
                <div className="max-w-[1200px] mx-auto p-5 ">


                    {/* Iframe wrapper with preview image */}
                    <div className="relative pt-[56.25%] overflow-hidden h-0 group mt-20">
                        {/* Preview Image */}
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-500 z-20 group-hover:opacity-0 pointer-events-none filter grayscale"
                            style={{
                                backgroundImage: `url("https://3d-ace.com/wp-content/uploads/Walkthroughs-for%20-presentations.jpg")`
                            }}
                        ></div>

                        {/* Matterport iframe */}
                        <iframe
                            title="Matterport VR Tour"
                            src="https://my.matterport.com/show/?m=bdM9XMxn11s"
                            allow="xr-spatial-tracking; gyroscope; accelerometer"
                            allowFullScreen
                            className="absolute top-[-70px] left-0 w-[calc(100%+180px)] h-[calc(100%+70px)] border-none z-10"
                        ></iframe>
                    </div>

                </div>

                {/* Optional internal CSS for extra customization */}
                <style>
                    {`
          /* If needed, custom CSS can go here */
        `}
                </style>
            </section>




            {/* ======= How We Showcase VR for Commercial & Residential Sites ======= */}
            <section className="relative bg-white py-24 px-4 md:px-0">
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16 tracking-widest uppercase">VR for Every Space</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        {/* Commercial VR Experience */}
                        <div className="relative group overflow-hidden shadow-xl border border-black/10">
                            <img
                                src="https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&fit=crop&w=800&q=80"
                                alt="Commercial VR"
                                className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold tracking-widest uppercase">Commercial</span>
                            </div>
                        </div>
                        {/* Residential VR Experience */}
                        <div className="relative group overflow-hidden shadow-xl border border-black/10">
                            <img
                                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&fit=crop&w=800&q=80"
                                alt="Residential VR"
                                className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold tracking-widest uppercase">Residential</span>
                            </div>
                        </div>
                        {/* Architecture VR Experience */}
                        <div className="relative group overflow-hidden shadow-xl border border-black/10">
                            <img
                                src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&fit=crop&w=800&q=80"
                                alt="Architecture VR"
                                className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold tracking-widest uppercase">Architecture</span>
                            </div>
                        </div>
                        {/* Interior VR Experience */}
                        <div className="relative group overflow-hidden shadow-xl border border-black/10">
                            <img
                                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&fit=crop&w=800&q=80"
                                alt="Interior VR"
                                className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold tracking-widest uppercase">Interior</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ======= How We Use VR in Real Estate Section ======= */}

            <section className="relative bg-black py-20 px-4 md:px-0">
                {/* Divider */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0 rounded-full mb-12"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 tracking-widest uppercase">How We Use VR in Real Estate</h2>
                    <p className="text-lg text-gray-300 font-light text-center mb-14 max-w-2xl mx-auto">
                        We harness the power of Virtual Reality to transform the way clients experience, design, and market real estate. Our process delivers clarity, confidence, and excitement at every stage.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* 1. Virtual Site Visits */}
                        <div className="flex items-start gap-5">
                            <span className="bg-white/10 p-4 rounded-full flex items-center justify-center"><svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' strokeWidth='2' /><path d='M8 12h8M12 8v8' strokeWidth='2' /></svg></span>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Virtual Site Visits</h3>
                                <p className="text-gray-300 text-sm font-light">Explore properties remotely in 360°, saving time and enabling global access.</p>
                            </div>
                        </div>
                        {/* 2. Immersive Design Visualization */}
                        <div className="flex items-start gap-5">
                            <span className="bg-white/10 p-4 rounded-full flex items-center justify-center"><svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='4' y='4' width='16' height='16' rx='2' strokeWidth='2' /><path d='M4 9h16M9 4v16' strokeWidth='2' /></svg></span>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Immersive Design Visualization</h3>
                                <p className="text-gray-300 text-sm font-light">Experience architectural and interior concepts in photorealistic VR before building.</p>
                            </div>
                        </div>
                        {/* 3. Interactive Customization */}
                        <div className="flex items-start gap-5">
                            <span className="bg-white/10 p-4 rounded-full flex items-center justify-center"><svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M12 20v-6M12 4v2M4 12h2m12 0h2M7.05 7.05l1.414 1.414M15.536 15.536l1.414 1.414M7.05 16.95l1.414-1.414M15.536 8.464l1.414-1.414' strokeWidth='2' /></svg></span>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Interactive Customization</h3>
                                <p className="text-gray-300 text-sm font-light">Instantly change finishes, layouts, or furniture in the VR model for true personalization.</p>
                            </div>
                        </div>
                        {/* 4. Cinematic Walkthroughs */}
                        <div className="flex items-start gap-5">
                            <span className="bg-white/10 p-4 rounded-full flex items-center justify-center"><svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='5' width='18' height='14' rx='2' strokeWidth='2' /><path d='M10 9l5 3-5 3V9z' strokeWidth='2' /></svg></span>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Cinematic Walkthroughs</h3>
                                <p className="text-gray-300 text-sm font-light">Engage clients with high-quality video tours and presentations for marketing and sales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <section className="relative bg-black py-20 px-5">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight mb-5">
                        Key Benefits of <span className="text-gray-400">VR in Real Estate</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-14 max-w-3xl mx-auto">
                        Discover how immersive technology elevates property marketing and decision-making to new heights.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Faster Decisions",
                                desc: "Empower clients with interactive walkthroughs to make quicker, informed buying choices.",
                            },
                            {
                                title: "Cost Efficient",
                                desc: "Reduce the need for physical site visits and travel with high-fidelity virtual tours.",
                            },
                            {
                                title: "Emotional Engagement",
                                desc: "Create deeper emotional connections by letting buyers experience their future space.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="backdrop-blur-sm bg-white/5 border border-gray-700  shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:bg-white/10"
                            >
                                {/* <div className="text-5xl mb-4 text-white">{item.icon}</div> */}
                                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>





        </div>
    );
};

export default Vr;
