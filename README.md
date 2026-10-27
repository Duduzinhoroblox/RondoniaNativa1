# 🌿 Rondônia Nativa — Ecoturismo & Turismo de Base Comunitária (TBC)

[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=flat-square&logo=github)](https://duduzinhoroblox.github.io/RondoniaNativa1/)
[![Status](https://img.shields.io/badge/Status-100%25%20Concluído-emerald?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-blue?style=flat-square)](#)
[![Banco de Dados](https://img.shields.io/badge/Database-PostgreSQL%2015%2B-indigo?style=flat-square)](#)
[![Programa](https://img.shields.io/badge/Programa-Centelha%203%20Rondônia-amber?style=flat-square)](#)

> **Plataforma digital integrada de ecoturismo e turismo comunitário projetada para superar o isolamento digital da Amazônia através de arquitetura Offline-First, divisão justa de receitas (Social Split Payment) e travas territoriais de capacidade de carga.**

🌐 **Acesse o Sistema no Ar:** [https://duduzinhoroblox.github.io/RondoniaNativa1/](https://duduzinhoroblox.github.io/RondoniaNativa1/)

---

## 📌 Visão Geral do Projeto

* **Proponente / Autor:** Eduardo Renan Souza de Aquino (3º Ano B — Técnico em Informática)
* **Instituição:** Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO)
* **Disciplina:** Programar com IA de forma responsável — Prof. Rafael Pitwak (`rafaelpitwak`)
* **Edital de Fomento:** Programa Centelha 3 Rondônia — FAPERO / FINEP (Simulado Fase 1)

---

## 🚀 Diferenciais Tecnológicos e Inovações

1. **Arquitetura Offline-First (Sem Sinal de Celular):**
   * Turistas e Guias Cadastur podem navegar por mapas e validar ingressos via QR Code assinado criptograficamente com coordenadas GPS no meio da mata ou nos rios Guaporé e Madeira, mesmo com 0% de internet móvel.
2. **Social Split Payment Transparente (Regra RN04):**
   * Divisão financeira automática em tempo real: 60% a 65% direcionados via Pix para a associação comunitária anfitriã, 25% a 35% para o guia credenciado e taxa enxuta para a tecnologia.
3. **Trava Inviolável de Capacidade de Carga (Regra RN02):**
   * Bloqueio algorítmico contra o turismo predatório: quando o teto diário de visitantes estipulado pela comunidade é atingido, o sistema impede novas compras automaticamente.
4. **Manual de Conduta Ética e Socioambiental Mandatório (Regra RN05):**
   * Exigência de leitura e aceite obrigatório de 5 compromissos socioambientais (Resíduo Zero, respeito cultural, proteção à fauna) antes do pagamento.
5. **Achar Lugares — Guia Territorial de Rondônia:**
   * Módulo com logística completa da BR-364 e BR-429, distâncias a partir de Porto Velho e indicador de sazonalidade amazônica (Época de Seca e Praias Fluviais vs. Época de Cheia e Floresta Alagada).

---

## 📂 Estrutura de Documentos Obrigatórios

| Arquivo | Descrição |
|:---|:---|
| 📄 [`spec.md`](./spec.md) | **Especificação Técnica Final Completa:** Casos de uso, requisitos (RF01 a RF10), regras de negócio (RN01 a RN05) e a **Seção 7 de Instalação e Execução** com passo a passo para rodar localmente. |
| 🗄️ [`database/schema.sql`](./database/schema.sql) | **Script SQL Relacional Oficial:** 9 tabelas relacionais em PostgreSQL/SQL ANSI com chaves primárias, chaves estrangeiras, restrições e dados iniciais (*Seed Data*). |
| 📋 [`CHANGELOG.md`](./CHANGELOG.md) | **Registro Histórico de Decisões e Revisão Humana:** Histórico das versões v1.0 a v1.4 detalhando as correções da equipe sobre as propostas do agente de IA (fotos verídicas de Rondônia, banco relacional, blindagem de login). |
| 🔐 [`.env.example`](./.env.example) | **Modelo de Variáveis de Ambiente:** Chaves fictícias de conexão para banco e portas, mantendo o `.env` protegido e fora do repositório. |

---

## 💻 Instalação e Execução Local (Guia Rápido)

```bash
# 1. Clonar o repositório
git clone https://github.com/Duduzinhoroblox/RondoniaNativa1.git

# 2. Entrar no diretório
cd RondoniaNativa1

# 3. Instalar as dependências
npm install

# 4. Configurar as variáveis de ambiente de teste
cp .env.example .env

# 5. Executar o servidor de desenvolvimento
npm run dev

# 6. Abrir no navegador:
# http://localhost:3000
```

---

## 👥 Contas de Teste Pré-Configuradas

Para agilizar a avaliação docente, clique no botão **"Entrar"** no cabeçalho do site para usar o login em 1 clique ou informe as credenciais manuais (Senha padrão: `senha123`):

* **Turista Consciente:** `mariana.vasconcelos@ecotur.com.br`
* **Guia Cadastur:** `moacir.guia@rondonianativa.org.br` (Registro: `RO-26.0084/2024-TUR`)
* **Liderança TBC:** `pedrasnegras.guapore@gmail.com` (Assoc. Pedras Negras)
* **Admin Geral / Centelha 3:** `innot.renan@gmail.com`

---

## 📄 Licença e Termos

Projeto acadêmico e de inovação social desenvolvido sob licença MIT, em total conformidade com a Lei Geral de Proteção de Dados (LGPD) e diretrizes da SETUR-RO, FUNAI e ICMBio.
