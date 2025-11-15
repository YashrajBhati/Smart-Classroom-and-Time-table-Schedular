'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function SettingsPage() {
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Settings" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">Configure system settings and preferences.</p>

          <div className="card-dark p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-6">General Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Institution Name</label>
                <input
                  type="text"
                  defaultValue="Smart Scheduler University"
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Academic Year</label>
                <select className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600">
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default Period Duration (minutes)</label>
                <input
                  type="number"
                  defaultValue="60"
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Working Days</label>
                <select className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600">
                  <option>5 Days (Mon-Fri)</option>
                  <option>6 Days (Mon-Sat)</option>
                </select>
              </div>

              <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
