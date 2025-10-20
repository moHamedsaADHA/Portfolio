import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Calendar, Users, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const projects = [
  {
    id: 1,
    title: 'Is-Used Marketplace',
    role: 'Backend Developer',
    duration: '50+ hours',
    description: 'Backend architecture for a marketplace enabling new & used product listings with secure authentication.',
    fullDescription: 'Comprehensive backend solution for a marketplace platform featuring secure user authentication, product listing management, and optimized database queries. Built with Node.js, Express, and MongoDB with JWT authentication and RESTful API design.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    type: 'Full-Stack',
    status: 'Completed',
    features: ['User Authentication', 'Product Management', 'Secure API', 'Database Optimization']
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    role: 'Full-Stack Developer',
    duration: '40+ hours',
    description: 'Complete attendance management system with real-time tracking and reporting dashboard.',
    fullDescription: 'Advanced attendance management system featuring real-time check-in/out functionality, comprehensive reporting dashboard, and automated notifications. Built with Angular frontend and Node.js backend.',
    technologies: ['Angular', 'Node.js' ,'Express.js', 'MongoDB', 'WebSocket'],
    type: 'Full-Stack',
    status: 'Completed',
    features: ['Real-time Tracking', 'Dashboard Analytics', 'Automated Reports', 'Notification System']
  },
  {
    id: 3,
    title: 'Professional Portfolio',
    role: 'Frontend Developer',
    duration: '30+ hours',
    description: 'Modern responsive portfolio website with dark/light mode and smooth animations.',
    fullDescription: 'Sleek portfolio website featuring responsive design, dark/light mode toggle, smooth animations, and optimized performance. Built with modern web technologies and best practices.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    type: 'Frontend',
    status: 'Completed',
    features: ['Responsive Design', 'Dark/Light Mode', 'Smooth Animations', 'SEO Optimized']
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    role: 'Full-Stack Developer',
    duration: '60+ hours',
    description: 'Feature-rich chat application with real-time messaging, file sharing, and group chats.',
    fullDescription: 'Comprehensive chat application with real-time messaging capabilities, file sharing, group chat functionality, and user presence indicators. Features end-to-end encryption and message history.',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    type: 'Full-Stack',
    status: 'Completed',
    features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'Message Encryption']
  },
  {
    id: 5,
    title: 'AI-Powered Mini Project',
    role: 'Frontend Developer',
    duration: '25+ hours',
    description: 'Interactive AI-powered application with machine learning integration and modern UI.',
    fullDescription: 'Innovative AI application featuring machine learning integration, natural language processing, and intuitive user interface. Demonstrates advanced frontend techniques and API integration.',
    technologies: ['React', 'Python API', 'TensorFlow.js', 'Chart.js'],
    type: 'AI/ML',
    status: 'Completed',
    features: ['AI Integration', 'Data Visualization', 'Interactive UI', 'Real-time Processing']
  },
  {
    id: 6,
    title: 'Cinema Database System',
    role: 'Backend Developer',
    duration: '45+ hours',
    description: 'Comprehensive cinema management system with booking functionality and admin panel.',
    fullDescription: 'Complete cinema management solution featuring movie scheduling, ticket booking, seat selection, and administrative dashboard. Includes payment integration and reporting capabilities.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe API'],
    type: 'Full-Stack',
    status: 'Completed',
    features: ['Booking System', 'Payment Integration', 'Admin Dashboard', 'Reporting']
  }
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            A showcase of my latest work, featuring full-stack applications, 
            modern web technologies, and innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="glass-card group hover:shadow-accent-glow transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="glass-card">
                      {project.type}
                    </Badge>
                    <Badge 
                      variant={project.status === 'Completed' ? 'default' : 'secondary'}
                      className="glass-card"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="gradient-text group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {project.role} • {project.duration}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 glass-card hover:shadow-accent-glow transition-all duration-300"
                          onClick={() => setSelectedProject(project)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <DialogTitle className="text-2xl gradient-text">
                                {project.title}
                              </DialogTitle>
                              <p className="text-muted-foreground mt-2">
                                {project.role} • {project.duration}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="glass-card">
                                {project.type}
                              </Badge>
                              <Badge 
                                variant={project.status === 'Completed' ? 'default' : 'secondary'}
                                className="glass-card"
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Project Overview</h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {project.fullDescription}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Key Features</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {project.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-accent" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="glass-card hover:shadow-accent-glow transition-all duration-300"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}