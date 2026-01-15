import React, { useState, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart } from 'lucide-react';
const cases = [{
  id: 1,
  client: 'Global Logistics Co',
  industry: 'Supply Chain',
  title: 'Optimizing Last-Mile Delivery with AI',
  challenge: 'Inefficient route planning leading to high fuel costs and delayed deliveries.',
  solution: 'Developed an AI-powered routing engine integrated with driver mobile apps.',
  result: '30% Reduction in Fuel Costs',
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
}, {
  id: 2,
  client: 'HealthFirst',
  industry: 'Healthcare',
  title: 'Telemedicine Platform for Remote Care',
  challenge: 'Lack of accessible healthcare during pandemic restrictions.',
  solution: 'HIPAA-compliant video consultation platform with EMR integration.',
  result: '50K+ Consultations/Month',
  image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
}, {
  id: 3,
  client: 'RetailMax',
  industry: 'E-Commerce',
  title: 'Personalized Shopping with ML',
  challenge: 'Low conversion rates and high cart abandonment.',
  solution: 'Machine learning recommendation engine with behavioral analysis.',
  result: '180% Increase in Sales',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80'
}, {
  id: 4,
  client: 'FinSecure Bank',
  industry: 'FinTech',
  title: 'Fraud Detection System',
  challenge: 'Rising fraud incidents costing millions annually.',
  solution: 'Real-time fraud detection using deep learning and behavioral patterns.',
  result: '95% Fraud Prevention',
  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
}, {
  id: 5,
  client: 'EduLearn',
  industry: 'Education',
  title: 'Adaptive Learning Platform',
  challenge: 'One-size-fits-all approach failing diverse student needs.',
  solution: 'AI-powered adaptive learning paths with real-time progress tracking.',
  result: '40% Better Outcomes',
  image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
}, {
  id: 6,
  client: 'GreenEnergy Co',
  industry: 'Energy',
  title: 'Smart Grid Management',
  challenge: 'Inefficient energy distribution and high operational costs.',
  solution: 'IoT-based smart grid with predictive maintenance and load balancing.',
  result: '25% Energy Savings',
  image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
}, {
  id: 7,
  client: 'TravelHub',
  industry: 'Travel',
  title: 'Dynamic Pricing Engine',
  challenge: 'Static pricing missing revenue optimization opportunities.',
  solution: 'AI-driven dynamic pricing based on demand, seasonality, and competition.',
  result: '60% Revenue Growth',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
}, {
  id: 8,
  client: 'ManufacturePro',
  industry: 'Manufacturing',
  title: 'Predictive Maintenance System',
  challenge: 'Unexpected equipment failures causing production delays.',
  solution: 'IoT sensors with ML models predicting failures before they occur.',
  result: '70% Less Downtime',
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
}, {
  id: 9,
  client: 'FoodChain',
  industry: 'Food & Beverage',
  title: 'Supply Chain Traceability',
  challenge: 'Lack of transparency in food sourcing and quality control.',
  solution: 'Blockchain-based traceability system from farm to table.',
  result: '100% Transparency',
  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
}, {
  id: 10,
  client: 'RealEstate Pro',
  industry: 'Real Estate',
  title: 'Virtual Property Tours',
  challenge: 'Limited physical viewings during pandemic.',
  solution: '3D virtual tours with VR support and AI-powered property matching.',
  result: '3x More Viewings',
  image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
}];
const industries = ['All', 'Supply Chain', 'Healthcare', 'E-Commerce', 'FinTech', 'Education', 'Energy', 'Travel', 'Manufacturing', 'Food & Beverage', 'Real Estate'];
export function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? cases : cases.filter(c => c.industry === filter);
  return <main className="bg-[#050505] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Deep dives into how we solve complex problems and drive measurable
            business results.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {industries.map(industry => <button key={industry} onClick={() => setFilter(industry)} className={`px-4 py-2 rounded-full text-sm border transition-all ${filter === industry ? 'bg-[color:var(--vibrant-green)] text-black border-[color:var(--vibrant-green)]' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}>
              {industry}
            </button>)}
        </div>

        <div className="grid grid-cols-1 gap-12">
          {filtered.map((study, index) => <motion.div key={study.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[color:var(--vibrant-green)] transition-colors group">
              <Link to={`/case-studies/${study.id}`} className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-gray-800">
                  <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 rounded-full bg-[color:var(--vibrant-green)] text-black text-xs font-bold">
                      {study.industry}
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[color:var(--vibrant-green)] transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-2">
                    Client:{' '}
                    <span className="text-white font-semibold">
                      {study.client}
                    </span>
                  </p>

                  <div className="space-y-4 my-6">
                    <div>
                      <h3 className="text-gray-400 text-xs uppercase font-bold mb-1">
                        Challenge
                      </h3>
                      <p className="text-gray-300 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-xs uppercase font-bold mb-1">
                        Solution
                      </h3>
                      <p className="text-gray-300 text-sm">{study.solution}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <BarChart className="text-[color:var(--vibrant-green)]" size={24} />
                      <div className="text-2xl font-bold text-white">
                        {study.result}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[color:var(--vibrant-green)] font-bold group-hover:gap-4 transition-all">
                      Read Full Story{' '}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>)}
        </div>
      </div>
    </main>;
}