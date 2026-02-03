import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkillCard } from '../components/Home/SkillCard';
import { SkillPopup } from '../components/Home/SkillPopup';
import { SimpleBar } from '../components/Home/SimpleBar';
import { TrendingUp } from 'lucide-react';

interface HomeProps {
  onVerifySkill: (skillId: string) => void;
}

export const Home = ({ onVerifySkill }: HomeProps) => {
  const { skills, averageScore } = useApp();
  const [popupSkill, setPopupSkill] = useState<null | typeof skills[0]>(null);

  const recommendations = skills.filter(s => !s.verified && s.required);
  const userSkills = skills.filter(s => s.verified);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <div className="w-28 h-28 rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center">
                <span className="text-xs text-gray-400 mb-1">Avg Score</span>
                <span className="text-3xl font-bold text-white">
                  {averageScore > 0 ? Math.round(averageScore) : '--'}
                </span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Recommendations</h2>
                <p className="text-gray-400">Complete these skills to boost your profile</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onVerify={() => onVerifySkill(skill.id)}
                  onReadMore={() => setPopupSkill(skill)}
                />
              ))}
            </div>
          </div>
        )}

        {userSkills.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your Skills</h2>
                <p className="text-gray-400">Verified competencies and achievements</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} showActions={false} onReadMore={() => setPopupSkill(skill)} />
              ))}
            </div>
          </div>
        )}

        {userSkills.length === 0 && recommendations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No skills available yet</p>
          </div>
        )}
      </div>
      <SkillPopup
        open={!!popupSkill}
        onClose={() => setPopupSkill(null)}
        title={popupSkill?.name || ''}
        description={popupSkill?.description || ''}
      >
        {/* Example graph: show completion or score if available */}
        {popupSkill && (
          <div className="mb-4">
            {typeof popupSkill.completion === 'number' && (
              <SimpleBar value={popupSkill.completion} label="Completion" />
            )}
            {typeof popupSkill.score === 'number' && (
              <SimpleBar value={popupSkill.score} label="Score" />
            )}
          </div>
        )}
        {/* You can add more graphs or info here */}
      </SkillPopup>
    </div>
  );
};
