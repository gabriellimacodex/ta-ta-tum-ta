# Tá Tá Tum Tá — Landing Page 2026

Landing de divulgação do **Batizado e Graduação 2026** da CDO Osasco / Mestre Kuata e alunos.

- **Evento:** Tá Tá Tum Tá  
- **Tema:** Na conectividade dos tambores  
- **Data:** 12 de setembro de 2026  
- **Local:** FITO — Rua Camélia, 26 — Osasco/SP  

## Stack

HTML + CSS + JavaScript estático. Sem build, sem dependências.

## Como visualizar

```bash
cd tata-tum-ta-2026
# Opção 1: abrir o arquivo
open index.html

# Opção 2: servidor local (se tiver Python)
python3 -m http.server 5173
# depois abra http://localhost:5173
```

## Editar conteúdo principal

Tudo o que muda com frequência está em **`js/config.js`**:

| Campo | O que é |
|--------|---------|
| `dateISO` | Data/hora do evento (countdown) |
| `whatsapp` | Número com DDI (ex.: `5511999999999`) |
| `whatsappMessage` | Mensagem pré-preenchida |
| `mapsUrl` | Link do Google Maps |
| `address` / `venue` | Local |

**Importante:** sem `whatsapp` preenchido, o botão de confirmação avisa para configurar o número.

Textos longos (sobre, FAQ, programação) ficam no **`index.html`**.

## Estrutura

```
tata-tum-ta-2026/
├── index.html
├── css/styles.css
├── js/config.js
├── js/main.js
├── js/countdown.js
├── assets/images/cartaz.jpg
└── README.md
```

## Deploy — GitHub Pages + Cloudflare

**Domínio de produção:** https://kuatapoeirando.com.br  
Arquivo `CNAME` já aponta para esse domínio. Open Graph usa URLs absolutas.

### 1. Criar repositório e publicar

No GitHub, crie um repositório **público** (ex.: `tata-tum-ta-2026` ou `kuatapoeirando`).

```bash
cd ~/tata-tum-ta-2026
git init
git add .
git commit -m "Landing Tá Tá Tum Tá 2026"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

### 2. Ativar GitHub Pages

1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / pasta `/ (root)`
4. Em **Custom domain**, digite: `kuatapoeirando.com.br` e salve
5. Marque **Enforce HTTPS** (pode levar alguns minutos após o DNS)

### 3. DNS no Cloudflare

No painel do domínio `kuatapoeirando.com.br` → **DNS** → **Records**:

| Tipo | Nome | Conteúdo | Proxy |
|------|------|----------|--------|
| **A** | `@` | `185.199.108.153` | DNS only (cinza) no 1º deploy |
| **A** | `@` | `185.199.109.153` | DNS only |
| **A** | `@` | `185.199.110.153` | DNS only |
| **A** | `@` | `185.199.111.153` | DNS only |
| **CNAME** | `www` | `SEU_USUARIO.github.io` | DNS only |

Troque `SEU_USUARIO` pelo seu usuário do GitHub.

**SSL no Cloudflare:** se o proxy laranja estiver ativo depois, use **SSL/TLS → Full** (não Flexible).  
Na 1ª configuração, deixe o proxy **cinza (DNS only)** até o HTTPS do GitHub Pages ficar verde.

### 4. Conferir

- https://kuatapoeirando.com.br
- Preview no WhatsApp (título + cartaz)
- Botão de WhatsApp abrindo o número certo

### Atualizar a página depois

```bash
cd ~/tata-tum-ta-2026
git add .
git commit -m "Atualiza landing"
git push
```

O GitHub Pages publica em 1–2 minutos.

## Checklist pré-lançamento

- [x] WhatsApp em `js/config.js`
- [x] `og:image` com URL absoluta
- [x] Arquivo `CNAME` do domínio
- [ ] Repo no GitHub + Pages ligado
- [ ] DNS Cloudflare apontando para o GitHub
- [ ] Confirmar horário em `dateISO` e programação
- [ ] Testar no celular

## Próximas melhorias (fora do MVP)

- Formulário com Formspree / Google Forms
- Pixel / Analytics
- Logo oficial da CDO
