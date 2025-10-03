import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Profile } from '@/hooks/useContent';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { t } = useTranslation();

  const contacts = [
    { icon: Mail, href: `mailto:${profile.contacts.email}`, label: profile.contacts.email },
    { icon: Linkedin, href: profile.contacts.linkedin, label: 'LinkedIn' },
    { icon: Github, href: profile.contacts.github, label: 'GitHub' },
  ];

  if (profile.contacts.website) {
    contacts.push({ 
      icon: Globe, 
      href: profile.contacts.website, 
      label: 'Website' 
    });
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center gradient-hero relative">
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={profile.photo}
            alt={`${profile.name} profile`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-foreground/20 shadow-glow object-cover"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">{profile.name}</h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-2">{profile.role}</p>
          <p className="text-muted-foreground mb-8">{profile.location}</p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card border border-border rounded-lg transition-colors backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <contact.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{contact.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm">Scroll para ver mais</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Parallax background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          style={{
            y: typeof window !== 'undefined' ? window.scrollY * 0.3 : 0,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{
            y: typeof window !== 'undefined' ? window.scrollY * 0.2 : 0,
          }}
        />
      </motion.div>
    </section>
  );
}
