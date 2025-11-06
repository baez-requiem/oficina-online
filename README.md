## Oficina Online – Landing Page

Landing page estática para o produto Oficina Online. O objetivo é apresentar valor, funcionalidades, planos e coletar contatos, com foco em semântica, acessibilidade e performance.

### Tecnologias
- HTML5 semântico
- CSS3 (layout responsivo e acessibilidade: :focus-visible, prefers-reduced-motion)
- jQuery + Slick (carrossel de depoimentos)

### Estrutura do projeto
- `index.html`: marcação da página (seções: herói, vídeo, benefícios, utilidades, passos, planos, reviews, FAQs, contato e footer)
- `styles.css`: estilos globais e componentes
- `scripts.js`: interações (slider, paginação acessível, acordeão com ARIA)
- `assets/`: imagens, svg, bibliotecas CSS/JS

### Como visualizar localmente
1. Baixe/clonar este repositório.
2. Abra o arquivo `index.html` no navegador (duplo clique ou via servidor estático).
   - Dica: use uma extensão de “Live Server” (VS Code) para auto-reload.

---

## Atualizando SEO e Conteúdos

### 1) Metadados essenciais (SEO base)
Edite no `<head>` de `index.html`:

```html
<meta name="description" content="Descrição concisa (até ~160 caracteres) com palavras-chave principais.">
<title>Título claro com a marca | Palavra-chave</title>
```

- Mantenha a descrição objetiva, única por página.
- O `<title>` deve refletir a proposta de valor + marca.

### 2) Open Graph (prévia em redes sociais)
Adicione/atualize no `<head>` de `index.html`:

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Oficina Online">
<meta property="og:title" content="Título da Página">
<meta property="og:description" content="Resumo atrativo para redes sociais.">
<meta property="og:url" content="https://www.seu-dominio.com/">
<meta property="og:image" content="https://www.seu-dominio.com/assets/images/preview.jpg">
<meta property="og:image:alt" content="Descrição da imagem de prévia">
```

Para Twitter Cards (opcional):

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título da Página">
<meta name="twitter:description" content="Resumo atrativo">
<meta name="twitter:image" content="https://www.seu-dominio.com/assets/images/preview.jpg">
```

### 3) Favicons e manifest
No `<head>`:

```html
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
```

### 4) Conteúdo das seções
Edite diretamente os textos em `index.html`:
- Herói: título, subtítulo e CTA (classe `section-hero-container-button`).
- Vídeo: título e texto; a miniatura está em `assets/images/video-thumb.png`.
- Benefícios e utilidades: títulos e descrições de cada item.
- Passos: títulos e textos dos 3 passos.
- Planos: nomes, preços e listas de itens.
- Depoimentos: textos dentro do slider e nomes na paginação.
- FAQs: perguntas e respostas no acordeão.
- Contato: título e texto; labels e placeholders do formulário.

Boa prática: mantenha headings em ordem (h1/h2/h3), escreva `alt` das imagens de forma descritiva e evite repetir texto decorativo.

### 5) Links internos e CTAs
- O menu navega por âncoras: `#funcionalidades`, `#planos`, `#duvidas`, `#contato`.
- As principais chamadas para ação apontam para `#contato`. Ajuste o texto/URL conforme a campanha.

### 6) Performance e acessibilidade
- Scripts com `defer` já estão configurados em `index.html`.
- Imagens fora da dobra devem usar `loading="lazy"` sempre que possível.
- Defina `width` e `height` ou use CSS com dimensões previsíveis para evitar layout shift.
- `prefers-reduced-motion`: o CSS e o JS respeitam usuários que preferem menos movimento.
- Componentes interativos têm `:focus-visible` e ARIA (`aria-expanded`, `aria-controls`, `aria-pressed`).

### 7) Palavras‑chave e tom de voz
- Adapte o vocabulário (ex.: “OS”, “NF-e”, “controle financeiro”) às buscas do seu público.
- Use linguagem clara e focada em resultado (“emita”, “controle”, “reduza” etc.).

### 8) Checklist rápido de SEO on-page
- [ ] `<title>` único e claro
- [ ] `<meta name="description">` com ~140–160 caracteres
- [ ] Headings hierárquicos (um único `h1`)
- [ ] Imagens com `alt` descritivo e (idealmente) dimensões definidas
- [ ] OG/Twitter tags com imagem de prévia válida (1200×630 recomendado)
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] Scripts com `defer` e imagens com `loading="lazy"` onde seguro

---

## Dicas de manutenção
- Versione assets com hash no nome ao trocar imagens de destaque (ex.: `preview.v2.jpg`).
- Valide o HTML no W3C Validator e verifique Lighthouse (Acessibilidade/SEO/Performance).
- Teste navegação por teclado (Tab/Shift+Tab) e leitura por leitores de tela.

## Licença
Uso interno do projeto. Ajuste conforme a política da sua organização.










