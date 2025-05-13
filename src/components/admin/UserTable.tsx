
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/auth';
import UserRowActions from './UserRowActions';

interface UserRoleBadgeProps {
  role: string;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'moderator':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return <Badge className={getRoleBadgeColor(role)}>{role}</Badge>;
};

interface UserTableProps {
  users: User[];
  currentUserId: string | undefined;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  currentUserId, 
  isLoading, 
  onEdit, 
  onDelete 
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Carregando usuários...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Função</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-sm text-gray-500">{user.id}</TableCell>
            <TableCell>
              <UserRoleBadge role={user.role} />
            </TableCell>
            <TableCell className="text-right">
              <UserRowActions
                user={user}
                isCurrentUser={user.id === currentUserId}
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
