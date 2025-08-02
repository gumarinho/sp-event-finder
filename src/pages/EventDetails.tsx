import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { storage } from '@/utils/storage';
import { shareEvent } from '@/utils/sharing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ArrowLeft, Heart, Share2, ExternalLink, CalendarDays, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const eventData = await eventService.getEventById(id);
        if (eventData) {
          setEvent(eventData);
          const favorite = await storage.isFavorite(id);
          setIsFavorite(favorite);
        } else {
          setError('Evento não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar evento');
        console.error('Erro ao carregar evento:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!event) return;
    
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await storage.removeFavorite(event.id);
        setIsFavorite(false);
        toast({
          title: "Removido dos favoritos",
          description: "Evento removido da sua lista de favoritos."
        });
      } else {
        await storage.addFavorite(event.id);
        setIsFavorite(true);
        toast({
          title: "Adicionado aos favoritos",
          description: "Evento salvo na sua lista de favoritos."
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os favoritos.",
        variant: "destructive"
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleShare = async () => {
    if (!event) return;
    
    try {
      const shared = await shareEvent(event);
      if (shared) {
        toast({
          title: "Evento compartilhado",
          description: "Link do evento copiado para a área de transferência."
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao compartilhar",
        description: "Não foi possível compartilhar o evento.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Carregando evento...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Oops!</h1>
          <p className="text-muted-foreground">{error || 'Evento não encontrado'}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para eventos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com imagem */}
      {event.imageUrl ? (
        <div className="relative h-80 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="icon"
              className="bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background/90"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              size="icon"
              className="bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background/90"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
              variant="outline"
              size="icon"
              className={cn(
                "bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background/90",
                isFavorite && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-primary p-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="icon"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                variant="outline"
                size="icon"
                className={cn(
                  "bg-white/20 border-white/30 text-white hover:bg-white/30",
                  isFavorite && "bg-white text-primary hover:bg-white/90"
                )}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
            {event.isFree && (
              <Badge variant="secondary" className="bg-success text-success-foreground font-semibold">
                GRATUITO
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span className="text-base">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-base">{event.location}</p>
                {event.address && (
                  <p className="text-sm opacity-75">{event.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {event.organizer && (
          <div className="p-4 bg-gradient-accent rounded-lg">
            <p className="text-sm text-muted-foreground">Organizado por</p>
            <p className="font-medium">{event.organizer}</p>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sobre o evento</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={() => window.open(event.url, '_blank')}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver mais detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};