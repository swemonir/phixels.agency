import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, DollarSign, CheckCircle, ArrowLeft, Upload, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
export function JobDetailPage() {
  const {
    id
  } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: {
          y: 0.6
        }
      });
    }, 1500);
  };
  return <main className="bg-[#050505] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/career" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Careers
        </Link>

        <div className="mb-12 border-b border-white/10 pb-12">
          <div className="text-[color:var(--bright-red)] font-bold mb-4 uppercase tracking-widest text-sm">
            Engineering Team
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Senior React Native Engineer
          </h1>
          <div className="flex flex-wrap gap-6 text-gray-400">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <MapPin size={18} className="text-[color:var(--bright-red)]" />{' '}
              Remote / Dhaka
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <Clock size={18} className="text-[color:var(--neon-yellow)]" />{' '}
              Full Time
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <DollarSign size={18} className="text-[color:var(--vibrant-green)]" />{' '}
              $60k - $90k / year
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                About the Role
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                We are looking for an experienced React Native engineer to lead
                our mobile development initiatives. You will be responsible for
                architecting and building high-performance mobile applications
                for our enterprise clients. You'll work directly with our CTO
                and design team to push the boundaries of what's possible on
                mobile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-4">
                {['Architect and build scalable React Native applications', 'Collaborate with UI/UX designers to implement pixel-perfect designs', 'Optimize application performance and resolve bottlenecks', 'Mentor junior developers and conduct code reviews', 'Research and implement new mobile technologies'].map((item, i) => <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-[color:var(--vibrant-green)] shrink-0 mt-1" />
                    {item}
                  </li>)}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-4">
                {['5+ years of experience in mobile development', 'Strong proficiency in React Native and TypeScript', 'Experience with native modules (Swift/Kotlin)', 'Knowledge of state management (Redux/Zustand)', 'Experience with CI/CD pipelines for mobile'].map((item, i) => <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-[color:var(--bright-red)] shrink-0 mt-1" />
                    {item}
                  </li>)}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 sticky top-32 backdrop-blur-sm">
              {!isSuccess ? <>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Apply Now
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    Join our team and build the future.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">
                        Full Name
                      </label>
                      <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">
                        Email
                      </label>
                      <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">
                        Portfolio / GitHub
                      </label>
                      <input type="url" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" placeholder="https://github.com/johndoe" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">
                        Upload Resume (PDF)
                      </label>
                      <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-upload" />
                      <label htmlFor="resume-upload" className="block border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[color:var(--bright-red)]/50 hover:bg-white/5 transition-all cursor-pointer group">
                        <Upload className="mx-auto mb-2 text-gray-500 group-hover:text-white transition-colors" size={24} />
                        <div className="text-sm text-gray-400 group-hover:text-white">
                          {resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}
                        </div>
                      </label>
                    </div>

                    <Button type="submit" className="w-full mt-4" variant="primary" glow disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </> : <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="text-center py-10">
                  <div className="w-20 h-20 bg-[color:var(--vibrant-green)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[color:var(--vibrant-green)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Application Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thanks for applying. We'll review your application and get
                    back to you shortly.
                  </p>
                </motion.div>}
            </div>
          </div>
        </div>
      </div>
    </main>;
}