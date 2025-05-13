
import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { IGBase, IGSuggestion, IGFilters } from '@/types/ig';
import { useAuth } from './AuthContext';
import { useIGs } from '@/hooks/useIGs';
import { useIGFilter } from '@/hooks/useIGFilter';
import { useSuggestions } from '@/hooks/useSuggestions';
import { fetchSuggestions } from '@/services/igService';

interface IGContextType {
  igs: IGBase[];
  suggestions: IGSuggestion[];
  filterIGs: (filters: IGFilters) => IGBase[];
  submitSuggestion: (suggestion: Omit<IGSuggestion, 'status' | 'submittedBy' | 'id'>) => void;
  approveSuggestion: (id: string) => Promise<void>;
  rejectSuggestion: (id: string, feedback: string) => void;
  loading: boolean;
  refreshData: () => Promise<void>;
  loadSuggestions: () => Promise<void>;
}

const IGContext = createContext<IGContextType | undefined>(undefined);

export const IGProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { igs, loading, refreshData: refreshIGsData } = useIGs();
  const { filterIGs } = useIGFilter();
  const { 
    suggestions,
    setSuggestions,
    submitSuggestion: submitSuggestionBase,
    approveSuggestion: approveBase,
    rejectSuggestion,
    loadSuggestions: loadSuggestionsBase
  } = useSuggestions();
  
  // Track when the last data refresh happened to prevent excessive fetching
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  const submitSuggestion = (suggestion: Omit<IGSuggestion, 'status' | 'submittedBy' | 'id'>) => {
    if (!user) return;
    submitSuggestionBase(suggestion, user.id);
  };

  const approveSuggestion = async (id: string) => {
    try {
      await approveBase(id);
      await refreshData(); // Reload all data after approving a suggestion
    } catch (error) {
      console.error('Error approving suggestion:', error);
      throw error;
    }
  };

  const loadSuggestions = useCallback(async () => {
    // Check if we've refreshed data within the last 30 seconds
    const now = Date.now();
    if (now - lastRefreshTime < 30000 && suggestions.length > 0) {
      console.log('Suggestions loaded recently, using cached data');
      return;
    }
    
    try {
      const data = await fetchSuggestions();
      console.log("Suggestions loaded:", data.length);
      setSuggestions(data);
      setLastRefreshTime(now);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  }, [setSuggestions, suggestions.length, lastRefreshTime]);

  // This wrapper ensures refreshData returns Promise<void> to match the context type
  // and adds throttling to prevent excessive API calls
  const refreshData = async (): Promise<void> => {
    // Check if we've refreshed data within the last 30 seconds
    const now = Date.now();
    if (now - lastRefreshTime < 30000) {
      console.log('Data refreshed recently, skipping refresh');
      return;
    }
    
    await refreshIGsData();
    await loadSuggestions();
    setLastRefreshTime(now);
  };

  // Load both IGs and suggestions when the component initializes
  useEffect(() => {
    loadSuggestions();
    // Don't add refreshData to the dependency array to prevent an infinite loop
  }, [loadSuggestions]);

  return (
    <IGContext.Provider
      value={{
        igs,
        suggestions,
        filterIGs: (filters) => filterIGs(igs, filters),
        submitSuggestion,
        approveSuggestion,
        rejectSuggestion,
        loading,
        refreshData,
        loadSuggestions
      }}
    >
      {children}
    </IGContext.Provider>
  );
};

export { IGContext };
export type { IGContextType, IGFilters };
export const useIG = () => {
  const context = useContext(IGContext);
  if (context === undefined) {
    throw new Error('useIG must be used within an IGProvider');
  }
  return context;
};
