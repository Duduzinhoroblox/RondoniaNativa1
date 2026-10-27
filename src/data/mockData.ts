import { CommunityAssociation, Experience, Guide, Booking, CuratorshipProposal } from '../types';

export const mockAssociations: CommunityAssociation[] = [
  {
    id: 'assoc-pedras-negras',
    name: 'Associação Comunitária Quilombola de Pedras Negras (ACOQUIPN)',
    location: 'São Francisco do Guaporé / Rio Guaporé - RO',
    cnpj: '08.942.311/0001-89',
    pixKey: 'quilombo.pedrasnegras@rondonianativa.org.br',
    bankAccount: 'Banco da Amazônia - Ag 0038 / C/C 45892-1',
    leaderName: 'Dona Benvinda dos Santos Quilombola',
    peopleCount: 145,
    totalFundsReceived: 38400.0,
    communityProjects: [
      'Preservação do Santuário de Desova de Tartarugas do Guaporé',
      'Horta Comunitária Agroecológica e Mandioca Mansa',
      'Painéis de Energia Solar para a Escola Comunitária'
    ],
    logoUrl: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=400&auto=format&fit=crop&q=80',
    contactEmail: 'pedrasnegras.guapore@gmail.com'
  },
  {
    id: 'assoc-paiter-surui',
    name: 'Associação Metareilá do Povo Indígena Paiter Suruí',
    location: 'Aldeia Pama, T.I. Sete de Setembro - Cacoal / RO',
    cnpj: '04.112.980/0001-44',
    pixKey: 'metareila.paiter@surui.org.br',
    bankAccount: 'Banco do Brasil - Ag 0643 / C/C 19230-8',
    leaderName: 'Almir Narayamoga Suruí',
    peopleCount: 420,
    totalFundsReceived: 62850.0,
    communityProjects: [
      'Plano de 50 Anos Paiter Suruí: Reflorestamento e Crédito de Carbono',
      'Centro de Saberes e Artesanato Indígena Pama',
      'Monitoramento Territorial com Drones e GPS Offline'
    ],
    logoUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    contactEmail: 'contato@metareila.org.br'
  },
  {
    id: 'assoc-resex-cautario',
    name: 'Associação dos Extrativistas do Rio Cautário (ARECA)',
    location: 'Reserva Extrativista Rio Cautário - Guajará-Mirim / RO',
    cnpj: '07.319.452/0001-12',
    pixKey: 'areca.cautario.resex@gmail.com',
    bankAccount: 'Caixa Econômica - Ag 1290 / C/C 8712-4',
    leaderName: 'Raimundo Nonato da Silva (Seu Muri)',
    peopleCount: 88,
    totalFundsReceived: 29700.0,
    communityProjects: [
      'Coleta Sustentável da Borracha Nativa e Castanha-do-Brasil',
      'Barco Ambulância Comunitário',
      'Estrutura de Ecoturismo de Baixo Impacto (Passarelas de Madeira)'
    ],
    logoUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&auto=format&fit=crop&q=80',
    contactEmail: 'resex.cautario@areca.org.br'
  },
  {
    id: 'assoc-agetur-ro',
    name: 'Cooperativa de Guias e Condutores Ecoturísticos de Rondônia',
    location: 'Porto Velho e Vale do Jamari - RO',
    cnpj: '14.882.019/0001-77',
    pixKey: 'agetur.rondonia@coop.br',
    bankAccount: 'Sicoob Amazônia - Ag 3110 / C/C 10452-9',
    leaderName: 'Carlos Eduardo Nogueira',
    peopleCount: 52,
    totalFundsReceived: 41200.0,
    communityProjects: [
      'Cursos de Primeiros Socorros em Áreas Remotas e Primeiros Socorros em Floresta (WFA)',
      'Equipamentos de Rádio VHF e Rastreadores Satelitais para Guias',
      'Capacitação em Etnoturismo e Educação Ambiental'
    ],
    logoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    contactEmail: 'contato@agetur-ro.com.br'
  }
];

