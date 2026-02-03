import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
  onVerify?: () => void;
  showActions?: boolean;
  onReadMore?: () => void;
}

export const SkillCard = ({ skill, onVerify, showActions = true, onReadMore }: SkillCardProps) => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-[#0ea5e9] transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">{skill.name}</h3>
          <p className="text-gray-400 text-sm">{skill.description}</p>
        </div>
        {skill.verified ? (
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
        ) : (
          <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-2" />
        )}
      </div>

      {skill.verified && skill.score && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Score</span>
            <span className="text-sm font-semibold text-[#0ea5e9]">{skill.score}/100</span>
          </div>
          <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-full transition-all"
              style={{ width: `${skill.score}%` }}
            />
          </div>
        </div>
      )}

      {!skill.verified && skill.completion !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Completion</span>
            <span className="text-sm font-semibold text-yellow-500">{skill.completion}%</span>
          </div>
          <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all"
              style={{ width: `${skill.completion}%` }}
            />
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 mt-4">
          {!skill.verified && onVerify && (
            <button
              onClick={onVerify}
              className="flex-1 py-2 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              Verify Skill
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <button
            className="py-2 px-4 bg-[#2d2d2d] text-gray-300 rounded-lg font-medium hover:bg-[#3d3d3d] transition-all"
            onClick={onReadMore}
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
};
