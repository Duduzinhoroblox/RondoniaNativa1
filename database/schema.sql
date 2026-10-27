-- ============================================================================
-- RONDÔNIA NATIVA — ESQUEMA DO BANCO DE DADOS RELACIONAL (POSTGRESQL / SUPABASE)
-- Projeto: Plataforma Integrada de Ecoturismo e Turismo de Base Comunitária
-- Proponente: Eduardo Renan Souza de Aquino (IFRO) - Centelha 3 Rondônia
-- Arquivo: database/schema.sql
-- ============================================================================

-- 1. CRIAÇÃO DO BANCO DE DADOS (Executar se necessário)
-- CREATE DATABASE rondonia_nativa WITH ENCODING 'UTF8';
-- \c rondonia_nativa;

-- Extensões úteis para UUID e criptografia
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. TABELA: usuarios
-- Perfis: TURISTA, GUIA, LIDERANCA, ADMIN
-- ============================================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(64) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_perfil VARCHAR(20) NOT NULL CHECK (tipo_perfil IN ('TURISTA', 'GUIA', 'LIDERANCA', 'ADMIN')),
    telefone VARCHAR(30) NOT NULL,
    cpf VARCHAR(18),
    avatar_url TEXT,
    cadastur_num VARCHAR(50),
    cadastur_status VARCHAR(20) DEFAULT 'PENDENTE' CHECK (cadastur_status IN ('ATIVO', 'EM_ANALISE', 'PENDENTE')),
    comunidade_nome VARCHAR(150),
    chave_pix VARCHAR(150),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. TABELA: associacoes_comunitarias
