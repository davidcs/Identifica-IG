
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'A senha atual é obrigatória' }),
  newPassword: z.string().min(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string().min(6, { message: 'A confirmação da senha é obrigatória' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export const ChangePasswordForm: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // First verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: data.currentPassword,
      });

      if (signInError) {
        setError('Senha atual incorreta');
        setIsLoading(false);
        return;
      }

      // Then update to the new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        form.reset();
        toast({
          title: 'Senha alterada',
          description: 'Sua senha foi alterada com sucesso',
        });
      }
    } catch (err) {
      setError('Ocorreu um erro ao alterar a senha');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Alterar Senha</CardTitle>
        <CardDescription>Atualize sua senha de acesso</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">Senha alterada com sucesso!</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Atual</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha atual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite a nova senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirme a nova senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
