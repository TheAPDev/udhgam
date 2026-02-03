import { useApp } from '../context/AppContext';
import { Calendar, TrendingUp, Megaphone, Newspaper } from 'lucide-react';

export const Feed = () => {
  const { feedItems } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return Megaphone;
      case 'trending':
        return TrendingUp;
      default:
        return Newspaper;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'from-[#0ea5e9] to-[#3b82f6]';
      case 'trending':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Industry Feed</h1>
          <p className="text-gray-400">Stay updated with the latest trends and announcements</p>
        </div>

        <div className="space-y-6">
          {feedItems.map((item) => {
            const Icon = getIcon(item.type);
            const colorClass = getColor(item.type);

            return (
              <article
                key={item.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#0ea5e9] transition-all group"
              >
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#2d2d2d] rounded text-xs text-gray-400 uppercase font-medium">
                          {item.type}
                        </span>
                        {item.company && (
                          <span className="text-sm text-gray-500">{item.company}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#0ea5e9] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">{item.content}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
