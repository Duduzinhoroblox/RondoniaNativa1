# ESPECIFICAÇÃO TÉCNICA E GUIA DE INSTALAÇÃO (FINAL)
## **Rondônia Nativa: Plataforma Integrada de Ecoturismo e Turismo de Base Comunitária (TBC)**

> **Projeto:** Rondônia Nativa  
> **Programa:** Programa Centelha 3 Rondônia — Simulado Fase 1  
> **Proponente / Autor:** Eduardo Renan Souza de Aquino (3º Ano B - Técnico em Informática)  
> **Instituição:** Instituto Federal de Rondônia (IFRO)  
> **Setor Econômico:** Turismo Sustentável, Meio Ambiente e Tecnologia da Informação  
> **Repositório GitHub:** [https://github.com/Duduzinhoroblox/RondoniaNativa1](https://github.com/Duduzinhoroblox/RondoniaNativa1)  
> **Versão da Spec:** 1.3.0 (Final para Avaliação Docente)  

---

## 1. OBJETIVO DA PLATAFORMA

### 1.1 Contexto e Problema
O estado de Rondônia possui um patrimônio natural, arqueológico e sociocultural inestimável — abrigando o **Real Forte Príncipe da Beira** (Costa Marques), a bacia do **Rio Guaporé**, terras indígenas demarcadas (como a **T.I. Sete de Setembro** do povo Paiter Suruí), territórios quilombolas ancestrais (**Quilombo de Pedras Negras**) e reservas extrativistas seringueiras (**Resex Rio Cautário**).

Apesar dessa riqueza, o turismo sustentável enfrenta gargalos críticos:
1. **Deserto de Conectividade:** A quase totalidade dos atrativos ecológicos situa-se em áreas de floresta primária e calhas de rios onde não há sinal de internet celular móvel (4G/5G).
2. **Inadequação de Plataformas Globais:** Softwares como Airbnb Experiências e TripAdvisor exigem internet ininterrupta, cobram taxas pesadas em moeda estrangeira, não realizam a divisão justa de receitas para as comunidades e ignoram os marcos regulatórios territoriais da **FUNAI** e do **ICMBio**.
3. **Turismo Predatório e Degradação:** Ausência de controle algorítmico rígido sobre a capacidade de suporte e carga dos ecossistemas.

### 1.2 Objetivo Geral
Construir uma plataforma digital integrada (Web & Mobile PWA Offline-First) dedicada ao ecoturismo e turismo de base comunitária em Rondônia, conectando turistas conscientes a guias locais credenciados no Cadastur e lideranças tradicionais, combinando **navegação e validação 100% off-grid via GPS**, divisão transparente de receitas (**Social Split Payment**) e trava inviolável de **capacidade de carga turística**.

---

## 2. PERFIS DE USUÁRIO E CASOS DE USO

| Perfil | Descrição e Papel no Sistema | Casos de Uso Principais |
|:---|:---|:---|
| **Turista Consciente** | Viajante em busca de experiências autênticas de ecoturismo e imersão cultural. | Busca e filtragem de vivências por região/sazonalidade; verificação de conformidade FUNAI/ICMBio; aceite mandatório do Manual de Conduta Ética; pagamento simulado via PIX com transparência de split; download do voucher offline com QR Code e GPS; envio de avaliações socioambientais. |
| **Guia Local Cadastur** | Condutor profissional habilitado no Ministério do Turismo (SETUR-RO). | Acesso ao leitor offline de vouchers por câmera/hash; validação de ingressos no campo com carimbo de timestamp e coordenadas GPS; visualização de grupos confirmados; sincronização diferida em lote com o servidor em nuvem. |
| **Liderança Comunitária / TBC** | Representante legal de associação indígena, quilombola ou ribeirinha. | Gestão do Fundo Comunitário acumulado com o split (60%+); visualização do extrato de repasses PIX; regulagem soberana do teto de capacidade de carga diária do território. |
| **Administrador / Curadoria** | Gestor da plataforma e analista regulatório. | Homologação de certidões Cadastur; análise documental e deferimento de autorizações da FUNAI e licenças do ICMBio; auditoria dos dados de impacto Centelha 3. |

---

## 3. REQUISITOS DO SISTEMA

### 3.1 Requisitos Funcionais (RF)
* **RF01 - Gestão de Perfis e Acesso:** Cadastro e autenticação com 4 perfis distintos (Turista, Guia, Liderança Comunitária e Administrador) com persistência de sessão e validação de documentos específicos.
* **RF02 - Cadastro Autônomo de Roteiros:** Interface para inclusão de novas vivências por guias e associações, definindo duração, exigências físicas, roteiro hora-a-hora, o que levar e imagens temáticas.
* **RF03 - Curadoria Legal e Territorial:** Trava obrigatória onde roteiros em Terras Indígenas (TI) ou Unidades de Conservação (UC) exigem validação prévia de autorização formal da FUNAI e do ICMBio (RN03).
* **RF04 - Trava Algorítmica de Capacidade de Carga:** Controle estrito de vagas diárias máximas por atração, bloqueando automaticamente reservas excedentes (RN02).
* **RF05 - Busca e Guia Geográfico de Lugares:** Módulo de descoberta de destinos de Rondônia com distâncias rodoviárias de Porto Velho (BR-364 / BR-429), bacias hidrográficas e sazonalidade (seca vs. cheia).
* **RF06 - Social Split Payment:** Divisão automatizada no momento da reserva: 60% a 65% para Associação Comunitária, 25% a 35% para o Guia Cadastur e 10% a 15% para manutenção tecnológica (RN04).
* **RF07 - Vouchers Digitais Offline (QR Code & GPS):** Emissão de voucher criptografado com token de segurança SHA-256 e coordenadas GPS do ponto de encontro, armazenado localmente no dispositivo.
* **RF08 - Validador de Campo do Guia:** Scanner móvel que permite ao guia validar ingressos sem conexão com a internet, registrando coordenada GPS e horário da validação com enfileiramento para sincronização diferida.
* **RF09 - Manual de Conduta Ética Mandatório:** Checklist interativo obrigatório de 5 pilares socioambientais (respeito a fotos, resíduo zero, não coleta de espécies selvagens) antes de confirmar qualquer reserva (RN05).
* **RF10 - Avaliações e Feedback Sustentável:** Sistema pós-expedição avaliando hospitalidade da comunidade, atuação do guia e cumprimento dos protocolos de preservação.

### 3.2 Requisitos Não-Funcionais (RNF)
* **RNF01 - Operação Off-Grid Total:** Funcionamento integral das rotinas de navegação em mapas locais, verificação GPS e vouchers sem acesso a sinal 4G/Wi-Fi.
* **RNF02 - Pegada Leve e Desempenho (< 80 MB):** Arquitetura frontend otimizada para aparelhos móveis de entrada usados por comunidades ribeirinhas.
* **RNF03 - Sincronização Diferida Resiliente:** Tolerância a conexões oscilantes (2G/EDGE), garantindo atomicidade sem duplicidade de registros.
* **RNF04 - Privacidade e Segurança (LGPD):** Anonimização de credenciais, ausência de senhas expostas e comunicação segura via HTTPS.

---

## 4. REGRAS DE NEGÓCIO (RN)

* **RN01 - Acompanhamento Obrigatório por Guia Cadastur:** Nenhuma expedição em área de preservação ou floresta pode ocorrer sem condutor local com registro Cadastur ativo.
* **RN02 - Inviolabilidade da Capacidade de Carga:** O sistema não permite em hipótese alguma a venda de ingressos além da cota diária cadastrada pela comunidade.
* **RN03 - Trava Territorial FUNAI/ICMBio:** Experiências em Terras Indígenas ou Unidades de Conservação permanecem com status pendente até aprovação formal dos órgãos federais.
* **RN04 - Transparência Financeira do Split:** O comprovante exibe de forma discriminada a porcentagem exata creditada via Pix na conta da Associação Comunitária parceira.
* **RN05 - Aceite Ético Incondicional:** O encerramento da compra exige confirmação explícita de leitura dos 5 compromissos do Manual de Conduta Ética.

---

## 5. MODELAGEM DE DADOS E RELACIONAMENTOS (BANCO DE DADOS)

O banco de dados relacional oficial foi estruturado no padrão SQL ANSI / PostgreSQL:

| Tabela | Campos Principais | Chave Primária | Relacionamentos (Chaves Estrangeiras) |
|:---|:---|:---|:---|
| `usuarios` | id, nome, email, senha_hash, tipo_perfil, telefone, cpf, cadastur_num, cadastur_status, comunidade_nome, chave_pix | `id` | — |
| `associacoes_comunitarias` | id, nome_entidade, localizacao, cnpj, chave_pix_split, conta_bancaria_split, lider_nome, total_fundos_recebidos | `id` | — |
| `destinos_turisticos` | id, nome, municipio, ecossistema, bacia_hidrografica, distancia_porto_velho_km, acesso_rodoviario, melhor_epoca, latitude, longitude | `id` | — |
| `roteiros` | id, associacao_id, guia_responsavel_id, destino_id, titulo, preco_total, capacidade_maxima_carga, split_porcentagem_associacao | `id` | `associacao_id` → `associacoes_comunitarias.id`<br>`guia_responsavel_id` → `usuarios.id`<br>`destino_id` → `destinos_turisticos.id` |
| `sessoes_vivencia` | id, roteiro_id, data_evento, vagas_totais, vagas_ocupadas, status_sessao | `id` | `roteiro_id` → `roteiros.id` |
| `reservas` | id, roteiro_id, usuario_id, data_reserva, quantidade_vagas, valor_total, voucher_hash_sha256, status_reserva, validado_offline | `id` | `roteiro_id` → `roteiros.id`<br>`usuario_id` → `usuarios.id` |
| `transacoes_split` | id, reserva_id, valor_total, valor_repasse_associacao, chave_pix_associacao, valor_repasse_guia, taxa_plataforma | `id` | `reserva_id` → `reservas.id` |
| `avaliacoes_sustentaveis` | id, roteiro_id, turista_id, nota_geral, nota_hospitalidade_comunidade, nota_atuacao_guia, comentario | `id` | `roteiro_id` → `roteiros.id`<br>`turista_id` → `usuarios.id` |
| `registros_validacao_offline` | id, voucher_hash, turista_nome, roteiro_titulo, latitude_gps, longitude_gps, validado_em_campo, sincronizado_nuvem | `id` | — |

---

## 6. DECISÃO DE STACK TECNOLÓGICA

* **Frontend:** React 18, Vite 6, TypeScript 5, Tailwind CSS, Lucide Icons, canvas-confetti, qrcode.react.
* **Geoprocessamento e Mapas:** Leaflet GIS com OpenStreetMap e motor de ladrilhos vetoriais (MBTiles) para cache offline.
* **Armazenamento e Criptografia Local:** LocalStorage, IndexedDB e Web Crypto API (SHA-256) para validação off-grid.
* **Banco de Dados Relacional:** PostgreSQL 15+ / Supabase / Neon (Script de criação e seed em `database/schema.sql`).
* **Gateway Financeiro:** Arquitetura simulada compatível com APIs de Split Payment do Asaas / Pagar.me.
* **Hospedagem em Nuvem:** Vercel (com regras de reescrita SPA em `vercel.json`).

---

## 7. INSTALAÇÃO E EXECUÇÃO (GUIA PASSO A PASSO PARA O PROFESSOR)

Esta seção foi elaborada para que qualquer avaliador clone e execute a plataforma localmente sem dificuldades.

### 7.1 Ambiente e Pré-requisitos
* **Node.js:** Versão 20.x ou superior (Recomendado: Node v22.x LTS).
* **Gerenciador de Pacotes:** `npm` (versão 10+ ou 11+).
* **Sistema Operacional Testado:** Windows 10/11 (PowerShell), Ubuntu Linux 22.04 LTS e macOS Sonoma.
* **Navegador Recomendado:** Google Chrome, Microsoft Edge, Firefox ou Safari atualizados.

### 7.2 Banco de Dados
* **SGBD Compatível:** PostgreSQL versão 15 ou superior (ou serviços em nuvem como Supabase ou Neon).
* **Nome do Banco:** `rondonia_nativa`
* **Caminho do Script SQL:** `database/schema.sql`
* **Como importar pelo Terminal (PostgreSQL):**
  ```bash
  # 1. Conectar ao Postgres e criar o banco
  psql -U postgres -c "CREATE DATABASE rondonia_nativa;"

  # 2. Executar o script que cria as tabelas e insere os dados de teste (Seed)
  psql -U postgres -d rondonia_nativa -f database/schema.sql
  ```
* **Como importar graficamente (DBeaver ou pgAdmin):**
  1. Conecte ao seu servidor PostgreSQL local.
  2. Crie um novo banco chamado `rondonia_nativa`.
  3. Abra o arquivo `database/schema.sql` no Editor de Scripts SQL e execute todo o script (F5).
  4. O script já contém os comandos de criação de tabelas, índices e a inserção completa de usuários, associações, roteiros e reservas de teste (Seed Data).

### 7.3 Variáveis de Ambiente
O repositório inclui o arquivo de modelo `.env.example`. Para rodar localmente, copie-o para `.env`:
```bash
cp .env.example .env
```

**Descrição das Variáveis:**
* `PORT`: Porta local utilizada pelo servidor web (padrão: `3000`).
* `VITE_APP_NAME`: Nome institucional da aplicação (`Rondonia Nativa`).
* `VITE_APP_URL`: URL base local (`http://localhost:3000`).
* `DB_HOST`: Endereço do banco relacional (`localhost`).
* `DB_PORT`: Porta do PostgreSQL (`5432`).
* `DB_NAME`: Nome da base de dados (`rondonia_nativa`).
* `DB_USER`: Usuário do banco local (`postgres`).
* `DB_PASS`: Senha do seu banco local.
* `VITE_SPLIT_GATEWAY_URL`: Endpoint da API de split de pagamento (modo sandbox).
* `VITE_OFFLINE_SECRET_SALT`: Chave usada no cálculo do checksum dos vouchers off-grid.

### 7.4 Passo a Passo de Instalação (Do Git Clone ao Navegador)
Siga os 6 passos abaixo exatamente nesta ordem:

```bash
# Passo 1: Clonar o repositório oficial do GitHub
git clone https://github.com/Duduzinhoroblox/RondoniaNativa1.git

# Passo 2: Entrar na pasta do projeto
cd RondoniaNativa1

# Passo 3: Instalar as dependências do projeto
npm install

# Passo 4: Criar o arquivo de ambiente local
cp .env.example .env

# Passo 5: Iniciar o servidor de desenvolvimento local
npm run dev

# Passo 6: Abrir o sistema no navegador no endereço exibido:
# Acesse: http://localhost:3000
```

Para gerar a compilação de produção e testá-la estaticamente:
```bash
npm run build
npm run preview
```

### 7.5 Como Testar o Sistema (Roteiro de Demonstração)

#### Autenticação Realista e Validação Estrita de Credenciais:
O sistema possui controle rigoroso de autenticação e validação de formulários:
* **Bloqueio de Entradas Aleatórias:** Digitar caracteres aleatórios ou e-mails inexistentes resulta em mensagem de erro explícita (`E-mail não cadastrado no sistema...`) e impede o acesso.
* **Validação de Senha:** Cada usuário possui senha validada (`senha123` para as contas padrão da spec).
* **Persistência de Usuários:** Contas criadas na aba *"Cadastrar Novo Usuário"* são validadas (formato de e-mail, senha com no mínimo 6 dígitos, telefone com DDD, número Cadastur para guias e CNPJ/Pix para lideranças) e gravadas persistentemente para login posterior.

#### Usuários de Teste Pré-Configurados (Para Teste com 1 Clique ou Digitação Manual):
Ao clicar no botão **"Entrar"** no cabeçalho do site, há 4 atalhos com 1 clique para entrar instantaneamente com os perfis cadastrados no banco, ou você pode digitar as credenciais na aba manual:
1. **Mariana Vasconcelos (Turista):** `mariana.vasconcelos@ecotur.com.br` | Senha: `senha123`
2. **Moacir Karipuna Guaporé (Guia Cadastur):** `moacir.guia@rondonianativa.org.br` | Senha: `senha123` (Registro: `RO-26.0084/2024-TUR`)
3. **Dona Benvinda Quilombola (Liderança TBC):** `pedrasnegras.guapore@gmail.com` | Senha: `senha123` (Assoc. Pedras Negras)
4. **Eduardo Renan (Admin & Centelha 3):** `innot.renan@gmail.com` | Senha: `senha123`

#### Roteiro do Fluxo Principal (Passo a Passo de Avaliação):
1. **Descoberta:** Acesse a vitrine inicial, utilize os filtros de pesquisa e o botão **"Achar Lugares (Guia RO)"** para ver a logística da BR-364/BR-429 e a sazonalidade de secas/cheias.
2. **Reserva com Trava de Capacidade:** Escolha a experiência *"Expedição Rio Guaporé & Fortaleza Real Forte Príncipe da Beira"*, clique em *"Reservar"* e veja o limite máximo diário de 12 pessoas.
3. **Aceite Mandatório de Ética:** No Passo 2 da reserva, marque os 5 compromissos do Manual de Conduta Ética para desbloquear o pagamento.
4. **Social Split Payment:** No Passo 3, observe a discriminação transparente do valor (60% Associação, 28% Guia Cadastur, 12% Tecnologia) e clique em *"Simular Pagamento PIX Concluído"*.
5. **Voucher Digital Offline:** Veja a geração imediata do voucher com QR Code assinado localmente e coordenadas GPS.
6. **Simulação de Floresta (Modo Off-Grid):** Clique no botão verde *"Online"* no cabeçalho para alterná-lo para *"Off-grid (Floresta)"*. Note que os vouchers salvos continuam perfeitamente acessíveis sem internet.
7. **Validação de Campo pelo Guia:** Alterne para a aba *"Validador Offline"* e simule a leitura do voucher emitido. O leitor gravará a coordenada GPS e horário no dispositivo.
8. **Fundo Comunitário & Governança:** Acesse a aba *"Fundo Comunitário"* para auditar o extrato do Pix recebido pelas comunidades e use o controle deslizante para ajustar a capacidade de carga do território.

#### Limitações e Problemas Conhecidos:
* O leitor de QR Code utiliza simulação de leitura criptográfica local nos navegadores desktop (quando não há webcam conectada).
* As transações financeiras operam em modo Sandbox/Simulação sem débito bancário real em contas de produção.

---

## 8. CHECKLIST DE CONFORMIDADE E SEGURANÇA

* [x] **Repositório Git Versionado:** Histórico semântico com múltiplos commits reais ao longo do projeto.
* [x] **Professor Convidado como Colaborador:** Usuário `rafaelpitwak` adicionado em Settings → Collaborators.
* [x] **Credenciais Protegidas:** Nenhuma senha real ou chave de API no código-fonte; `.env` excluído no `.gitignore` e `.env.example` preenchido apenas com dados fictícios.
* [x] **Script SQL Autossuficiente:** Arquivo `database/schema.sql` com criação de tabelas, tipos, restrições e seed data.
* [x] **Changelog Documentado:** Arquivo `CHANGELOG.md` detalhando as correções e a revisão humana crítica do que a IA propôs.
* [x] **Compatibilidade Vercel:** Configuração `vercel.json` preparada para deploy estático gratuito e contínuo.
