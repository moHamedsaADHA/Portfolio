import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Users, Trophy } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const stats = [
  { icon: Trophy, label: 'Years Experience', value: '2+' },
  { icon: Code, label: 'Projects Completed', value: '+20' },
  { icon: Palette, label: 'UI/UX Projects', value: '+2' },
  { icon: Users, label: 'Happy Clients', value: '10+' },
];

export function About() {
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
            and 2 specialized front/back projects), I deliver scalable and responsive applications using the MEAN stack. 
            Skilled in UI/UX, HTML5, CSS3, JavaScript, TypeScript, Node.js, and MongoDB. Certified in English (B2) 
            and multiple technical courses. Passionate about problem-solving, creative design, teamwork, and building 
            modern digital products that make a real impact.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-card text-center group hover:shadow-accent-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-cosmic mb-4 group-hover:animate-pulse-glow">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
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
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-2 sm:px-4 glass-card rounded-full text-xs sm:text-sm font-medium hover:shadow-accent-glow transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}