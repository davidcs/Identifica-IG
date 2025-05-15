import React, { useState } from 'react';
import { IGSuggestion } from '@/types/ig';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import IGSuggestionFormDialog from './admin/IGSuggestionFormDialog';

interface IGSuggestionsTableProps {
  data: IGSuggestion[];
  title: string;
  isAdmin?: boolean;
  onEdit: (updatedSuggestion: IGSuggestion) => Promise<void>;
  onDelete?: (id: string) => void;
}

const IGSuggestionsTable: React.FC<IGSuggestionsTableProps> = ({
  data,
  title,
  isAdmin = true,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [editingIG, setEditingIG] = useState<IGSuggestion | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleViewDetails = (id: string) => {
    navigate(`/ig/${id}`);
  };

  const handleEditClick = (ig: IGSuggestion) => {
    setEditingIG(ig);
  };

  const handleSaveSuggestion = async (updatedSuggestion: IGSuggestion) => {
    setIsSaving(true);

    try {
      await onEdit(updatedSuggestion);
    } catch (error) {
      console.error('Erro ao salvar sugestão:', error);
    } finally {
      setIsSaving(false);
      setEditingIG(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

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
                <Badge className={ig.type === 'Concedida' ? 'bg-green-600' : 'bg-yellow-500'}>
                  {ig.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{ig.maturityLevel}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(ig.id)} title="Ver detalhes">
                    <Eye size={16} />
                  </Button>

                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(ig)}
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </Button>

                      {onDelete && (
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
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingIG && (
        <IGSuggestionFormDialog
          open={!!editingIG}
          onOpenChange={(open) => !open && setEditingIG(null)}
          suggestion={editingIG}
          isLoading={isSaving}
          onSave={handleSaveSuggestion}
        />
      )}
    </div>
  );
};

export default IGSuggestionsTable;
