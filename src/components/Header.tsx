
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, Map, FileText, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-ig-green-600 to-ig-yellow-500 bg-clip-text text-transparent">
              Identifica-IG
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-ig-green-600 font-medium">
            Início
          </Link>
          <Link to="/map" className="text-gray-700 hover:text-ig-green-600 font-medium">
            Mapa
          </Link>
          <Link to="/suggest" className="text-gray-700 hover:text-ig-green-600 font-medium">
            Sugerir
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-ig-green-600 font-medium">
            Sobre
          </Link>

          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/register">Cadastro</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="truncate max-w-[100px]">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                {(user?.role === 'admin' || user?.role === 'moderator') && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Painel Admin</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                  <LogOut size={16} />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-ig-green-600 py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/map" 
              className="text-gray-700 hover:text-ig-green-600 py-2 font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map size={16} />
              <span>Mapa</span>
            </Link>
            <Link 
              to="/suggest" 
              className="text-gray-700 hover:text-ig-green-600 py-2 font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={16} />
              <span>Sugerir</span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-ig-green-600 py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 mt-2">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    Cadastro
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-2 border-t pt-2">
                <div className="font-medium text-sm">{user?.name}</div>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-ig-green-600 py-2 font-medium flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Perfil</span>
                </Link>
                {(user?.role === 'admin' || user?.role === 'moderator') && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-ig-green-600 py-2 font-medium flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings size={16} />
                    <span>Painel Admin</span>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  className="justify-start p-0 font-medium text-red-500 hover:text-red-700 hover:bg-transparent"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
