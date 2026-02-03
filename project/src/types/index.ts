export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  institution?: string;
  profilePicture?: string;
}

export interface Skill {
  id: string;
  name: string;
  score?: number;
  completion?: number;
  verified: boolean;
  description: string;
  required?: boolean;
  category?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'delayed';
  score: number;
  feedback: string;
  skillTags: string[];
  submittedOn: string;
  dueDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  company: string;
  requiredSkills: {
    name: string;
    impact: number;
  }[];
  views: number;
  applicants: number;
  timeLimit: string;
  saved: boolean;
  applied: boolean;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  skills: string[];
}

export interface FeedItem {
  id: string;
  type: 'announcement' | 'trending' | 'news';
  title: string;
  content: string;
  company?: string;
  date: string;
  image?: string;
}

export interface SkillVerificationStep {
  id: string;
  layer: number;
  stepNumber: number;
  title: string;
  completed: boolean;
  locked: boolean;
}
