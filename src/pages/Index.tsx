import { useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Header } from '@/components/Header';
import { ContactSection } from '@/components/sections/ContactSection';
import { SummarySection } from '@/components/sections/SummarySection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';

const Index = () => {
  const { content, loading, error } = useContent();

  useEffect(() => {
    if (content?.meta) {
      document.title = content.meta.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', content.meta.description);
      }
    }
  }, [content]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar conteúdo</h1>
          <p className="text-muted-foreground mb-4">
            {error?.message || 'Não foi possível carregar o arquivo de conteúdo.'}
          </p>
          <p className="text-sm text-muted-foreground">
            Certifique-se de que o arquivo <code className="bg-muted px-2 py-1 rounded">
              /content/pt-BR.json
            </code> existe e está acessível.
          </p>
        </div>
      </div>
    );
  }

  const sections = content.order || ['contact', 'summary', 'experience', 'skills', 'education', 'certifications'];

  return (
    <>
      <Header sections={sections} />
      
      <main id="main">
        <ContactSection profile={content.profile} />
        <SummarySection summary={content.summary} />
        <ExperienceSection experiences={content.experience} />
        <SkillsSection skills={content.skills} />
        <EducationSection education={content.education} />
        <CertificationsSection certifications={content.certifications} />
      </main>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {content.profile.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Index;
