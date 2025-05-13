
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) throw error;
    
    return data.map(profile => ({
      id: profile.id,
      name: profile.full_name || 'Sem Nome',
      email: '', 
      role: profile.role as UserRole,
      createdAt: new Date(profile.created_at),
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: UserRole, fullName: string): Promise<void> => {
  try {
    console.log(`Updating user ${userId} to role ${role} with name ${fullName}`);
    
    // Important: We need to ensure the role is valid before sending to the database
    if (role !== 'user' && role !== 'moderator' && role !== 'admin') {
      throw new Error(`Invalid role: ${role}`);
    }
    
    // First verify if the user exists in the profiles table
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('id', userId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching user profile:', fetchError);
      throw fetchError;
    }
    
    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    console.log('Current user data:', existingUser);
    
    // Perform the update with explicit return of data
    const { data, error } = await supabase
      .from('profiles')
      .update({
        role: role,
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select();
      
    if (error) {
      console.error('Supabase error updating user role:', error);
      throw error;
    }
    
    console.log('User role updated successfully:', data);
    
    // Add a delay to ensure the update has been processed
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify the update was successful
    const { data: verificationData, error: verificationError } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();
      
    if (verificationError) {
      console.error('Error verifying user update:', verificationError);
    } else {
      console.log('Verification of update:', verificationData);
      if (verificationData.role !== role) {
        console.error('Role was not updated correctly in database. Expected:', role, 'Got:', verificationData.role);
      }
    }
    
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    // Remove from profiles table first
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
      
    if (profileError) throw profileError;
    
    // In a real-world scenario, you would need admin privileges to call auth.admin.deleteUser
    // This would typically be done from a secure backend or edge function
    console.log('User successfully deleted from profiles table');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
