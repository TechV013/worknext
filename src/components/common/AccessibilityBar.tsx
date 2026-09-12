import React from 'react';
import { useApp } from '../../context/AppContext';
import { Type, Eye, Keyboard, X, Check, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';

export const AccessibilityBar: React.FC = () => {
  const {
    accessibilityOpen,
    setAccessibilityOpen,
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    theme,
    toggleTheme
  } = useApp();

  if (!accessibilityOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Accessibility Settings</h3>
              <p className="text-xs text-slate-500">Customize visual contrast & display scale</p>
            </div>
          </div>
          <button
            onClick={() => setAccessibilityOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Font Size Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-blue-500" /> Font Size Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  fontSize === 'normal'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Normal (100%)
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  fontSize === 'large'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Large (112%)
              </button>
              <button
                onClick={() => setFontSize('extralarge')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  fontSize === 'extralarge'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                X-Large (125%)
              </button>
            </div>
          </div>

          {/* High Contrast Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-500" /> High Contrast Mode
              </p>
              <p className="text-[11px] text-slate-500">Enhance border lines and text separation</p>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                highContrast ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  highContrast ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Theme Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />} Theme Palette
              </p>
              <p className="text-[11px] text-slate-500">Currently in {theme} mode</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>

          {/* Keyboard Shortcuts Guide */}
          <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
            <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-2">
              <Keyboard className="w-4 h-4" /> Keyboard Navigation Shortcuts
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Tab / Shift+Tab</span>
                <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">Navigate</span>
              </div>
              <div className="flex justify-between">
                <span>Enter / Space</span>
                <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">Activate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-right bg-slate-50/50 dark:bg-slate-900">
          <Button variant="primary" size="sm" onClick={() => setAccessibilityOpen(false)}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
