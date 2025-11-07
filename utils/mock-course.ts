export interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'article' | 'file' | 'external';
  duration?: string;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  status: string;
  submittedAt: string;
  thumbnail: string;
  description: string;
  language: string;
  sections: Section[];
  moderationNotes: string;
}

export const mockDatabase: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    instructor: 'John Doe',
    category: 'Web Development',
    price: 99.99,
    status: 'pending_review',
    submittedAt: '2024-11-05',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js',
    language: 'en',
    sections: [
      {
        id: 's1',
        title: 'Introduction to Web Development',
        lectures: [
          { id: 'l1', title: 'Welcome to the Course', type: 'video', duration: '5:30' },
          { id: 'l2', title: 'Course Overview', type: 'article' },
          { id: 'l3', title: 'Setup Your Environment', type: 'video', duration: '12:45' }
        ]
      },
      {
        id: 's2',
        title: 'HTML Fundamentals',
        lectures: [
          { id: 'l4', title: 'HTML Basics', type: 'video', duration: '18:20' },
          { id: 'l5', title: 'HTML Cheat Sheet', type: 'file' },
          { id: 'l6', title: 'Practice Exercises', type: 'external' }
        ]
      }
    ],
    moderationNotes: ''
  },
  {
    id: '2',
    title: 'Digital Marketing Mastery',
    instructor: 'Jane Smith',
    category: 'Marketing',
    price: 79.99,
    status: 'pending_review',
    submittedAt: '2024-11-06',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    description: 'Master digital marketing strategies including SEO, Social Media, and Email Marketing',
    language: 'en',
    sections: [
      {
        id: 's3',
        title: 'Getting Started',
        lectures: [
          { id: 'l7', title: 'Introduction', type: 'video', duration: '8:15' },
          { id: 'l8', title: 'Digital Marketing Overview', type: 'article' }
        ]
      }
    ],
    moderationNotes: ''
  },
  {
    id: '3',
    title: 'Python for Data Science',
    instructor: 'Mike Johnson',
    category: 'Data Science',
    price: 89.99,
    status: 'pending_review',
    submittedAt: '2024-11-07',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    description: 'Learn Python programming for data analysis, visualization, and machine learning',
    language: 'en',
    sections: [
      {
        id: 's4',
        title: 'Python Basics',
        lectures: [
          { id: 'l9', title: 'Python Installation', type: 'video', duration: '10:30' },
          { id: 'l10', title: 'First Python Program', type: 'article' }
        ]
      }
    ],
    moderationNotes: ''
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Sarah Williams',
    category: 'Design',
    price: 69.99,
    status: 'pending_review',
    submittedAt: '2024-11-07',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    description: 'Master the principles of user interface and user experience design',
    language: 'en',
    sections: [
      {
        id: 's5',
        title: 'Introduction to UI/UX',
        lectures: [
          { id: 'l11', title: 'What is UI/UX?', type: 'video', duration: '15:20' },
          { id: 'l12', title: 'Design Principles', type: 'article' },
          { id: 'l13', title: 'Figma Setup', type: 'video', duration: '8:45' }
        ]
      }
    ],
    moderationNotes: ''
  }
];