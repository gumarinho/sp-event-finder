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
}

export interface EventFilters {
  search: string;
  freeOnly: boolean;
}