export const mockGuides: Guide[] = [
  {
    id: 'guia-moacir',
    name: 'Moacir Karipuna Guaporé',
    cadastur: 'RO-26.0084/2024-TUR',
    specialty: 'Navegação Fluvial no Rio Guaporé & Etno-história das Fronteiras',
    rating: 4.97,
    totalExpeditions: 124,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '(69) 99312-4411'
  },
  {
    id: 'guia-nara',
    name: 'Nara Suruí Paiter',
    cadastur: 'RO-26.0112/2023-TUR',
    specialty: 'Etnobotânica Amazônica, Grafismos Tradicionais e Rituais Paiter',
    rating: 4.99,
    totalExpeditions: 98,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    phone: '(69) 98144-8890'
  },
  {
    id: 'guia-ivone',
    name: 'Dona Ivone Quilombola',
    cadastur: 'RO-26.0155/2025-TUR',
    specialty: 'Culinária Tradicional Guaporeana, Contação de Causos e Quelônios',
    rating: 5.0,
    totalExpeditions: 87,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    phone: '(69) 99220-7714'
  },
  {
    id: 'guia-tiago',
    name: 'Tiago Bezerra da Silva',
    cadastur: 'RO-26.0049/2022-TUR',
    specialty: 'Trekking em Floresta Primária, Primatologia e Fotografia de Natureza',
    rating: 4.92,
    totalExpeditions: 176,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    phone: '(69) 99388-1209'
  }
];

