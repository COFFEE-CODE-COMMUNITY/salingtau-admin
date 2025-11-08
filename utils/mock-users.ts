export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'suspended' | 'deleted';
  profilePicture?: string;
  coursesCount: number;
  totalRevenue: number;
  lastLogin: string;
  joinedDate: string;
  headline?: string;
}


export const mockDatabase: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    coursesCount: 12,
    totalRevenue: 15420.50,
    lastLogin: '2024-11-07',
    joinedDate: '2023-05-15',
    headline: 'Full Stack Developer & Instructor'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    coursesCount: 8,
    totalRevenue: 9870.25,
    lastLogin: '2024-11-06',
    joinedDate: '2023-08-22',
    headline: 'Digital Marketing Expert'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.j@example.com',
    status: 'suspended',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    coursesCount: 5,
    totalRevenue: 3240.00,
    lastLogin: '2024-10-28',
    joinedDate: '2023-11-10',
    headline: 'Data Science Instructor'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    coursesCount: 15,
    totalRevenue: 22580.75,
    lastLogin: '2024-11-08',
    joinedDate: '2023-03-05',
    headline: 'UI/UX Design Mentor'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    coursesCount: 6,
    totalRevenue: 7320.00,
    lastLogin: '2024-11-05',
    joinedDate: '2023-09-18',
    headline: 'Mobile App Development Coach'
  },
  {
    id: '6',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@example.com',
    status: 'suspended',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    coursesCount: 3,
    totalRevenue: 1450.50,
    lastLogin: '2024-10-15',
    joinedDate: '2024-02-20',
    headline: 'Photography & Editing Instructor'
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.m@example.com',
    status: 'active',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    coursesCount: 10,
    totalRevenue: 13560.25,
    lastLogin: '2024-11-07',
    joinedDate: '2023-07-12',
    headline: 'Business & Entrepreneurship'
  }
];
