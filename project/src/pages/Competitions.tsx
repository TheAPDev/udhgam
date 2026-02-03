import { useApp } from '../context/AppContext';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';

export const Competitions = () => {
  const { competitions } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'ongoing':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Competitions</h1>
          <p className="text-gray-400">Test your skills against the best</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#0ea5e9] transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{comp.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border flex-shrink-0 ml-2 capitalize ${getStatusColor(comp.status)}`}>
                      {comp.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{comp.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(comp.startDate).toLocaleDateString()} - {new Date(comp.endDate).toLocaleDateString()}
                  </span>
                </div>

                {comp.participants > 0 && (
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{comp.participants.toLocaleString()} participants</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {comp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#2d2d2d] rounded-lg text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                disabled={comp.status === 'completed'}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  comp.status === 'completed'
                    ? 'bg-[#2d2d2d] text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                {comp.status === 'ongoing' ? 'Join Now' : comp.status === 'upcoming' ? 'Register Interest' : 'Completed'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
