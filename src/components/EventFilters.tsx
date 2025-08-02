import { EventFilters } from '@/types/event';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

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