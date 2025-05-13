
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const { login, requestPasswordReset } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Email ou senha inválidos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await requestPasswordReset(resetEmail);
      toast({
        title: 'Email enviado',
        description: 'Verifique seu email para redefinir sua senha.',
      });
      setShowResetForm(false);
    } catch (err) {
      setError('Não foi possível enviar o email de redefinição. Verifique se o email está correto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          {!showResetForm ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Login</CardTitle>
                <CardDescription className="text-center">
                  Entre com sua conta para acessar o sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Button 
                        type="button" 
                        variant="link" 
                        className="px-0 text-sm font-normal h-auto" 
                        onClick={() => setShowResetForm(true)}
                        disabled={isLoading}
                      >
                        Esqueceu a senha?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link to="/register" className="text-ig-green-600 hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Redefinir Senha</CardTitle>
                <CardDescription className="text-center">
                  Enviaremos um link de redefinição para seu email
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar link de redefinição'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setShowResetForm(false)}
                    disabled={isLoading}
                  >
                    Voltar para o login
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6 border-dashed">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-sm">Contas de teste:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Admin: admin@identifica-ig.com | admin123</p>
                <p>Moderador: moderator@identifica-ig.com | moderator123</p>
                <p>Usuário: user@identifica-ig.com | user123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
