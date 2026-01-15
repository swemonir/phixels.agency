import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Globe, Code, Brain, Blocks, Building2, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { usePopup } from '../context/PopupContext';
const services = [{
  id: 'mobile',
  name: 'Mobile App Development',
  icon: Smartphone,
  description: 'Native & Cross-platform solutions for iOS and Android.',
  subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
  id: 'web',
  name: 'Website Development',
  icon: Globe,
  description: 'Scalable web applications using modern frameworks.',
  subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
  id: 'software',
  name: 'Software Development',
  icon: Code,
  description: 'Custom software tailored to your business needs.',
  subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
  id: 'ai',
  name: 'AI Development',
  icon: Brain,
  description: 'Intelligent solutions powering the future.',
  subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
  id: 'blockchain',
  name: 'Blockchain Development',
  icon: Blocks,
  description: 'Decentralized apps and smart contract solutions.',
  subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
  id: 'enterprise',
  name: 'Enterprise Solution',
  icon: Building2,
  description: 'Robust solutions for large-scale organizations.',
  subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
  id: 'ondemand',
  name: 'On-Demand Solutions',
  icon: Zap,
  description: 'Uber-like apps for various service industries.',
  subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];
export function ServiceMegaMenu() {
  const [activeService, setActiveService] = useState(services[0]);
  const {
    openPopup
  } = usePopup();
  const navigate = useNavigate();
  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 10
  }} transition={{
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  }} className="fixed top-[78px] left-0 right-0 w-full z-50">
      {/* Gradient border wrapper - reduced opacity */}
      <div className="relative p-[1px] rounded-b-3xl mx-4" style={{
      background: 'linear-gradient(to right, rgba(237,31,36,0.3), rgba(237,31,36,0.5), rgba(255,255,0,0.4), rgba(0,205,73,0.4), rgba(0,32,63,0.5))'
    }}>
        <div className="bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl rounded-b-3xl">
          <div className="container mx-auto px-4 py-8 h-full flex gap-8">
            {/* Left Sidebar - Service Categories */}
            <div className="w-1/3 lg:w-1/4 border-r border-white/10 pr-6 overflow-y-auto custom-scrollbar max-h-[60vh]">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">
                Core Services
              </h3>
              <div className="space-y-1">
                {services.map(service => <div key={service.id} onMouseEnter={() => setActiveService(service)} onClick={() => handleServiceClick(service.id)} className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeService.id === service.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${activeService.id === service.id ? 'bg-[color:var(--bright-red)] text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        <service.icon size={18} />
                      </div>
                      <div>
                        <span className={`block font-medium ${activeService.id === service.id ? 'text-[color:var(--bright-red)]' : 'text-gray-300 group-hover:text-white'}`}>
                          {service.name}
                        </span>
                        <span className="text-[10px] text-gray-500 line-clamp-1">
                          {service.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`transition-transform duration-300 ${activeService.id === service.id ? 'translate-x-0 text-[color:var(--bright-red)]' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </div>)}
              </div>
            </div>

            {/* Right Content - Subcategories */}
            <div className="flex-1 pl-2 overflow-y-auto custom-scrollbar max-h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div key={activeService.id} initial={{
                opacity: 0,
                x: 10
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -10
              }} transition={{
                duration: 0.2
              }}>
                  <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                        {activeService.name}
                      </h2>
                      <p className="text-gray-400 max-w-xl">
                        Comprehensive solutions for{' '}
                        {activeService.name.toLowerCase()}, tailored to scale
                        your business.
                      </p>
                    </div>
                    <Link to={`/services/${activeService.id}`} className="flex items-center gap-2 text-[color:var(--bright-red)] font-bold hover:gap-3 transition-all text-sm">
                      View Overview <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                    {activeService.subcategories.map((sub, idx) => <Link key={idx} to={`/services/${activeService.id}/${sub.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--bright-red)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {sub}
                        </span>
                      </Link>)}
                  </div>

                  {/* Featured Banner - Clickable with popup */}
                  <button onClick={openPopup} className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 flex items-center justify-between w-full group cursor-pointer hover:border-[color:var(--bright-red)]/50 hover:bg-white/10 transition-all duration-300">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-white mb-1">
                        Need a custom {activeService.name} solution?
                      </h4>
                      <p className="text-sm text-gray-400">
                        Our experts are ready to build exactly what you need.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[color:var(--bright-red)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
}