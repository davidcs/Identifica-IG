
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Map, ListFilter } from 'lucide-react';

interface AdminDashboardCardsProps {
  onNavigateUsers: () => void;
  onNavigateIGs: () => void;
  pendingCount: number;
}

const AdminDashboardCards: React.FC<AdminDashboardCardsProps> = ({
  onNavigateUsers,
  onNavigateIGs,
  pendingCount,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gerenciar Usuários
        </CardTitle>
        <CardDescription>
          Administre contas, permissões e perfis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Adicione, edite ou remova usuários. Altere permissões e funções do sistema.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNavigateUsers} className="w-full">
          Acessar
        </Button>
      </CardFooter>
    </Card>
    <Card className="bg-gradient-to-br from-green-50 to-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          Gerenciar IGs
        </CardTitle>
        <CardDescription>
          Administre indicações geográficas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Visualize, edite e gerencie todas as Indicações Geográficas do sistema.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNavigateIGs} className="w-full">
          Acessar
        </Button>
      </CardFooter>
    </Card>
    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListFilter className="h-5 w-5" />
          Sugestões
        </CardTitle>
        <CardDescription>
          Avalie novas sugestões de IGs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          {pendingCount} sugestão(ões) pendente(s) para análise.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          Ver Abaixo
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default AdminDashboardCards;

