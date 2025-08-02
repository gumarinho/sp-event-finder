// Utilitários para persistência local (simula AsyncStorage do React Native)

const FAVORITES_KEY = 'event_favorites';

export const storage = {
  async getFavorites(): Promise<string[]> {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      return [];
    }
  },

  async addFavorite(eventId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(eventId)) {
        favorites.push(eventId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  },

  async removeFavorite(eventId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== eventId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  },

  async isFavorite(eventId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.includes(eventId);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
  }
};