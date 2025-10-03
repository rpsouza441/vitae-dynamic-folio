import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProfileContacts {
  email: string;
  linkedin: string;
  github: string;
  website?: string;
}

export interface Profile {
  name: string;
  role: string;
  photo: string;
  location: string;
  contacts: ProfileContacts;
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  highlights: string[];
  body_md?: string;
}

export interface Education {
  institution: string;
  degree: string;
  start: string;
  end: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  id?: string;
}

export interface Training {
  name: string;
  issuer: string;
  year: string;
  id?: string;
}


export interface ContentData {
  meta: {
    title: string;
    description: string;
    locale: string;
    robots: string;
  };
  profile: Profile;
  ui: {
    nav: Record<string, string>;
    actions: Record<string, string>;
  };
  order: string[];
  summary: string;
  experience: Experience[];
  skills: Record<string, string[]>;
  education: Education[];
  certifications: Certification[];
  trainings: Training[];
}

const BASE_PATH = import.meta.env.BASE_URL || '/';

export function useContent() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const lang = i18n.language;
        const response = await fetch(`${BASE_PATH}content/${lang}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        
        const data: ContentData = await response.json();
        
        // Add UI translations to i18next
        i18n.addResourceBundle(lang, 'translation', data.ui, true, true);
        
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language, i18n]);

  return { content, loading, error };
}