-- Entidades representativas de povos indígenas, quilombolas e ribeirinhos
-- ============================================================================
CREATE TABLE IF NOT EXISTS associacoes_comunitarias (
    id VARCHAR(64) PRIMARY KEY,
    nome_entidade VARCHAR(200) NOT NULL,
    localizacao VARCHAR(200) NOT NULL,
    cnpj VARCHAR(25) UNIQUE NOT NULL,
    chave_pix_split VARCHAR(150) NOT NULL,
    conta_bancaria_split VARCHAR(100) NOT NULL,
    lider_nome VARCHAR(150) NOT NULL,
    quantidade_familias INT DEFAULT 0,
    total_fundos_recebidos NUMERIC(12, 2) DEFAULT 0.00,
    logo_url TEXT,
    email_contato VARCHAR(150),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. TABELA: destinos_turisticos
-- Polos ecológicos e históricos de Rondônia com coordenadas e logística
-- ============================================================================
CREATE TABLE IF NOT EXISTS destinos_turisticos (
    id VARCHAR(64) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    ecossistema VARCHAR(150) NOT NULL,
    bacia_hidrografica VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    historia_cultura TEXT NOT NULL,
    distancia_porto_velho_km INT NOT NULL,
    acesso_rodoviario TEXT NOT NULL,
    acesso_fluvial TEXT,
    acesso_aereo TEXT,
    melhor_epoca VARCHAR(150) NOT NULL,
    tipo_sazonalidade VARCHAR(30) NOT NULL CHECK (tipo_sazonalidade IN ('SECA_PRAIAS', 'CHEIA_IGAPO', 'ANO_TODO')),
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    regime_protecao VARCHAR(200) NOT NULL
);

-- ============================================================================
-- 5. TABELA: roteiros
-- Catálogo de vivências sustentáveis com regras de capacidade de carga e split
-- ============================================================================
CREATE TABLE IF NOT EXISTS roteiros (
    id VARCHAR(64) PRIMARY KEY,
    associacao_id VARCHAR(64) NOT NULL REFERENCES associacoes_comunitarias(id) ON DELETE RESTRICT,
    guia_responsavel_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    destino_id VARCHAR(64) REFERENCES destinos_turisticos(id) ON DELETE SET NULL,
    titulo VARCHAR(200) NOT NULL,
    subtitulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(30) NOT NULL CHECK (categoria IN ('CULTURAL', 'TRILHA', 'FLUVIAL', 'FAUNA', 'HISTORICO')),
    regiao VARCHAR(100) NOT NULL,
    ponto_encontro VARCHAR(200) NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    preco_total NUMERIC(10, 2) NOT NULL CHECK (preco_total > 0),
    duracao_horas INT NOT NULL CHECK (duracao_horas > 0),
    dificuldade VARCHAR(20) NOT NULL CHECK (dificuldade IN ('Leve', 'Moderado', 'Desafiador')),
    capacidade_maxima_carga INT NOT NULL CHECK (capacidade_maxima_carga > 0),
    vagas_preenchidas INT DEFAULT 0 CHECK (vagas_preenchidas >= 0),
    requer_autorizacao_funai BOOLEAN DEFAULT FALSE,
    numero_portaria_funai VARCHAR(50),
    requer_autorizacao_icmbio BOOLEAN DEFAULT FALSE,
    numero_portaria_icmbio VARCHAR(50),
    status_curadoria VARCHAR(20) DEFAULT 'APROVADO' CHECK (status_curadoria IN ('APROVADO', 'PENDENTE', 'EM_ANALISE', 'REJEITADO')),
    split_porcentagem_associacao NUMERIC(5, 2) NOT NULL CHECK (split_porcentagem_associacao >= 50.0),
    split_porcentagem_guia NUMERIC(5, 2) NOT NULL,
    split_porcentagem_plataforma NUMERIC(5, 2) NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. TABELA: sessoes_vivencia
-- Agendas de datas disponíveis com controle de capacidade por dia
-- ============================================================================
CREATE TABLE IF NOT EXISTS sessoes_vivencia (
    id VARCHAR(64) PRIMARY KEY,
    roteiro_id VARCHAR(64) NOT NULL REFERENCES roteiros(id) ON DELETE CASCADE,
    data_evento DATE NOT NULL,
    vagas_totais INT NOT NULL,
    vagas_ocupadas INT DEFAULT 0,
    status_sessao VARCHAR(20) DEFAULT 'DISPONIVEL' CHECK (status_sessao IN ('DISPONIVEL', 'LOTADO', 'CANCELADO')),
    UNIQUE (roteiro_id, data_evento)
);

-- ============================================================================
-- 7. TABELA: reservas
-- Ingressos emitidos para turistas com hash SHA-256 para validação off-grid
-- ============================================================================
CREATE TABLE IF NOT EXISTS reservas (
    id VARCHAR(64) PRIMARY KEY,
    roteiro_id VARCHAR(64) NOT NULL REFERENCES roteiros(id) ON DELETE RESTRICT,
    usuario_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    data_reserva DATE NOT NULL,
    quantidade_vagas INT NOT NULL CHECK (quantidade_vagas > 0),
    valor_total NUMERIC(10, 2) NOT NULL CHECK (valor_total > 0),
    voucher_hash_sha256 VARCHAR(128) UNIQUE NOT NULL,
    status_reserva VARCHAR(20) DEFAULT 'CONFIRMADA' CHECK (status_reserva IN ('PENDENTE', 'CONFIRMADA', 'UTILIZADA', 'CANCELADA')),
    termo_conduta_aceito BOOLEAN NOT NULL DEFAULT TRUE,
    validado_offline BOOLEAN DEFAULT FALSE,
    validado_em_gps TIMESTAMP WITH TIME ZONE,
    validado_latitude NUMERIC(9, 6),
    validado_longitude NUMERIC(9, 6),
    validado_por_guia_cadastur VARCHAR(50),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. TABELA: transacoes_split
-- Registro da divisão de pagamentos direcionada às subcontas PIX
-- ============================================================================
CREATE TABLE IF NOT EXISTS transacoes_split (
    id VARCHAR(64) PRIMARY KEY,
    reserva_id VARCHAR(64) UNIQUE NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    valor_total NUMERIC(10, 2) NOT NULL,
    valor_repasse_associacao NUMERIC(10, 2) NOT NULL,
    chave_pix_associacao VARCHAR(150) NOT NULL,
    valor_repasse_guia NUMERIC(10, 2) NOT NULL,
    cadastur_guia VARCHAR(50) NOT NULL,
    taxa_plataforma NUMERIC(10, 2) NOT NULL,
    status_repasse VARCHAR(20) DEFAULT 'LIQUIDADO' CHECK (status_repasse IN ('PENDENTE', 'LIQUIDADO', 'ESTORNADO')),
    liquidado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 9. TABELA: avaliacoes_sustentaveis
-- Avaliações pós-viagem com métricas socioambientais (RF10)
-- ============================================================================
CREATE TABLE IF NOT EXISTS avaliacoes_sustentaveis (
    id VARCHAR(64) PRIMARY KEY,
    roteiro_id VARCHAR(64) NOT NULL REFERENCES roteiros(id) ON DELETE CASCADE,
    turista_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    nota_geral INT NOT NULL CHECK (nota_geral BETWEEN 1 AND 5),
    nota_hospitalidade_comunidade INT NOT NULL CHECK (nota_hospitalidade_comunidade BETWEEN 1 AND 5),
    nota_atuacao_guia INT NOT NULL CHECK (nota_atuacao_guia BETWEEN 1 AND 5),
    nota_respeito_socioambiental INT NOT NULL CHECK (nota_respeito_socioambiental BETWEEN 1 AND 5),
    comentario TEXT NOT NULL,
    data_avaliacao DATE DEFAULT CURRENT_DATE
);

-- ============================================================================
-- 10. TABELA: registros_validacao_offline
-- Fila de sincronização diferida dos guias de campo (RNF05)
-- ============================================================================
CREATE TABLE IF NOT EXISTS registros_validacao_offline (
    id VARCHAR(64) PRIMARY KEY,
    voucher_hash VARCHAR(128) NOT NULL,
    turista_nome VARCHAR(150) NOT NULL,
    roteiro_titulo VARCHAR(200) NOT NULL,
    latitude_gps NUMERIC(9, 6) NOT NULL,
    longitude_gps NUMERIC(9, 6) NOT NULL,
    validado_em_campo TIMESTAMP WITH TIME ZONE NOT NULL,
    sincronizado_nuvem BOOLEAN DEFAULT FALSE,
    guia_cadastur VARCHAR(50) NOT NULL
);

-- ============================================================================
-- ÍNDICES DE PERFORMANCE E INTEGRIDADE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_roteiros_categoria ON roteiros(categoria);
CREATE INDEX IF NOT EXISTS idx_roteiros_regiao ON roteiros(regiao);
CREATE INDEX IF NOT EXISTS idx_reservas_voucher ON reservas(voucher_hash_sha256);
CREATE INDEX IF NOT EXISTS idx_reservas_usuario ON reservas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_reserva ON transacoes_split(reserva_id);


-- ============================================================================
-- DADOS INICIAIS (SEED DATA) — PARA TESTE LOCAL E AVALIAÇÃO
-- ============================================================================

-- 1. Usuários de Teste (Senhas hash fictícias para teste: senha123)
INSERT INTO usuarios (id, nome, email, senha_hash, tipo_perfil, telefone, cpf, avatar_url, cadastur_num, cadastur_status, criado_em)
VALUES 
(
    'usr-tourist-mariana',
    'Mariana Vasconcelos',
    'mariana.vasconcelos@ecotur.com.br',
    '$2b$10$wT8hM8qN6K6B1n0a9e7ohe6lPkWF8p1n5s6u4e7w9q0a1b2c3d4e5',
    'TURISTA',
    '(11) 98712-4091',
    '384.912.448-02',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    NULL,
    'PENDENTE',
    CURRENT_TIMESTAMP
),
(
    'usr-guide-moacir',
    'Moacir Karipuna Guaporé',
    'moacir.guia@rondonianativa.org.br',
    '$2b$10$wT8hM8qN6K6B1n0a9e7ohe6lPkWF8p1n5s6u4e7w9q0a1b2c3d4e5',
    'GUIA',
    '(69) 99312-4411',
    '642.119.802-44',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'RO-26.0084/2024-TUR',
    'ATIVO',
    CURRENT_TIMESTAMP
),
(
    'usr-lead-benvinda',
    'Dona Benvinda dos Santos Quilombola',
    'pedrasnegras.guapore@gmail.com',
    '$2b$10$wT8hM8qN6K6B1n0a9e7ohe6lPkWF8p1n5s6u4e7w9q0a1b2c3d4e5',
    'LIDERANCA',
    '(69) 99220-7714',
    '411.890.312-90',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    NULL,
    'PENDENTE',
    CURRENT_TIMESTAMP
),
(
    'usr-admin-eduardo',
    'Eduardo Renan Souza de Aquino',
    'innot.renan@gmail.com',
    '$2b$10$wT8hM8qN6K6B1n0a9e7ohe6lPkWF8p1n5s6u4e7w9q0a1b2c3d4e5',
    'ADMIN',
    '(69) 99988-7766',
    '038.992.142-10',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    NULL,
    'ATIVO',
    CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO NOTHING;

-- 2. Associações Comunitárias Tradicionais Parceiras
INSERT INTO associacoes_comunitarias (id, nome_entidade, localizacao, cnpj, chave_pix_split, conta_bancaria_split, lider_nome, quantidade_familias, total_fundos_recebidos, logo_url, email_contato)
VALUES
(
    'assoc-pedras-negras',
    'Associação Comunitária Quilombola de Pedras Negras (ACOQUIPN)',
    'São Francisco do Guaporé / Rio Guaporé - RO',
    '08.942.311/0001-89',
    'quilombo.pedrasnegras@rondonianativa.org.br',
    'Banco da Amazônia - Ag 0038 / C/C 45892-1',
    'Dona Benvinda dos Santos Quilombola',
    145,
    38400.00,
    'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=400&auto=format&fit=crop&q=80',
    'pedrasnegras.guapore@gmail.com'
),
(
    'assoc-paiter-surui',
    'Associação Metareilá do Povo Indígena Paiter Suruí',
    'Aldeia Pama, T.I. Sete de Setembro - Cacoal / RO',
    '04.112.980/0001-44',
    'metareila.paiter@surui.org.br',
    'Banco do Brasil - Ag 0643 / C/C 19230-8',
    'Almir Narayamoga Suruí',
    420,
    62850.00,
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    'contato@metareila.org.br'
),
(
    'assoc-resex-cautario',
    'Associação dos Extrativistas do Rio Cautário (ARECA)',
    'Reserva Extrativista Rio Cautário - Guajará-Mirim / RO',
    '07.319.452/0001-12',
    'areca.cautario.resex@gmail.com',
    'Caixa Econômica - Ag 1290 / C/C 8712-4',
    'Raimundo Nonato da Silva (Seu Muri)',
    88,
    29700.00,
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&auto=format&fit=crop&q=80',
    'resex.cautario@areca.org.br'
),
(
    'assoc-agetur-ro',
    'Cooperativa de Guias e Condutores Ecoturísticos de Rondônia',
    'Porto Velho e Vale do Jamari - RO',
    '14.882.019/0001-77',
    'agetur.rondonia@coop.br',
    'Sicoob Amazônia - Ag 3110 / C/C 10452-9',
    'Carlos Eduardo Nogueira',
    52,
    41200.00,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    'contato@agetur-ro.com.br'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Roteiros Homologados com Capacidade de Carga e Split
INSERT INTO roteiros (
    id, associacao_id, guia_responsavel_id, titulo, subtitulo, descricao, categoria, regiao, ponto_encontro,
    latitude, longitude, preco_total, duracao_horas, dificuldade, capacidade_maxima_carga, vagas_preenchidas,
    requer_autorizacao_funai, numero_portaria_funai, requer_autorizacao_icmbio, numero_portaria_icmbio,
    status_curadoria, split_porcentagem_associacao, split_porcentagem_guia, split_porcentagem_plataforma
)
VALUES
(
    'exp-guapore-forte',
    'assoc-pedras-negras',
    'usr-guide-moacir',
    'Expedição Rio Guaporé & Fortaleza Real Forte Príncipe da Beira',
    'Navegação fluvial lendária, maior fortaleza colonial militar das Américas e história viva na fronteira Brasil-Bolívia.',
    'Imersão pelo Rio Guaporé até os baluartes de pedra do Real Forte Príncipe da Beira (1776), com avistamento de botos e almoço comunitário.',
    'HISTORICO',
    'Vale do Guaporé (Costa Marques)',
    'Porto Fluvial de Costa Marques',
    -12.4282, -64.4239,
    420.00, 10, 'Leve', 12, 8,
    FALSE, NULL, TRUE, 'ICMBio-UC-2026/RO-0089',
    'APROVADO', 60.0, 28.0, 12.0
),
(
    'exp-paiter-surui',
    'assoc-paiter-surui',
    'usr-guide-moacir',
    'Vivência Ancestral Paiter Suruí: Saberes e Trilha Etnobotânica',
    'Imersão cultural na Aldeia Pama, aprendizado das plantas medicinais e tradições guerreiras Paiter.',
    'Trilha etnobotânica na mata primária, oficina de pintura corporal com jenipapo e urucum, e gastronomia tradicional indígena.',
    'CULTURAL',
    'Cacoal / T.I. Sete de Setembro',
    'Centro Cultural de Cacoal',
    -11.2386, -61.4429,
    490.00, 8, 'Leve', 10, 6,
    TRUE, 'FUNAI-RO-TI7SET/2026-042', FALSE, NULL,
    'APROVADO', 65.0, 25.0, 10.0
),
(
    'exp-resex-cautario',
    'assoc-resex-cautario',
    'usr-guide-moacir',
    'Travessia Tradicional Ribeirinha da Resex Rio Cautário',
    'Vida seringueira autêntica, trilha da castanha-da-amazônia e canoagem nos igarapés de águas pretas.',
    'Caminhada sob castanheiras centenárias, demonstração prática do corte de látex seringueiro e descida em canoa nativa a remo.',
    'TRILHA',
    'Guajará-Mirim / Costa Marques',
    'Base Fluvial do Cautário',
    -11.9567, -63.7431,
    380.00, 9, 'Moderado', 8, 4,
    FALSE, NULL, TRUE, 'ICMBio-RESEX-CAUTARIO-2026/014',
    'APROVADO', 62.0, 26.0, 12.0
)
ON CONFLICT (id) DO NOTHING;

-- 4. Reserva Fictícia para Teste Imediato de Voucher
INSERT INTO reservas (
    id, roteiro_id, usuario_id, data_reserva, quantidade_vagas, valor_total, voucher_hash_sha256,
    status_reserva, termo_conduta_aceito, validado_offline
)
VALUES
(
    'RN-RES-2026-081',
    'exp-guapore-forte',
    'usr-tourist-mariana',
    '2026-10-24',
    2,
    840.00,
    'RN-VCH-849204A-GUAPORE-SECURE',
    'CONFIRMADA',
    TRUE,
    FALSE
)
ON CONFLICT (id) DO NOTHING;

-- 5. Split Financeiro da Reserva
INSERT INTO transacoes_split (
    id, reserva_id, valor_total, valor_repasse_associacao, chave_pix_associacao,
    valor_repasse_guia, cadastur_guia, taxa_plataforma, status_repasse
)
VALUES
(
    'TRX-SPLIT-081',
    'RN-RES-2026-081',
    840.00,
    504.00,
    'quilombo.pedrasnegras@rondonianativa.org.br',
    235.20,
    'RO-26.0084/2024-TUR',
    100.80,
    'LIQUIDADO'
)
ON CONFLICT (id) DO NOTHING;
