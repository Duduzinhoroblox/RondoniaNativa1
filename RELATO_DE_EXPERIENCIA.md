# INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE RONDÔNIA
### Campus Porto Velho Calama — Curso Técnico em Informática / Desenvolvimento de Sistemas
### Componente Curricular: Programar com IA de Forma Responsável
### Docente Orientador: Prof. Rafael Pitwak

---

# RELATO DE EXPERIÊNCIA ACADÊMICA

## **Do Planejamento ao Deploy com IA: Um Relato de Experiência no Desenvolvimento da Plataforma Rondônia Nativa**

**Autor:** Eduardo Renan Souza de Aquino  
**Orientador:** Prof. Rafael Pitwak  
**Instituição:** Instituto Federal de Rondônia (IFRO) — Campus Porto Velho Calama  
**Data:** Novembro de 2026  
**Repositório Oficial:** [https://github.com/Duduzinhoroblox/RondoniaNativa1](https://github.com/Duduzinhoroblox/RondoniaNativa1)  
**Sistema em Produção:** [https://duduzinhoroblox.github.io/RondoniaNativa1/](https://duduzinhoroblox.github.io/RondoniaNativa1/)  

---

### **RESUMO**
Este relato de experiência descreve e analisa criticamente o processo de planejamento, construção, auditoria, testes e publicação do sistema *Rondônia Nativa*, uma plataforma digital de ecoturismo e turismo de base comunitária voltada à realidade da Amazônia rondoniense. O projeto foi desenvolvido sob a metodologia ensinada na apostila *“Programar com IA de forma responsável”*, adotando o ciclo estruturado de especificação rigorosa (`spec.md`), pareamento com o agente inteligente Google Antigravity, versionamento semântico no Git/GitHub e implantação em nuvem. Ao longo do percurso, foram enfrentados desafios técnicos e operacionais significativos, com ênfase no esgotamento frequente dos créditos e cotas de teste gratuito da ferramenta de IA — o que exigiu constante alternância de contas e recomposição de contexto —, na identificação de códigos complacentes que permitiam autenticações inválidas e nas complexidades de rotas de deploy. A experiência evidenciou que a programação assistida por IA desloca o papel central do desenvolvedor da digitação sintática para a governança arquitetural, exigindo postura analítica redobrada para que a automação não se converta em negligência técnica.

**Palavras-chave:** Inteligência Artificial; Desenvolvimento de Software; Google Antigravity; Ecoturismo; Relato de Experiência.

---

### **1. INTRODUÇÃO**
O avanço acelerado dos modelos de linguagem e dos agentes autônomos de codificação tem provocado uma profunda transformação no ensino e na prática do desenvolvimento de sistemas. No entanto, a mera geração automatizada de código sem método, sem governança e sem validação técnica tende a produzir soluções frágeis, desconectadas da realidade e difíceis de manter. O presente relato tem como objeto o desenvolvimento do sistema *Rondônia Nativa*, concebido no âmbito do Curso Técnico em Informática do IFRO Campus Porto Velho Calama e estruturado como proposta para o Simulado da Fase 1 do Programa Centelha 3 Rondônia.

O *Rondônia Nativa* é uma plataforma integrada voltada ao fortalecimento do ecoturismo e do turismo de base comunitária (TBC) em destinos emblemáticos do estado de Rondônia, como o Real Forte Príncipe da Beira (Costa Marques), a Terra Indígena Sete de Setembro (povo Paiter Suruí em Cacoal), a Reserva Extrativista Rio Cautário e a comunidade quilombola de Pedras Negras (bacia do Rio Guaporé). O sistema aborda dores crônicas da Amazônia: a ausência de sinal de internet nas calhas de rios (resolvida por arquitetura *Offline-First* com mapas locais e vouchers validados por GPS), a evasão de receitas locais (solucionada pelo *Social Split Payment* com repasse mínimo de 60% via Pix às associações tradicionais) e a ameaça de degradação ambiental (mitigada por travas algorítmicas de capacidade de carga e manual de conduta ética).

O objetivo deste documento não é somente apresentar as telas ou funcionalidades do sistema final, mas refletir metodologicamente sobre a experiência vivida pelo estudante-desenvolvedor durante a colaboração com o agente de IA Google Antigravity. Registrar esse percurso se justifica pela necessidade de documentar a transição pedagógica entre a programação tradicional e o desenvolvimento centrado em especificação e auditoria, destacando os atritos reais, os limites das ferramentas e as decisões humanas que garantiram a integridade da entrega.

---

### **2. REFERENCIAL TEÓRICO**
O desenvolvimento de software assistido por Inteligência Artificial representa uma mudança de paradigma na engenharia de software contemporânea. Conforme ensinado na apostila *“Programar com IA de forma responsável”* (PITWAK, 2026), programar com agentes autônomos não significa abdicar do raciocínio lógico ou terceirizar a responsabilidade do projeto a um modelo probabilístico. Pelo contrário: a IA generativa atua como um acelerador de implementação (*pair programmer*), enquanto o desenvolvedor humano assume a função indelegável de arquiteto de software, auditor de segurança e validador de regras de negócio.

Na abordagem tradicional de ensino de programação, a maior parte do esforço cognitivo do estudante costuma ser consumida na memorização de sintaxes, na resolução de erros de compilação pontuais e na escrita repetitiva de código estrutural (*boilerplate*). No desenvolvimento assistido por agentes inteligentes, o centro de gravidade se desloca para a elaboração de especificações técnicas precisas (*Software Requirements Specification* — SRS), para o desenho do modelo entidade-relacionamento e para a condução de testes de estresse sobre as propostas devolvidas pelo agente.

Um conceito fundamental discutido na literatura e vivenciado neste projeto é o *Automation Bias* (viés de automação) — a tendência psicológica de o operador humano confiar acriticamente nas saídas geradas por sistemas automatizados. Para mitigar esse risco, o método adotado exigiu a formalização de contratos de especificação antes de qualquer linha de código ser escrita, estabelecendo critérios claros de aceite que serviram de régua para aprovar, modificar ou rejeitar as contribuições do agente.

---

### **3. METODOLOGIA / PERCURSO DA EXPERIÊNCIA**
O desenvolvimento do projeto seguiu um fluxo dividido em seis fases interdependentes:

1. **Planejamento e Elaboração da Especificação (`spec.md`):** Definição minuciosa dos 4 perfis de usuários (Turista Consciente, Guia Cadastur, Liderança Comunitária e Administrador Geral), dos 10 requisitos funcionais (RF01 a RF10), dos requisitos não-funcionais voltados à realidade ribeirinha (RNF01 a RNF04) e das 5 regras de negócio inegociáveis (RN01 a RN05).
2. **Configuração do Ambiente Tecnológico:** Inicialização do ecossistema moderno com Node.js (v20+ LTS), Vite 6, React 18, TypeScript 5, Tailwind CSS e controle de versão semântico com Git e GitHub.
3. **Desenvolvimento Iterativo Pareado com o Google Antigravity:** O agente foi utilizado em modo de autonomia supervisionada com execução de comandos locais, geração de componentes modulares, integração da biblioteca Leaflet (geoprocessamento GIS) e motor de QR Code com criptografia local.
4. **Modelagem e Estruturação do Banco de Dados Relacional:** Construção do script SQL autossuficiente (`database/schema.sql`) em PostgreSQL/SQL ANSI, contendo 9 tabelas relacionais com restrições de integridade, chaves estrangeiras e carga inicial (*Seed Data*).
5. **Auditoria Crítica e Testes de Borda:** Inspeção rigorosa de formulários, validação da trava de capacidade de carga, testes de persistência em `localStorage` e checagem de vazamento de credenciais via `.env.example` e `.gitignore`.
6. **Deploy Multiplataforma e Otimização para Indexação:** Publicação automatizada em ambiente público através do GitHub Pages, estruturação de fallback SPA (`404.html`), testes de compatibilidade na Vercel e inclusão de metadados SEO com *Schema.org* (JSON-LD), `sitemap.xml` e `robots.txt` para rastreamento pelo Googlebot.

---

### **4. RELATO DA EXPERIÊNCIA**
A interação prática com o Google Antigravity revelou dinâmicas fascinantes e desafiadoras sobre como uma inteligência artificial interpreta instruções de negócio. O trabalho ocorreu por meio de ciclos iterativos de prompt, inspeção de código (*diffs*), execução em terminal sandbox e correções cirúrgicas.

Um momento marcante ocorreu durante a construção visual da vitrine de atrativos turísticos. Em sua primeira sugestão autônoma, o agente de IA preencheu os cards de experiências utilizando fotos genéricas do repositório Unsplash contendo praias oceânicas paradisíacas e florestas temperadas do hemisfério norte. Caso o desenvolvedor aceitasse passivamente a proposta, o projeto perderia completamente a autenticidade regional exigida pelo edital do Centelha 3. Foi necessária uma intervenção humana firme: o agente foi instruído a rejeitar os ativos genéricos e a incorporar links e metadados fotográficos verídicos que representassem com fidelidade a cantaria militar do Real Forte Príncipe da Beira em Costa Marques, as águas escuras da Resex Rio Cautário, a pintura corporal em urucum da Terra Indígena Paiter Suruí e os quelônios do Rio Guaporé em Pedras Negras.

Outro marco essencial ocorreu na definição da persistência de dados. Inicialmente, o agente propôs manter os dados exclusivamente em memória de execução e no armazenamento do navegador (`localStorage`), alegando simplicidade no frontend. Essa decisão foi veementemente rejeitada pela equipe discente com base no referencial da apostila, que cobra formalmente a modelagem de banco de dados. Exigiu-se a estruturação de um arquivo SQL relacional formal (`database/schema.sql`) de 416 linhas, com tabelas para associações comunitárias, cotas de carga, transações de split, registros de validação offline com latitude/longitude e integridade referencial com chaves estrangeiras.

Por fim, a implementação da alternância *Online / Off-grid* na barra de navegação demonstrou o potencial da IA quando bem orientada: o agente estruturou a simulação de perda de sinal de internet, demonstrando que os vouchers baixados e as coordenadas GPS continuavam plenamente funcionais no dispositivo mesmo quando desconectado da rede, cumprindo o objetivo central de inovação amazônica da proposta.

---

### **5. DIFICULDADES E DESAFIOS ENFRENTADOS**

Nenhum projeto de tecnologia transcorre sem tropeços, e documentar os gargalos reais é a parte mais valiosa deste relato acadêmico:

#### **A) A Fricção Crítica das Cotas e Testes Gratuitos do Google Antigravity**
A principal barreira operacional vivenciada residiu nos limites severos das cotas de uso gratuito da ferramenta Google Antigravity. Como o projeto envolvia compilações constantes, inspeção de arquivos extensos e raciocínios arquiteturais densos, os créditos e tokens de teste se esgotavam em momentos cruciais do desenvolvimento. 

Essa limitação impunha uma rotina exaustiva e desgastante: a sessão era interrompida abruptamente, obrigando o estudante a criar ou alternar contas do Google/GitHub, gerar novos *Personal Access Tokens* (PAT), reconfigurar permissões de terminal e, pior de tudo, reintroduzir manualmente todo o contexto do projeto para que a nova instância do agente compreendesse o que já havia sido concluído e o que ainda precisava ser feito. 

Essa experiência prática evidenciou uma lição elementar de engenharia de software: **a importância vital de uma documentação viva e centralizada**. Foi exatamente a presença dos arquivos `spec.md` e `CHANGELOG.md` na raiz do repositório que permitiu à nova conta recuperar a memória do projeto em poucos segundos, transformando um obstáculo desestruturante em uma prova de resiliência metodológica.

#### **B) A Armadilha da Complacência: O Bug do Login com Caracteres Aleatórios**
Durante a etapa de testes exploratórios de interface, o estudante digitou uma sequência aleatória de caracteres no formulário de acesso (ex.: `fygteyefgfegefgefg`) para testar o comportamento do sistema diante de dados inválidos. Para surpresa e alarme da equipe, o sistema aceitou o texto espúrio, criou um usuário fictício em tempo de execução e efetuou o login normalmente.

Ao auditar o arquivo `AuthModal.tsx`, descobriu-se que o agente de IA havia programado um *fallback* excessivamente permissivo: se o e-mail não existisse, ele criava uma conta provisória sem validação sintática e sem verificação de senha, visando "facilitar a navegação do usuário". Trata-se de um exemplo clássico de vício de IA generativa, que prioriza a ausência de travamentos em detrimento da segurança e da veracidade lógica. O estudante corrigiu imediatamente a postura do sistema: rejeitou a solução complacente e exigiu a inclusão de validação estrita com expressão regular RFC de e-mail, consulta obrigatória ao banco persistente de usuários e verificação estrita de senha (`senha123`), bloqueando acessos indevidos com avisos visuais de erro.

#### **C) Desafios de Implantação e Roteamento SPA na Nuvem**
A publicação do sistema no ar exigiu contornar particularidades técnicas de hospedagem de Single Page Applications (SPA). Tentativas preliminares com a CLI da Vercel apresentaram restrições de permissão e bloqueios anônimos de terminal em ambiente Windows Sandbox. A solução adotada consistiu na utilização do GitHub Pages como provedor de alta disponibilidade: ajustou-se o `base: './'` no `vite.config.ts`, gerou-se o fallback `404.html` para redirecionamento das rotas internas do React, incluiu-se o arquivo `.nojekyll` e publicou-se o bundle estático compilado diretamente na branch `gh-pages`, garantindo acesso imediato com status HTTP 200 OK.

---

### **6. RESULTADOS E REFLEXÕES**
A comparação entre a experiência de programar com IA e a vivência dos bimestres anteriores (onde cada linha de código em PHP, HTML e CSS era escrita manualmente pelo estudante) gerou reflexões decisivas:

* **O que ficou exponencialmente mais rápido:** A prototipagem de interfaces complexas, a configuração de bibliotecas visuais modernas (Tailwind CSS, ícones dinâmicos do Lucide, renderização de QR Code em SVG) e a estruturação sintática de esquemas de banco de dados com centenas de linhas. O tempo gasto na digitação de estruturas repetitivas foi reduzido em mais de 70%.
* **O que exigiu muito mais atenção e esforço:** A capacidade de auditoria, leitura crítica de código alheio e desenho de arquitetura. Quando se programa manualmente, o desenvolvedor compreende cada linha porque ele próprio a concebeu; ao trabalhar com IA, é facílimo cair na ilusão de que o código está correto simplesmente porque a interface é bonita e não há erros vermelhos no console. A descoberta do bug de login aleatório provou que a atenção aos detalhes invisíveis precisa ser quadruplicada.
* **O valor da disciplina de especificação:** Ficou cristalino que um agente de IA é tão bom quanto a clareza da especificação que o guia. Diante de pedidos vagos, o Antigravity gerou fotos irreais e autenticações frouxas; diante de requisitos funcionais ancorados na `spec.md`, entregou soluções robustas de split de pagamentos e geoprocessamento.

---

### **7. CONSIDERAÇÕES FINAIS**
A realização do projeto *Rondônia Nativa* comprovou que o método preconizado na apostila *“Programar com IA de forma responsável”* é não apenas viável, mas essencial para a formação dos futuros profissionais de Tecnologia da Informação. A tecnologia da IA generativa atua como uma alavanca formidável de produtividade, mas a alavanca é inútil sem o ponto de apoio firme da governança humana, da ética e do conhecimento técnico de engenharia de software.

Como sugestão para turmas futuras e outros estudantes que venham a trilhar esse caminho, recomenda-se:
1. **Nunca negligenciar a spec preliminar:** Quanto mais tempo se investe detalhando regras de negócio e modelos de dados antes de abrir o editor, menos tempo se perde corrigindo alucinações da máquina.
2. **Gerenciar o fluxo contra o esgotamento de cotas:** Manter commits atômicos e a documentação do repositório sempre em dia, prevendo que limites de ferramentas gratuitas podem se esgotar no ápice do trabalho.
3. **Assumir uma postura de "auditor desconfiado":** Testar intencionalmente caminhos de erro, inputs inválidos e situações de borda, jamais aceitando uma funcionalidade como pronta apenas porque ela parece funcionar em um clique superficial.

O projeto encerra seu ciclo avaliativo com 100% dos requisitos acadêmicos e técnicos atendidos, código auditado, banco relacional documentado, repositório versionado e sistema plenamente publicado e disponível para a comunidade.

---

### **REFERÊNCIAS**
1. **PITWAK, Rafael.** *Programar com IA de forma responsável: planejamento, desenvolvimento, testes e publicação de sistemas com apoio de agentes inteligentes*. Instituto Federal de Rondônia (IFRO), Campus Porto Velho Calama, 2026.
2. **GOOGLE DEEPMIND.** *Google Antigravity Documentation: Advanced Agentic Pair Programming & Workflow Automation*. Mountain View: Google LLC, 2026.
3. **INSTITUTO BRASILEIRO DO MEIO AMBIENTE E DOS RECURSOS NATURAIS RENOVÁVEIS (ICMBio).** *Diretrizes para o Turismo de Base Comunitária em Unidades de Conservação Federais*. Brasília: ICMBio, 2022.
4. **FUNDAÇÃO NACIONAL DOS POVOS INDÍGENAS (FUNAI).** *Normativa sobre Visitação e Turismo em Terras Indígenas (Instrução Normativa nº 03/2015)*. Brasília: FUNAI, 2015.
5. **VITEJS.** *Vite: Next Generation Frontend Tooling Documentation*. Disponível em: <https://vite.dev/>. Acesso em: 27 out. 2026.
6. **POSTGRESQL GLOBAL DEVELOPMENT GROUP.** *PostgreSQL 16 Database Management System Documentation*. Disponível em: <https://www.postgresql.org/docs/>. Acesso em: 27 out. 2026.