export const mockExperiences: Experience[] = [
  {
    id: 'exp-guapore-forte',
    title: 'Expedição Rio Guaporé & Fortaleza Real Forte Príncipe da Beira',
    subtitle: 'Navegação fluvial lendária, maior fortaleza colonial militar das Américas e história viva na fronteira Brasil-Bolívia.',
    category: 'HISTORICO',
    region: 'Vale do Guaporé (Costa Marques)',
    locationName: 'Costa Marques / Rio Guaporé - RO',
    latitude: -12.4282,
    longitude: -64.4239,
    priceTotal: 420.0,
    durationHours: 10,
    difficulty: 'Leve',
    maxCapacityPerDay: 12,
    currentBookedCount: 8,
    description: 'Uma imersão inesquecível pelo caudaloso Rio Guaporé até os imponentes baluartes de pedra do Real Forte Príncipe da Beira (fundado em 1776). Durante a navegação em embarcação tradicional coberta, avistamos botos-cor-de-rosa, ariranhas e aves aquáticas. O roteiro inclui visitação guiada às muralhas de 10 metros, labirinto de galerias internas, almoço típico preparado pela comunidade ribeirinha e visita ao quilombo vizinho.',
    highlights: [
      'Visita guiada às muralhas e canhões do Real Forte Príncipe da Beira (1776)',
      'Navegação fluvial ecológica pelo Rio Guaporé com observação de botos e jacarés',
      'Almoço tradicional com peixe da bacia amazônica e farinha de mandioca d’água',
      'Pôr-do-sol épico no espelho d’água da fronteira Brasil-Bolívia'
    ],
    itinerary: [
      { time: '07:30', title: 'Embarque no Porto de Costa Marques', description: 'Briefing de segurança, verificação de coletes e introdução histórica pelo Guia Cadastur.', location: 'Porto Fluvial de Costa Marques' },
      { time: '08:30', title: 'Navegação e Safári Fotográfico Fluvial', description: 'Contemplação das margens preservadas da floresta de galeria e avistamento de aves de várzea.', location: 'Calha do Rio Guaporé' },
      { time: '10:30', title: 'Chegada ao Real Forte Príncipe da Beira', description: 'Caminhada guiada pelas muralhas, capela em ruínas, quartéis e canhões coloniais portugueses.', location: 'Muralhas do Forte' },
      { time: '12:30', title: 'Banquete Comunitário Guaporeano', description: 'Refeição autêntica oferecida pela Associação Quilombola vizinha ao Forte.', location: 'Refúgio Comunitário do Forte' },
      { time: '15:30', title: 'Roda de Saberes e Retorno', description: 'Histórias orais de fronteira e navegação de retorno contemplando a luz dourada da tarde.', location: 'Porto de Costa Marques' }
    ],
    included: [
      'Transporte fluvial em barco homologado pela Capitania dos Portos',
      'Acompanhamento de Guia de Turismo Credenciado Cadastur',
      'Taxa de preservação histórica e comunitária',
      'Almoço completo regional e frutas da estação',
      'Seguro ecoturístico de acidentes pessoais'
    ],
    notIncluded: [
      'Bebidas alcoólicas',
      'Transporte rodoviário até a cidade de Costa Marques'
    ],
    mandatoryItems: [
      'Protetor solar e repelente biodegradável',
      'Chapéu ou boné com proteção de nuca',
      'Garrafa reutilizável de água (mínimo 1,5L)',
      'Documento de identidade oficial (área de fronteira internacional)'
    ],
    images: [
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: false,
    requiresICMBio: true,
    icmbioAuthNumber: 'ICMBio-UC-2026/RO-0089',
    cadasturGuideId: 'guia-moacir',
    guide: mockGuides[0],
    associationId: 'assoc-pedras-negras',
    association: mockAssociations[0],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Certificação de patrimônio histórico IPHAN e autorização ambiental ICMBio deferida.',
    splitPercentages: {
      communityAssociation: 60,
      guide: 28,
      platform: 12
    }
  },
  {
    id: 'exp-paiter-surui',
    title: 'Vivência Ancestral Paiter Suruí: Saberes e Trilha Etnobotânica',
    subtitle: 'Imersão cultural na Aldeia Pama, aprendizado das plantas medicinais e tradições guerreiras Paiter.',
    category: 'CULTURAL',
    region: 'Cacoal / T.I. Sete de Setembro',
    locationName: 'Aldeia Pama, Terra Indígena Sete de Setembro - Cacoal / RO',
    latitude: -11.2386,
    longitude: -61.4429,
    priceTotal: 490.0,
    durationHours: 8,
    difficulty: 'Leve',
    maxCapacityPerDay: 10,
    currentBookedCount: 6,
    description: 'Um encontro direto com a cultura viva do povo Paiter Suruí. Os participantes são recebidos no centro cerimonial da Aldeia Pama pelas lideranças tradicionais. O roteiro compreende uma trilha etnobotânica na mata primária para identificação de resinas, cipós e cascas medicinais milenares, oficina de pintura corporal com jenipapo e urucum, arco e flecha tradicional e degustação da culinária da floresta (beiju, castanhas e peixe moqueado na folha de bananeira).',
    highlights: [
      'Recepção formal e boas-vindas pelos anciãos da Aldeia Pama',
      'Trilha de etnobotânica guiada por xamãs e biólogos indígenas',
      'Oficina prática de grafismos sagrados com tintas naturais de jenipapo e urucum',
      'Apoio direto à Associação Metareilá e fortalecimento da cultura viva Paiter'
    ],
    itinerary: [
      { time: '08:00', title: 'Encontro no Ponto de Apoio em Cacoal', description: 'Conferência do aceite do Manual Ético e autorização FUNAI com o Guia Credenciado.', location: 'Centro de Cacoal' },
      { time: '09:00', title: 'Chegada à Aldeia Pama e Círculo de Apresentação', description: 'Recepção com cantos tradicionais e apresentação das regras da aldeia.', location: 'Oca Central / Centro de Saberes' },
      { time: '10:00', title: 'Trilha Etnobotânica na Mata Primária', description: 'Caminhada interpretativa descobrindo o uso ancestral de cada espécie da flora amazônica.', location: 'Trilha dos Pajés' },
      { time: '12:30', title: 'Almoço Tradicional Moqueado', description: 'Refeição preparada coletivamente pelas mulheres da aldeia com ingredientes agroflorestais.', location: 'Refeitório Comunitário' },
      { time: '14:30', title: 'Oficina de Grafismos e Feira de Artesanato', description: 'Pintura corporal tradicional e aquisição de biojoias e cestarias confeccionadas pelas famílias.', location: 'Pátio Comunitário' }
    ],
    included: [
      'Autorização expressa de ingresso em Terra Indígena homologada pela FUNAI',
      'Condutor indígena e Guia Cadastur especializado em turismo étnico',
      'Almoço típico indígena e degustação de frutas do quintal agroflorestal',
      'Pintura corporal tradicional',
      'Contribuição para o fundo comunitário da Associação Metareilá'
    ],
    notIncluded: [
      'Compra de artesanato exclusivo (direto com os artesãos da aldeia)',
      'Transporte individual até Cacoal'
    ],
    mandatoryItems: [
      'Calça comprida leve e calçado fechado próprio para trilha',
      'Respeito absoluto à privacidade (perguntar antes de filmar ou fotografar pessoas)',
      'Sem uso de perfumes ou cosméticos sintéticos fortes na aldeia'
    ],
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: true,
    funaiAuthNumber: 'FUNAI-RO-TI7SET/2026-042',
    requiresICMBio: false,
    cadasturGuideId: 'guia-nara',
    guide: mockGuides[1],
    associationId: 'assoc-paiter-surui',
    association: mockAssociations[1],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Aprovado pelo Conselho das Lideranças Metareilá e Deferido pela Coordenação Regional da FUNAI Ji-Paraná.',
    splitPercentages: {
      communityAssociation: 65,
      guide: 25,
      platform: 10
    }
  },
  {
    id: 'exp-resex-cautario',
    title: 'Travessia Tradicional Ribeirinha da Resex Rio Cautário',
    subtitle: 'Vida seringueira autêntica, trilha da castanha-da-amazônia e canoagem nos igarapés de águas pretas.',
    category: 'TRILHA',
    region: 'Guajará-Mirim / Costa Marques',
    locationName: 'Reserva Extrativista Rio Cautário - RO',
    latitude: -11.9567,
    longitude: -63.7431,
    priceTotal: 380.0,
    durationHours: 9,
    difficulty: 'Moderado',
    maxCapacityPerDay: 8,
    currentBookedCount: 4,
    description: 'A Reserva Extrativista do Rio Cautário é uma das áreas mais preservadas e misteriosas de Rondônia. Conduzido pelos próprios seringueiros nativos associados à ARECA, o visitante aprende o corte tradicional da seringueira (látex), recolhe ouriços de castanha-do-brasil e navega em canoas a remo pelos igarapés espelhados. Uma experiência genuína de economia da floresta em pé.',
    highlights: [
      'Demonstração prática da sangria e defumação tradicional do látex seringueiro',
      'Caminhada sob copas de castanheiras centenárias de mais de 40 metros de altura',
      'Canoagem silenciosa em igarapés de águas pretas com escuta de araras e macacos',
      'Almoço preparado em fogão a lenha ribeirinho com galinha caipira e mandioca amarela'
    ],
    itinerary: [
      { time: '07:00', title: 'Saída da Base Fluvial do Cautário', description: 'Navegação em barco voadeira até a sede da associação extrativista.', location: 'Foz do Cautário' },
      { time: '08:30', title: 'Trilha do Seringueiro', description: 'Acompanhamento do trajeto do seringueiro cortando as árvores de hevea brasiliensis.', location: 'Estrada de Seringa do Seu Muri' },
      { time: '11:00', title: 'Quebra do Ouriço da Castanha', description: 'Oficina tradicional de extração do fruto da castanheira com facão ribeirinho.', location: 'Castanhal Centenário' },
      { time: '12:30', title: 'Almoço Comunitário Sustentável', description: 'Refeição preparada com produtos colhidos no mesmo dia na reserva.', location: 'Casa do Extrativista' },
      { time: '14:30', title: 'Canoagem Contemplativa nos Igarapés', description: 'Descida silenciosa pelas águas espelhadas com paradas para banho de rio.', location: 'Igarapé do Cautarinho' }
    ],
    included: [
      'Ingresso de visitação e taxa de conservação da Resex Cautário (ICMBio)',
      'Condutor extrativista nativo e Guia de Ecoturismo Cadastur',
      'Almoço da roça e lanche de trilha com castanhas frescas',
      'Equipamentos de canoagem e salvamento',
      'Seguro de atividade em natureza'
    ],
    notIncluded: [
      'Bebidas em lata',
      'Equipamento pessoal de repelência e vestuário'
    ],
    mandatoryItems: [
      'Bota de trilha ou tênis aderente',
      'Camiseta de manga longa para proteção contra insetos',
      'Capa de chuva impermeável'
    ],
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: false,
    requiresICMBio: true,
    icmbioAuthNumber: 'ICMBio-RESEX-CAUTARIO-2026/014',
    cadasturGuideId: 'guia-tiago',
    guide: mockGuides[3],
    associationId: 'assoc-resex-cautario',
    association: mockAssociations[2],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Termo de Parceria e Uso Sustentável com o ICMBio em vigência plena.',
    splitPercentages: {
      communityAssociation: 62,
      guide: 26,
      platform: 12
    }
  },
  {
    id: 'exp-pedras-negras',
    title: 'Rota das Aves, Quelônios & Quilombo de Pedras Negras',
    subtitle: 'Conservação de tracajás, história da resistência negra no Guaporé e birdwatching em área intocada.',
    category: 'FAUNA',
    region: 'São Francisco do Guaporé',
    locationName: 'Comunidade Quilombola de Pedras Negras - Rio Guaporé / RO',
    latitude: -12.8542,
    longitude: -63.1256,
    priceTotal: 440.0,
    durationHours: 11,
    difficulty: 'Leve',
    maxCapacityPerDay: 12,
    currentBookedCount: 11,
    description: 'Pedras Negras é uma das mais emblemáticas comunidades quilombolas do Norte do Brasil, aninhada às margens pedregosas do Guaporé. Este roteiro alia a riquíssima cultura quilombola à preservação dos quelônios amazônicos (tartaruga-da-amazônia e tracajá). Os turistas participam do monitoramento de praias de desova, ouvem as modas de viola e tambores do Guaporé com Dona Benvinda e saboreiam os doces artesanais de banana e compotas locais.',
    highlights: [
      'Participação no projeto comunitário de proteção dos ninhos e soltura de tartarugas',
      'Avistamento de araras-azuis, cegonhas jaburus e gaviões-reais',
      'Apresentação cultural de roda de causos e cantigas quilombolas ancestrais',
      'Passeio em barco de alumínio ao redor das formações de pedras negras vulcânicas'
    ],
    itinerary: [
      { time: '07:00', title: 'Saída da comunidade ribeirinha de apoio', description: 'Navegação até o Quilombo de Pedras Negras.', location: 'Porto Fluvial do Guaporé' },
      { time: '08:45', title: 'Boas-vindas da Associação ACOQUIPN', description: 'Café da manhã quilombola com beiju de tapioca e café torrado na brasa.', location: 'Sede Comunitária' },
      { time: '10:00', title: 'Visita às Praias de Soltura e Monitoramento de Quelônios', description: 'Atividade prática de soltura monitorada de filhotes de tartaruga.', location: 'Praia do Guaporé' },
      { time: '12:30', title: 'Almoço Festivo Tradicional', description: 'Prato principal: Galinha caipira ao molho pardo e pirão de peixe com farinha d’água.', location: 'Barracão de Festas' },
      { time: '14:30', title: 'Trilha das Pedras Negras e Histórias da Resistência', description: 'Conhecendo a formação geológica que dá nome ao quilombo e os marcos históricos dos antepassados.', location: 'Margem do Rio' }
    ],
    included: [
      'Transporte fluvial seguro em barco motorizado',
      'Taxa de preservação de quelônios e apoio à escola quilombola',
      'Café da manhã e almoço típicos',
      'Guia Cadastur e anfitriã quilombola oficial',
      'Colete salva-vidas homologado'
    ],
    notIncluded: [
      'Bebidas alcoólicas e itens pessoais de consumo',
      'Transporte aéreo ou rodoviário até a cidade base'
    ],
    mandatoryItems: [
      'Protetor solar ecológico',
      'Binóculos para birdwatching (recomendado)',
      'Roupas de secagem rápida e chinelo/sandália de tiras firmes'
    ],
    images: [
      'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: false,
    requiresICMBio: true,
    icmbioAuthNumber: 'ICMBio-TBC-PN/2026-90',
    cadasturGuideId: 'guia-ivone',
    guide: mockGuides[2],
    associationId: 'assoc-pedras-negras',
    association: mockAssociations[0],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Atestado de Reconhecimento Quilombola emitido pela Fundação Cultural Palmares e ICMBio.',
    splitPercentages: {
      communityAssociation: 65,
      guide: 25,
      platform: 10
    }
  },
  {
    id: 'exp-teixeiropolis',
    title: 'Ecoturismo de Aventura: Circuito das Três Quedas e Mirante',
    subtitle: 'Banho de águas cristalinas, paredões rochosos e contemplação da serra central rondoniense.',
    category: 'TRILHA',
    region: 'Teixeirópolis / Vale do Paraíso',
    locationName: 'Serra Central, Teixeirópolis - RO',
    latitude: -10.9234,
    longitude: -62.2458,
    priceTotal: 260.0,
    durationHours: 6,
    difficulty: 'Desafiador',
    maxCapacityPerDay: 15,
    currentBookedCount: 7,
    description: 'Um refúgio de águas puras e mata exuberante no coração de Rondônia. O circuito percorre três quedas d’água preservadas por proprietários rurais agroecológicos e guias locais. Inclui caminhada em mata de transição, escalaminhada com corda de apoio, piscinas naturais verde-esmeralda e um mirante com visão de 360 graus do pôr do sol amazônico.',
    highlights: [
      'Banho nas piscinas naturais verde-esmeralda da Cachoeira Escondida',
      'Subida ao Mirante da Serra com vista panorâmica da Amazônia central',
      'Lanche campeiro com queijo artesanal de Rondônia e suco natural de cupuaçu',
      'Prática de Leave No Trace (Não Deixe Rastros) supervisionada'
    ],
    itinerary: [
      { time: '08:00', title: 'Ponto de Encontro em Teixeirópolis', description: 'Briefing de trilha e alongamento coletivo.', location: 'Praça Central' },
      { time: '09:00', title: 'Primeira Queda: Cachoeira do Véu', description: 'Trilha sombreada e primeira parada para mergulho revigorante.', location: 'Cachoeira do Véu' },
      { time: '11:30', title: 'Trilha do Canyon e Segunda Queda', description: 'Travessia de leito de pedras e cachoeira em cânion de arenito.', location: 'Canyon das Águas' },
      { time: '13:00', title: 'Piquenique Agroecológico Rondoniense', description: 'Pausa para degustação de queijo com selo de Indicação Geográfica de RO e suco de cupuaçu.', location: 'Área de Descanso dos Castanhais' },
      { time: '14:30', title: 'Subida ao Mirante da Serra e Encerramento', description: 'Atingimento do cume com vista panorâmica e fotografia.', location: 'Mirante 360°' }
    ],
    included: [
      'Condutor profissional especializado em caminhadas agrestes Cadastur',
      'Kit lanche agroecológico regional com produtos de produtores locais',
      'Kit de primeiros socorros em ambiente remoto e comunicação via rádio',
      'Taxas de acesso às propriedades rurais agroecológicas'
    ],
    notIncluded: [
      'Equipamentos pessoais de caminhada',
      'Transporte até o município de Teixeirópolis'
    ],
    mandatoryItems: [
      'Tênis ou bota com sola tratorada (não é permitido chinelo na trilha)',
      'Mochila pequena de ataque com 2L de água',
      'Roupa de banho e toalha compacta'
    ],
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: false,
    requiresICMBio: false,
    cadasturGuideId: 'guia-tiago',
    guide: mockGuides[3],
    associationId: 'assoc-agetur-ro',
    association: mockAssociations[3],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Roteiro em conformidade com as diretrizes de ecoturismo da SETUR-RO e Defesa Civil.',
    splitPercentages: {
      communityAssociation: 55,
      guide: 33,
      platform: 12
    }
  },
  {
    id: 'exp-madeira-mamore',
    title: 'Circuito Histórico Ferrovia Madeira-Mamoré & Rio Madeira',
    subtitle: 'A saga dos pioneiros da Amazônia, memorial ferroviário revitalizado e pôr do sol no colossal Rio Madeira.',
    category: 'HISTORICO',
    region: 'Porto Velho',
    locationName: 'Complexo da Estrada de Ferro Madeira-Mamoré - Porto Velho / RO',
    latitude: -8.7619,
    longitude: -63.9039,
    priceTotal: 190.0,
    durationHours: 4,
    difficulty: 'Leve',
    maxCapacityPerDay: 20,
    currentBookedCount: 12,
    description: 'A Estrada de Ferro Madeira-Mamoré (EFMM), a mítica "Ferrovia do Diabo", é um dos mais fascinantes capítulos da geopolítica mundial e da ocupação de Rondônia. Este circuito urbano e ecológico percorre o complexo histórico revitalizado, as oficinas com locomotivas a vapor inglesas e americanas, o memorial indígena das etnias locais afetadas pela ferrovia e um passeio em barco regional pelas águas barrentas e enérgicas do Rio Madeira, finalizando com o pôr do sol dourado.',
    highlights: [
      'Passeio interpretativo pelas locomotivas a vapor centenárias da EFMM',
      'Navegação fluvial curta pelo Rio Madeira até os pés da Ponte Rondon-Roosevelt',
      'Degustação de tambaqui com baião de dois e mousses de frutas nativas (taperebá e bacuri)',
      'Visita ao Mercado Cultural de Porto Velho'
    ],
    itinerary: [
      { time: '15:00', title: 'Encontro no Museu da EFMM', description: 'Introdução histórica e memorial dos operários que construíram a ferrovia.', location: 'Prédio da Rotunda' },
      { time: '16:00', title: 'Caminhada pelos Trilhos Centenários e Galpões', description: 'Visitação detalhada com o Guia Cadastur das peças de acervo e caldeiras a vapor.', location: 'Pátio Ferroviário' },
      { time: '17:00', title: 'Embarque no Flutuante do Madeira', description: 'Navegação ao entardecer no Rio Madeira para apreciar as corredeiras históricas e o pôr do sol.', location: 'Orla de Porto Velho' },
      { time: '18:30', title: 'Confraternização no Mercado Cultural', description: 'Encerramento com música instrumental amazônica e petiscos regionais.', location: 'Mercado Cultural' }
    ],
    included: [
      'Ingressos e taxa de entrada nos memoriais',
      'Guia de Turismo com registro Cadastur SETUR-RO',
      'Passeio em barco de passageiros seguro pelo Rio Madeira',
      'Petisco regional e água mineral'
    ],
    notIncluded: [
      'Jantar completo',
      'Translado hotel-ferrovia'
    ],
    mandatoryItems: [
      'Calçado confortável para caminhada',
      'Câmera ou smartphone carregado para fotografias do pôr do sol'
    ],
    images: [
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80'
    ],
    requiresFUNAI: false,
    requiresICMBio: false,
    cadasturGuideId: 'guia-moacir',
    guide: mockGuides[0],
    associationId: 'assoc-agetur-ro',
    association: mockAssociations[3],
    curatorshipStatus: 'APROVADO',
    curatorshipNotes: 'Roteiro urbano-cultural aprovado pela Fundação Cultural de Porto Velho (FUNCULTURAL) e SETUR-RO.',
    splitPercentages: {
      communityAssociation: 50,
      guide: 35,
      platform: 15
    }
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'RN-RES-2026-081',
    experienceId: 'exp-guapore-forte',
    experienceTitle: 'Expedição Rio Guaporé & Fortaleza Real Forte Príncipe da Beira',
    touristName: 'Renata Albuquerque Mendonça',
    touristEmail: 'renata.mendonca@gmail.com',
    touristPhone: '(69) 99823-1100',
    date: '2026-10-24',
    spotsCount: 2,
    totalPrice: 840.0,
    voucherHash: 'RN-VCH-849204A-GUAPORE-SECURE',
    status: 'CONFIRMADA',
    createdAt: '2026-10-18T10:15:00Z',
    splitBreakdown: {
      associationAmount: 504.0, // 60%
      guideAmount: 235.2,       // 28%
      platformAmount: 100.8,    // 12%
      associationPixKey: 'quilombo.pedrasnegras@rondonianativa.org.br',
      guideCadastur: 'RO-26.0084/2024-TUR'
    },
    validatedOffline: false,
    ethicsCodeAccepted: true,
    downloadedForOffline: true
  },
  {
    id: 'RN-RES-2026-079',
    experienceId: 'exp-paiter-surui',
    experienceTitle: 'Vivência Ancestral Paiter Suruí: Saberes e Trilha Etnobotânica',
    touristName: 'Lucas Vinicius Silveira',
    touristEmail: 'lucas.silveira@usp.br',
    touristPhone: '(11) 98712-4091',
    date: '2026-10-22',
    spotsCount: 1,
    totalPrice: 490.0,
    voucherHash: 'RN-VCH-391044B-PAITER-SURUI',
    status: 'CONFIRMADA',
    createdAt: '2026-10-15T14:40:00Z',
    splitBreakdown: {
      associationAmount: 318.5, // 65%
      guideAmount: 122.5,       // 25%
      platformAmount: 49.0,     // 10%
      associationPixKey: 'metareila.paiter@surui.org.br',
      guideCadastur: 'RO-26.0112/2023-TUR'
    },
    validatedOffline: true,
    validatedAtTimestamp: '2026-10-20T11:30:15Z',
    validatedGpsCoordinates: {
      lat: -11.2386,
      lng: -61.4429
    },
    validatedByGuideCadastur: 'RO-26.0112/2023-TUR',
    ethicsCodeAccepted: true,
    downloadedForOffline: true
  }
];

export const mockCuratorshipProposals: CuratorshipProposal[] = [
  {
    id: 'PROP-2026-09',
    experienceTitle: 'Trilha do Mirante dos Uru-Eu-Wau-Wau (Aldeia Linha 623)',
    submittedBy: 'Associação Jupaú dos Uru-Eu-Wau-Wau',
    community: 'Terra Indígena Uru-Eu-Wau-Wau (Governador Jorge Teixeira)',
    areaType: 'TI',
    funaiDocAttached: true,
    icmbioDocAttached: true,
    cadasturVerified: true,
    capacityPerDay: 6,
    status: 'PENDENTE',
    submissionDate: '2026-10-14',
    notes: 'Anexada anuência de todas as aldeias do conselho e termo de conduta sanitária e ambiental.'
  },
  {
    id: 'PROP-2026-08',
    experienceTitle: 'Navegação Fluvial Noturna nos Furos do Rio Madeira',
    submittedBy: 'Guia Moacir Karipuna & Pescadores do Baixo Madeira',
    community: 'Comunidade de São Carlos do Jamari',
    areaType: 'MUNICIPAL',
    funaiDocAttached: false,
    icmbioDocAttached: true,
    cadasturVerified: true,
    capacityPerDay: 10,
    status: 'APROVADO',
    submissionDate: '2026-10-02',
    notes: 'Vistoria da Capitania dos Portos e licença municipal de turismo ecológico emitidas.'
  }
];

export const mockConductGuidelines = [
  {
    id: 'cond-1',
    category: 'Cultura & Pessoas',
    title: 'Consentimento Livre, Prévio e Informado',
    rule: 'Nunca tire fotos ou grave vídeos de indígenas, mestres tradicionais ou crianças sem pedir permissão prévia e explícita.',
    explanation: 'A imagem de pessoas em comunidades tradicionais não é atração turística pública; o respeito à intimidade e à dignidade é inegociável.'
  },
  {
    id: 'cond-2',
    category: 'Meio Ambiente',
    title: 'Política Resíduo Zero e Devolução Total',
    rule: 'Todo e qualquer resíduo gerado pelo visitante (incluindo cascas de frutas não nativas, embalagens plásticas e bitucas de cigarro) deve retornar para a cidade.',
    explanation: 'A floresta e as comunidades isoladas não dispõem de coleta pública municipal; descartar lixo contamina lençóis freáticos e afeta a fauna silvestre.'
  },
  {
    id: 'cond-3',
    category: 'Biodiversidade',
    title: 'Proibição de Coleta e Alimentação de Fauna',
    rule: 'É terminantemente proibido colher orquídeas, sementes, mudas, pedras ou fósseis, bem como alimentar botos, macacos ou aves com comida humana.',
    explanation: 'A alimentação artificial desregula o comportamento alimentar selvagem e pode transmitir bactérias fatais para animais amazônicos.'
  },
  {
    id: 'cond-4',
    category: 'Segurança & Legalidade',
    title: 'Acompanhamento Exclusivo com Guia Cadastur',
    rule: 'Nenhuma trilha ou incursão fluvial pode ser feita desacompanhada de condutor local credenciado no Cadastur e reconhecido pela comunidade.',
    explanation: 'A floresta amazônica requer conhecimento tradicional de navegação, orientação e meteorologia para evitar extravios e situações de risco.'
  },
  {
    id: 'cond-5',
    category: 'Economia Justa',
    title: 'Comércio Justo e Valorização do Artesanato',
    rule: 'Valorize o tempo, a arte e a história dos produtos artesanais sem exigir pechinchas desrespeitosas.',
    explanation: 'O artesanato é a fonte de sustento das famílias indígenas e quilombolas e fruto de técnicas manuais transmitidas por gerações.'
  }
];
