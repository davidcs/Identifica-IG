
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 pb-4 border-b">Sobre Indicações Geográficas</h1>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">O que são Indicações Geográficas?</h2>
            <p className="mb-4">
              Indicações Geográficas (IGs) são ferramentas de propriedade intelectual que identificam a origem de produtos ou serviços quando o local tenha se tornado conhecido ou quando determinada característica ou qualidade do produto ou serviço se deve à sua origem geográfica.
            </p>
            <p className="mb-4">
              No Brasil, as IGs são regulamentadas pelo Instituto Nacional da Propriedade Industrial (INPI) e divididas em duas categorias:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Indicação de Procedência (IP)</h3>
                <p className="text-gray-700">
                  Refere-se ao nome geográfico de um lugar que tenha se tornado conhecido como centro de extração, produção ou fabricação de determinado produto ou prestação de determinado serviço.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Denominação de Origem (DO)</h3>
                <p className="text-gray-700">
                  Designa um produto ou serviço cujas qualidades ou características se devam exclusiva ou essencialmente ao meio geográfico, incluídos fatores naturais e humanos.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Benefícios das Indicações Geográficas</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proteção do patrimônio cultural e material das regiões produtoras</li>
              <li>Valorização dos territórios e suas tradições</li>
              <li>Agregação de valor aos produtos</li>
              <li>Acesso a novos mercados</li>
              <li>Aumento da visibilidade dos produtos no mercado</li>
              <li>Melhoria da qualidade dos produtos</li>
              <li>Garantia de autenticidade e qualidade para os consumidores</li>
              <li>Desenvolvimento socioeconômico de regiões produtoras</li>
              <li>Preservação do know-how e técnicas de produção tradicionais</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">O Projeto Identifica IG</h2>
            <p className="mb-4">
              O Identifica IG é uma plataforma colaborativa que tem como objetivo mapear as indicações geográficas brasileiras, tanto as já reconhecidas oficialmente quanto as potenciais, que ainda estão em processo de estruturação ou reconhecimento.
            </p>
            <p className="mb-4">
              Nossa missão é contribuir para a valorização dos produtos brasileiros com identidade territorial, promovendo o conhecimento sobre IGs e estimulando o desenvolvimento de novas indicações geográficas em todo o país.
            </p>
            <div className="bg-ig-green-50 p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold mb-3">Objetivos da plataforma</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mapear e divulgar IGs brasileiras já reconhecidas</li>
                <li>Identificar potenciais novas IGs</li>
                <li>Criar uma base de dados acessível sobre IGs</li>
                <li>Conectar produtores, técnicos, consumidores e entusiastas</li>
                <li>Disseminar conhecimento sobre o tema</li>
                <li>Estimular o desenvolvimento regional através das IGs</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Como Participar?</h2>
            <p className="mb-4">
              Todos podem contribuir com o Identifica IG, seja apenas explorando o mapa e conhecendo mais sobre os produtos com indicação geográfica ou sugerindo novos potenciais produtos para o mapa.
            </p>
            <p>
              Para sugerir uma IG, basta se cadastrar na plataforma e preencher o formulário de sugestão com informações sobre o produto, região e características que o tornam único. Nossa equipe analisará as informações e, se aprovadas, adicionará a sugestão ao mapa como uma IG potencial.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Parceiros e Apoiadores</h2>
            <p className="mb-6">
              O Identifica IG conta com o apoio técnico e institucional de diversas organizações comprometidas com o desenvolvimento das IGs no Brasil:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="https://www.gov.br/inpi"
                target="_blank"
                rel="noopener noreferrer"
                className="border p-4 rounded-lg flex items-center justify-center h-24 hover:bg-gray-50 transition-colors"
              >
                INPI
              </a>
              <a
                href="https://www.ifes.edu.br/campus-colatina"
                target="_blank"
                rel="noopener noreferrer"
                className="border p-4 rounded-lg flex items-center justify-center h-24 hover:bg-gray-50 transition-colors text-center"
              >
                IFES - Colatina
              </a>
              <a
                href="https://profnit.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="border p-4 rounded-lg flex items-center justify-center h-24 hover:bg-gray-50 transition-colors"
              >
                PROFNIT
              </a>
              <a
                href="https://www.sebrae.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="border p-4 rounded-lg flex items-center justify-center h-24 hover:bg-gray-50 transition-colors"
              >
                SEBRAE
              </a>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
