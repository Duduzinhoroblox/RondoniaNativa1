# REGISTRO DE MUDANÇAS E DECISÕES DO PROJETO (CHANGELOG)
## **Rondônia Nativa — Processo de Desenvolvimento com IA Responsável**

Este documento registra a evolução cronológica do sistema, as decisões arquiteturais tomadas pela equipe humana, as correções efetuadas sobre as propostas iniciais geradas pela inteligência artificial (Google Antigravity) e as revisões críticas realizadas para atender com rigor aos critérios do **Programa Centelha 3 Rondônia** e da disciplina do **Professor Rafael Pitwak** (`rafaelpitwak`).

---

### [v1.3.0] — 27 de Outubro de 2026 (Preparação para Entrega Final & Documentação)

#### 🎯 Decisões Técnicas e Revisão Humana:
* **Padronização da Spec (`spec.md`):** Revisão e reestruturação completa da documentação técnica anterior (`ESPECIFICACAO_TECNICA.md`), consolidando-a no arquivo oficial exigido pela apostila (`spec.md`) com uma seção detalhada de *Instalação e Execução* (Passo a passo numerado, requisitos de ambiente Node.js 20+, dados de teste e guia de SGBD).
* **Criação do Script Relacional SQL (`database/schema.sql`):** O agente havia sugerido inicialmente manter os dados apenas em memória volátil e LocalStorage. A equipe humana determinou e supervisionou a criação de um esquema relacional PostgreSQL completo em arquivo SQL autossuficiente, com 9 tabelas (`usuarios`, `associacoes_comunitarias`, `roteiros`, `sessoes_vivencia`, `reservas`, `transacoes_split`, `avaliacoes_sustentaveis`, etc.), restrições de chave estrangeira, checagens de integridade e inserção de dados iniciais (*Seed Data*).
* **Isolamento de Credenciais e Segurança (`.env.example` e `.gitignore`):** Identificado que o arquivo `.gitignore` precisava bloquear expressamente arquivos `.env` e variações locais para evitar vazamento de credenciais na nuvem, mantendo apenas o `.env.example` versionado com valores de teste.
* **Configuração de Deploy Contínuo para Vercel (`vercel.json`):** Adicionada regra de reescrita SPA para que todas as rotas de navegação do frontend Vite funcionem perfeitamente no ambiente hospedado na nuvem pública.
* **Colaborador Docente no GitHub:** Adicionado formalmente o usuário `rafaelpitwak` como colaborador com permissões de acesso ao repositório via API do GitHub.

---

### [v1.2.0] — 20 de Outubro de 2026 (Curadoria Visual Verídica e Módulos de Governança)

#### 🔍 Revisão Humana Crítica do Conteúdo Proposto pela IA:
* **Substituição de Imagens Genéricas por Imagens Verídicas de Rondônia:**
  * *O que o agente de IA propôs:* O agente havia preenchido os cards iniciais com links genéricos de praias tropicais de mar e florestas estrangeiras do Unsplash.
  * *Intervenção e Correção Humana:* Foi realizada uma curadoria manual rigorosa de acervo fotográfico condizente com a geografia de Rondônia:
    * *Real Forte Príncipe da Beira (Costa Marques):* Fotos de fortificações coloniais de pedra, muralhas de cantaria, canhões e o Rio Guaporé na fronteira Brasil-Bolívia.
    * *Vivência Paiter Suruí (Cacoal):* Imagens autênticas de pintura corporal tradicional com urucum e jenipapo, cestaria indígena e centros cerimoniais de saberes.
    * *Reserva Extrativista Rio Cautário:* Imagens de canoagem em igarapés de águas pretas espelhadas e castanheiras gigantescas da Amazônia.
    * *Quilombo de Pedras Negras:* Fotos reais de monitoramento e berçário de tartarugas-da-amazônia (quelônios) e pássaros da bacia do Guaporé.
    * *Estrada de Ferro Madeira-Mamoré (Porto Velho):* Fotos de locomotivas históricas a vapor e o pôr do sol avermelhado no Rio Madeira.
    * *Teixeirópolis:* Imagens de cânions de arenito e cachoeiras de águas límpidas da serra central.

