# 🗺️ Identifica IG – Mapeamento de Indicações Geográficas Capixabas

> Plataforma interativa para mapeamento, análise e promoção das Indicações Geográficas do Espírito Santo.

---

## 🌐 Acesse o Projeto

🔗 [https://identificaig.vercel.app](https://identificaig.vercel.app)

---

## ✨ Funcionalidades

- 🔍 Mapa interativo com pins para IGs concedidas e potenciais
- 📋 Cadastro, edição e visualização detalhada de sugestões de IG
- 📈 Gráficos e estatísticas por tipo, maturidade e região
- 🧭 Busca georreferenciada por cidade e categoria
- 🔐 Área administrativa com login e permissões
- 📎 Upload de documentos e imagens por IG

---

## 🛠️ Tecnologias Utilizadas

| Camada        | Tecnologias                                                    |
|---------------|----------------------------------------------------------------|
| **Frontend**  | React, TypeScript, Vite, Tailwind CSS, ShadCN UI, Leaflet     |
| **Backend**   | Supabase (PostgreSQL + Auth + Storage)                        |
| **Deploy**    | Vercel                                                        |

---

## 📦 Instalação Local

> Requisitos: Node.js 18+, npm ou yarn, conta Supabase

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/identificaig.git
cd identificaig

# 2. Instale as dependências
npm install

# 3. Configure o ambiente (exemplo de .env)
cp .env.example .env

# 4. Execute a aplicação
npm run dev


src/
├── components/          # Componentes reutilizáveis (Cards, Formulários, Mapa)
├── context/             # Contextos globais (Autenticação, IGs, etc.)
├── pages/               # Views principais da aplicação
├── services/            # Conexões com Supabase e APIs
├── types/               # Tipagens TypeScript
├── utils/               # Funções auxiliares
└── styles/              # Estilos globais e temas
