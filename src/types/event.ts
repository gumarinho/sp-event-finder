export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  address?: string;
  imageUrl?: string;
  isFree: boolean;
  url: string;
  organizer?: string;
  state: string;
  city: string;
}

export interface EventFilters {
  search: string;
  freeOnly: boolean;
  state: string;
  city: string;
  period: 'all' | 'week' | 'month';
}