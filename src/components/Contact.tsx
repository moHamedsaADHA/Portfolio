import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { send } from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'mohamed.saad2827822772@gmail.com',
    href: 'mailto:mohamed.saad2827822772@gmail.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+20 109 273 1005',
    href: 'tel:+201092731005'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Qena, Egypt',
    href: '#'
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohamed-saad-b33767320/',
    color: 'hover:text-blue-500'
  },
  {
    icon: Github,
    title: 'GitHub',
    href: '#',
    color: 'hover:text-gray-500'
  },
  {
    icon: Mail,
    title: 'Email',
    href: 'mailto:mohamed.saad2827822772@gmail.com',
    color: 'hover:text-red-500'
  }
];

export function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Read EmailJS config from Vite env variables. Set these in .env as:
    // VITE_EMAILJS_SERVICE_ID=your_service_id
    // VITE_EMAILJS_TEMPLATE_ID=your_template_id
    // VITE_EMAILJS_PUBLIC_KEY=your_public_key
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Fallback: show helpful toast
      toast({
        title: 'Email not configured',
        description: 'EmailJS keys are missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your environment.',
      });
      return;
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      // optional: add metadata
      sent_at: new Date().toISOString(),
    };

    try {
      await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      toast({
        title: 'Message sent!',
        description: "Thank you for your message. I'll get back to you soon.",
      });
      reset();
    } catch (err) {
      console.error('EmailJS error', err);
      toast({
        title: 'Failed to send',
        description: 'Something went wrong while sending your message. Please try again or contact me directly via email.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Ready to bring your ideas to life? Let's discuss your next project 
            and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-card hover:shadow-accent-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="gradient-text">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-full bg-gradient-cosmic group-hover:animate-pulse-glow">
                      <info.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-card hover:shadow-accent-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="gradient-text">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className={`p-3 rounded-full glass-card hover:shadow-accent-glow transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass-card hover:shadow-accent-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="gradient-text">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className="glass-card border-glass-border focus:shadow-accent-glow transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="glass-card border-glass-border focus:shadow-accent-glow transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className="glass-card border-glass-border focus:shadow-accent-glow transition-all duration-300"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: 'Message is required' })}
                      className="glass-card border-glass-border focus:shadow-accent-glow transition-all duration-300"
                      placeholder="Tell me about your project or how I can help you..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-accent-glow transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}