
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const LocationFields: React.FC = () => {
  const { control, formState } = useFormContext();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="location.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input 
                placeholder="Cidade" 
                {...field} 
                className={formState.errors.location && formState.errors.location['city'] ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location.state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Input 
                placeholder="Estado" 
                {...field}
                className={formState.errors.location && formState.errors.location['state'] ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location.latitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Latitude</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="any"
                placeholder="Latitude" 
                onChange={e => {
                  // Ensure we always have a number value
                  const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                  field.onChange(value);
                }}
                value={field.value ?? 0}
                className={formState.errors.location && formState.errors.location['latitude'] ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location.longitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Longitude</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="any"
                placeholder="Longitude" 
                onChange={e => {
                  // Ensure we always have a number value
                  const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                  field.onChange(value);
                }}
                value={field.value ?? 0}
                className={formState.errors.location && formState.errors.location['longitude'] ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
