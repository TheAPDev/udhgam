import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { User, Skill, WorkItem, Project, Competition, FeedItem } from '../types';
import { mockSkills, mockWorkItems, mockProjects, mockCompetitions, mockFeedItems } from '../data/mockData';

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  skills: Skill[];
  updateSkillScore: (skillId: string, score: number, verified: boolean) => void;
  workItems: WorkItem[];
  addWorkItem: (item: WorkItem) => void;
  projects: Project[];
  toggleProjectSave: (projectId: string) => void;
  applyToProject: (projectId: string) => void;
  competitions: Competition[];
  feedItems: FeedItem[];
  averageScore: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [workItems, setWorkItems] = useState<WorkItem[]>(mockWorkItems);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [competitions] = useState<Competition[]>(mockCompetitions);
  const [feedItems] = useState<FeedItem[]>(mockFeedItems);

  useEffect(() => {
    // Check Supabase session for logged-in user
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email || '',
          email: data.user.email || '',
          profilePicture: '',
        });
      } else {
        setUser(null);
      }
    };
    getUser();

    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }

    const savedWorkItems = localStorage.getItem('workItems');
    if (savedWorkItems) {
      setWorkItems(JSON.parse(savedWorkItems));
    }

    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return false;
    }
    if (data.user) {
      setUser({
        id: data.user.id,
        name: data.user.user_metadata?.name || data.user.email || '',
        email: data.user.email || '',
        profilePicture: '',
      });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      return false;
    }
    if (data.user) {
      setUser({
        id: data.user.id,
        name: name,
        email: data.user.email || '',
        profilePicture: '',
      });
      return true;
    }
    return false;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateSkillScore = (skillId: string, score: number, verified: boolean) => {
    const updatedSkills = skills.map(skill =>
      skill.id === skillId ? { ...skill, score, verified, completion: 100 } : skill
    );
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
  };

  const addWorkItem = (item: WorkItem) => {
    const updatedWorkItems = [...workItems, item];
    setWorkItems(updatedWorkItems);
    localStorage.setItem('workItems', JSON.stringify(updatedWorkItems));
  };

  const toggleProjectSave = (projectId: string) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, saved: !project.saved } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const applyToProject = (projectId: string) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, applied: true, applicants: project.applicants + 1 } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const averageScore = skills.filter(s => s.verified && s.score).reduce((acc, s) => acc + (s.score || 0), 0) / skills.filter(s => s.verified && s.score).length || 0;

  return (
    <AppContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateUser,
      skills,
      updateSkillScore,
      workItems,
      addWorkItem,
      projects,
      toggleProjectSave,
      applyToProject,
      competitions,
      feedItems,
      averageScore
    }}>
      {children}
    </AppContext.Provider>
  );
};
