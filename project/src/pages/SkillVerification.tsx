import { useState } from 'react';
import { ArrowRight, CheckCircle, Lock, Upload, FileText, Code, Users, GraduationCap, Building2, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SkillVerificationProps {
  skillId: string;
  onBack: () => void;
}

interface Step {
  id: string;
  layer: number;
  stepNumber: number;
  title: string;
  icon: any;
  completed: boolean;
  locked: boolean;
}

export const SkillVerification = ({ skillId, onBack }: SkillVerificationProps) => {
    // ...existing code...
    const handleProfessorReview = () => {
      alert('Professor Review function called!');
      // Add your logic here
    };

    const handleCompanyReview = () => {
      alert('Company Review function called!');
      // Add your logic here
    };

    const handleMultiDimensionalRating = () => {
      alert('Multi-dimensional Rating function called!');
      // Add your logic here
    };

    const handleReviewerCredibility = () => {
      alert('Reviewer Credibility function called!');
      // Add your logic here
    };
  const { skills, updateSkillScore } = useApp();
  const skill = skills.find(s => s.id === skillId);

  const [steps, setSteps] = useState<Step[]>([
    { id: '1.1', layer: 1, stepNumber: 1, title: 'Project / Repo Upload', icon: Upload, completed: false, locked: false },
    { id: '1.2', layer: 1, stepNumber: 2, title: 'Contribution Evidence', icon: FileText, completed: false, locked: true },
    { id: '2.1', layer: 2, stepNumber: 1, title: 'Skill & Task Trigger', icon: Code, completed: false, locked: true },
    { id: '2.2', layer: 2, stepNumber: 2, title: 'Live Task Submission', icon: Code, completed: false, locked: true },
    { id: '2.3', layer: 2, stepNumber: 3, title: 'Auto + Rubric Evaluation', icon: CheckCircle, completed: false, locked: true },
    { id: '3.1', layer: 3, stepNumber: 1, title: 'Anonymous Peer Review', icon: Users, completed: false, locked: true },
    { id: '3.2', layer: 3, stepNumber: 2, title: 'Professor Review', icon: GraduationCap, completed: false, locked: true },
    { id: '3.3', layer: 3, stepNumber: 3, title: 'Company Review', icon: Building2, completed: false, locked: true },
    { id: '3.4', layer: 3, stepNumber: 4, title: 'Multi-dimensional Rating', icon: Star, completed: false, locked: true },
    { id: '3.5', layer: 3, stepNumber: 5, title: 'Reviewer Credibility', icon: Star, completed: false, locked: true },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const handleSkillTaskTrigger = () => {
    alert('Skill & Task Trigger function called!');
    // Add your logic here
  };

  const handleLiveTaskSubmission = () => {
    alert('Live Task Submission function called!');
    // Add your logic here
  };

  const handleAutoRubricEvaluation = () => {
    alert('Auto + Rubric Evaluation function called!');
    // Add your logic here
  };

  const handleNext = () => {
    const updatedSteps = [...steps];
    updatedSteps[currentStepIndex].completed = true;

    if (currentStepIndex < steps.length - 1) {
      updatedSteps[currentStepIndex + 1].locked = false;
      setSteps(updatedSteps);
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      const randomScore = Math.floor(Math.random() * 15) + 85;
      updateSkillScore(skillId, randomScore, true);
      setSteps(updatedSteps);
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  if (!skill) {
    return null;
  }

  const layerGroups = [
    { layer: 1, title: 'Layer 1: Foundation', steps: steps.filter(s => s.layer === 1) },
    { layer: 2, title: 'Layer 2: Assessment', steps: steps.filter(s => s.layer === 2) },
    { layer: 3, title: 'Layer 3: Verification', steps: steps.filter(s => s.layer === 3) },
  ];

  const allCompleted = steps.every(s => s.completed);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 h-fit sticky top-6">
            <h3 className="text-white font-semibold text-lg mb-6">Verification Steps</h3>

            {layerGroups.map((group) => (
              <div key={group.layer} className="mb-6 last:mb-0">
                <h4 className="text-gray-400 text-xs uppercase font-semibold mb-3">{group.title}</h4>
                <div className="space-y-2">
                  {group.steps.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isActive = step.id === currentStep.id;

                    return (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white'
                            : step.completed
                            ? 'bg-green-500/10 text-green-400'
                            : step.locked
                            ? 'bg-[#2d2d2d] text-gray-600'
                            : 'bg-[#2d2d2d] text-gray-400'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : step.locked ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8">
            {!allCompleted ? (
              <>
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-lg mb-4">
                    <span className="text-[#0ea5e9] text-sm font-medium">
                      Step {currentStepIndex + 1} of {steps.length}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{skill.name}</h2>
                  <p className="text-gray-400">{skill.description}</p>
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{currentStep.title}</h3>

                  {currentStep.id === '1.1' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Upload a project or repository that demonstrates your {skill.name} expertise.</p>
                      <label className="block border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-[#0ea5e9] transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          style={{ zIndex: 2 }}
                          onChange={e => {
                            const file = e.target.files && e.target.files[0];
                            if (file) {
                              // You can handle the file upload here (show file name, upload to server, etc.)
                              alert(`Selected file: ${file.name}`);
                            }
                          }}
                        />
                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3 pointer-events-none" />
                        <p className="text-gray-400 pointer-events-none">Click to upload or drag and drop</p>
                        <p className="text-gray-600 text-sm mt-1 pointer-events-none">ZIP, TAR, or Git URL</p>
                      </label>
                    </div>
                  )}

                  {currentStep.id === '1.2' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Provide evidence of your contributions and impact.</p>
                      <textarea
                        className="w-full h-32 bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="Describe your key contributions, challenges solved, and impact..."
                      />
                    </div>
                  )}

                  {currentStep.id === '2.1' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Complete the live coding challenge to demonstrate your skills.</p>
                      <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-500 mb-2">// Challenge: Implement a {skill.name} solution</div>
                        <div className="text-green-400">function solve() {'{'}</div>
                        <div className="text-gray-400 ml-4">// Your code here...</div>
                        <div className="text-green-400">{'}'}</div>
                      </div>
                    </div>
                  )}

                  {currentStep.id === '2.1' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Skill & Task Trigger step.</p>
                      <button
                        className="px-4 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
                        onClick={handleSkillTaskTrigger}
                      >
                        Run Skill & Task Trigger
                      </button>
                    </div>
                  )}

                  {currentStep.id === '2.2' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Live Task Submission step.</p>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        onClick={handleLiveTaskSubmission}
                      >
                        Run Live Task Submission
                      </button>
                    </div>
                  )}

                  {currentStep.id === '2.3' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Auto + Rubric Evaluation step.</p>
                      <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                        onClick={handleAutoRubricEvaluation}
                      >
                        Run Auto + Rubric Evaluation
                      </button>
                    </div>
                  )}

                  {currentStep.id === '3.2' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Professor Review step.</p>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                        onClick={handleProfessorReview}
                      >
                        Run Professor Review
                      </button>
                    </div>
                  )}

                  {currentStep.id === '3.3' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Company Review step.</p>
                      <button
                        className="px-4 py-2 bg-yellow-700 text-white rounded-lg font-semibold hover:bg-yellow-800 transition"
                        onClick={handleCompanyReview}
                      >
                        Run Company Review
                      </button>
                    </div>
                  )}

                  {currentStep.id === '3.4' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Multi-dimensional Rating step.</p>
                      <button
                        className="px-4 py-2 bg-pink-700 text-white rounded-lg font-semibold hover:bg-pink-800 transition"
                        onClick={handleMultiDimensionalRating}
                      >
                        Run Multi-dimensional Rating
                      </button>
                    </div>
                  )}

                  {currentStep.id === '3.5' && (
                    <div className="space-y-4">
                      <p className="text-gray-300">Reviewer Credibility step.</p>
                      <button
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                        onClick={handleReviewerCredibility}
                      >
                        Run Reviewer Credibility
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                  >
                    {currentStepIndex === steps.length - 1 ? 'Complete Verification' : 'Next Step'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Verification Complete!</h2>
                <p className="text-gray-400 mb-6">Your {skill.name} skill has been successfully verified</p>
                <p className="text-sm text-gray-500">Redirecting to home...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
