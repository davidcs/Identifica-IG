
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IGMap from '@/components/IGMap';
import IGFiltersComponent from '@/components/IGFilters';
import { useIG, IGFilters } from '@/contexts/IGContext';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUpDown, Map, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { IGBase } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';

const MapPage: React.FC = () => {
  const { igs, loading, filterIGs, refreshData } = useIG();
  const [filteredIGs, setFilteredIGs] = useState<IGBase[]>([]);
  const [filters, setFilters] = useState<IGFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Force refresh only once when page loads to ensure we have the latest data
  useEffect(() => {
    if (!dataFetched) {
      console.log("Initial data load on MapPage");
      refreshData().then(() => setDataFetched(true));
    }
  }, [refreshData, dataFetched]);

  // Update filtered IGs whenever igs or filters change
  useEffect(() => {
    if (igs && igs.length > 0) {
      try {
        const filtered = filterIGs(filters);
        console.log("IGs filtradas:", filtered.length);
        setFilteredIGs(filtered);
      } catch (error) {
        console.error('Error filtering data:', error);
        toast({
          title: 'Erro ao filtrar dados',
          description: 'Ocorreu um erro ao filtrar as indicações geográficas.',
          variant: 'destructive',
        });
      }
    } else if (!loading) {
      // If we're not loading and have no data, display empty state
      setFilteredIGs([]);
    }
  }, [igs, filters, filterIGs, loading, toast]);

  const handleFilterChange = (newFilters: IGFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleIGClick = (id: string) => {
    navigate(`/ig/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Mapa de Indicações Geográficas</h1>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <div className="block md:hidden w-full">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                      <Filter size={16} />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[350px]">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>
                        Filtre as IGs por tipo, estado ou nível de maturidade.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                      <IGFiltersComponent onFilterChange={handleFilterChange} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Desktop Filter Toggle */}
              <div className="hidden md:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={toggleFilters}
                >
                  {showFilters ? (
                    <>
                      <ArrowUpDown size={16} />
                      Ocultar filtros
                    </>
                  ) : (
                    <>
                      <Filter size={16} />
                      Mostrar filtros
                    </>
                  )}
                </Button>
              </div>

              <Button 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => navigate('/suggest')}
              >
                <MapPin size={16} />
                Sugerir IG
              </Button>

              <Button 
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/igs-list')}
              >
                <Map size={16} />
                Ver Listagem
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Desktop Filters */}
            {showFilters && (
              <div className="hidden md:block">
                <IGFiltersComponent onFilterChange={handleFilterChange} />
              </div>
            )}
            
            <div className={`${showFilters ? 'col-span-1' : 'col-span-full'}`}>
              {loading ? (
                <div className="h-96 flex items-center justify-center">
                  <p>Carregando mapa...</p>
                </div>
              ) : (
                <div>
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-medium">{filteredIGs.length}</span> 
                      <span className="ml-1 text-gray-600">
                        {filteredIGs.length === 1 ? 'IG encontrada' : 'IGs encontradas'}
                      </span>
                    </div>
                  </div>
                  
                  <IGMap 
                    igs={filteredIGs}
                    onIGClick={handleIGClick}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
