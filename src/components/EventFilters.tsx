import { EventFilters } from '@/types/event';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar } from 'lucide-react';

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

export const EventFiltersComponent = ({ filters, onFiltersChange }: EventFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleFreeOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, freeOnly: checked });
  };

  const handleStateChange = (value: string) => {
    onFiltersChange({ ...filters, state: value, city: '' });
  };

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value });
  };

  const handlePeriodChange = (value: 'all' | 'week' | 'month') => {
    onFiltersChange({ ...filters, period: value });
  };

  const states = [
    { value: '', label: 'Todos os estados' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'GO', label: 'Goiás' },
  ];

  const cities = filters.state === 'SP' 
    ? [
        { value: '', label: 'Todas as cidades' },
        { value: 'São Paulo', label: 'São Paulo' },
        { value: 'Embu das Artes', label: 'Embu das Artes' },
      ]
    : filters.state === 'RJ'
    ? [
        { value: '', label: 'Todas as cidades' },
        { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
      ]
    : filters.state === 'GO'
    ? [
        { value: '', label: 'Todas as cidades' },
        { value: 'Goiânia', label: 'Goiânia' },
      ]
    : [{ value: '', label: 'Selecione um estado primeiro' }];

  return (
    <div className="space-y-4 p-4 bg-gradient-accent rounded-lg border">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar eventos..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Estado
          </Label>
          <Select value={filters.state} onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Cidade</Label>
          <Select 
            value={filters.city} 
            onValueChange={handleCityChange}
            disabled={!filters.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Período
          </Label>
          <Select value={filters.period} onValueChange={handlePeriodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os eventos</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="free-only"
          checked={filters.freeOnly}
          onCheckedChange={handleFreeOnlyChange}
        />
        <Label htmlFor="free-only" className="text-sm font-medium">
          Somente eventos gratuitos
        </Label>
      </div>
    </div>
  );
};