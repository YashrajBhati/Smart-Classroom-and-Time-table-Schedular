'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar, TrendingUp, Users, CheckCircle } from 'lucide-react';

const attendanceData = [
  { 
    id: '1', 
    date: '2024-01-15', 
    batch: 'CSE-3A', 
    subject: 'Software Engineering',
    present: 42,
    absent: 3,
    total: 45,
    percentage: 93
  },
  { 
    id: '2', 
    date: '2024-01-15', 
    batch: 'CSE-3B', 
    subject: 'Software Engineering',
    present: 38,
    absent: 4,
    total: 42,
    percentage: 90
  },
  { 
    id: '3', 
    date: '2024-01-14', 
    batch: 'CSE-4A', 
    subject: 'Distributed Systems',
    present: 37,
    absent: 3,
    total: 40,
    percentage: 93
  },
  { 
    id: '4', 
    date: '2024-01-14', 
    batch: 'CSE-3C', 
    subject: 'Software Engineering',
    present: 39,
    absent: 1,
    total: 40,
    percentage: 98
  },
  { 
    id: '5', 
    date: '2024-01-13', 
    batch: 'CSE-4B', 
    subject: 'Distributed Systems',
    present: 35,
    absent: 3,
    total: 38,
    percentage: 92
  },
];

export default function FacultyAttendancePage() {
  const router = useRouter();
  const [attendance, setAttendance] = useState(attendanceData);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'faculty') {
        router.push('/login');
      }
    }
  }, [router]);

  const totalClasses = attendance.length;
  const avgAttendance = Math.round(attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length);
  const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
  const totalStudents = attendance.reduce((sum, a) => sum + a.total, 0);

  return (
    <div className="flex">
      <Sidebar userRole="faculty" />
      
      <div className="flex-1 ml-64">
        <Header title="Attendance Records" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Attendance Management</h2>
            <p className="text-gray-400">View and track student attendance records</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Calendar />} title="Total Classes" value={totalClasses.toString()} subtitle="This week" />
            <StatCard icon={<TrendingUp />} title="Avg. Attendance" value={`${avgAttendance}%`} subtitle="Overall average" />
            <StatCard icon={<Users />} title="Total Students" value={totalStudents.toString()} subtitle="All batches" />
            <StatCard icon={<CheckCircle />} title="Present Today" value={totalPresent.toString()} subtitle="Across classes" />
          </div>

          <div className="card-dark p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Attendance Records</h3>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors">
                Export Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Batch</th>
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium text-center">Present</th>
                    <th className="pb-3 font-medium text-center">Absent</th>
                    <th className="pb-3 font-medium text-center">Total</th>
                    <th className="pb-3 font-medium text-center">Percentage</th>
                    <th className="pb-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.id} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4 text-sm">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-primary-600/10 text-primary-500 rounded text-xs font-medium">
                          {record.batch}
                        </span>
                      </td>
                      <td className="py-4 text-sm">{record.subject}</td>
                      <td className="py-4 text-center">
                        <span className="text-green-500 font-semibold">{record.present}</span>
                      </td>
                      <td className="py-4 text-center">
                        <span className="text-red-500 font-semibold">{record.absent}</span>
                      </td>
                      <td className="py-4 text-center text-gray-400">{record.total}</td>
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${
                          record.percentage >= 95 ? 'bg-green-500/10 text-green-500' :
                          record.percentage >= 90 ? 'bg-blue-500/10 text-blue-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {record.percentage}%
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

          <div className="grid grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Batch-wise Attendance</h3>
              <div className="space-y-4">
                <BatchAttendance batch="CSE-3A" percentage={93} />
                <BatchAttendance batch="CSE-3B" percentage={90} />
                <BatchAttendance batch="CSE-3C" percentage={98} />
                <BatchAttendance batch="CSE-4A" percentage={93} />
                <BatchAttendance batch="CSE-4B" percentage={92} />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Trend</h3>
              <div className="space-y-4">
                <TrendItem day="Monday" percentage={94} />
                <TrendItem day="Tuesday" percentage={91} />
                <TrendItem day="Wednesday" percentage={93} />
                <TrendItem day="Thursday" percentage={92} />
                <TrendItem day="Friday" percentage={89} />
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

function BatchAttendance({ batch, percentage }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{batch}</span>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            percentage >= 95 ? 'bg-green-600' :
            percentage >= 90 ? 'bg-blue-600' :
            'bg-yellow-600'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function TrendItem({ day, percentage }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm w-24">{day}</span>
      <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="text-sm text-gray-400 w-12 text-right">{percentage}%</span>
    </div>
  );
}
