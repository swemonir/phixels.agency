import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const reviews = [{
  id: 1,
  name: 'Sarah Jenkins',
  role: 'CTO, TechFlow',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  content: "The attention to detail and technical expertise Phixels brought to our project was unmatched. They didn't just build a product; they engineered a solution.",
  rating: 5
}, {
  id: 2,
  name: 'David Chen',
  role: 'Founder, StartUp Inc',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  content: 'Incredible workflow and communication. The team felt like a true extension of our own. The final delivery exceeded all our expectations.',
  rating: 5
}, {
  id: 3,
  name: 'Elena Rodriguez',
  role: 'Product Lead, Innovate',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
  content: "We've worked with many agencies, but Phixels stands out. Their design-first approach combined with robust engineering is a game changer.",
  rating: 5
}, {
  id: 4,
  name: 'Michael Chang',
  role: 'Director, FutureScale',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  content: 'Professional, timely, and incredibly talented. They transformed our vague requirements into a polished, market-ready platform.',
  rating: 5
}, {
  id: 5,
  name: 'Jessica Thompson',
  role: 'CEO, CreativeMinds',
  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  content: "The ROI we've seen since launching the new platform has been phenomenal. Phixels understands both business goals and user needs.",
  rating: 5
}, {
  id: 6,
  name: 'Robert Wilson',
  role: 'VP Engineering, SoftSys',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  content: "Clean code, scalable architecture, and stunning UI. It's rare to find a team that excels at both frontend and backend so seamlessly.",
  rating: 5
}, {
  id: 7,
  name: 'Amanda White',
  role: 'Marketing Head, GrowthX',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
  content: 'They helped us rebrand and launch in record time. The feedback from our customers has been overwhelmingly positive.',
  rating: 5
}, {
  id: 8,
  name: 'Thomas Anderson',
  role: 'Co-founder, MatrixSol',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
  content: 'A partnership that truly drives value. Phixels is not just a vendor; they are strategic partners in our success story.',
  rating: 5
}];
export function CaseStudyReviews() {
  return <section className="py-24 bg-[#050505] overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[color:var(--deep-navy)]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[color:var(--deep-red)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Trusted by Visionaries
          </h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it. Here's what our partners have to
            say about their journey with us.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Carousel - Right to Left */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <motion.div className="flex gap-6 py-4" animate={{
        x: ['0%', '-50%']
      }} transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 40,
          ease: 'linear'
        }
      }}>
          {[...reviews, ...reviews, ...reviews].map((review, index) => <motion.div key={`${review.id}-${index}`} className="flex-shrink-0 w-[380px] md:w-[420px] p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 backdrop-blur-sm relative group cursor-pointer" whileHover={{
          scale: 1.02,
          y: -4
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}>
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => <motion.div key={i} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: i * 0.1
            }}>
                    <Star size={18} className="fill-[color:var(--neon-yellow)] text-[color:var(--neon-yellow)]" />
                  </motion.div>)}
              </div>

              {/* Review Content */}
              <p className="text-gray-300 mb-8 leading-relaxed text-base">
                "{review.content}"
              </p>

              {/* Profile Section */}
              <div className="flex items-center gap-4">
                {/* Profile Image with Gradient Border */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0A0A0A]" />
                  </div>
                  <img src={review.image} alt={review.name} className="relative w-14 h-14 rounded-full object-cover border-2 border-transparent" style={{
                background: 'linear-gradient(135deg, var(--bright-red), var(--neon-yellow), var(--vibrant-green))',
                padding: '2px'
              }} />
                </div>

                <div>
                  <div className="text-white font-bold text-base">
                    {review.name}
                  </div>
                  <div className="text-sm text-[color:var(--bright-red)] font-medium">
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}