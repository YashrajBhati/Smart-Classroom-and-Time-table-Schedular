'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, GraduationCap, TrendingUp, Award } from 'lucide-react';

const studentsData = [
  { id: '1', name: 'John Doe', rollNo: 'CSE001', batch: 'CSE-3A', cgpa: 8.8, attendance: 92, status: 'Active' },
  { id: '2', name: 'Jane Smith', rollNo: 'CSE002', batch: 'CSE-3A', cgpa: 9.2, attendance: 95, status: 'Active' },
  { id: '3', name: 'Mike Johnson', rollNo: 'CSE003', batch: 'CSE-3B', cgpa: 8.5, attendance: 88, status: 'Active' },
  { id: '4', name: 'Sarah Williams', rollNo: 'CSE004', batch: 'CSE-3B', cgpa: 9.0, attendance: 94, status: 'Active' },
  { id: '5', name: 'David Brown', rollNo: 'CSE005', batch: 'CSE-3C', cgpa: 8.7, attendance: 90, status: 'Active' },
  { id: '6', name: 'Emily Davis', rollNo: 'CSE006', batch: 'CSE-4A', cgpa: 9.1, attendance: 93, status: 'Active' },
  { id: '7', name: 'Chris Wilson', rollNo: 'CSE007', batch: 'CSE-4A', cgpa: 8.6, attendance: 89, status: 'Active' },
  { id: '8', name: 'Lisa Anderson', rollNo: 'CSE008', batch: 'CSE-4B', cgpa: 8.9, attendance: 91, status: 'Active' },
];

export default function HODStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'hod') {
        router.push('/login');
      }
    }
  }, [router]);

  const batches = ['All', ...Array.from(new Set(students.map(s => s.batch)))];

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
    return matchesSearch && matchesBatch;
  });

  const totalStudents = students.length;
  const avgCGPA = (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2);
  const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length);
  const activeStudents = students.filter(s => s.status === 'Active').length;

  return (
    <div className="flex">
      <Sidebar userRole="hod" />
      
      <div className="flex-1 ml-64">
        <Header title="Students Management" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Department Students</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Students" value={totalStudents.toString()} subtitle="All batches" />
            <StatCard icon={<TrendingUp />} title="Avg. CGPA" value={avgCGPA} subtitle="Department average" />
            <StatCard icon={<Award />} title="Avg. Attendance" value={`${avgAttendance}%`} subtitle="Overall" />
            <StatCard icon={<GraduationCap />} title="Active" value={activeStudents.toString()} subtitle="Currently enrolled" />
          </div>

          <div className="card-dark p-6">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600"
              />
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600"
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Roll No</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Batch</th>
                    <th className="pb-3 font-medium text-center">CGPA</th>
                    <th className="pb-3 font-medium text-center">Attendance</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                    <th className="pb-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4 font-medium">{student.rollNo}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-primary-600/10 text-primary-500 rounded text-xs font-medium">
                          {student.batch}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`font-semibold ${
                          student.cgpa >= 9 ? 'text-green-500' :
                          student.cgpa >= 8 ? 'text-blue-500' :
                          'text-yellow-500'
                        }`}>
                          {student.cgpa}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`font-semibold ${
                          student.attendance >= 90 ? 'text-green-500' :
                          student.attendance >= 75 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {student.attendance}%
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Batch-wise Distribution</h3>
              <div className="space-y-3">
                <BatchItem batch="CSE-3A" students={45} avgCGPA={8.9} />
                <BatchItem batch="CSE-3B" students={42} avgCGPA={8.7} />
                <BatchItem batch="CSE-3C" students={40} avgCGPA={8.6} />
                <BatchItem batch="CSE-4A" students={38} avgCGPA={9.0} />
                <BatchItem batch="CSE-4B" students={35} avgCGPA={8.8} />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <PerformanceItem label="CGPA > 9.0" count={85} total={200} />
                <PerformanceItem label="CGPA 8.0 - 9.0" count={95} total={200} />
                <PerformanceItem label="CGPA < 8.0" count={20} total={200} />
                <PerformanceItem label="Attendance > 90%" count={150} total={200} />
              </div>
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

function BatchItem({ batch, students, avgCGPA }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
      <div>
        <div className="font-medium">{batch}</div>
        <div className="text-xs text-gray-400">{students} students</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-primary-500">{avgCGPA}</div>
        <div className="text-xs text-gray-400">Avg CGPA</div>
      </div>
    </div>
  );
}

function PerformanceItem({ label, count, total }: any) {
  const percentage = Math.round((count / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="text-gray-400">{count}/{total}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
