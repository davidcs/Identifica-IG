
// Re-export from individual service files
export { initializeIGData, fetchIGById } from './geographicIndicationsService';
export { saveSuggestion, fetchSuggestions, updateSuggestionStatus } from './suggestionsService';
export { 
  fetchIGs, 
  saveIG, 
  deleteIG, 
  mapDatabaseToIGBase,
  mapIGBaseToDatabase 
} from './igAdminService';
