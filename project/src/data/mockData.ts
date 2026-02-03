import { Skill, WorkItem, Project, Competition, FeedItem } from '../types';

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    completion: 0,
    verified: false,
    description: 'Master core data structures and algorithmic problem-solving',
    required: true,
    category: 'Programming'
  },
  {
    id: '2',
    name: 'Node.js',
    completion: 0,
    verified: false,
    description: 'Build scalable server-side applications with Node.js',
    required: true,
    category: 'Backend'
  },
  {
    id: '3',
    name: 'React',
    score: 92,
    completion: 100,
    verified: true,
    description: 'Create modern, interactive user interfaces',
    category: 'Frontend'
  },
  {
    id: '4',
    name: 'TypeScript',
    score: 88,
    completion: 100,
    verified: true,
    description: 'Write type-safe JavaScript applications',
    category: 'Programming'
  },
  {
    id: '5',
    name: 'System Design',
    score: 85,
    completion: 100,
    verified: true,
    description: 'Design scalable distributed systems',
    category: 'Architecture'
  },
  {
    id: '6',
    name: 'Python',
    score: 90,
    completion: 100,
    verified: true,
    description: 'Versatile programming for multiple domains',
    category: 'Programming'
  }
];

export const mockWorkItems: WorkItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform Backend',
    status: 'completed',
    score: 94,
    feedback: 'Excellent implementation with clean architecture',
    skillTags: ['Node.js', 'System Design', 'TypeScript'],
    submittedOn: '2024-01-15',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    status: 'completed',
    score: 89,
    feedback: 'Great use of WebSockets and state management',
    skillTags: ['React', 'Node.js', 'TypeScript'],
    submittedOn: '2024-01-20',
    dueDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    status: 'delayed',
    score: 76,
    feedback: 'Good visualization but submitted late',
    skillTags: ['React', 'Python'],
    submittedOn: '2024-01-28',
    dueDate: '2024-01-25'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Content Moderation System',
    description: 'Build a scalable content moderation system using machine learning to detect inappropriate content in real-time.',
    company: 'TechCorp',
    requiredSkills: [
      { name: 'Python', impact: 35 },
      { name: 'Machine Learning', impact: 40 },
      { name: 'System Design', impact: 25 }
    ],
    views: 1247,
    applicants: 89,
    timeLimit: '3 weeks',
    saved: false,
    applied: false
  },
  {
    id: '2',
    title: 'Microservices Architecture Migration',
    description: 'Migrate a monolithic application to microservices architecture with proper service discovery and API gateway.',
    company: 'FinTech Solutions',
    requiredSkills: [
      { name: 'Node.js', impact: 30 },
      { name: 'System Design', impact: 40 },
      { name: 'Docker', impact: 30 }
    ],
    views: 892,
    applicants: 56,
    timeLimit: '4 weeks',
    saved: true,
    applied: false
  },
  {
    id: '3',
    title: 'Real-time Collaboration Platform',
    description: 'Create a collaborative workspace with real-time editing, video conferencing, and task management features.',
    company: 'StartupX',
    requiredSkills: [
      { name: 'React', impact: 35 },
      { name: 'Node.js', impact: 30 },
      { name: 'WebRTC', impact: 35 }
    ],
    views: 2103,
    applicants: 124,
    timeLimit: '5 weeks',
    saved: false,
    applied: false
  },
  {
    id: '4',
    title: 'Blockchain-based Supply Chain',
    description: 'Implement a transparent supply chain tracking system using blockchain technology.',
    company: 'LogiChain',
    requiredSkills: [
      { name: 'Blockchain', impact: 45 },
      { name: 'Node.js', impact: 30 },
      { name: 'React', impact: 25 }
    ],
    views: 756,
    applicants: 43,
    timeLimit: '6 weeks',
    saved: false,
    applied: false
  }
];

export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Global Hackathon 2024',
    description: 'Build innovative solutions for climate change using technology',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    status: 'upcoming',
    participants: 0,
    skills: ['Full Stack', 'AI/ML', 'Cloud']
  },
  {
    id: '2',
    title: 'Code Sprint Challenge',
    description: 'Solve complex algorithmic problems under time pressure',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    status: 'ongoing',
    participants: 1247,
    skills: ['Data Structures', 'Algorithms', 'Problem Solving']
  },
  {
    id: '3',
    title: 'UI/UX Design Battle',
    description: 'Create stunning user interfaces for modern applications',
    startDate: '2024-04-01',
    endDate: '2024-04-10',
    status: 'upcoming',
    participants: 0,
    skills: ['React', 'Design', 'Frontend']
  }
];

export const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'TechCorp Launches New Skill Verification Program',
    content: 'Industry leader TechCorp announces partnership with top universities to offer verified skill certifications with direct hiring opportunities.',
    company: 'TechCorp',
    date: '2024-02-01',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    type: 'trending',
    title: 'System Design Skills in High Demand',
    content: 'Recent market analysis shows 300% increase in demand for system design expertise. Companies are offering premium compensation for verified architects.',
    date: '2024-01-30',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    type: 'news',
    title: 'AI and Machine Learning Continue to Dominate',
    content: 'Latest industry report reveals AI/ML skills remain the most sought-after competencies, with blockchain and cloud architecture following closely.',
    date: '2024-01-28',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    type: 'announcement',
    title: 'New Multi-Dimensional Rating System Launch',
    content: 'Introducing comprehensive skill evaluation combining peer review, professor assessment, and industry expert feedback for accurate skill verification.',
    company: 'Platform',
    date: '2024-01-25',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];
