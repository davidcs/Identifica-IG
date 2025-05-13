
import React from 'react';
import { IGBase } from '@/types/ig';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface IGTableProps {
  data: IGBase[];
  title: string;
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const IGTable: React.FC<IGTableProps> = ({ 
  data, 
  title, 
  loading = false,
  onAdd,
  onEdit,
  onDelete 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'moderator';

  const handleViewDetails = (id: string) => {
    navigate(`/ig/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma Indicação Geográfica encontrada.</p>
          {isAdmin && onAdd && (
            <Button onClick={onAdd} className="mt-4">
              <Plus size={16} className="mr-2" />
              Adicionar Nova
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {isAdmin && onAdd && (
          <Button onClick={onAdd}>
            <Plus size={16} className="mr-2" />
            Adicionar Nova
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Maturidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((ig) => (
              <TableRow key={ig.id}>
                <TableCell className="font-medium">{ig.name}</TableCell>
                <TableCell>{ig.productName}</TableCell>
                <TableCell>{`${ig.location?.city || 'N/A'}, ${ig.location?.state || 'N/A'}`}</TableCell>
                <TableCell>
                  <Badge 
                    className={ig.type === 'Concedida' ? 'bg-green-600' : 'bg-yellow-500'}
                  >
                    {ig.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{ig.maturityLevel}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDetails(ig.id)}
                      title="Ver detalhes"
                    >
                      <Eye size={16} />
                    </Button>
                    
                    {isAdmin && onEdit && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(ig.id);
                        }}
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </Button>
                    )}
                    
                    {isAdmin && onDelete && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(ig.id);
                        }}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IGTable;
