import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Server, Globe, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend Development',
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 88 },
  { name: 'Angular', level: 65 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 }
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Server,
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 87 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Authentication (JWT)', level: 82 },
      { name: 'C++', level: 75 }
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Database,
    title: 'Database & Tools',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Git & Version Control', level: 88 },
      { name: 'Postman', level: 90 },
      { name: 'Docker', level: 70 }
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Palette,
    title: 'Design & UI/UX',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Responsive Design', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'User Experience', level: 80 }
    ],
    color: 'from-orange-500 to-red-500'
  }
];

const softSkills = [
  'Problem Solving',
  'Teamwork',
  'Project Management',
  'Communication',
  'Time Management',
  'Creative Thinking',
  'Attention to Detail',
  'Adaptability'
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            A comprehensive overview of my technical skills and competencies, 
            continuously evolving with the latest technologies and best practices.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card group hover:shadow-accent-glow transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} group-hover:animate-pulse-glow`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="gradient-text">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Soft Skills & Personal Qualities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="glass-card text-sm py-2 px-4 hover:shadow-accent-glow transition-all duration-300 cursor-default"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Certifications & Training
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'English (B2 Level)', issuer: 'Cambridge Assessment', year: '2024' },
              { title: 'UI/UX Design with Figma', issuer: 'Dandara Al Ebdaa', hours: '40+ Hours' },
              { title: 'Freelancing Fundamentals', issuer: 'Dandara Al Ebdaa', hours: '14+ Hours' },
              { title: 'Node.js Advanced', issuer: 'Dandara Al Ebdaa', hours: '180+ Hours' },
              { title: 'SQL SERVER', issuer: 'ITI Training', hours: '40+ Hours' },
              { title: 'MEAN Stack Development', issuer: 'NTI Training', hours: '210+ Hours' }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-card hover:shadow-accent-glow transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold gradient-text mb-2">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                    <p className="text-xs text-accent">{cert.year || cert.hours}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}