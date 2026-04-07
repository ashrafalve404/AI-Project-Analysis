'use client';


import { Card, Button, Input, Textarea } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { Mail, Phone, MapPin, Send, Headphones } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-xl text-text-secondary">Have questions? We&apos;d love to hear from you.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {[{ icon: Mail, t: 'Email', v: 'hello@ai-client-assistant.com' }, { icon: Phone, t: 'Phone', v: '+1 (555) 123-4567' }, { icon: MapPin, t: 'Address', v: 'San Francisco, CA' }, { icon: Headphones, t: 'Support', v: '24/7 Available' }].map(c => (
            <Card key={c.t} className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-text-primary">{c.t}</h3>
              <p className="text-text-muted">{c.v}</p>
            </Card>
          ))}
        </div>
        
        <Card className="max-w-2xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="john@company.com" />
            <Input label="Company" placeholder="Your Company" />
            <Textarea label="Message" placeholder="Tell us about your project..." rows={4} />
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <Send className="w-4 h-4 mr-2" />Send Message
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}