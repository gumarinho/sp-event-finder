import { Event } from '@/types/event';

export const shareEvent = async (event: Event) => {
  const shareData = {
    title: event.title,
    text: `Confira este evento em São Paulo: ${event.title}`,
    url: event.url
  };

  try {
    // Verifica se a API de compartilhamento está disponível (PWA/mobile)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return true;
    } else {
      // Fallback para web: copia para clipboard
      const shareText = `${event.title}\n\n${event.description}\n\n📅 ${new Date(event.date).toLocaleDateString('pt-BR')}\n📍 ${event.location}\n\n🔗 ${event.url}`;
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        return true;
      } else {
        // Fallback ainda mais básico
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      }
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    return false;
  }
};