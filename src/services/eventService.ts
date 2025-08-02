import { Event } from '@/types/event';
import { MockEventService } from './mockEvents';

// Configuração do serviço - altere aqui para trocar entre mock e API real
const USE_MOCK = true; // Altere para false quando quiser usar a API do Eventbrite

class EventbriteService {
  private apiToken: string | null = null;
  private organizationId: string | null = null;

  constructor() {
    // Em um app real, estes valores viriam de variáveis de ambiente ou AsyncStorage
    this.apiToken = localStorage.getItem('eventbrite_token');
    this.organizationId = localStorage.getItem('eventbrite_org_id');
  }

  setCredentials(token: string, orgId: string) {
    this.apiToken = token;
    this.organizationId = orgId;
    localStorage.setItem('eventbrite_token', token);
    localStorage.setItem('eventbrite_org_id', orgId);
  }

  async getEvents(): Promise<Event[]> {
    if (!this.apiToken || !this.organizationId) {
      throw new Error('Credenciais do Eventbrite não configuradas');
    }

    try {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${this.organizationId}/events/`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar eventos do Eventbrite');
      }

      const data = await response.json();
      
      return data.events.map((event: any): Event => ({
        id: event.id,
        title: event.name.text,
        description: event.description.text || '',
        date: event.start.utc,
        location: event.venue?.name || 'Local a confirmar',
        address: event.venue?.address?.localized_address_display || '',
        imageUrl: event.logo?.url,
        isFree: event.is_free,
        url: event.url,
        organizer: event.organizer?.name || ''
      }));
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  }

  async getEventById(id: string): Promise<Event | null> {
    if (!this.apiToken) {
      throw new Error('Token do Eventbrite não configurado');
    }

    try {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/${id}/`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const event = await response.json();
      
      return {
        id: event.id,
        title: event.name.text,
        description: event.description.text || '',
        date: event.start.utc,
        location: event.venue?.name || 'Local a confirmar',
        address: event.venue?.address?.localized_address_display || '',
        imageUrl: event.logo?.url,
        isFree: event.is_free,
        url: event.url,
        organizer: event.organizer?.name || ''
      };
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      return null;
    }
  }
}

// Singleton do serviço
const mockService = new MockEventService();
const eventbriteService = new EventbriteService();

export const eventService = USE_MOCK ? mockService : eventbriteService;

// Função para configurar as credenciais do Eventbrite
export const configureEventbrite = (token: string, orgId: string) => {
  if (eventbriteService instanceof EventbriteService) {
    eventbriteService.setCredentials(token, orgId);
  }
};