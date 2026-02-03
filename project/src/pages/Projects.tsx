import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, Users, Clock, X, Building2 } from 'lucide-react';

export const Projects = () => {
  const { projects, toggleProjectSave, applyToProject } = useApp();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  const companies = ['all', ...Array.from(new Set(projects.map(p => p.company)))];
  const filteredProjects = selectedCompany === 'all'
    ? projects
    : projects.filter(p => p.company === selectedCompany);

  const project = selectedProject ? projects.find(p => p.id === selectedProject) : null;

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Available Projects</h1>
          <p className="text-gray-400">Find and apply to exciting opportunities</p>
        </div>

        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          <div className="space-y-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#0ea5e9] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{proj.title}</h3>
                      {proj.applied && (
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium">
                          Applied
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Building2 className="w-4 h-4" />
                      <span>{proj.company}</span>
                    </div>
                    <p className="text-gray-400">{proj.description}</p>
                  </div>
                  <button
                    onClick={() => toggleProjectSave(proj.id)}
                    className={`p-2 rounded-lg transition-all ${
                      proj.saved
                        ? 'text-red-500 bg-red-500/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${proj.saved ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.requiredSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 bg-[#2d2d2d] rounded-lg text-sm text-gray-300"
                    >
                      {skill.name} ({skill.impact}%)
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {proj.views}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {proj.applicants}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {proj.timeLimit}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj.id)}
                    disabled={proj.applied}
                    className="px-6 py-2 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {proj.applied ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 sticky top-6">
              <h3 className="text-white font-semibold text-lg mb-4">Filter by Company</h3>
              <div className="space-y-2">
                {companies.map((company) => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all capitalize ${
                      selectedCompany === company
                        ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white'
                        : 'bg-[#2d2d2d] text-gray-400 hover:text-white'
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && project && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Apply to Project</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2d2d2d] rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Views</p>
                  <p className="text-2xl font-bold text-white">{project.views}</p>
                </div>
                <div className="bg-[#2d2d2d] rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Applicants</p>
                  <p className="text-2xl font-bold text-white">{project.applicants}</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Required Skills</h4>
                <div className="space-y-3">
                  {project.requiredSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-[#0ea5e9] font-semibold">{skill.impact}% impact</span>
                      </div>
                      <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-full"
                          style={{ width: `${skill.impact}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#2d2d2d] rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time Limit</span>
                </div>
                <p className="text-white font-semibold">{project.timeLimit}</p>
              </div>

              <button
                onClick={() => {
                  applyToProject(project.id);
                  setSelectedProject(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Confirm Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
