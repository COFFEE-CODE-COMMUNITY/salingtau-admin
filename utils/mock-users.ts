// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  status: 'active' | 'suspended' | 'deleted';
  profilePicture?: string;
  lastLogin: string;
  joinedDate: string;
}

// Mock database
export const mockDatabase: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    lastLogin: '2024-11-07',
    joinedDate: '2023-05-15',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    lastLogin: '2024-11-06',
    joinedDate: '2023-08-22',
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.j@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastLogin: '2024-10-28',
    joinedDate: '2023-11-10',
  },
];

export type FormMode = 'create' | 'edit';