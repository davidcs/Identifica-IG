
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { User } from '@/types/auth';

interface UserRowActionsProps {
  user: User;
  isCurrentUser: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const UserRowActions: React.FC<UserRowActionsProps> = ({
  isCurrentUser,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        disabled={isCurrentUser}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:text-red-700"
        onClick={onDelete}
        disabled={isCurrentUser}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserRowActions;
