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
    title: 'Is-Used Marketplace — Backend',
    github: 'https://github.com/moHamedsaADHA/is-used-backend-node.js-with-ts-',
    demo: '#',
    role: 'Backend Developer',
    duration: '50+ hours',
    description: 'A production-grade backend architecture for a marketplace platform supporting listing and discovery of new and used products with a focus on secure authentication and optimized API performance.',
    fullDescription: `A production-oriented backend architecture for a marketplace platform that supports listing and discovery of both new (🆕) and used (♻️) products. Built from scratch with clean, layered architecture and strong engineering practices to meet academic standards and real-world production requirements. The system emphasizes secure authentication, clear data modeling, and high-performance REST APIs so buyers and sellers can interact safely and reliably.`,
    // Detailed structured content (JSX) for full display inside the modal
    details: (
      <div>
        <h3 className="text-xl font-semibold mb-3">Is-Used Marketplace — Backend</h3>
        <div className="text-sm text-muted-foreground mb-4">Backend Developer • 50+ hours<br />Backend • Completed</div>

        <h4 className="font-semibold mt-4">Overview</h4>
        <p className="text-muted-foreground leading-relaxed">A production-oriented backend architecture for a marketplace platform that supports listing and discovery of both new and used (♻️) products. Built from scratch with clean, layered architecture and strong engineering practices to meet academic standards and real-world production requirements. The system emphasizes secure authentication, clear data modeling, and high-performance REST APIs so buyers and sellers can interact safely and reliably.</p>

        <h4 className="font-semibold mt-4">Why this project matters</h4>
        <p className="text-muted-foreground leading-relaxed">The platform solves common marketplace problems (trust, data integrity, scalability) by combining proven backend patterns with careful API design. It was accepted into the NTI Scholarship program (National Telecommunication Institute) after being developed and validated end-to-end as an individual project.</p>

        <h4 className="font-semibold mt-4">Key responsibilities (what I delivered)</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Designed and implemented the full backend stack (TypeScript + Node.js) following clean architecture and layered separation (controllers → services → repositories → models).</li>
          <li>Defined robust Mongoose schemas and ERD-driven relationships for Users, Products, Categories, and Transactions.</li>
          <li>Implemented secure authentication (access + refresh tokens) and role-aware endpoints for sellers and buyers.</li>
          <li>Built and documented 25+ REST endpoints covering product browsing, product CRUD, category management, user registration/login, and admin operations.</li>
          <li>Performed comprehensive Postman-based testing, performance tuning of queries, and validation/error handling.</li>
        </ul>

        <h4 className="font-semibold mt-4">User Experience Highlights</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Public browsing: users can freely browse product listings and categories without creating an account.</li>
          <li>Account flows: register, login, and manage a seller/buyer profile to create or buy products.</li>
          <li>Secure sessions: JWT-based authentication (access + refresh tokens) to protect private operations and provide secure, stateless sessions.</li>
          <li>Reliability: full CRUD operations with schema-level validation, descriptive error handling, and input sanitization to prevent common issues.</li>
        </ul>

        <h4 className="font-semibold mt-4">Architecture & Data Modeling</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Clean, layered architecture: clear separation between HTTP controllers, domain services, data repositories and schema models for easier testing and maintenance.</li>
          <li>ERD-first approach: relationships and constraints were visualized in an ERD prior to implementation to ensure data integrity and efficient queries (Users ↔ Products ↔ Categories).</li>
          <li>MongoDB + Mongoose: document modeling with schema validation, indexes on frequently queried fields (category, price, createdAt), and careful use of references vs embedded documents.</li>
        </ul>

        <h4 className="font-semibold mt-4">Security & Auth</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>JWT access/refresh token strategy with token rotation and expiry best practices.</li>
          <li>Passwords hashed with bcrypt.</li>
          <li>Endpoint-level authorization (e.g., only product owners can edit/delete listings).</li>
          <li>Input validation and sanitization to reduce injection/validation risks.</li>
        </ul>

        <h4 className="font-semibold mt-4">API & Performance</h4>
        <p className="text-muted-foreground">RESTful design with consistent resource naming and HTTP verbs. Pagination, filtering, and sorting on product lists (by category, price range, newest, usage duration). Optimized DB access with indexes and projection to reduce payload size.</p>
        <p className="text-muted-foreground mt-2">25+ endpoints including common resources:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>POST /auth/register, POST /auth/login, POST /auth/refresh</li>
          <li>GET /products, GET /products/:id, POST /products, PATCH /products/:id, DELETE /products/:id</li>
          <li>GET /categories, POST /categories</li>
          <li>GET /users/:id, PATCH /users/:id</li>
        </ul>
        <p className="text-muted-foreground">Error handling middleware to return consistent, developer-friendly error payloads.</p>

        <h4 className="font-semibold mt-4">Testing, Documentation & Tooling</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Postman collection with organized requests, environment variables, and example responses to reproduce and test endpoints.</li>
          <li>Manual and automated test scenarios covering happy paths and validation/error flows.</li>
          <li>ERD diagrams and mapping used during design; MongoDB Compass used for live data inspection and query tuning.</li>
          <li>Local dev workflow: TypeScript build checks, Postman-run and MongoDB local/Atlas connection options documented in the README.</li>
        </ul>

        <h4 className="font-semibold mt-4">Acceptance & Recognition</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Selected and accepted into the NTI Scholarship program — project reviewed and validated as meeting professional and academic criteria.</li>
          <li>Built end-to-end individually from design to delivery.</li>
        </ul>

        <h4 className="font-semibold mt-4">Project Metrics & Deliverables</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Development effort: 50+ hours.</li>
          <li>Endpoints: 25+ backend endpoints across users, products, and categories.</li>
          <li>Core datasets: Users, Products (category, price, usage duration, description), Categories, (optional) Transactions/Orders.</li>
          <li>Documentation: Postman collection, ERD diagrams, and in-repo README with setup and test instructions.</li>
        </ul>

        <h4 className="font-semibold mt-4">Notes for reviewers</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Focus on the layered architecture and authentication modules for an understanding of the design decisions.</li>
          <li>The codebase includes Postman collections and ERD diagrams; run Postman or curl against the provided endpoints to verify behavior locally.</li>
          <li>For production readiness, the repo contains notes on environment variables, token expiry configuration, and recommended indexes for MongoDB.</li>
        </ul>

      </div>
    ),
    technologies: ['Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt'],
    type: 'Backend',
    status: 'Completed',
    features: ['Public product browsing', 'Secure JWT access/refresh authentication', 'Robust CRUD with validation', 'ERD-driven data modeling', '25+ REST endpoints', 'Postman-tested endpoints']
  },
  {
    id: 2,
    title: 'DW Education Platform',
    github: 'https://github.com/moHamedsaADHA/Dracode-Courses-Platform-',
    demo: 'https://dracode-courses.vercel.app/',
    role: 'Full-Stack Developer',
    duration: '+100 hours',
    description: 'A modern educational and career development platform that centralizes learning resources, roadmaps, and remote job listings for youth and freelancers.',
    fullDescription: `Dracode Warrior is a modern educational and career development platform built with Next.js (TypeScript), HTML, CSS, Vite, and supporting tooling. It aggregates free and paid courses, learning roadmaps, live and recorded sessions, and curated remote job listings — all accessible without registration to lower barriers for learners and job-seekers. The platform focuses on performance, responsive design, and a clean UX for efficient learning and career growth.`,
    // Detailed structured content (JSX) for full display inside the modal
    details: (
      <div>
        <h3 className="text-xl font-semibold mb-3">DW Education Platform</h3>
        <div className="text-sm text-muted-foreground mb-4">Full-Stack Developer • In Progress<br />Full-Stack • Live</div>

        <h4 className="font-semibold mt-4">Overview</h4>
        <p className="text-muted-foreground leading-relaxed">Dracode Warrior is a modern educational and career development platform built with Next.js (TypeScript), HTML, CSS and Vite. It was created to empower youth by providing essential learning and professional resources in one centralized, easy-to-access platform — with no login required.</p>

        <h4 className="font-semibold mt-4">Key Features</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Free & Paid Courses: Continuously updated collection from trusted educational sources.</li>
          <li>Recorded & Live Sessions: Both pre-recorded content and live sessions for interactive learning.</li>
          <li>Learning Roadmaps: Step-by-step structured guides for mastering tech and business fields.</li>
          <li>Remote Job Listings: Curated opportunities to help users find remote work and internships.</li>
          <li>No Login Required: Immediate access to resources without account creation.</li>
          <li>Dark & Light Mode: Theme support for accessibility and user preference.</li>
          <li>Fully Responsive & Performance Optimized: Built with Vite and modern bundling for fast load times.</li>
        </ul>

        <h4 className="font-semibold mt-2 mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2 -mt-0">
          <Badge variant="outline">Next.js</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">HTML</Badge>
          <Badge variant="outline">CSS</Badge>
          <Badge variant="outline">Vite</Badge>
        </div>

        <h4 className="font-semibold mt-4">Purpose & Vision</h4>
        <p className="text-muted-foreground leading-relaxed">Dracode Warrior simplifies access to knowledge and empowers youth to learn and work remotely. It provides a focused, clean, and easily navigable interface designed to help learners progress practically and confidently toward their goals.</p>
      </div>
    ),
    technologies: ['Next.js', 'TypeScript', 'HTML', 'CSS', 'Vite'],
    type: 'Full-Stack',
    status: 'Live',
    features: ['Free & Paid Courses', 'Recorded & Live Sessions', 'Learning Roadmaps', 'Remote Job Listings', 'No Login Required']
  },
  {
    id: 3,
    title: 'Professional Portfolio',
    github: 'https://github.com/moHamedsaADHA/Portfolio',
    demo: 'edsaad.vercel.app',
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
    title: 'Online Restaurant Platform',
    github: 'https://github.com/moHamedsaADHA/resturant',
    demo: 'https://lnkd.in/dDA8ygJn',
    role: 'Front-End Developer',
    duration: '60+ hours',
    description: 'A fully responsive modern online restaurant platform focused on performance, accessibility, and a delightful user experience.',
    fullDescription: 'A modern, responsive online restaurant platform offering a complete digital dining experience with customer ratings, nutrition features, booking, rewards, and a high-performance frontend implementation.',
    // Detailed structured content (JSX) for full display inside the modal
    details: (
      <div>
        <h3 className="text-xl font-semibold mb-3">Online Restaurant Platform</h3>
        <div className="text-sm text-muted-foreground mb-4">Front-End Developer • Live • 60+ hours<br />Full-Stack (Frontend Completed)</div>

        <h4 className="font-semibold mt-2">Overview</h4>
        <p className="text-muted-foreground leading-relaxed">A fully responsive and modern online restaurant platform offering a complete digital dining experience. Users can explore a wide range of food and drink options, all designed with performance, accessibility, and user delight in mind.</p>

        <h4 className="font-semibold mt-2">Key Features</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Real Customer Ratings: Each meal is rated out of 5 stars by real customers.</li>
          <li>Food Testers & Health Focus: Special reviewers evaluate the health quality of meals.</li>
          <li>AI Nutrition Assistant: Calculates calories, protein, carbs, and fats based on diet plans.</li>
          <li>Online Booking System: Reserve seats at the restaurant seamlessly.</li>
          <li>Rewards & Loyalty Program: Earn points with every order and redeem them for free meals.</li>
          <li>FAQ Section and Customer Support: Submit inquiries and receive email replies.</li>
          <li>Dark Mode & Responsive UI: Adaptive design for all devices and themes.</li>
          <li>High Performance: Clean, optimized code ensures fast page loads and smooth interactions.</li>
        </ul>

        <h4 className="font-semibold mt-6 mb-3 ">Technologies Used</h4>
        <div className="flex flex-wrap gap-3 -mt-0">
          <Badge variant="outline">HTML5</Badge>
          <Badge variant="outline">CSS3</Badge>
          <Badge variant="outline">Bootstrap 5</Badge>
          <Badge variant="outline">JavaScript (ES6+)</Badge>
          <Badge variant="outline">Vite</Badge>
        </div>

        <h4 className="font-semibold mt-2">Future Enhancements</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Backend Integration (Node.js + Express + MongoDB) for real order & booking management.</li>
          <li>User Accounts & Profiles to track orders, points, and preferences.</li>
          <li>Online Payment Integration for seamless checkout.</li>
          <li>Admin Dashboard for managing meals, reviews, and analytics.</li>
        </ul>
      </div>
    ),
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript (ES6+)', 'Vite'],
    type: 'Full-Stack',
    status: 'Live',
    features: ['Real Customer Ratings', 'AI Nutrition Assistant', 'Online Booking', 'Rewards & Loyalty', 'Responsive Design']
  },
  {
    id: 5,
    title: 'Mathematics Learning Platform',
    github: '#',
    demo: 'https://incomparable-bubblegum-7cd17f.netlify.app/',
    role: 'Full-Stack Developer (Team Project)',
    duration: '1 week',
    description: 'Comprehensive educational platform for managing and teaching mathematics with auto-grading, class access control, and teacher/student dashboards.',
    fullDescription: `A comprehensive educational platform developed for an Egyptian client, specialized in managing and teaching mathematics. The system simplifies class organization, assignment tracking, auto-grading, test evaluation, and real-time performance monitoring — enabling teachers and students to interact through a modern, secure, and automated system.`,
    // Detailed structured content (JSX) for full display inside the modal
    details: (
      <div>
        <h3 className="text-xl font-semibold mb-3">Mathematics Learning Platform</h3>
        <div className="text-sm text-muted-foreground mb-4">Full-Stack Developer (Team Project) • Completed • 1 week</div>

        <h4 className="font-semibold mt-2">Overview</h4>
        <p className="text-muted-foreground leading-relaxed">A comprehensive educational platform developed for an Egyptian client, specialized in managing and teaching mathematics efficiently. Built to simplify class organization, assignment tracking, test evaluation, and real-time performance monitoring for teachers and students.</p>

        <h4 className="font-semibold mt-2">Key Features</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Student Dashboard: Displays assignments, tests, and grades automatically upon submission.</li>
          <li>Auto-Grading System: Automatically calculates results based on answers and submission time.</li>
          <li>Anti-Cheating System: Prevents students from accessing exams or materials outside their assigned class.</li>
          <li>Dark & Light Mode: Theme customization for accessibility.</li>
          <li>Responsive Design: Optimized for mobile, tablet, and desktop devices.</li>
          <li>High Performance: Handles heavy traffic and concurrent users during exam periods.</li>
          <li>Class Access Control: Ensures each student can only view and join their own class.</li>
          <li>Teacher Dashboard: Create, manage, and evaluate tests and assignments easily.</li>
          <li>Notification System: Sends real-time alerts and updates to students and teachers.</li>
          <li>Role-Based Access: Granular permissions for students, teachers, and administrators.</li>
          <li>File Upload & Collaboration: Upload and share resources securely.</li>
          <li>Report Generation: Detailed progress and performance reports.</li>
        </ul>

        <h4 className="font-semibold mt-2">Development Insights</h4>
        <p className="text-muted-foreground leading-relaxed">Developed by a small collaborative team using clean architecture principles. The client requested frequent changes, which improved our adaptability and communication while maintaining code quality under pressure.</p>

        <h4 className="font-semibold mt-2">Lessons Learned</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Reinforced importance of clean architecture and modular structure in large-scale educational systems.</li>
          <li>Improved adaptability to changing client requirements and strengthened team communication.</li>
          <li>Delivered within one week despite multiple client revisions.</li>
        </ul>

        <h4 className="font-semibold mt-2 mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2 -mt-1">
          <Badge variant="outline">MongoDB</Badge>
          <Badge variant="outline">Express.js</Badge>
          <Badge variant="outline">React.js</Badge>
          <Badge variant="outline">Node.js</Badge>
          <Badge variant="outline">Mongoose</Badge>
          <Badge variant="outline">JWT</Badge>
          <Badge variant="outline">Bootstrap / CSS</Badge>
        </div>


        <h4 className="font-semibold mt-2">Collaboration Note</h4>
        <p className="text-muted-foreground leading-relaxed">Built collaboratively by a professional development team; each member contributed to architecture, performance optimization, and UX refinement.</p>
      </div>
    ),
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Mongoose', 'JWT', 'Bootstrap/CSS'],
    type: 'Full-Stack',
    status: 'Completed',
    features: ['Student Dashboard', 'Auto-Grading', 'Anti-Cheating', 'Role-Based Access', 'Report Generation']
  },
  {
    id: 6,
    title: 'Cinema Database System',
    github: '#',
    demo: '#',
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

                  <div className="flex items-center gap-2 pt-4">
                    {/* 1) View Details (no external link) */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="glass-card hover:shadow-accent-glow transition-all duration-300 px-10 md:px-16"
                          onClick={() => setSelectedProject(project)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="glass-card w-[92vw] max-w-none max-h-[92vh] md:w-[85vw] md:max-h-[90vh] lg:w-[80vw] lg:max-h-[85vh] rounded-xl shadow-xl overflow-hidden p-0"
                      >
                        {/* Header stays fixed; body scrolls inside */}
                        <DialogHeader className="px-6 pt-6">
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

                        {/* Scrollable content area: render explicit details JSX if present (exact content), otherwise fallback to default layout */}
                        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(92vh-6rem)] md:max-h-[calc(90vh-6rem)] lg:max-h-[calc(85vh-6rem)] custom-scrollbar">
                          {project.details ? (
                            // Render the provided JSX details exactly as authored
                            project.details
                          ) : (
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Project Overview</h4>
                                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {project.fullDescription}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Key Features</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* 2) GitHub Code link */}
                    <div className="flex items-center">
                      <div className="h-8 w-px bg-gradient-cosmic opacity-40 mr-2" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="glass-card hover:shadow-accent-glow transition-all duration-300 flex items-center space-x-2"
                        asChild
                      >
                        {/* Disable Code only for the two specified projects; keep visuals for others */}
                        {project.title === 'Mathematics Learning Platform' || project.title === 'Cinema Database System' ? (
                          <span
                            aria-disabled="true"
                            role="button"
                            tabIndex={-1}
                            title="Code (disabled)"
                            className="inline-flex items-center space-x-2 cursor-not-allowed"
                          >
                            <Github className="h-4 w-4" />
                            <span className="text-sm">Code</span>
                          </span>
                        ) : (
                            <a
                              href={project.github || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} code on GitHub`}
                              title="View code on GitHub"
                            >
                              <Github className="h-4 w-4" />
                              <span className="text-sm">Code</span>
                            </a>
                        )}
                      </Button>
                    </div>

                    {/* 3) Demo / Swagger link (arrow box) */}
                    <div className="flex items-center">
                      <div className="h-8 w-px bg-gradient-cosmic opacity-40 mr-2" />
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card hover:shadow-accent-glow transition-all duration-300"
                        asChild
                      >
                        {project.demo && project.demo !== '#' ? (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open demo for ${project.title}`}>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          // If no demo provided, render a disabled-looking span so layout stays consistent
                          <span className="opacity-40 cursor-not-allowed px-2 py-1 inline-flex items-center">
                            <ExternalLink className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
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