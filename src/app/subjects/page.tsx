'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { BookOpen, TrendingUp, Star, Users, MoreVertical } from 'lucide-react';

const subjects = [
  { name: 'Intro to Programming', code: 'CS101', dept: 'Computer Science & Engineering', teacher: 'Dr. Ada Lovelace', completion: 49, status: 'Conflict' },
  { name: 'Algorithms', code: 'CS305', dept: 'Computer Science & Engineering', teacher: 'Dr. Ada Lovelace', completion: 92, status: 'Scheduled' },
  { name: 'Circuit Theory', code: 'EC202', dept: 'Electronics & Communication', teacher: 'Dr. Ada Lovelace', completion: 94, status: 'Scheduled' },
  { name: 'Thermodynamics', code: 'ME401', dept: 'Mechanical Engineering', teacher: 'Dr. Ada Lovelace', completion: 20, status: 'Scheduled' },
  { name: 'Intro to Programming Lab', code: 'CS101-L', dept: 'Computer Science & Engineering', teacher: 'Dr. Grace Hopper', completion: 46, status: 'Scheduled' },
  { name: 'Database Systems', code: 'IT201', dept: 'Information Technology', teacher: 'Dr. Ada Lovelace', completion: 67, status: 'Scheduled' },
  { name: 'Power Systems', code: 'EE301', dept: 'Electrical & Electronics Engineering', teacher: 'Dr. Ada Lovelace', completion: 60, status: 'Scheduled' },
  { name: 'Structural Analysis', code: 'CE304', dept: 'Civil Engineering', teacher: 'Dr. Ada Lovelace', completion: 64, status: 'Scheduled' },
  { name: 'Aerodynamics', code: 'AE201', dept: 'Aerospace Engineering', teacher: 'Dr. Ada Lovelace', completion: 60, status: 'Scheduled' },
  { name: 'Chemical Process Principles', code: 'CH201', dept: 'Chemical Engineering', teacher: 'Dr. Ada Lovelace', completion: 47, status: 'Scheduled' },
  { name: 'Biomechanics', code: 'BM301', dept: 'Biomedical Engineering', teacher: 'Dr. Ada Lovelace', completion: 77, status: 'Scheduled' },
  { name: 'Operating Systems', code: 'CS401', dept: 'Computer Science & Engineering', teacher: 'Dr. Ada Lovelace', completion: 68, status: 'Conflict' },
  { name: 'Computer Networks', code: 'IT302', dept: 'Information Technology', teacher: 'Dr. Ada Lovelace', completion: 62, status: 'Scheduled' },
  { name: 'Control Systems', code: 'EE405', dept: 'Electrical & Electronics Engineering', teacher: 'Dr. Ada Lovelace', completion: 66, status: 'Scheduled' },
  { name: 'Fluid Mechanics', code: 'ME303', dept: 'Mechanical Engineering', teacher: 'Dr. Ada Lovelace', completion: 55, status: 'Scheduled' },
  { name: 'Transportation Engineering', code: 'CE404', dept: 'Civil Engineering', teacher: 'Dr. Ada Lovelace', completion: 57, status: 'Scheduled' },
  { name: 'Propulsion', code: 'AE402', dept: 'Aerospace Engineering', teacher: 'Dr. Ada Lovelace', completion: 57, status: 'Scheduled' },
  { name: 'Biomedical Instrumentation Lab', code: 'BM401-L', dept: 'Biomedical Engineering', teacher: 'Dr. Grace Hopper', completion: 100, status: 'Scheduled' },
];

export default function SubjectsPage() {
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Subject Management" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">Comprehensive overview of all subjects, curriculum, and performance.</p>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<BookOpen />} title="Avg. Syllabus Completion" value="82%" subtitle="+7.5% from last semester" />
            <StatCard icon={<TrendingUp />} title="Avg. Student Performance" value="88%" subtitle="+7.5% from last semester" />
            <StatCard icon={<Star />} title="Avg. Feedback Score" value="4.4 / 5.0" subtitle="Based on 1,456 student ratings" />
            <StatCard icon={<Users />} title="Total Enrollments" value="3,450" subtitle="Across all subjects" />
          </div>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Subject Directory</h3>
                <p className="text-sm text-gray-400">List of all subjects with their key management parameters.</p>
              </div>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors">
                Add Subject
              </button>
            </div>

            <input
              type="text"
              placeholder="Search by subject, ID, or teacher..."
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:border-primary-600"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium">Teacher</th>
                    <th className="pb-3 font-medium">Syllabus Completion</th>
                    <th className="pb-3 font-medium">Timetable Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4">
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-xs text-gray-500">{subject.code} · {subject.dept}</div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-400">{subject.teacher}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-primary-600 rounded-full" style={{ width: `${subject.completion}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-400">{subject.completion}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subject.status === 'Conflict' 
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-green-500/10 text-green-500'
                        }`}>
                          {subject.status}
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
