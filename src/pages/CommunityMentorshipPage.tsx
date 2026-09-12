import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { mockMentors } from '../data/mockData';
import { Mentor } from '../types';
import { MentorCard } from '../components/cards/MentorCard';
import { Button } from '../components/ui/Button';
import { Calendar, CheckCircle2, MessageSquare, X } from 'lucide-react';

export const CommunityMentorshipPage: React.FC = () => {
  const [mentors] = useState<Mentor[]>(mockMentors);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookedAlert, setBookedAlert] = useState(false);

  const specialties = [
    'AI Career Transition',
    'Resume Optimization',
    'Technical Interviews',
    'Salary Negotiation',
    'Portfolio Reviews'
  ];

  const filteredMentors = selectedSpecialty
    ? mentors.filter(m => m.specialties.includes(selectedSpecialty))
    : mentors;

  const handleBookConfirm = () => {
    setBookedAlert(true);
    setSelectedMentor(null);
    setTimeout(() => setBookedAlert(false), 4000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Title */}
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            1-on-1 Career Coaching
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
            Community & Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
            Connect with vetted industry leaders for resume audits, mock interviews, and career elevation strategy.
          </p>
        </div>

        <AnimatePresence>
          {bookedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs flex items-center justify-between font-sans font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>Mentorship session request submitted! Your mentor will confirm calendar invite via email.</span>
              </div>
              <span className="font-bold cursor-pointer hover:opacity-80" onClick={() => setBookedAlert(false)}>✕</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 font-sans">
          <button
            onClick={() => setSelectedSpecialty('')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedSpecialty === ''
                ? 'bg-[#0F766E] text-white shadow-xs border border-teal-600'
                : 'bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            All Mentors ({mentors.length})
          </button>
          {specialties.map((spec, i) => (
            <button
              key={i}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-[#0F766E] text-white shadow-xs border border-teal-600'
                  : 'bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(m => (
            <MentorCard key={m.id} mentor={m} onBook={men => setSelectedMentor(men)} />
          ))}
        </div>

        {/* Community Discussion Board Snippet */}
        <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
              <MessageSquare className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> Active Peer Discussions
            </h2>
            <Button variant="ghost" size="sm">
              View All Threads
            </Button>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white font-display">
                  How I negotiated +$22k salary on my first junior frontend offer in Chicago
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans mt-1">Posted by Carlos M. • 42 replies • 18 helpful votes</p>
              </div>
              <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 border border-teal-200 dark:border-teal-800 shrink-0">
                Salary Advice
              </span>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white font-display">
                  Free WorkNext ATS Resume template breakdown: Why 2-column layouts fail screeners
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans mt-1">Posted by Dr. Marcus Vance • 89 replies • 120 helpful votes</p>
              </div>
              <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 border border-teal-200 dark:border-teal-800 shrink-0">
                Resume Tips
              </span>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedMentor && (
            <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 rounded-[20px] shadow-lg w-full max-w-md p-8 space-y-6 text-stone-900 dark:text-white"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 font-display">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">Book Mentorship Session</h3>
                  <button onClick={() => setSelectedMentor(null)} className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3.5 font-sans">
                  <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-stone-800" />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">{selectedMentor.name}</h4>
                    <p className="text-xs text-[#0F766E] dark:text-teal-400 font-semibold">{selectedMentor.role}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="block text-stone-700 dark:text-stone-300 font-semibold">Session Focus</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]">
                      <option>Resume Audit & ATS Keywords</option>
                      <option>Mock Technical Interview</option>
                      <option>Salary Negotiation Strategy</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-stone-700 dark:text-stone-300 font-semibold">Next Available Slot</label>
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />
                      {selectedMentor.availability}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-3 font-sans">
                  <Button variant="outline" size="sm" onClick={() => setSelectedMentor(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleBookConfirm} className="bg-[#0F766E] hover:bg-[#0D655E]">
                    Confirm Session
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};
