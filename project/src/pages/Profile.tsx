import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Save } from 'lucide-react';

export const Profile = () => {
  const { user, updateUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || '',
    institution: user?.institution || '',
  });

  const handleSave = () => {
    updateUser(formData);
    setEditing(false);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0ea5e9] shadow-xl shadow-blue-500/20">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/30 transition-all">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:opacity-50"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-700 rounded-xl text-white opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div className="flex gap-4 pt-6">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user?.name || '',
                        age: user?.age || '',
                        gender: user?.gender || '',
                        institution: user?.institution || '',
                      });
                    }}
                    className="flex-1 py-3 bg-[#2d2d2d] text-gray-300 rounded-xl font-semibold hover:bg-[#3d3d3d] transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full py-3 bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
