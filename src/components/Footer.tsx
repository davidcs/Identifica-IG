
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';


const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-8 pb-6 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Identifica IG</h3>
            <p className="text-gray-600 text-sm">
              Mapeamento e sugestão de Indicações Geográficas no Brasil.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-ig-green-600">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-600 hover:text-ig-green-600">
                  Mapa
                </Link>
              </li>
              <li>
                <Link to="/suggest" className="text-gray-600 hover:text-ig-green-600">
                  Sugerir
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-ig-green-600">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
              <a 
                  href="https://profnit.colatina.ifes.edu.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ig-green-600"
                >
                  IFES Colatina - PROFNIT
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gov.br/inpi/pt-br/servicos/indicacoes-geograficas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ig-green-600"
                >
                  INPI
                </a>
              </li>
              <li>
                <a 
                  href="https://www.embrapa.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ig-green-600"
                >
                  Embrapa
                </a>
              </li>
              <li>
                <a 
                  href="https://sebrae.com.br/sites/PortalSebrae" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ig-green-600"
                >
                  SEBRAE
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <a
                  href="mailto:david.cs20@gmail.com"
                  className="text-gray-600 hover:text-ig-green-600 underline"
                >
                  david.cs20@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <a
                  href="https://wa.me/5527992262806?text=Ol%C3%A1%2C%20tudo%20bem%20%3F%0AEstou%20entrando%20em%20contato%20para%20falar%20sobre%20o%20Identifica%20IG."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ig-green-600 underline"
                >
                  Tel: (27) 99226-2806
                </a>
              </li>
            </ul>
          </div>

       
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {year} Identifica IG. Todos os direitos reservados.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
