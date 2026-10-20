import { RondoniaDestination } from '../types';

export const mockDestinations: RondoniaDestination[] = [
  {
    id: 'dest-forte-principe',
    name: 'Real Forte Príncipe da Beira & Vale do Guaporé',
    municipality: 'Costa Marques / RO',
    ecosystem: 'Floresta Tropical de Várzea e Floresta de Galeria',
    baciaHidrografica: 'Bacia do Rio Guaporé (Fronteira Brasil-Bolívia)',
    description: 'Considerada a maior edificação militar colonial portuguesa construída fora da Europa (1776). Um quadrilátero de muralhas de pedra de 10 metros de altura com baluartes e canhões coloniais britânicos e portugueses, imerso na densa floresta amazônica às margens do Rio Guaporé.',
    historyAndCulture: 'Erguido pela Coroa Portuguesa durante o reinado de D. José I para consolidar as fronteiras ocidentais contra a Espanha. Ao redor da fortaleza convivem comunidades tradicionais ribeirinhas e descendentes de quilombolas que guardam séculos de tradição oral e culinária guaporeana.',
    distanceFromPortoVelhoKm: 710,
    howToGetThere: {
      rodoviario: 'BR-364 sentido Ji-Paraná até o trevo de Presidente Médici, acessando a BR-429 pavimentada até Costa Marques (cerca de 10 horas de viagem).',
      fluvial: 'Embarcações a partir de Guajará-Mirim descendo o Rio Mamoré e subindo o Guaporé (expedições fluviais de 2 a 3 dias).'
    },
    bestSeason: 'Julho a Novembro (Período de estiagem com praias de areia branca no Rio Guaporé e águas calmas para avistamento de fauna).',
    seasonType: 'SECA_PRAIAS',
    latitude: -12.4282,
    longitude: -64.4239,
    photos: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Muralhas de cantaria originais de 1776 e galerias subterrâneas preservadas',
      'Observação de botos-cor-de-rosa e ariranhas gigantes na bacia do Guaporé',
      'História colonial viva e proximidade com a fronteira boliviana (Baures / Versalles)',
      'Hospitalidade e saberes dos quilombolas do Forte'
    ],
    conservationUnitOrIndigenousLand: 'Patrimônio Histórico Tombado pelo IPHAN e Área de Preservação do Exército Brasileiro',
    relatedExperienceIds: ['exp-guapore-forte']
  },
  {
    id: 'dest-pedras-negras',
    name: 'Comunidade Quilombola de Pedras Negras',
    municipality: 'São Francisco do Guaporé / RO',
    ecosystem: 'Várzea Amazônica e Formações Vulcânicas Pedregosas',
    baciaHidrografica: 'Calha Média do Rio Guaporé',
    description: 'Um dos mais emblemáticos e preservados territórios quilombolas da Amazônia Ocidental. Famosa por seus afloramentos rochosos pretos que contrastam com o rio e pelo compromisso comunitário com a soltura e preservação de tartarugas-da-amazônia e tracajás.',
    historyAndCulture: 'Fundada por negros forros e fugitivos das minas de ouro de Vila Bela da Santíssima Trindade no século XVIII. A comunidade preserva o toque do tambor de crioula, o reisado, o artesanato de sementes e a sabedoria das parteiras tradicionais.',
    distanceFromPortoVelhoKm: 630,
    howToGetThere: {
      rodoviario: 'BR-364 até Presidente Médici, seguindo pela BR-429 até o porto fluvial de São Francisco do Guaporé (590 km rodoviários).',
      fluvial: 'Trecho final obrigatório em voadeira a motor (aproximadamente 2 horas navegando pelas curvas cênicas do Rio Guaporé).'
    },
    bestSeason: 'Setembro a Dezembro (Época de desova e nascimento dos filhotes de quelônios nas praias fluviais).',
    seasonType: 'SECA_PRAIAS',
    latitude: -12.8542,
    longitude: -63.1256,
    photos: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Berçário comunitário de proteção de tartarugas e soltura monitorada',
      'Música de viola de buriti e contação de lendas amazônicas',
      'Culinária ancestral quilombola com galinha caipira e pirão de tucunaré',
      'Birdwatching: presença de jaburus, cegonhas e gaviões-de-penacho'
    ],
    conservationUnitOrIndigenousLand: 'Território Quilombola Reconhecido pela Fundação Cultural Palmares',
    relatedExperienceIds: ['exp-pedras-negras']
  },
  {
    id: 'dest-paiter-surui',
    name: 'Terra Indígena Sete de Setembro (Aldeia Pama)',
    municipality: 'Cacoal / RO',
    ecosystem: 'Floresta Ombrófila Densa de Terra Firme',
    baciaHidrografica: 'Sub-bacia do Rio Roosevelt e Rio Machado',
    description: 'Lar do povo Paiter Suruí, pioneiro no mundo pelo projeto de crédito de carbono indígena e plano de gestão territorial de 50 anos. A aldeia oferece imersão profunda em etnobotânica, grafismos corporais com jenipapo e rituais sagrados de boas-vindas.',
    historyAndCulture: 'Os Paiter Suruí tiveram seu contato oficial apenas em 1969 e conseguiram preservar seu idioma (família Tupi-Mondé), seus cantos guerreiros, sua rica farmacopeia vegetal e uma governança indígena altamente organizada através da Associação Metareilá.',
    distanceFromPortoVelhoKm: 480,
    howToGetThere: {
      rodoviario: 'BR-364 sentido Cuiabá totalmente pavimentada até o município de Cacoal (6 horas de carro ou ônibus executivo), seguido de 45 km em estrada de terra cascalhada com autorização de ingresso.',
      aereo: 'Voo comercial regional com desembarque no Aeroporto Capital do Café de Cacoal (OAL).'
    },
    bestSeason: 'Ano todo (as trilhas ecológicas ganham vigor na estação verde, e as oficinas culturais ocorrem nas malocas cobertas).',
    seasonType: 'ANO_TODO',
    latitude: -11.2386,
    longitude: -61.4429,
    photos: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Trilha etnobotânica conduzida por xamãs e biólogos indígenas',
      'Oficina viva de pintura corporal com jenipapo e urucum',
      'Degustação de castanhas e peixe moqueado na palha de bananeira',
      'Compra de biojoias e cestarias originais feitas pelas famílias'
    ],
    conservationUnitOrIndigenousLand: 'Terra Indígena Demarcada e Homologada pela FUNAI (Decreto Federal nº 88.867)',
    relatedExperienceIds: ['exp-paiter-surui']
  },
  {
    id: 'dest-resex-cautario',
    name: 'Reserva Extrativista Rio Cautário',
    municipality: 'Guajará-Mirim e Costa Marques / RO',
    ecosystem: 'Floresta Amazônica Primária Intocada e Igarapés de Águas Pretas',
    baciaHidrografica: 'Bacia do Rio Cautário (afluente direto do Rio Guaporé)',
    description: 'Uma das unidades de conservação com menor índice de desmatamento da Amazônia Sul-Ocidental. Um santuário de biodiversidade onde seringueiros tradicionais vivem da extração da borracha nativa e da coleta de castanha-da-amazônia.',
    historyAndCulture: 'Os povos seringueiros mantêm o modo de vida rústico dos "soldados da borracha", extraindo o látex através da sangria manual das árvores de seringueira e produzindo farinha em fornos rústicos de barro.',
    distanceFromPortoVelhoKm: 420,
    howToGetThere: {
      rodoviario: 'BR-364 até o trevo de Abunã e BR-425 até Guajará-Mirim (330 km), seguido de ramal de acesso até a base fluvial.',
      fluvial: 'Subida em barco regional ou voadeira pelas águas espelhadas do Rio Cautário até a sede comunitária da ARECA.'
    },
    bestSeason: 'Maio a Outubro (Trilhas mais acessíveis e igarapés cristalinos ideais para canoagem silenciosa).',
    seasonType: 'SECA_PRAIAS',
    latitude: -11.9567,
    longitude: -63.7431,
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Vivência prática da sangria e defumação do látex seringueiro',
      'Caminhada em floresta primária com castanheiras de mais de 300 anos',
      'Canoagem em igarapé de águas pretas límpidas com paradas para banho',
      'Pernoite em redário comunitário ouvindo a orquestra noturna da floresta'
    ],
    conservationUnitOrIndigenousLand: 'Unidade de Conservação Federal de Uso Sustentável (ICMBio - Decreto s/n de 07/08/2001)',
    relatedExperienceIds: ['exp-resex-cautario']
  },
  {
    id: 'dest-efmm-madeira',
    name: 'Complexo Histórico Madeira-Mamoré & Rio Madeira',
    municipality: 'Porto Velho / RO',
    ecosystem: 'Várzea Urbana Amazônica e Corredeiras do Rio Madeira',
    baciaHidrografica: 'Bacia do Rio Madeira (maior afluente do Rio Amazonas)',
    description: 'O berço da história moderna de Rondônia. O complexo revitalizado da lendária Estrada de Ferro Madeira-Mamoré conta a epopeia da ferrovia construída no início do século XX na selva, complementado pela força das águas do Rio Madeira e um pôr do sol avermelhado inigualável.',
    historyAndCulture: 'A ferrovia mobilizou trabalhadores de mais de 30 países no ciclo da borracha. Hoje o espaço abriga acervo museológico, oficinas mecânicas do século XIX, locomotivas a vapor inglesas (Baldwin) e o Mercado Cultural com gastronomia regional e música instrumental.',
    distanceFromPortoVelhoKm: 0,
    howToGetThere: {
      rodoviario: 'Localizado no centro histórico de Porto Velho, na orla da Avenida Farquar.',
      aereo: 'Aeroporto Internacional Governador Jorge Teixeira (PVH) a apenas 15 minutos do complexo.'
    },
    bestSeason: 'Ano todo (com destaque para os fins de tarde ao entardecer no mirante do rio Madeira).',
    seasonType: 'ANO_TODO',
    latitude: -8.7619,
    longitude: -63.9039,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Passeio interpretativo pelos galpões e locomotivas históricas centenárias',
      'Passeio em barco de passageiros pelo Rio Madeira no pôr do sol',
      'Degustação de tambaqui na brasa, costela de pacu e doces de cupuaçu',
      'Feira de artesanato indígena dos povos Karipuna e Cassupá'
    ],
    conservationUnitOrIndigenousLand: 'Patrimônio Histórico Nacional Tombado pelo IPHAN e Município de Porto Velho',
    relatedExperienceIds: ['exp-madeira-mamore']
  },
  {
    id: 'dest-teixeiropolis',
    name: 'Serra Central & Cachoeiras de Teixeirópolis',
    municipality: 'Teixeirópolis e Vale do Paraíso / RO',
    ecosystem: 'Mata de Transição e Afloramentos Rochosos de Altitude',
    baciaHidrografica: 'Bacia do Rio Machado e Rio Urupá',
    description: 'Conhecida pelas quedas d’água límpidas encravadas em paredões de arenito avermelhado na região central do estado. Ideal para ecoturismo de aventura, trekking em trilhas sombreadas e contemplação a partir de mirantes panorâmicos de 360 graus.',
    historyAndCulture: 'Colonizada no ciclo de pioneiros agropecuários, a região hoje se reinventa com turismo rural agroecológico e preservação de nascentes por cooperativas de guias locais.',
    distanceFromPortoVelhoKm: 360,
    howToGetThere: {
      rodoviario: 'BR-364 sentido Ji-Paraná até Ouro Preto do Oeste, seguindo pela RO-470 (Linha 200) até Teixeirópolis (cerca de 4h30 de viagem).'
    },
    bestSeason: 'Fevereiro a Agosto (Época de vazão máxima das cachoeiras e piscinas naturais com águas cristalinas).',
    seasonType: 'CHEIA_IGAPO',
    latitude: -10.9234,
    longitude: -62.2458,
    photos: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Cachoeira das Três Quedas com poços naturais para banho revigorante',
      'Subida ao Mirante da Serra com visão panorâmica das copas das árvores',
      'Degustação de café rondoniense Robusta Amazônico premiado internacionalmente',
      'Avistamento de primatas (saguis e macacos-prego) e tucanos-toco'
    ],
    conservationUnitOrIndigenousLand: 'Área de Proteção de Mananciais e Reserva Ecológica Particular',
    relatedExperienceIds: ['exp-teixeiropolis']
  }
];
