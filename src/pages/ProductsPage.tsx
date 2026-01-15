import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Smartphone, Globe, Chrome, Star, Users, Download, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CountUpStats } from '../components/CountUpStats';
const allProducts = [{
  id: 'devmark',
  name: 'DevMark',
  tagline: 'Code snippet manager & markdown editor',
  description: 'The ultimate tool for developers to organize, share, and collaborate on code snippets with built-in markdown support and syntax highlighting.',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  platform: 'Web',
  link: 'https://devmark.app',
  icon: Globe,
  color: 'from-blue-500 to-cyan-500',
  stats: {
    users: '50K+',
    rating: 4.8,
    downloads: '100K+'
  },
  features: ['Syntax Highlighting', 'Team Collaboration', 'Cloud Sync', 'Version Control'],
  category: 'Developer Tools'
}, {
  id: 'masterapp',
  name: 'MasterApp',
  tagline: 'All-in-one productivity suite',
  description: 'Streamline your workflow with our comprehensive productivity platform featuring task management, time tracking, and team collaboration tools.',
  image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
  platform: 'Android',
  link: 'https://play.google.com/store',
  icon: Smartphone,
  color: 'from-green-500 to-emerald-500',
  stats: {
    users: '200K+',
    rating: 4.9,
    downloads: '500K+'
  },
  features: ['Task Management', 'Time Tracking', 'Analytics', 'Integrations'],
  category: 'Productivity'
}, {
  id: 'myfamily',
  name: 'My Family',
  tagline: 'Private family network & organizer',
  description: 'Keep your family connected with a secure, private social network designed for sharing moments, coordinating schedules, and staying in touch.',
  image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
  platform: 'iOS',
  link: 'https://apps.apple.com',
  icon: Smartphone,
  color: 'from-pink-500 to-rose-500',
  stats: {
    users: '150K+',
    rating: 4.7,
    downloads: '300K+'
  },
  features: ['Private Sharing', 'Calendar Sync', 'Photo Albums', 'Location Sharing'],
  category: 'Social'
}, {
  id: 'taskflow',
  name: 'TaskFlow Pro',
  tagline: 'AI-powered task prioritization',
  description: 'Smart task management that learns from your habits and automatically prioritizes your work for maximum productivity.',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  platform: 'Chrome',
  link: 'https://chrome.google.com/webstore',
  icon: Chrome,
  color: 'from-purple-500 to-violet-500',
  stats: {
    users: '75K+',
    rating: 4.6,
    downloads: '150K+'
  },
  features: ['AI Prioritization', 'Browser Integration', 'Smart Reminders', 'Focus Mode'],
  category: 'Productivity'
}, {
  id: 'financeai',
  name: 'FinanceAI',
  tagline: 'Smart personal finance tracker',
  description: 'Take control of your finances with AI-powered insights, budget tracking, and investment recommendations tailored to your goals.',
  image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
  platform: 'Web',
  link: 'https://financeai.app',
  icon: Globe,
  color: 'from-yellow-500 to-orange-500',
  stats: {
    users: '120K+',
    rating: 4.8,
    downloads: '250K+'
  },
  features: ['Budget Tracking', 'Investment Insights', 'Bill Reminders', 'Expense Analytics'],
  category: 'Finance'
}, {
  id: 'healthmate',
  name: 'HealthMate',
  tagline: 'Wellness tracking with AI coach',
  description: 'Your personal health companion with AI-powered coaching, fitness tracking, and personalized wellness recommendations.',
  image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  platform: 'Android',
  link: 'https://play.google.com/store',
  icon: Smartphone,
  color: 'from-red-500 to-pink-500',
  stats: {
    users: '300K+',
    rating: 4.9,
    downloads: '600K+'
  },
  features: ['AI Health Coach', 'Fitness Tracking', 'Meal Planning', 'Sleep Analysis'],
  category: 'Health'
}, {
  id: 'cryptosync',
  name: 'CryptoSync',
  tagline: 'Real-time portfolio aggregator',
  description: 'Track all your crypto investments in one place with real-time updates, portfolio analytics, and market insights.',
  image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
  platform: 'Web',
  link: '#',
  icon: Globe,
  color: 'from-indigo-500 to-purple-500',
  stats: {
    users: '90K+',
    rating: 4.5,
    downloads: '180K+'
  },
  features: ['Multi-Exchange Support', 'Real-time Tracking', 'Tax Reports', 'Price Alerts'],
  category: 'Finance'
}, {
  id: 'edulearn',
  name: 'EduLearn',
  tagline: 'Interactive learning for kids',
  description: 'Make learning fun with interactive lessons, games, and progress tracking designed specifically for young learners.',
  image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
  platform: 'iOS',
  link: '#',
  icon: Smartphone,
  color: 'from-orange-500 to-red-500',
  stats: {
    users: '250K+',
    rating: 4.9,
    downloads: '500K+'
  },
  features: ['Interactive Lessons', 'Progress Tracking', 'Parental Controls', 'Offline Mode'],
  category: 'Education'
}, {
  id: 'travelmate',
  name: 'TravelMate',
  tagline: 'AI travel planning assistant',
  description: 'Plan your perfect trip with AI-powered recommendations, itinerary management, and real-time travel updates.',
  image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  platform: 'Web',
  link: '#',
  icon: Globe,
  color: 'from-teal-500 to-cyan-500',
  stats: {
    users: '180K+',
    rating: 4.7,
    downloads: '350K+'
  },
  features: ['AI Recommendations', 'Itinerary Builder', 'Booking Integration', 'Offline Maps'],
  category: 'Travel'
}, {
  id: 'musicpro',
  name: 'MusicPro',
  tagline: 'Professional music production',
  description: 'Create, edit, and produce professional-quality music with our comprehensive DAW and audio editing suite.',
  image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
  platform: 'Chrome',
  link: '#',
  icon: Chrome,
  color: 'from-violet-500 to-purple-500',
  stats: {
    users: '95K+',
    rating: 4.6,
    downloads: '200K+'
  },
  features: ['Multi-track Recording', 'VST Support', 'Audio Effects', 'Cloud Collaboration'],
  category: 'Creative'
}, {
  id: 'petcare',
  name: 'PetCare Plus',
  tagline: 'Complete pet health management',
  description: "Track your pet's health, schedule vet appointments, and get personalized care recommendations.",
  image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80',
  platform: 'Android',
  link: '#',
  icon: Smartphone,
  color: 'from-amber-500 to-orange-500',
  stats: {
    users: '220K+',
    rating: 4.8,
    downloads: '450K+'
  },
  features: ['Health Tracking', 'Vet Appointments', 'Medication Reminders', 'Pet Community'],
  category: 'Lifestyle'
}, {
  id: 'homechef',
  name: 'HomeChef AI',
  tagline: 'Smart recipe & meal planning',
  description: 'Discover recipes, plan meals, and get cooking instructions with AI-powered personalization based on your preferences.',
  image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
  platform: 'iOS',
  link: '#',
  icon: Smartphone,
  color: 'from-rose-500 to-pink-500',
  stats: {
    users: '280K+',
    rating: 4.9,
    downloads: '550K+'
  },
  features: ['Recipe Discovery', 'Meal Planning', 'Shopping Lists', 'Nutrition Tracking'],
  category: 'Lifestyle'
}];
const categories = ['All', 'Developer Tools', 'Productivity', 'Social', 'Finance', 'Health', 'Education', 'Travel', 'Creative', 'Lifestyle'];
export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    scrollY
  } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const filteredProducts = selectedCategory === 'All' ? allProducts : allProducts.filter(p => p.category === selectedCategory);
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20 overflow-hidden">
      {/* Hero-like Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div className="text-center mb-20" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[color:var(--neon-yellow)] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Our Product Portfolio
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            Digital Products That <br />
            <span className="text-gradient">Scale & Succeed</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Innovative solutions built by our team, trusted by thousands of
            users worldwide. From concept to market leader.
          </p>
        </motion.div>

        {/* Floating Stats Cards */}
        <motion.div style={{
        y: y1
      }} className="absolute top-32 left-[5%] hidden lg:block" whileHover={{
        scale: 1.1
      }}>
          <div className="glass-panel p-5 rounded-xl border-l-4 border-[color:var(--vibrant-green)] shadow-[0_0_20px_rgba(0,205,73,0.2)]">
            <div className="text-xs text-gray-400 mb-1">Active Users</div>
            <div className="text-3xl font-bold text-white">
              <CountUpStats end={1.2} suffix="M+" />
            </div>
          </div>
        </motion.div>

        <motion.div style={{
        y: y2
      }} className="absolute top-48 right-[5%] hidden lg:block" whileHover={{
        scale: 1.1
      }}>
          <div className="glass-panel p-5 rounded-xl border-l-4 border-[color:var(--bright-red)] shadow-[0_0_20px_rgba(237,31,36,0.2)]">
            <div className="text-xs text-gray-400 mb-1">Avg Rating</div>
            <div className="text-3xl font-bold text-white flex items-center gap-1">
              <CountUpStats end={4.8} />{' '}
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[{
          icon: Users,
          label: 'Active Users',
          value: 1.2,
          suffix: 'M+'
        }, {
          icon: Download,
          label: 'Total Downloads',
          value: 2.5,
          suffix: 'M+'
        }, {
          icon: Star,
          label: 'Average Rating',
          value: 4.8,
          suffix: ''
        }, {
          icon: TrendingUp,
          label: 'Growth Rate',
          value: 150,
          suffix: '%'
        }].map((stat, i) => <motion.div key={i} initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.3 + i * 0.1
        }} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-white/20 transition-colors">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[color:var(--bright-red)]/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[color:var(--bright-red)]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <CountUpStats end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>)}
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-[color:var(--bright-red)] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}>
              {cat}
            </button>)}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProducts.map((product, index) => <motion.div key={product.id} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5 + index * 0.1
        }} className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[color:var(--bright-red)] transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <Link to={`/products/${product.id}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-2">
                    <product.icon size={12} className="text-white" />
                    <span className="text-xs text-white font-bold">
                      {product.platform}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[color:var(--bright-red)] text-white text-xs font-bold">
                    {product.category}
                  </div>
                </div>

                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[color:var(--bright-red)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-400">
                        {product.stats.users}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-400">
                        {product.stats.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-400">
                        {product.stats.downloads}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature, i) => <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                        {feature}
                      </span>)}
                  </div>
                </div>
              </Link>

              <div className="relative z-10 px-6 pb-6">
                <a href={product.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[color:var(--bright-red)] text-white font-bold hover:bg-[color:var(--bright-red)]/90 transition-colors group/btn">
                  Launch Product
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>)}
        </div>

        {/* CTA Section - Classic Style */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-[#0A0A0A] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/20 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Have a Product Idea?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's build the next big thing together. Our team specializes in
              turning ideas into successful digital products.
            </p>
            <Button variant="primary" glow triggerPopup className="text-lg px-8 py-4">
              Start Your Project <ArrowRight className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </main>;
}