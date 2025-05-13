
import { IGBase, IGFilters } from '@/types/ig';

export const useIGFilter = () => {
  const filterIGs = (igs: IGBase[], filters: IGFilters): IGBase[] => {
    return igs.filter((ig) => {
      // Text search filter
      if (filters.search && !ig.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !ig.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filters.type && filters.type.length > 0 && !filters.type.includes(ig.type)) {
        return false;
      }
      
      // State filter
      if (filters.state && filters.state.length > 0 && !filters.state.includes(ig.location.state)) {
        return false;
      }
      
      // Maturity level filter
      if (filters.maturityLevel && filters.maturityLevel.length > 0 && !filters.maturityLevel.includes(ig.maturityLevel)) {
        return false;
      }
      
      // Indication type filter
      if (filters.indicationType && filters.indicationType.length > 0 && !filters.indicationType.includes(ig.indicationType)) {
        return false;
      }
      
      return true;
    });
  };

  return { filterIGs };
};
