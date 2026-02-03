import { useApp } from '../context/AppContext';
import { CheckCircle, Clock, AlertCircle, Calendar, MessageSquare } from 'lucide-react';

export const Work = () => {
  const { workItems } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'in-progress':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Work Portfolio</h1>
          <p className="text-gray-400">Your completed projects and submissions</p>
        </div>

        <div className="grid gap-6">
          {workItems.map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            const statusColor = getStatusColor(item.status);

            return (
              <div
                key={item.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#0ea5e9] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.skillTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#2d2d2d] rounded-lg text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border flex items-center gap-2 ${statusColor}`}>
                      <StatusIcon className="w-4 h-4" />
                      {item.status.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      Submitted: {new Date(item.submittedOn).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Feedback</span>
                  </div>
                  <p className="text-gray-400">{item.feedback}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Final Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{item.score}</span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>

                  <div className="w-48">
                    <div className="w-full h-3 bg-[#2d2d2d] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          item.score >= 90
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : item.score >= 80
                            ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6]'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {workItems.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No work items yet</p>
            <p className="text-gray-600 text-sm mt-2">Apply to projects to start building your portfolio</p>
          </div>
        )}
      </div>
    </div>
  );
};
