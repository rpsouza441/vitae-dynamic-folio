import { motion } from 'framer-motion';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { useScrollspy } from '@/hooks/useScrollspy';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  sections: string[];
}

export function Header({ sections }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const activeId = useScrollspy(sections, 120);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Skip to main content */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeId === section
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  {t(`nav.${section}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu placeholder */}
          <div className="md:hidden text-sm font-semibold text-foreground">
            Vitae
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t('actions.toggle_lang')}
              title={t('actions.toggle_lang')}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={t('actions.toggle_theme')}
              title={t('actions.toggle_theme')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
