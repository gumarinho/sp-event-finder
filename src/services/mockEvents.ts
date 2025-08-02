import { Event } from '@/types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Festival de Arte de Rua SP',
    description: 'Um festival incrível celebrando a arte urbana de São Paulo com artistas locais e internacionais. Venha conhecer diferentes técnicas de street art, graffiti e muito mais.',
    date: '2024-08-10T14:00:00Z',
    location: 'Beco do Batman, Vila Madalena',
    address: 'Rua Gonçalo Afonso, Vila Madalena, São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
    isFree: true,
    url: 'https://example.com/festival-arte-rua',
    organizer: 'Coletivo Arte SP'
  },
  {
    id: '2',
    title: 'Show de Jazz no Blue Note',
    description: 'Uma noite especial com os melhores músicos de jazz da cidade. Experimente uma atmosfera única com drinks especiais e música ao vivo.',
    date: '2024-08-12T20:30:00Z',
    location: 'Blue Note São Paulo',
    address: 'Av. Paulista, 2073, Consolação, São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    isFree: false,
    url: 'https://example.com/jazz-blue-note',
    organizer: 'Blue Note'
  },
  {
    id: '3',
    title: 'Feira Gastronômica do Mercadão',
    description: 'Descubra os sabores tradicionais de São Paulo em uma feira especial no famoso Mercado Municipal. Degustação gratuita e workshops de culinária.',
    date: '2024-08-15T10:00:00Z',
    location: 'Mercado Municipal de São Paulo',
    address: 'Rua da Cantareira, 306, Centro, São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    isFree: true,
    url: 'https://example.com/feira-mercadao',
    organizer: 'Mercado Municipal SP'
  },
  {
    id: '4',
    title: 'Workshop de Fotografia Urbana',
    description: 'Aprenda técnicas avançadas de fotografia urbana explorando os pontos mais icônicos de São Paulo. Material fotográfico fornecido.',
    date: '2024-08-18T09:00:00Z',
    location: 'Centro Cultural Banco do Brasil',
    address: 'Rua Álvares Penteado, 112, Centro, São Paulo - SP',
    isFree: false,
    url: 'https://example.com/workshop-fotografia',
    organizer: 'Escola de Fotografia SP'
  },
  {
    id: '5',
    title: 'Sarau Poético no Parque Ibirapuera',
    description: 'Uma tarde de poesia e música ao ar livre no coração de São Paulo. Venha compartilhar seus versos ou apenas aproveitar as apresentações.',
    date: '2024-08-20T15:00:00Z',
    location: 'Parque Ibirapuera',
    address: 'Av. Paulista, s/n, Ibirapuera, São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    isFree: true,
    url: 'https://example.com/sarau-ibirapuera',
    organizer: 'Coletivo Poético SP'
  }
];

export class MockEventService {
  async getEvents(): Promise<Event[]> {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEvents;
  }

  async getEventById(id: string): Promise<Event | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents.find(event => event.id === id) || null;
  }
}