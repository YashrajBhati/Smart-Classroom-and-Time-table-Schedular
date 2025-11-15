'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, TrendingUp, Award, UserCheck, MoreVertical } from 'lucide-react';

const batches = [
  { name: 'Batch 1 (CSE)', semester: 'S1', dept: 'Computer Science & Engineering', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 90, attendance: 87, status: 'Scheduled' },
  { name: 'Batch 2 (CSE)', semester: 'S2', dept: 'Computer Science & Engineering', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 65, attendance: 60, status: 'Scheduled' },
  { name: 'Batch 3 (ECE)', semester: 'S3', dept: 'Electronics & Communication', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 90, attendance: 90, status: 'Conflicts' },
  { name: 'Batch 4 (IT)', semester: 'S4', dept: 'Information Technology', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 70, attendance: 55, status: 'Scheduled' },
  { name: 'Batch 5 (EEE)', semester: 'S5', dept: 'Electrical & Electronics Engineering', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 80, attendance: 87, status: 'Scheduled' },
  { name: 'Batch 6 (ME)', semester: 'S6', dept: 'Mechanical Engineering', coordinator: 'Dr. Nikola Tesla', size: '40 Students', performance: 70, attendance: 55, status: 'Scheduled' },
];

export default function BatchesPage() {
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Batch Management" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">Oversee and manage all student batches and their key parameters.</p>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Batches" value="9" subtitle="For Fall 2024" />
            <StatCard icon={<TrendingUp />} title="Avg. Batch Size" value="38" subtitle="For Fall 2024" />
            <StatCard icon={<Award />} title="Avg. Performance" value="80%" subtitle="For Fall 2024" />
            <StatCard icon={<UserCheck />} title="Avg. Attendance" value="83%" subtitle="For Fall 2024" />
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Batch Directory</h3>
                <p className="text-sm text-gray-400">Detailed overview of all student batches for the current academic term.</p>
              </div>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors">
                Add Batch
              </button>
            </div>

            <input
              type="text"
              placeholder="Search by batch name, ID, or department..."
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:border-primary-600"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Batch</th>
                    <th className="pb-3 font-medium">Coordinator</th>
                    <th className="pb-3 font-medium">Size</th>
                    <th className="pb-3 font-medium">Performance</th>
                    <th className="pb-3 font-medium">Attendance</th>
                    <th className="pb-3 font-medium">Timetable</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4">
                        <div>
                          <div className="font-medium">{batch.name}</div>
                          <div className="text-xs text-gray-500">{batch.semester} · {batch.dept}</div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-400">{batch.coordinator}</td>
                      <td className="py-4 text-sm text-gray-400">{batch.size}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-[80px]">
                            <div className="h-full bg-primary-600 rounded-full" style={{ width: `${batch.performance}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-400">{batch.performance}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-[80px]">
                            <div className="h-full bg-primary-600 rounded-full" style={{ width: `${batch.attendance}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-400">{batch.attendance}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          batch.status === 'Conflicts' 
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-green-500/10 text-green-500'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }: any) {
  return (
    <div className="card-dark p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        <div className="text-gray-500">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}