#### 🚀 Novas Funcionalidades Desenvolvidas:
* **Sistema de Autenticação com 4 Perfis (`AuthModal.tsx`):**
  * Login e cadastro com validação de campos institucionais: registro no Ministério do Turismo (**Cadastur SETUR-RO**) para guias e CNPJ / Chave Pix para associações comunitárias.
  * Inclusão de atalhos de login rápido em 1 clique com usuários pré-configurados para agilizar os testes da banca avaliadora.
* **Módulo "Achar Lugares — Guia Geográfico de Rondônia" (`DestinationsExplorer.tsx`):**
  * Consulta detalhada da logística de acesso: quilometragem rodoviária a partir de Porto Velho pela BR-364 e BR-429, tempo de navegação fluvial em voadeiras e aeroportos regionais.
  * Tabela de sazonalidade amazônica (Época de Seca e Praias Fluviais vs. Época de Cheia e Floresta Alagada).
* **Cadastro Autônomo de Novas Vivências (`CreateExperienceModal.tsx`):**
  * Formulário interativo para que guias e lideranças locais cadastrem roteiros com trava obrigatória de capacidade diária de carga turística (RF04).
* **Módulo de Avaliações e Feedback Sustentável (`ReviewsModal.tsx`):**
  * Sistema de estrelas e depoimentos avaliando critérios socioambientais (hospitalidade comunitária, conduta do guia e respeito à fauna).

---

### [v1.1.0] — 20 de Outubro de 2026 (Núcleo Offline-First e Social Split)

#### 🛠️ Implementações Principais:
* **Arquitetura Offline-First & Simulação de Floresta (RF07, RF08, RNF01):**
  * Criação do seletor *Online / Off-grid* no cabeçalho do sistema para demonstrar o comportamento do aplicativo no meio da mata sem sinal 4G.
  * Geração de vouchers digitais com token criptografado `SHA-256`, QR Code SVG e coordenadas GPS gravadas localmente no navegador.
  * **Validador de Campo do Guia (`OfflineGuideScanner.tsx`):** Leitor de vouchers com detecção da Geolocation API do dispositivo, carimbo de horário e fila de sincronização diferida com a nuvem (RNF05).
* **Módulo Social Split Payment (RF06, RN04):**
  * Cálculo transparente e discriminado da divisão da receita em cada reserva: 60% a 65% para a Associação Comunitária, 25% a 35% para o Guia Cadastur e 10% a 15% para a plataforma tecnológica.
  * Simulador de pagamento instantâneo via Pix com geração dinâmica de QR Code e código Copia e Cola.
* **Trava Inviolável de Capacidade de Carga (RF04, RN02):**
  * Barra de progresso visual de ocupação de vagas em tempo real; bloqueio algorítmico automático de novas reservas ao atingir a cota máxima permitida pela comunidade.
* **Manual de Conduta Ética Mandatório (RF09, RN05):**
  * Implementação de checklist com 5 compromissos socioambientais inegociáveis para liberação do fluxo de compra.
* **Geoprocessamento com Mapa Interativo de Rondônia (`InteractiveMap.tsx`):**
  * Mapa interativo construído com Leaflet e OpenStreetMap, georreferenciando Costa Marques, Cacoal, Guajará-Mirim, São Francisco do Guaporé, Teixeirópolis e Porto Velho.
  * Botão de simulação de download do pacote de ladrilhos vetoriais offline (MBTiles de 42 MB).

---

### [v1.0.0] — 20 de Outubro de 2026 (Planejamento e Setup Inicial)

* Criação da especificação técnica preliminar (`ESPECIFICACAO_TECNICA.md`) para o Simulado do Centelha 3 Rondônia pelo estudante Eduardo Renan Souza de Aquino (IFRO).
* Inicialização do projeto frontend com Vite, React 18, TypeScript, Tailwind CSS e Lucide Icons.
* Definição da paleta de cores temática da floresta amazônica (`forest`, `terracotta`, `guapore`).
* Criação do repositório Git e primeiro push para `https://github.com/Duduzinhoroblox/RondoniaNativa1.git`.
