
import { useState, useEffect, useCallback } from 'react';
import { IGBase } from '@/types/ig';
import { useToast } from '@/hooks/use-toast';
import { initializeIGData } from '@/services/igService';

export const useIGs = () => {
  const [igs, setIGs] = useState<IGBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const { toast } = useToast();
  
  // Add a throttling mechanism to prevent excessive requests
  const loadData = useCallback(async () => {
    try {
      // Check if we've fetched data within the last 30 seconds
      const now = Date.now();
      if (now - lastFetchTime < 30000 && igs.length > 0) {
        console.log('Data fetched recently, using cached data');
        return igs;
      }
      
      setLoading(true);
      const igsData = await initializeIGData();
      console.log('IGs loaded from database:', igsData.length);
      setIGs(igsData);
      setLastFetchTime(now);
      return igsData;
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error loading data',
        description: 'Could not load data. Please try again later.',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast, igs, lastFetchTime]);

  useEffect(() => {
    // Initial data load
    loadData();
    
    // Clean up any resources if needed
    return () => {
      // Any cleanup code here
    };
  }, [loadData]);

  return { igs, setIGs, loading, refreshData: loadData };
};
