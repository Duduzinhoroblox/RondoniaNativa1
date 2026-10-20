import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header
        self.drawString(54, 11 * 72 - 36, "Rondônia Nativa — Especificação Técnica Final | Centelha 3")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)
        
        # Footer
        page_text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(8.5 * 72 - 54, 36, page_text)
        self.drawString(54, 36, "Confidencial • Proponente: Eduardo Renan Souza de Aquino (IFRO)")
        self.line(54, 46, 8.5 * 72 - 54, 46)
        self.restoreState()

def build_pdf():
    pdf_filename = "ESPECIFICACAO_TECNICA_FINAL_RONDONIA_NATIVA.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    c_primary = colors.HexColor("#14532d")    # Forest 900
    c_secondary = colors.HexColor("#16a34a")  # Forest 600
    c_accent = colors.HexColor("#ea580c")     # Terracotta
    c_dark = colors.HexColor("#0f172a")       # Slate 900
    c_muted = colors.HexColor("#475569")      # Slate 600
    c_bg_light = colors.HexColor("#f8fafc")

    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_muted,
        alignment=TA_CENTER
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=c_primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_accent,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_dark,
        alignment=TA_JUSTIFY,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        bulletIndent=5,
        spaceAfter=3
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1e293b")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell_style,
        fontName='Helvetica-Bold'
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 40))
    story.append(Paragraph("PROGRAMA CENTELHA 3 RONDÔNIA — SIMULADO FASE 1", ParagraphStyle('CoverSub', parent=subtitle_style, fontName='Helvetica-Bold', fontSize=10, textColor=c_accent)))
    story.append(Spacer(1, 15))
    story.append(Paragraph("ESPECIFICAÇÃO TÉCNICA E ARQUITETURA DE SOFTWARE", title_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Rondônia Nativa: Plataforma Integrada de Ecoturismo e Turismo de Base Comunitária (TBC)", subtitle_style))
    story.append(Spacer(1, 20))

    meta_table_data = [
        [Paragraph("<b>Proponente / Autor:</b>", table_cell_bold), Paragraph("Eduardo Renan Souza de Aquino (3º Ano B - Técnico em Informática)", table_cell_style)],
        [Paragraph("<b>Instituição:</b>", table_cell_bold), Paragraph("Instituto Federal de Rondônia (IFRO)", table_cell_style)],
        [Paragraph("<b>Setor Econômico:</b>", table_cell_bold), Paragraph("Turismo Ecológico, Meio Ambiente e Tecnologia da Informação", table_cell_style)],
        [Paragraph("<b>Área Tecnológica:</b>", table_cell_bold), Paragraph("Offline-First Mobile, Geoprocessamento GPS & Social Split Payment", table_cell_style)],
        [Paragraph("<b>Polos Mapeados:</b>", table_cell_bold), Paragraph("Vale do Guaporé, Rio Cautário, Cacoal (Paiter Suruí), Porto Velho, Teixeirópolis", table_cell_style)],
        [Paragraph("<b>Data de Emissão:</b>", table_cell_bold), Paragraph("Outubro de 2026 — Versão Final 1.0", table_cell_style)],
        [Paragraph("<b>Repositório Oficial:</b>", table_cell_bold), Paragraph("https://github.com/Duduzinhoroblox/RondoniaNativa1", table_cell_style)],
    ]

    t_meta = Table(meta_table_data, colWidths=[140, 360])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ]))
    story.append(t_meta)
    
    story.append(Spacer(1, 30))
    story.append(Paragraph("<b>Resumo Executivo do Projeto:</b>", h2_style))
    story.append(Paragraph(
        "O <b>Rondônia Nativa</b> é uma solução tecnológica pioneira desenvolvida para sanar o isolamento mercadológico do turismo sustentável e de base comunitária em Rondônia. Integrando arquitetura <b>Offline-First</b> (visualização de mapas vetoriais e emissão de vouchers com validação criptográfica via GPS sem sinal de celular) e mecanismo automático de <b>Social Split Payment</b> (repasse instantâneo de até 65% das reservas diretamente para as contas PIX de associações indígenas e quilombolas), o projeto viabiliza a geração de renda com a floresta em pé e proteção socioambiental com controle algorítmico rígido de capacidade de carga.",
        body_style
    ))

    story.append(PageBreak())

    # ================= SECTION 1: VISÃO GERAL =================
    story.append(Paragraph("1. VISÃO GERAL E CONTEXTO SOCIOAMBIENTAL", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))
    
    story.append(Paragraph("<b>1.1 O Gargalo de Comercialização e Conectividade na Amazônia</b>", h2_style))
    story.append(Paragraph(
        "O estado de Rondônia abriga tesouros ecológicos e culturais de repercussão global — o Real Forte Príncipe da Beira (maior fortaleza colonial portuguesa da América), a calha límpida do Rio Guaporé, reservas extrativistas centenárias de seringa e castanha (Resex Rio Cautário), além de territórios indígenas exemplares como a Terra Indígena Sete de Setembro do povo Paiter Suruí. Contudo, essa riqueza enfrenta três barreiras severas:",
        body_style
    ))
    story.append(Paragraph("• <b>Deserto de Conectividade:</b> A quase totalidade dos roteiros sustentáveis localiza-se em áreas remotas de mata primária e rios sem qualquer sinal de internet celular móvel (4G/5G).", bullet_style))
    story.append(Paragraph("• <b>Inadequação das Plataformas Tradicionais:</b> Airbnb Experiências e TripAdvisor exigem conectividade constante, cobram taxas abusivas em moeda estrangeira, ignoram a legislação da FUNAI e ICMBio e não realizam o split de renda para as associações locais.", bullet_style))
    story.append(Paragraph("• <b>Risco de Degradação por Turismo Predatório:</b> Ausência de controle algorítmico sobre a capacidade de carga diária dos ecossistemas frágeis.", bullet_style))

    story.append(Paragraph("<b>1.2 Objetivos Estratégicos</b>", h2_style))
    story.append(Paragraph("<b>1. Digitalização Autônoma:</b> Cadastro simples de experiências por guias locais Cadastur e lideranças tradicionais.", bullet_style))
    story.append(Paragraph("<b>2. Autonomia Off-Grid Total:</b> Navegação georreferenciada e validação de ingressos por QR Code com carimbo GPS sem conexão de rede.", bullet_style))
    story.append(Paragraph("<b>3. Repasse Social Transparente (Split):</b> Crédito bancário direto nas subcontas das comunidades associadas.", bullet_style))
    story.append(Paragraph("<b>4. Blindagem Legal:</b> Curadoria prévia com checagem de autorizações da FUNAI (Terras Indígenas) e ICMBio (Unidades de Conservação).", bullet_style))

    # ================= SECTION 2: ARQUITETURA TECNOLÓGICA =================
    story.append(Spacer(1, 10))
    story.append(Paragraph("2. ARQUITETURA DA SOLUÇÃO E STACK TECNOLÓGICA", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    story.append(Paragraph(
        "A plataforma adota arquitetura em camadas orientada a eventos e sincronização resiliente, dividida em quatro núcleos principais:",
        body_style
    ))

    arch_table_data = [
        [Paragraph("<b>Camada</b>", table_header_style), Paragraph("<b>Tecnologias Utilizadas</b>", table_header_style), Paragraph("<b>Função no Sistema</b>", table_header_style)],
        [
            Paragraph("<b>Apresentação (UI/UX)</b>", table_cell_bold),
            Paragraph("React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons", table_cell_style),
            Paragraph("Portal Web responsivo, PWA instalável, painéis específicos para Turista, Guia, Liderança e Administrador.", table_cell_style)
        ],
        [
            Paragraph("<b>Offline-First & GPS</b>", table_cell_bold),
            Paragraph("SQLite / WatermelonDB, IndexedDB, Leaflet GIS, MBTiles", table_cell_style),
            Paragraph("Armazenamento local de ladrilhos de mapa, vouchers assinados com token SHA-256 e fila de sincronização diferida.", table_cell_style)
        ],
        [
            Paragraph("<b>Backend & APIs</b>", table_cell_bold),
            Paragraph("Node.js REST API, PostgreSQL (Supabase), Geolocation API", table_cell_style),
            Paragraph("Catálogo mestre, controle transacional de capacidade de carga e logs de auditoria territorial.", table_cell_style)
        ],
        [
            Paragraph("<b>Gateway Social Split</b>", table_cell_bold),
            Paragraph("API Split Payment (Asaas / Pagar.me Subcontas Pix)", table_cell_style),
            Paragraph("Divisão automática no momento do checkout: 60%+ Associação, 25-35% Guia Cadastur, 10-15% Plataforma.", table_cell_style)
        ],
    ]

    t_arch = Table(arch_table_data, colWidths=[110, 160, 230])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
    ]))
    story.append(t_arch)

    story.append(PageBreak())

    # ================= SECTION 3: REQUISITOS FUNCIONAIS =================
    story.append(Paragraph("3. REQUISITOS FUNCIONAIS DO SISTEMA (RF)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    rf_data = [
        [Paragraph("<b>ID</b>", table_header_style), Paragraph("<b>Requisito</b>", table_header_style), Paragraph("<b>Especificação Detalhada & Regra de Negócio</b>", table_header_style)],
        [
            Paragraph("<b>RF01</b>", table_cell_bold),
            Paragraph("Gestão de Acesso e 4 Perfis", table_cell_bold),
            Paragraph("Autenticação e permissões para: Turista Consciente, Guia Cadastur (com checagem de número ativo), Liderança Comunitária (CNPJ e Pix) e Administrador.", table_cell_style)
        ],
        [
            Paragraph("<b>RF02</b>", table_cell_bold),
            Paragraph("Cadastro de Roteiros e Vivências", table_cell_bold),
            Paragraph("Interface para cadastro autônomo de trilhas, vivências culturais, canoagem e expedições com upload de mídia, roteiro hora-a-hora e lista de itens obrigatórios.", table_cell_style)
        ],
        [
            Paragraph("<b>RF03</b>", table_cell_bold),
            Paragraph("Curadoria Territorial (FUNAI/ICMBio)", table_cell_bold),
            Paragraph("Roteiros em Terras Indígenas ou Unidades de Conservação exigem anexação prévia de autorizações legais antes da publicação (RN03).", table_cell_style)
        ],
        [
            Paragraph("<b>RF04</b>", table_cell_bold),
            Paragraph("Trava de Capacidade de Carga", table_cell_bold),
            Paragraph("Bloqueio algorítmico inviolável de emissão de ingressos ao atingir a cota máxima diária de pessoas estipulada pelas comunidades (RN02).", table_cell_style)
        ],
        [
            Paragraph("<b>RF05</b>", table_cell_bold),
            Paragraph("Busca e Guia de Lugares", table_cell_bold),
            Paragraph("Módulo 'Achar Lugares' com distâncias em km de Porto Velho (BR-364/BR-429), bacias hidrográficas e recomendações sazonais de seca e cheia.", table_cell_style)
        ],
        [
            Paragraph("<b>RF06</b>", table_cell_bold),
            Paragraph("Social Split Payment", table_cell_bold),
            Paragraph("Repasse transparente instantâneo via Pix para subcontas da Associação Comunitária (60%+) e do Guia Cadastur com comprovante discriminado (RN04).", table_cell_style)
        ],
        [
            Paragraph("<b>RF07</b>", table_cell_bold),
            Paragraph("Vouchers Offline Criptografados", table_cell_bold),
            Paragraph("Geração de QR Code assinado localmente com coordenadas GPS do ponto de encontro, baixável no dispositivo para uso off-grid.", table_cell_style)
        ],
        [
            Paragraph("<b>RF08</b>", table_cell_bold),
            Paragraph("Validador de Campo do Guia", table_cell_bold),
            Paragraph("Scanner mobile que lê o QR Code do turista offline, carimba timestamp e coordenada GPS do leitor e enfileira para sincronização posterior.", table_cell_style)
        ],
        [
            Paragraph("<b>RF09</b>", table_cell_bold),
            Paragraph("Manual de Conduta Ética", table_cell_bold),
            Paragraph("Checklist mandatório com 5 compromissos socioambientais (respeito a fotos, resíduo zero, não coleta de espécimes) para liberar reserva (RN05).", table_cell_style)
        ],
        [
            Paragraph("<b>RF10</b>", table_cell_bold),
            Paragraph("Avaliações e Feedback Sustentável", table_cell_bold),
            Paragraph("Métricas de hospitalidade comunitária, atuação do guia e conformidade ambiental avaliadas pós-expedição pelos viajantes.", table_cell_style)
        ],
    ]

    t_rf = Table(rf_data, colWidths=[45, 145, 310])
    t_rf.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
    ]))
    story.append(t_rf)

    # ================= SECTION 4: REQUISITOS NÃO FUNCIONAIS =================
    story.append(Spacer(1, 10))
    story.append(Paragraph("4. REQUISITOS NÃO-FUNCIONAIS (RNF)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    rnf_data = [
        [Paragraph("<b>RNF01 - Operação 100% Off-Grid:</b> O app executa tarefas críticas (leitura de mapa baixado, GPS e vouchers) com zero dependência de conexão de internet.", body_style)],
        [Paragraph("<b>RNF02 - Pegada Otimizada (< 80 MB):</b> Compatibilidade com smartphones de entrada utilizados por guias e lideranças locais em comunidades ribeirinhas.", body_style)],
        [Paragraph("<b>RNF03 - Sincronização Diferida Resiliente:</b> O mecanismo de sincronização tolera conexões oscilantes (2G/EDGE ou Wi-Fi comunitário) sem duplicação de transações.", body_style)],
        [Paragraph("<b>RNF04 - Proteção de Dados e LGPD:</b> Anonimização de dados sensíveis e criptografia de ponta a ponta (AES-256 e TLS 1.3) em todas as transações.", body_style)],
    ]

    t_rnf = Table(rnf_data, colWidths=[500])
    t_rnf.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('PADDING', (0,0), (-1,-1), 4),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#94a3b8")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ]))
    story.append(t_rnf)

    story.append(PageBreak())

    # ================= SECTION 5: MODELAGEM DE DADOS =================
    story.append(Paragraph("5. MODELAGEM DE DADOS E ENTIDADES PRINCIPAIS (ERD)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    story.append(Paragraph(
        "A estrutura relacional foi modelada para garantir rastreabilidade financeira no split e controle rígido das sessões de vivência:",
        body_style
    ))

    erd_data = [
        [Paragraph("<b>Entidade</b>", table_header_style), Paragraph("<b>Campos Principais</b>", table_header_style), Paragraph("<b>Relacionamentos & Integridade</b>", table_header_style)],
        [
            Paragraph("<b>USUARIO</b>", table_cell_bold),
            Paragraph("id_usuario, nome, email, role (TURISTA | GUIA | LIDERANCA | ADMIN), cadastur_num, cadastur_status, pix_key, telefone", table_cell_style),
            Paragraph("Realiza RESERVA; Guia é responsável por EXPERIENCIA_SESSAO.", table_cell_style)
        ],
        [
            Paragraph("<b>ASSOCIACOES_COMUNITARIAS</b>", table_cell_bold),
            Paragraph("id_associacao, nome_entidade, cnpj, chave_pix, conta_split, lider_nome, total_fundos_recebidos, comunidade_local", table_cell_style),
            Paragraph("Possui múltiplos ROTEIROS; Recebe repasses de TRANSACAO_SPLIT.", table_cell_style)
        ],
        [
            Paragraph("<b>ROTEIRO</b>", table_cell_bold),
            Paragraph("id_roteiro, titulo, descricao, preco_total, capacidade_maxima_carga, requer_funai, requer_icmbio, status_curadoria", table_cell_style),
            Paragraph("Pertence a uma ASSOCIAÇÃO; Agenda múltiplas EXPERIENCIA_SESSAO.", table_cell_style)
        ],
        [
            Paragraph("<b>EXPERIENCIA_SESSAO</b>", table_cell_bold),
            Paragraph("id_sessao, id_roteiro, data_evento, vagas_ocupadas, vagas_disponiveis, guia_responsavel_id", table_cell_style),
            Paragraph("Contém N RESERVAS limitadas pela capacidade_maxima_carga.", table_cell_style)
        ],
        [
            Paragraph("<b>RESERVA</b>", table_cell_bold),
            Paragraph("id_reserva, id_sessao, id_usuario, voucher_hash_sha256, status, validado_offline, timestamp_gps, lat_gps, lng_gps", table_cell_style),
            Paragraph("Gera exatamente uma TRANSACAO_SPLIT; Gera um VOUCHER_OFFLINE.", table_cell_style)
        ],
        [
            Paragraph("<b>TRANSACAO_SPLIT</b>", table_cell_bold),
            Paragraph("id_transacao, id_reserva, valor_total, repasse_associacao_pix, repasse_guia, taxa_plataforma, status_split", table_cell_style),
            Paragraph("Execução atômica no gateway financeiro em subcontas integradas.", table_cell_style)
        ],
    ]

    t_erd = Table(erd_data, colWidths=[110, 210, 180])
    t_erd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
    ]))
    story.append(t_erd)

    # ================= SECTION 6: ROADMAP & CRITÉRIOS CENTELHA =================
    story.append(Spacer(1, 10))
    story.append(Paragraph("6. ROADMAP DE EXECUÇÃO EM 4 ETAPAS (CRONOGRAMA)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    roadmap_data = [
        [Paragraph("<b>Etapa</b>", table_header_style), Paragraph("<b>Duração</b>", table_header_style), Paragraph("<b>Principais Entregas e Marcos</b>", table_header_style)],
        [
            Paragraph("<b>Etapa 1: Imersão & Mapeamento UX</b>", table_cell_bold),
            Paragraph("40 dias", table_cell_style),
            Paragraph("Entrevistas com guias Cadastur e lideranças comunitárias no Guaporé e Cacoal; inventário de dispositivos e rotinas de campo.", table_cell_style)
        ],
        [
            Paragraph("<b>Etapa 2: Protótipo No-Code MVP</b>", table_cell_bold),
            Paragraph("50 dias", table_cell_style),
            Paragraph("Validação rápida de usabilidade e agendamento em Porto Velho com grupo piloto reduzido de turistas e condutores.", table_cell_style)
        ],
        [
            Paragraph("<b>Etapa 3: Desenvolvimento Nativo</b>", table_cell_bold),
            Paragraph("75 dias", table_cell_style),
            Paragraph("Construção do motor Offline-First (SQLite/Leaflet Tiles), validação criptográfica por QR Code com GPS e gateway de split PIX.", table_cell_style)
        ],
        [
            Paragraph("<b>Etapa 4: Homologação & Piloto Oficial</b>", table_cell_bold),
            Paragraph("45 dias", table_cell_style),
            Paragraph("Homologação formal com SETUR-RO, FUNAI e ICMBio; lançamento do piloto comercial no polo Forte Príncipe da Beira e Guaporé.", table_cell_style)
        ],
    ]

    t_road = Table(roadmap_data, colWidths=[150, 60, 290])
    t_road.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
    ]))
    story.append(t_road)

    story.append(Spacer(1, 15))
    story.append(Paragraph("7. MATRIZ DE AVALIAÇÃO DO PROGRAMA CENTELHA 3", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceAfter=8))

    centelha_data = [
        [Paragraph("<b>Critério Centelha</b>", table_header_style), Paragraph("<b>Peso</b>", table_header_style), Paragraph("<b>Atendimento Comprovado no Projeto</b>", table_header_style)],
        [
            Paragraph("<b>Solução</b>", table_cell_bold),
            Paragraph("Peso 2", table_cell_bold),
            Paragraph("Solução inédita de arquitetura Offline-First adaptada à floresta amazônica unida ao Social Split Payment automatizado.", table_cell_style)
        ],
        [
            Paragraph("<b>Mercado</b>", table_cell_bold),
            Paragraph("Peso 1", table_cell_bold),
            Paragraph("Captura o mercado em franca expansão global de turismo de base comunitária e de imersão de natureza sustentável.", table_cell_style)
        ],
        [
            Paragraph("<b>Impacto</b>", table_cell_bold),
            Paragraph("Peso 1", table_cell_bold),
            Paragraph("Economia da floresta em pé: fomento econômico direto a ribeirinhos, indígenas e quilombolas com contenção do desmatamento.", table_cell_style)
        ],
        [
            Paragraph("<b>Execução</b>", table_cell_bold),
            Paragraph("Peso 1", table_cell_bold),
            Paragraph("Viabilidade técnica ancorada na capacitação do estudante em Informática (IFRO), código funcional e parcerias com SETUR-RO e guias.", table_cell_style)
        ],
    ]

    t_centelha = Table(centelha_data, colWidths=[90, 50, 360])
    t_centelha.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_accent),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
    ]))
    story.append(t_centelha)

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF build complete: " + pdf_filename)

if __name__ == '__main__':
    build_pdf()
