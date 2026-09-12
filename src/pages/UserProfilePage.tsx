import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { MapPin, Plus, X, Save, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const UserProfilePage: React.FC = () => {
  const { user, setUser } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    title: user.title,
    location: user.location,
    phone: user.phone || '',
    website: user.website || '',
    bio: user.bio,
    preferredLocation: user.preferredLocation,
    desiredSalary: user.desiredSalary
  });

  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(user.skills);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      ...formData,
      skills
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Header Card */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border border-stone-200 dark:border-stone-800 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white font-display">{user.name}</h1>
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] dark:text-teal-400 fill-current" />
              </div>
              <p className="text-xs sm:text-sm text-[#0F766E] dark:text-teal-400 font-semibold font-sans">{user.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-1 font-sans">
                <MapPin className="w-3.5 h-3.5" /> {user.location}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-center min-w-[160px] font-sans">
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Readiness Index</p>
            <p className="text-3xl font-extrabold text-[#0F766E] dark:text-teal-400 flex items-center justify-center gap-1 font-display">
              <Sparkles className="w-5 h-5 text-amber-500" /> {user.readinessScore}%
            </p>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">Top 10% in Chicago</p>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 rounded-[20px] p-6 sm:p-8 shadow-xs space-y-6 font-sans">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white font-display">Professional Information</h2>
            {savedSuccess && (
              <span className="text-xs font-bold text-[#0F766E] bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                ✓ Profile Updated Successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Primary Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Target Salary Range
              </label>
              <input
                type="text"
                value={formData.desiredSalary}
                onChange={e => setFormData({ ...formData, desiredSalary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Preferred Work Location Mode
              </label>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Short Professional Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Skill Tags */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
              Verified Technical Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, Python)..."
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
              />
              <Button type="button" variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={handleAddSkill}>
                Add
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-right">
            <Button variant="primary" size="md" icon={<Save className="w-4 h-4" />} type="submit" className="bg-[#0F766E] hover:bg-[#0D655E]">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
