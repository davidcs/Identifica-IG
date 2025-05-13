
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIG } from '@/contexts/IGContext';
import IGCard from '@/components/IGCard';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Map, FileText, Search } from 'lucide-react';

const Index: React.FC = () => {
  const { igs, loading } = useIG();
  const navigate = useNavigate();
  
  const featuredIGs = igs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ig-green-600 to-ig-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Mapeando as Indicações Geográficas do Brasil
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Explore, descubra e contribua para o registro das IGs brasileiras
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-ig-green-700 hover:bg-gray-100">
                <Link to="/map">
                  <Map size={18} className="mr-2" />
                  Explorar Mapa
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-ig-green-700 hover:bg-gray-100">
                <Link to="/suggest">
                  <FileText size={18} className="mr-2" />
                  Sugerir IG
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* About IGs Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">O que são Indicações Geográficas?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Indicações Geográficas (IGs) são ferramentas de propriedade intelectual que reconhecem produtos ou serviços com qualidades únicas devido à sua origem geográfica.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-ig-green-100 rounded-full flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-ig-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reconhecimento Regional</h3>
                <p className="text-gray-600">
                  Valorizam características e tradições únicas de uma região específica, preservando o patrimônio cultural.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-ig-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-ig-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proteção Legal</h3>
                <p className="text-gray-600">
                  Oferecem proteção legal contra falsificações, garantindo a autenticidade e qualidade para os consumidores.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-ig-brown-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-ig-brown-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Valor Agregado</h3>
                <p className="text-gray-600">
                  Aumentam o valor dos produtos no mercado e promovem o desenvolvimento econômico das comunidades locais.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild variant="link" className="text-ig-green-600 font-medium">
                <Link to="/about" className="flex items-center">
                  Saiba mais sobre IGs
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured IGs Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Indicações Geográficas em Destaque</h2>
                <p className="text-gray-600">Conheça algumas das IGs brasileiras já reconhecidas</p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/map">
                  <Map size={16} className="mr-2" />
                  Ver todas no mapa
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-12">Carregando IGs...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredIGs.map((ig) => (
                  <IGCard
                    key={ig.id}
                    ig={ig}
                    onClick={() => navigate(`/ig/${ig.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-ig-yellow-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Conhece uma potencial Indicação Geográfica?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Contribua para o mapeamento das IGs brasileiras sugerindo uma indicação geográfica que você conhece.
            </p>
            <Button asChild size="lg">
              <Link to="/suggest">
                <FileText size={18} className="mr-2" />
                Sugerir uma IG
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
