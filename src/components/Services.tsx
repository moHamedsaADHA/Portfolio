import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Server, Shield, Sun, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';

const services = [
  {
    title: 'Full-Stack Web Apps',
    desc: 'Scalable, secure, and high-performance apps built with the MEAN/MERN stack.',
    icon: Code,
  },
  {
    title: 'Responsive Websites with Modern UI/UX',
    desc: 'Pixel-perfect, fully responsive designs using Tailwind CSS and Figma prototypes.',
    icon: Palette,
  },
  {
    title: 'RESTful APIs & Dashboard Development',
    desc: 'Endpoints, analytics dashboards, and admin panels with clean architecture.',
    icon: Server,
  },
  {
    title: 'Auth Systems (JWT, Role-based)',
    desc: 'Secure login, user roles, and session management for modern web apps.',
    icon: Shield,
  },
  {
    title: 'Dark/Light Mode Integration',
    desc: 'Elegant UI themes with instant toggle and saved preferences.',
    icon: Sun,
  },
  {
    title: 'Problem Solving Training (C++)',
    desc: 'Competitive programming and algorithmic problem-solving mentorship.',
    icon: BookOpen,
  },
];

export function Services() {
  const { actualTheme } = useTheme();

  return (
    <section id="services" className="py-12 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">My Services</h2>
          <p className="mt-3 text-muted-foreground">Turning ideas into powerful digital experiences</p>
          <motion.div
            className="h-1 mx-auto mt-4 w-40 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-sm"
            animate={{ scaleX: [0, 1, 1] }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((s, i) => {
            const Icon = s.icon as any;
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { delay: i * 0.12 } }
                }}
                className={`p-6 rounded-2xl border border-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.12)] ${actualTheme === 'light' ? 'bg-white/5' : 'bg-[#03040a]/60'}`}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-glow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-cyan-300 font-semibold text-lg">{s.title}</h4>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Special Offers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="p-4 rounded-xl border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(0,170,255,0.06)] text-center glass-card">
            <div className="text-lg font-semibold mb-2">Special Offers</div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-3 py-2 rounded-md bg-gradient-to-r from-white/5 to-white/3">✨ Free revisions (7 days)</div>
              <div className="px-3 py-2 rounded-md bg-gradient-to-r from-white/5 to-white/3">⚡ Fast delivery</div>
              <div className="px-3 py-2 rounded-md bg-gradient-to-r from-white/5 to-white/3">🤝 Full support</div>
              <div className="px-3 py-2 rounded-md bg-gradient-to-r from-white/5 to-white/3">📌 Customized solutions</div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Me */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <h3 className="text-2xl font-semibold gradient-text mb-6">Why Choose Me</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Clean, Maintainable Code',
              '100% Client Satisfaction',
              'Strong Problem-Solving Skills',
              'Ongoing Support After Delivery'
            ].map((b, idx) => (
              <motion.div key={b} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.12 }} className="px-4 py-2 rounded-full bg-[#081018]/50 text-sm font-medium shadow-glow">
                {b}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="mb-4 text-lg font-semibold">Let’s Build Something Extraordinary Together.</div>
          <Button variant="default" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-black px-6 py-3 rounded-full hover:scale-105 animate-pulse-slow" onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Hire Me</Button>
        </motion.div>

        {/* Optional tech logos backdrop (subtle) */}
        <div className="pointer-events-none mt-6 relative h-12">
          <div className="absolute left-1/4 top-0 opacity-30 blur-sm">{/* Placeholder for floating logos */}</div>
        </div>

      </div>
    </section>
  );
}
