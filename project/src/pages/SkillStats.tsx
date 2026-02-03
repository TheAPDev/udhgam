import { useState } from 'react';
import { Search, Filter, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillStats = () => {
  const { skills } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'verified' && skill.verified) ||
      (filter === 'unverified' && !skill.verified);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Skill Statistics</h1>
          <p className="text-gray-400">Track and analyze your verified competencies</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'verified', 'unverified'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                  filter === f
                    ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#1a1a1a] text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#0ea5e9] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                    {skill.verified ? (
                      <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              </div>

              {skill.verified && skill.score && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Overall Score</span>
                    <span className="text-lg font-bold text-[#0ea5e9]">{skill.score}/100</span>
                  </div>
                  <div className="w-full h-3 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-full transition-all"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-[#2d2d2d] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Technical</p>
                      <p className="text-lg font-semibold text-white">{skill.score}</p>
                    </div>
                    <div className="bg-[#2d2d2d] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Practical</p>
                      <p className="text-lg font-semibold text-white">{Math.max(85, skill.score - 3)}</p>
                    </div>
                    <div className="bg-[#2d2d2d] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Industry</p>
                      <p className="text-lg font-semibold text-white">{Math.min(95, skill.score + 2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No skills found</p>
          </div>
        )}
      </div>
    </div>
  );
};
