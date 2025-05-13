
import { IGBase } from '@/types/ig';

export const mockIgData: IGBase[] = [
  {
    id: '1',
    name: 'Café do Cerrado Mineiro',
    description: 'O Café do Cerrado Mineiro é reconhecido por sua qualidade superior e sabor distinto, resultado das características únicas do solo, clima e altitude da região.',
    type: 'Concedida',
    indicationType: 'Denominação de Origem',
    technicalSpecifications: 'Cultivo em terras altas, entre 800 e 1.300 metros de altitude, com características sensoriais específicas.',
    location: {
      latitude: -18.9128,
      longitude: -46.8054,
      city: 'Patrocínio',
      state: 'MG',
    },
    productName: 'Café',
    characteristics: 'Aroma intenso, acidez média a alta, corpo encorpado, sabor adocicado com notas de chocolate e frutas cítricas.',
    controlStructure: 'Federação dos Cafeicultores do Cerrado',
    maturityLevel: 'Finalizado',
    relatedEntities: [
      {
        name: 'Federação dos Cafeicultores do Cerrado',
        website: 'https://www.cerradomineiro.org'
      }
    ],
    socialMedia: [
      {
        type: 'instagram',
        url: 'https://www.instagram.com/cafedocerradomineiro/'
      },
      {
        type: 'website',
        url: 'https://www.cerradomineiro.org'
      }
    ],
    salesChannels: [
      {
        type: 'online',
        name: 'E-commerce oficial',
        url: 'https://www.cerradomineiro.org/loja'
      }
    ],
    images: ['/cafe-cerrado.jpg'],
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2022-03-10')
  },
  {
    id: '2',
    name: 'Queijo Serra da Canastra',
    description: 'Produzido artesanalmente na região da Serra da Canastra, este queijo é feito com leite cru e segue técnicas tradicionais passadas por gerações.',
    type: 'Concedida',
    indicationType: 'Procedência',
    technicalSpecifications: 'Queijo artesanal produzido com leite cru de vacas alimentadas em pastagens naturais.',
    location: {
      latitude: -20.2513,
      longitude: -46.3655,
      city: 'São Roque de Minas',
      state: 'MG',
    },
    productName: 'Queijo',
    characteristics: 'Casca amarelada, massa branca a amarelada, consistência semidura, sabor levemente picante e acidez moderada.',
    controlStructure: 'Associação dos Produtores de Queijo da Canastra',
    maturityLevel: 'Finalizado',
    relatedEntities: [
      {
        name: 'Associação dos Produtores de Queijo da Canastra',
        website: 'https://www.queijodacanastra.com.br'
      }
    ],
    socialMedia: [
      {
        type: 'instagram',
        url: 'https://www.instagram.com/queijodacanastra/'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Feiras locais em MG'
      },
      {
        type: 'online',
        name: 'Marketplace de produtos artesanais',
        url: 'https://mercadodeprodutor.com.br'
      }
    ],
    images: ['/queijo-canastra.jpg'],
    createdAt: new Date('2019-05-20'),
    updatedAt: new Date('2021-07-15')
  },
  {
    id: '3',
    name: 'Cachaça de Paraty',
    description: 'Bebida destilada produzida na região histórica de Paraty, seguindo tradições centenárias de produção.',
    type: 'Concedida',
    indicationType: 'Procedência',
    technicalSpecifications: 'Destilada em alambiques de cobre, com fermentação natural a partir de cana-de-açúcar local.',
    location: {
      latitude: -23.2178,
      longitude: -44.7131,
      city: 'Paraty',
      state: 'RJ',
    },
    productName: 'Cachaça',
    characteristics: 'Teor alcoólico entre 38% e 48%, aroma delicado com notas de cana fresca, envelhecida em barris de madeiras específicas da região.',
    controlStructure: 'Associação dos Produtores e Amigos da Cachaça Artesanal de Paraty',
    maturityLevel: 'Finalizado',
    relatedEntities: [
      {
        name: 'APACAP',
        website: 'https://www.apacap.com.br'
      }
    ],
    socialMedia: [
      {
        type: 'facebook',
        url: 'https://www.facebook.com/cachacadeparaty/'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Lojas em Paraty'
      }
    ],
    images: ['/cachaca-paraty.jpg'],
    createdAt: new Date('2018-08-10'),
    updatedAt: new Date('2020-11-05')
  },
  {
    id: '4',
    name: 'Renda de Divina Pastora',
    description: 'Renda de agulha em lacê, artesanato tradicional produzido pelas rendeiras de Divina Pastora, com técnicas passadas entre gerações.',
    type: 'Concedida',
    indicationType: 'Procedência',
    technicalSpecifications: 'Confeccionada manualmente com linha branca em técnica de agulha, desenhos florais e geométricos.',
    location: {
      latitude: -10.6823,
      longitude: -37.1510,
      city: 'Divina Pastora',
      state: 'SE',
    },
    productName: 'Artesanato',
    characteristics: 'Desenhos detalhados em motivos florais, arabescos e elementos da fauna e flora locais, prevalecendo linhas brancas.',
    controlStructure: 'Associação para o Desenvolvimento da Renda Irlandesa de Divina Pastora',
    maturityLevel: 'Finalizado',
    relatedEntities: [
      {
        name: 'Associação das Rendeiras',
        contact: 'rendeirasdivinapastora@email.com'
      }
    ],
    socialMedia: [
      {
        type: 'instagram',
        url: 'https://www.instagram.com/rendadedivinapastora/'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Centro de Artesanato de Divina Pastora'
      }
    ],
    images: ['/renda-divina-pastora.jpg'],
    createdAt: new Date('2017-03-25'),
    updatedAt: new Date('2019-06-30')
  },
  {
    id: '5',
    name: 'Vinhos do Vale dos Vinhedos',
    description: 'Vinhos produzidos na região do Vale dos Vinhedos, na Serra Gaúcha, reconhecidos pela qualidade e técnicas tradicionais.',
    type: 'Concedida',
    indicationType: 'Denominação de Origem',
    technicalSpecifications: 'Vinhos produzidos com uvas específicas, em terroir com características geológicas e climáticas únicas.',
    location: {
      latitude: -29.1761,
      longitude: -51.5290,
      city: 'Bento Gonçalves',
      state: 'RS',
    },
    productName: 'Vinho',
    characteristics: 'Tintos: encorpados, com taninos maduros. Brancos: frescos, com acidez equilibrada. Espumantes: finos com borbulhas persistentes.',
    controlStructure: 'Associação dos Produtores de Vinhos Finos do Vale dos Vinhedos',
    maturityLevel: 'Finalizado',
    relatedEntities: [
      {
        name: 'APROVALE',
        website: 'https://www.valedosvinhedos.com.br'
      }
    ],
    socialMedia: [
      {
        type: 'facebook',
        url: 'https://www.facebook.com/valedosvinhedos/'
      },
      {
        type: 'instagram',
        url: 'https://www.instagram.com/valedosvinhedos/'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Vinícolas do Vale dos Vinhedos'
      },
      {
        type: 'online',
        name: 'Lojas especializadas',
        url: 'https://www.valedosvinhedos.com.br/onde-comprar'
      }
    ],
    images: ['/vinhos-vale-vinhedos.jpg'],
    createdAt: new Date('2016-01-15'),
    updatedAt: new Date('2020-04-20')
  },
  {
    id: '6',
    name: 'Cajuína do Piauí',
    description: 'Bebida não alcoólica, transparente e de sabor doce, feita a partir do suco clarificado de caju.',
    type: 'Potencial',
    indicationType: 'Procedência',
    technicalSpecifications: 'Produzida com cajus selecionados da região, processo tradicional de clarificação e esterilização.',
    location: {
      latitude: -5.0919,
      longitude: -42.8034,
      city: 'Teresina',
      state: 'PI',
    },
    productName: 'Bebida não alcoólica',
    characteristics: 'Cor amarelo-âmbar, transparente, doce natural sem adição de açúcar, sabor característico de caju.',
    controlStructure: 'Cooperativa dos Produtores de Cajuína do Piauí',
    maturityLevel: 'Em desenvolvimento',
    relatedEntities: [
      {
        name: 'Cooperativa dos Produtores de Cajuína',
        contact: 'cajuinapiui@email.com'
      }
    ],
    socialMedia: [
      {
        type: 'website',
        url: 'https://www.cajuinadopiaui.com.br'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Mercados locais do Piauí'
      }
    ],
    images: ['/cajuina-piaui.jpg'],
    createdAt: new Date('2022-02-10'),
    updatedAt: new Date('2023-01-05')
  },
  {
    id: '7',
    name: 'Açaí de Belém',
    description: 'Fruto nativo da Amazônia, processado tradicionalmente para produção de polpa e derivados.',
    type: 'Potencial',
    indicationType: 'Procedência',
    technicalSpecifications: 'Colheita manual, despolpa tradicional, sem adição de conservantes.',
    location: {
      latitude: -1.4558,
      longitude: -48.5039,
      city: 'Belém',
      state: 'PA',
    },
    productName: 'Açaí',
    characteristics: 'Cor roxa intensa, sabor forte e característico, alto valor nutricional.',
    controlStructure: 'Associação dos Produtores de Açaí de Belém',
    maturityLevel: 'Avançado',
    relatedEntities: [
      {
        name: 'Associação dos Produtores de Açaí',
        contact: 'acaidebelem@email.com'
      }
    ],
    socialMedia: [
      {
        type: 'instagram',
        url: 'https://www.instagram.com/acaidebelem/'
      }
    ],
    salesChannels: [
      {
        type: 'physical',
        name: 'Feiras e mercados de Belém'
      }
    ],
    images: ['/acai-belem.jpg'],
    createdAt: new Date('2021-10-20'),
    updatedAt: new Date('2023-03-15')
  }
];

export const mockSuggestions = [];
