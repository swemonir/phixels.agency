import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, CheckCircle, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProfessionalReviewCarousel } from '../components/ProfessionalReviewCarousel';
function Counter({
  value,
  suffix = ''
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>
      {count}
      {suffix}
    </span>;
}
export function CaseStudyDetailPage() {
  const {
    id
  } = useParams();
  const caseStudy = {
    client: 'Global Logistics Co',
    industry: 'Supply Chain & Logistics',
    title: 'Optimizing Last-Mile Delivery with AI-Powered Routing',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    duration: '6 months',
    date: 'Completed Dec 2025',
    challenge: {
      title: 'The Challenge',
      description: 'Global Logistics Co was facing significant operational inefficiencies in their last-mile delivery operations. Rising fuel costs, unpredictable delivery times, and customer dissatisfaction were threatening their market position.',
      points: ['30% of deliveries were delayed due to poor route planning', 'Fuel costs were 40% higher than industry average', 'Customer satisfaction scores dropped to 3.2/5', 'Manual route planning took 2-3 hours daily per dispatcher']
    },
    solution: {
      title: 'Our Solution',
      description: 'We developed an AI-powered routing engine integrated with real-time traffic data, weather forecasts, and historical delivery patterns. The system automatically optimizes routes and provides drivers with turn-by-turn navigation through a custom mobile app.',
      technologies: ['Python', 'TensorFlow', 'React Native', 'AWS', 'PostgreSQL', 'Redis'],
      features: ['Real-time route optimization using machine learning', 'Predictive delivery time estimates with 95% accuracy', 'Driver mobile app with offline capability', 'Admin dashboard for fleet management', 'Integration with existing ERP system']
    },
    results: [{
      metric: 30,
      suffix: '%',
      label: 'Reduction in Fuel Costs',
      icon: DollarSign,
      color: 'text-green-400'
    }, {
      metric: 45,
      suffix: '%',
      label: 'Faster Delivery Times',
      icon: TrendingUp,
      color: 'text-blue-400'
    }, {
      metric: 4.8,
      suffix: '/5',
      label: 'Customer Satisfaction',
      icon: Users,
      color: 'text-yellow-400'
    }, {
      metric: 2,
      suffix: 'hrs',
      label: 'Time Saved Daily',
      icon: Clock,
      color: 'text-purple-400'
    }],
    images: ['https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80']
  };
  return <main className="bg-[#050505] min-h-screen pt-40 pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-8">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Case Studies</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="pt-4">
            <div className="inline-block px-4 py-1 rounded-full bg-[color:var(--vibrant-green)]/10 text-[color:var(--vibrant-green)] text-sm font-bold mb-6">
              {caseStudy.industry}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Client:{' '}
              <span className="text-white font-semibold">
                {caseStudy.client}
              </span>
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[color:var(--bright-red)]" />
                <span>{caseStudy.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[color:var(--bright-red)]" />
                <span>{caseStudy.duration}</span>
              </div>
            </div>

            <Button variant="primary" triggerPopup className="px-8 py-4">
              Start Your Project
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
              <img src={caseStudy.heroImage} alt={caseStudy.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[color:var(--bright-red)] rounded-full blur-[100px] opacity-30" />
          </div>
        </motion.div>
      </section>

      {/* Challenge */}
      <section className="bg-white/5 py-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[color:var(--bright-red)]">
              {caseStudy.challenge.title}
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {caseStudy.challenge.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.challenge.points.map((point, index) => <div key={index} className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[color:var(--bright-red)]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[color:var(--bright-red)]" />
                  </div>
                  <span className="text-gray-300">{point}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[color:var(--vibrant-green)]">
            {caseStudy.solution.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {caseStudy.solution.description}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <div className="space-y-3">
              {caseStudy.solution.features.map((feature, index) => <div key={index} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[color:var(--vibrant-green)] shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>)}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {caseStudy.solution.technologies.map(tech => <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                  {tech}
                </span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudy.images.map((img, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="aspect-video rounded-xl overflow-hidden border border-white/10">
              <img src={img} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>)}
        </div>
      </section>

      {/* Results - Improved Background */}
      <section className="relative py-20 mb-20 overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--bright-red)] rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Measurable Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 ${result.color}`}>
                  <result.icon size={32} />
                </div>
                <div className="text-4xl font-bold mb-2 text-white">
                  <Counter value={result.metric} suffix={result.suffix} />
                </div>
                <div className="text-gray-300">{result.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* New Professional Review Carousel Section */}
      <ProfessionalReviewCarousel />

      {/* CTA - Classic Style */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--deep-navy)]/20 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results with our
              expert solutions.
            </p>
            <Button variant="primary" triggerPopup className="px-10 py-5 text-lg">
              Start Your Project Today <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </main>;
}