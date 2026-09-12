import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { NotificationCard } from '../components/cards/NotificationCard';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useApp();
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = typeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === typeFilter);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
              System Communications
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
              Notifications & Feed
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
              Stay updated on job matches, ATS score upgrades, interview requests, and mentor sessions.
            </p>
          </div>

          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              icon={<CheckCheck className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />}
              onClick={clearAllNotifications}
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans">
          {['all', 'match', 'application', 'interview', 'system', 'mentor'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                typeFilter === type
                  ? 'bg-[#0F766E] text-white shadow-xs border border-teal-600'
                  : 'bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3 font-sans">
          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-[20px] border border-dashed border-stone-300 dark:border-stone-800 text-stone-500 bg-white/50 dark:bg-[#1A1A1A]/50">
              <Bell className="w-10 h-10 mx-auto mb-3 text-stone-400" />
              <p className="text-sm font-bold text-stone-900 dark:text-white font-display">No notifications found</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-sans">You are all caught up on system notifications.</p>
            </div>
          ) : (
            filtered.map(notif => (
              <NotificationCard key={notif.id} notification={notif} onRead={markNotificationRead} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
