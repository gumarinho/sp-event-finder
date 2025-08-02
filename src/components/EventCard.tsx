import { Event } from '@/types/event';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorite = await storage.isFavorite(event.id);
      setIsFavorite(favorite);
    };
    checkFavorite();
  }, [event.id]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      if (isFavorite) {
        await storage.removeFavorite(event.id);
        setIsFavorite(false);
      } else {
        await storage.addFavorite(event.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Erro ao gerenciar favorito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-floating hover:-translate-y-1 bg-gradient-card border-0"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {event.imageUrl && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              {event.isFree && (
                <Badge variant="secondary" className="bg-success text-success-foreground font-semibold">
                  GRATUITO
                </Badge>
              )}
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background/90",
                  isFavorite && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={handleFavoriteClick}
                disabled={isLoading}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
            </div>
          </div>
        )}
        
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            {!event.imageUrl && (
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full flex-shrink-0",
                  isFavorite && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={handleFavoriteClick}
                disabled={isLoading}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            {!event.imageUrl && event.isFree && (
              <Badge variant="secondary" className="bg-success text-success-foreground">
                GRATUITO
              </Badge>
            )}
            {!event.imageUrl && !event.isFree && <div />}
            
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};