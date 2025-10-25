import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Code, Palette, Users, Trophy } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const stats = [
  { icon: Trophy, label: 'Years Experience', value: '2+' },
  { icon: Code, label: 'Projects Completed', value: '+20' },
  { icon: Palette, label: 'UI/UX Projects', value: '+2' },
  { icon: Users, label: 'Happy Clients', value: '10+' },
];

export function About() {
  const items = [
    { title: 'English (B2 Level)', org: 'Full Learn English', details: 'Achieved CEFR Level B2 with excellent performance in Reading and Listening. Demonstrated strong communication and writing skills.', date: '2024' },
    {
      title: 'Bachelor of Computer Science & Artificial Intelligence (2024–2028)',
      org: 'South Valley National University – Faculty of Computers & AI, Qena, Egypt',
      details:
        'Relevant Coursework: Data Structures & Algorithms, OOP, DBMS, Software Engineering, Web Development, AI Fundamentals. Achievements: National Programming Competitions, Academic Excellence Award.'
    },
    {
      title: 'Competitions & Certifications (2024–2025)',
      details:
        'Participated in Dandara Al Ebdaa training program: UI/UX Design using Figma (+40h). Node.js & MongoDB (+180h). Developed strong full-stack and problem-solving skills.'
    },
    { title: 'SQL Server (2024–2025)', org: 'ITI Training', details: '40+ Hours — SQL queries, normalization, stored procedures, optimization.' },
    { title: 'NTI Training Program (2025–2026)', org: 'National Telecommunication Institute', details: '+210h, MERN stack, 3 projects (2 accepted).' },
    { title: 'Competitions (2023–2024)', org: 'ICPC 2023 Participant', details: 'Algorithmic thinking and teamwork.' },
    { title: 'Freelancing Fundamentals (2024)', org: 'Dandara Al Ebdaa', details: '14+ Hours — client communication and freelancing principles.' },
  ];

  const lineControls = useAnimation();
  const cardControls = useAnimation();
  const { actualTheme } = useTheme();

  const timelineCardBase = `backdrop-blur-sm p-6 rounded-xl transition-all duration-300`;
  const timelineCardDark = `bg-[#03040a]/70 border border-white/5 hover:shadow-[0_0_30px_rgba(0,170,255,0.15)]`;
  const timelineCardLight = `bg-white/80 border border-gray-200 text-gray-900 shadow-sm`;
  // make very dark text in light mode
  const timelineCardLightWithBlackText = `${timelineCardLight} text-black`;

  // Core technologies list (kept as an array so we can reorder before rendering)
  const techList = [
    'JavaScript (ES6+)',
    'TypeScript',
    'Basic Angular',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'UI/UX Design',
    'Figma'
  ];

  // Place the longest labels first so they occupy the top row of the grid
  const sortedTechs = [...techList].sort((a, b) => b.length - a.length);

  useEffect(() => {
    // orchestrate staggered entrance on page load
    const STAGGER = 200; // ms
    items.forEach((_, i) => {
      setTimeout(() => {
        // pulse the center line briefly
        lineControls.start({
          boxShadow: [
            '0 0 6px rgba(0,170,255,0.08)',
            '0 0 36px rgba(0,170,255,0.28)',
            '0 0 6px rgba(0,170,255,0.08)'
          ],
          transition: { duration: 3.5 }
        });

        // animate the matching card (using custom prop)
        cardControls.start((custom) => {
          if (!custom || custom.index !== i) return {};
          return {
            opacity: 1,
            scale: 1,
            x: 0,
            y: [20, 0],
            transition: { type: 'spring', stiffness: 120, damping: 18 }
          };
        });
      }, i * STAGGER);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed">
            With 2+ years of freelance experience and 14 completed projects (including 12 full-stack web applications 
            and 2 specialized front/back projects), I deliver scalable and responsive applications using the MERN stack. 
            Skilled in UI/UX, HTML5, CSS3, JavaScript, TypeScript, Node.js, and MongoDB. Certified in English (B2) 
            and multiple technical courses. Passionate about problem-solving, creative design, teamwork, and building 
            modern digital products that make a real impact.
          </p>
        </motion.div>

        {/* Skills Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Core Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 justify-items-center">
            {sortedTechs.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-5 py-3 sm:px-6 sm:py-3 glass-card rounded-lg text-sm sm:text-base font-semibold hover:shadow-accent-glow transition-all duration-300 cursor-default flex items-center justify-center text-center"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Training Timeline */}
        <section id="certifications" className="mt-20 relative">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Certifications & Training Timeline
            </span>
          </h3>

          <div className="relative max-w-6xl mx-auto px-4 py-6">
            {/* center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 transform -translate-x-1/2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-b from-cyan-400 to-blue-600"
                initial={{ boxShadow: '0 0 6px rgba(0, 0, 0, 0.08)' }}
                animate={lineControls}
              />
            </div>

            {/* mobile thin line */}
            <div className="md:hidden absolute left-1/2 top-0 w-1.5 h-full transform -translate-x-1/2">
              <div className="h-full rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(0,170,255,0.12)]" />
            </div>

            <div className="flex flex-col gap-12">
              {items.map((item, index) => {
                const isLeft = index % 2 === 0;
                const initialX = isLeft ? 140 : -140; // start from center
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center">
                    {/* Left column */}
                    <div className={`flex justify-center md:justify-end`}>
                      {isLeft ? (
                        <motion.div
                          className="w-full md:w-auto md:max-w-md"
                          initial={{ opacity: 0, scale: 0.8, x: initialX, y: 0 }}
                          animate={cardControls}
                          custom={{ index, isLeft }}
                        >
                          <div className="relative md:mr-8 md:text-right">
                            <div className="hidden md:block absolute right-[-18px] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_16px_rgba(0,170,255,0.4)]" />
                            <motion.article
                              whileHover={{ translateY: -6, boxShadow: '0 8px 30px rgba(0,170,255,0.08)' }}
                              className={`${timelineCardBase} ${actualTheme === 'light' ? timelineCardLightWithBlackText : timelineCardDark}`}
                            >
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="text-cyan-300 font-semibold text-lg">{item.title}</h4>
                                {item.date ? <span className={`text-sm ${actualTheme === 'light' ? 'text-black' : 'text-gray-300'}`}>{item.date}</span> : null}
                              </div>
                              {item.org ? <div className={`${actualTheme === 'light' ? 'text-black' : 'text-sm text-gray-300'} mt-1 italic`}>{item.org}</div> : null}
                              {item.details ? <p className={`${actualTheme === 'light' ? 'text-black' : 'text-sm text-gray-300'} mt-3 leading-relaxed`}>{item.details}</p> : null}
                            </motion.article>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="hidden md:block w-full" />
                      )}
                    </div>

                    {/* center spacer (center line overlays this column) */}
                    <div className="col-span-1" />

                    {/* Right column */}
                    <div className="flex justify-center md:justify-start">
                      {!isLeft ? (
                        <motion.div
                          className="w-full md:w-auto md:max-w-md"
                          initial={{ opacity: 0, scale: 0.8, x: initialX, y: 0 }}
                          animate={cardControls}
                          custom={{ index, isLeft }}
                        >
                          <div className="relative md:ml-8 md:text-left">
                            <div className="hidden md:block absolute left-[-18px] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_16px_rgba(0,170,255,0.4)]" />
                            <motion.article
                              whileHover={{ translateY: -6, boxShadow: '0 8px 30px rgba(0,170,255,0.08)' }}
                              className={`${timelineCardBase} ${actualTheme === 'light' ? timelineCardLightWithBlackText : timelineCardDark}`}
                            >
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="text-cyan-300 font-semibold text-lg">{item.title}</h4>
                                {item.date ? <span className={`text-sm ${actualTheme === 'light' ? 'text-black' : 'text-gray-300'}`}>{item.date}</span> : null}
                              </div>
                              {item.org ? <div className={`${actualTheme === 'light' ? 'text-black' : 'text-sm text-gray-300'} mt-1 italic`}>{item.org}</div> : null}
                              {item.details ? <p className={`${actualTheme === 'light' ? 'text-black' : 'text-sm text-gray-300'} mt-3 leading-relaxed`}>{item.details}</p> : null}
                            </motion.article>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="hidden md:block w-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}