import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, EventFilters } from '@/types/event';
import { eventService } from '@/services/eventService';
import { EventCard } from '@/components/EventCard';
import { EventFiltersComponent } from '@/components/EventFilters';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({ 
    search: '', 
    freeOnly: false, 
    state: '', 
    city: '', 
    period: 'all' 
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await eventService.getEvents();
      setEvents(eventsData);
    } catch (err) {
      setError('Erro ao carregar eventos. Tente novamente.');
      console.error('Erro ao carregar eventos:', err);
      toast({
        title: "Erro ao carregar eventos",
        description: "Não foi possível carregar os eventos. Verifique sua conexão.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filtrar por busca
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por estado
    if (filters.state) {
      filtered = filtered.filter(event => event.state === filters.state);
    }

    // Filtrar por cidade
    if (filters.city) {
      filtered = filtered.filter(event => event.city === filters.city);
    }

    // Filtrar por período
    if (filters.period !== 'all') {
      const now = new Date();
      const eventDate = new Date();
      
      if (filters.period === 'week') {
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(event => {
          const eventDateObj = new Date(event.date);
          return eventDateObj >= now && eventDateObj <= weekFromNow;
        });
      } else if (filters.period === 'month') {
        const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        filtered = filtered.filter(event => {
          const eventDateObj = new Date(event.date);
          return eventDateObj >= now && eventDateObj <= monthFromNow;
        });
      }
    }

    // Filtrar apenas gratuitos
    if (filters.freeOnly) {
      filtered = filtered.filter(event => event.isFree);
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8" />
            <h1 className="text-3xl font-bold">oque fazer</h1>
          </div>
          <p className="text-white/90">Descubra os melhores eventos do Brasil</p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Filtros */}
        <EventFiltersComponent 
          filters={filters} 
          onFiltersChange={setFilters}
        />

        {/* Estado de erro */}
        {error && (
          <div className="text-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-destructive">Oops! Algo deu errado</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <Button onClick={loadEvents} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Lista de eventos */}
        {!error && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredEvents.length === 0 && filters.search.trim() 
                  ? 'Nenhum evento encontrado' 
                  : `${filteredEvents.length} evento${filteredEvents.length !== 1 ? 's' : ''} encontrado${filteredEvents.length !== 1 ? 's' : ''}`
                }
              </h2>
              <Button 
                onClick={loadEvents} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>

            {filteredEvents.length === 0 && !loading ? (
              <div className="text-center py-12 space-y-4">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground">
                    {filters.search.trim() || filters.freeOnly || filters.state || filters.city || filters.period !== 'all' ? 'Nenhum evento encontrado' : 'Nenhum evento disponível'}
                  </h3>
                  <p className="text-muted-foreground">
                    {filters.search.trim() || filters.freeOnly || filters.state || filters.city || filters.period !== 'all'
                      ? 'Tente ajustar os filtros de busca' 
                      : 'Novos eventos serão adicionados em breve'
                    }
                  </p>
                </div>
                {(filters.search.trim() || filters.freeOnly || filters.state || filters.city || filters.period !== 'all') && (
                  <Button 
                    onClick={() => setFilters({ search: '', freeOnly: false, state: '', city: '', period: 'all' })}
                    variant="outline"
                  >
                    Limpar filtros
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleEventClick(event.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
