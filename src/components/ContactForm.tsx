import React, { useRef, useState } from 'react';
import { sendForm } from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

// Production-ready ContactForm component using EmailJS sendForm
// - No mailto fallback
// - Uses import.meta.env.VITE_EMAILJS_* variables
// - Inputs must match your EmailJS template fields (see NOTE below)

export default function ContactForm(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    // prefer env template id, fallback to requested template
    const TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? 'template_7dlizjw';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    setStatus('sending');
    setMessage(null);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS env variables missing', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      setStatus('error');
      setMessage('Email service is not configured. Add VITE_EMAILJS_* to .env and restart the dev server.');
      return;
    }

    try {
        if (import.meta.env.DEV) {
          // log form field names to verify they match the template
          const names = Array.from(formRef.current.elements as any).map((el: any) => el.name).filter(Boolean);
          console.info('ContactForm: form field names', names);
        }
      const resp = await sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      // EmailJS returns a text/status; log for debugging
      console.info('EmailJS sendForm response:', resp);
      setStatus('success');
      setMessage('Message sent — thank you!');
      // clear form fields
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS sendForm error:', err);
      setStatus('error');
      setMessage('Failed to send message. See console for details.');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {/* NOTE: Input `name` attributes below MUST match your EmailJS template variable names. */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="user_name">Name</Label>
          <Input id="user_name" name="user_name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="user_email">Email</Label>
          <Input id="user_email" name="user_email" type="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Subject (optional)" />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={6} placeholder="Tell me about your project..." required />
      </div>

      <div className="flex flex-col items-start">
        <Button type="submit" className="px-4 py-2" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </Button>
        {message && (
          <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-500' : 'text-destructive'}`}>{message}</p>
        )}
      </div>
    </form>
  );
}
