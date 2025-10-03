# Vitae — Currículo SPA Profissional

SPA de currículo multilíngue (PT-BR/EN-US) com design moderno, parallax sutil e conteúdo carregado em runtime. Nenhum rebuild necessário para atualizar informações.

## 🚀 Características

- **Zero Rebuild**: Atualize conteúdo editando `/public/content/{lang}.json` + F5
- **Multilíngue**: PT-BR e EN-US com troca instantânea
- **Dark/Light Mode**: Auto-detecção + toggle persistido
- **Parallax Sutil**: Animações discretas respeitando `prefers-reduced-motion`
- **100% Responsivo**: Mobile-first (360px → 1280px+)
- **A11y Completo**: Contraste AA, ARIA landmarks, keyboard navigation
- **SEO Bloqueado**: `robots.txt` e `meta noindex` (remova se quiser indexação)
- **Docker Ready**: Build multi-stage + Nginx otimizado

## 📁 Estrutura

```
.
├── public/
│   ├── content/
│   │   ├── pt-BR.json          # Conteúdo português
│   │   ├── en-US.json          # Conteúdo inglês
│   │   └── assets/
│   │       ├── photo.jpg       # Foto do perfil
│   │       └── favicon.png     # Favicon
│   ├── manifest.json
│   └── robots.txt              # Bloqueio de indexação
├── infra/
│   └── nginx.conf              # Configuração Nginx
├── Dockerfile                  # Build multi-stage
├── docker-compose.yml
└── src/                        # Código React/TypeScript
```

## 🛠️ Stack Técnica

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **i18n**: i18next + react-i18next
- **Markdown**: react-markdown + rehype-sanitize
- **Server**: Nginx (Alpine)

## 🔧 Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servir em modo dev
npm run dev
```

Acesse `http://localhost:8080`

### Produção com Docker

```bash
# Build e start
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

Acesse `http://localhost:8080`

### Com BASE_PATH customizado

Para servir em `/vitae` ao invés de raiz:

```bash
# .env
BASE_PATH=/vitae

# Rebuild
docker-compose up -d --build
```

## ✏️ Atualizar Conteúdo (SEM REBUILD!)

### 1. Editar informações

Edite `public/content/pt-BR.json` ou `public/content/en-US.json`:

```json
{
  "profile": {
    "name": "João Silva",
    "role": "Tech Lead",
    "email": "joao@exemplo.com",
    ...
  },
  "experience": [...],
  "skills": {...},
  ...
}
```

### 2. Atualizar foto

Substitua `public/content/assets/photo.jpg` por sua foto (recomendado: 512x512px, WebP ou JPG).

### 3. Atualizar favicon

Substitua `public/content/assets/favicon.png` (recomendado: 512x512px PNG ou 32x32 SVG).

### 4. Aplicar mudanças

- **Modo dev**: Automático (hot reload)
- **Docker**: `docker-compose restart vitae` ou apenas F5 no navegador

**NÃO é necessário rebuild!** O conteúdo é carregado em runtime via `fetch()`.

## 🌐 Habilitar Indexação (SEO)

Por padrão o site **bloqueia** robôs de busca. Para permitir indexação:

### 1. Remover bloqueio do robots.txt

Edite `public/robots.txt`:

```txt
# De:
User-agent: *
Disallow: /

# Para:
User-agent: *
Allow: /
```

### 2. Remover meta noindex

Edite `index.html` e **delete** esta linha:

```html
<meta name="robots" content="noindex,nofollow" />
```

### 3. Atualizar meta no JSON

Edite `public/content/{lang}.json`:

```json
{
  "meta": {
    "robots": "index,follow"  // Altere de noindex
  }
}
```

### 4. Rebuild (apenas desta vez)

```bash
docker-compose up -d --build
```

## 🎨 Customizar Design

### Cores e Tema

Edite `src/index.css` (tokens HSL):

```css
:root {
  --primary: 217 91% 60%;       /* Tech blue */
  --navy: 222 47% 11%;          /* Navy escuro */
  --tech-blue: 217 91% 60%;
  ...
}
```

### Tipografia

Troque a fonte Inter em `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;700&display=swap" rel="stylesheet" />
```

Depois em `src/index.css`:

```css
body {
  font-family: 'SuaFonte', sans-serif;
}
```

## 🔒 Segurança

- **DOMPurify**: Markdown sanitizado (via `rehype-sanitize`)
- **CSP Ready**: Configure headers no `nginx.conf` se necessário
- **No Secrets**: Sem API keys ou dados sensíveis no frontend

## 📊 Performance

- **Lighthouse**: Target 90+ (Performance/A11y/BP)
- **Lazy Load**: Seções carregam on-demand via Intersection Observer
- **Gzip**: Nginx comprime assets automaticamente
- **Cache**: Conteúdo `no-cache`, assets `max-age=3600`

## 🧪 Testes Básicos

```bash
# Lint
npm run lint

# Type check
npm run build
```

Teste manual:
1. Trocar idioma (PT ↔ EN)
2. Toggle dark/light mode
3. Scroll suave + scrollspy
4. Responsividade (360/768/1280px)
5. Keyboard navigation (Tab, Enter)

## 🤝 Contribuindo

Este é um projeto pessoal. Para seu próprio currículo:

1. Fork/clone este repo
2. Edite `public/content/*.json` com seus dados
3. Customize cores/fontes em `src/index.css`
4. Deploy via Docker ou plataforma de escolha

## 📝 Schemas de Referência

### Profile

```typescript
{
  name: string;
  role: string;
  photo: string;           // URL relativa ou absoluta
  location: string;
  contacts: {
    email: string;
    linkedin: string;      // URL completa
    github: string;        // URL completa
    website?: string;      // Opcional (botão some se vazio)
  }
}
```

### Experience

```typescript
{
  company: string;
  role: string;
  start: string;           // "YYYY-MM" ou "YYYY"
  end: string;             // "YYYY-MM", "current", "presente"
  location: string;
  highlights: string[];    // Lista de conquistas
  body_md?: string;        // Markdown opcional
}
```

## 🐛 Troubleshooting

**Conteúdo não carrega:**
- Verifique se `public/content/pt-BR.json` existe
- Confira console do navegador (F12)
- Valide JSON em [jsonlint.com](https://jsonlint.com/)

**Foto não aparece:**
- Path correto: `/content/assets/photo.jpg`
- Permissões do arquivo (se Linux): `chmod 644`

**Docker não inicia:**
- Porta 8080 ocupada? Mude em `docker-compose.yml`
- `docker-compose logs vitae` para ver erros

## 📄 Licença

MIT — Use como quiser, atribuição apreciada mas não obrigatória.

---

**Feito com ❤️ usando React + Vite + Tailwind + Framer Motion**
