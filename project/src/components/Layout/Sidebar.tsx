import { Home, BarChart3, Newspaper, Briefcase, FolderKanban, Trophy, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'skill-stats', label: 'Skill Stats', icon: BarChart3 },
  { id: 'feed', label: 'Feed', icon: Newspaper },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
];

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const { user, logout } = useApp();

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] border-r border-gray-800 flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hunerz</h1>
              <p className="text-xs text-gray-400">Skill Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button
            onClick={() => onNavigate('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              currentPage === 'profile'
                ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
            }`}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#0ea5e9]'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
              currentPage === 'profile' ? 'text-[#0ea5e9]' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};
