import { useState, useEffect } from 'react';

export function useScrollspy(sectionIds: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Se o scroll chegou ao fim da página, ativa a última seção.
      // Adicionamos uma pequena tolerância para garantir o funcionamento.
      if (window.scrollY + windowHeight >= documentHeight - 10) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Lógica original para encontrar a seção ativa
      let newActiveId = '';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          newActiveId = sectionIds[i];
          break;
        }
      }
      
      setActiveId(newActiveId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}