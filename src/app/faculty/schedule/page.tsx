'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar } from 'lucide-react';

const scheduleData = [
  {
    time: '08:30 AM - 09:30 AM',
    monday: { batch: 'CSE-3A', subject: 'Software Engineering', room: 'Room-401', type: 'Lecture', color: 'bg-blue-600' },
    tuesday: { batch: 'CSE-3B', subject: 'Software Engineering', room: 'Room-215', type: 'Lecture', color: 'bg-blue-600' },
    wednesday: { batch: 'CSE-4A', subject: 'Distributed Systems', room: 'Room-312', type: 'Lecture', color: 'bg-purple-600' },
    thursday: { batch: 'CSE-3C', subject: 'Software Engineering', room: 'Room-508', type: 'Lecture', color: 'bg-blue-600' },
    friday: { batch: 'CSE-4B', subject: 'Distributed Systems', room: 'Room-623', type: 'Lecture', color: 'bg-purple-600' },
  },
  {
    time: '09:45 AM - 10:45 AM',
    monday: { batch: 'CSE-4A', subject: 'Distributed Systems', room: 'Room-517', type: 'Lecture', color: 'bg-purple-600' },
    tuesday: { batch: 'CSE-3A', subject: 'Software Engineering', room: 'Room-329', type: 'Lecture', color: 'bg-blue-600' },
    wednesday: { batch: 'CSE-3B', subject: 'Software Engineering', room: 'Room-441', type: 'Lecture', color: 'bg-blue-600' },
    thursday: { batch: 'CSE-4C', subject: 'Distributed Systems', room: 'Room-218', type: 'Lecture', color: 'bg-purple-600' },
    friday: { batch: 'CSE-3C', subject: 'Software Engineering', room: 'Room-735', type: 'Lecture', color: 'bg-blue-600' },
  },
  {
    time: '11:00 AM - 12:00 PM',
    monday: { batch: 'CSE-3B', subject: 'Software Engineering', room: 'Room-614', type: 'Tutorial', color: 'bg-blue-700' },
    tuesday: { batch: 'CSE-4B', subject: 'Distributed Systems', room: 'Room-527', type: 'Tutorial', color: 'bg-purple-700' },
    wednesday: null,
    thursday: { batch: 'CSE-3A', subject: 'Software Engineering', room: 'Room-322', type: 'Tutorial', color: 'bg-blue-700' },
    friday: { batch: 'CSE-4A', subject: 'Distributed Systems', room: 'Room-536', type: 'Tutorial', color: 'bg-purple-700' },
  },
  {
    time: '12:00 PM - 01:00 PM',
    monday: { batch: '', subject: 'Lunch Break', room: '', type: 'Break', color: 'bg-gray-700' },
    tuesday: { batch: '', subject: 'Lunch Break', room: '', type: 'Break', color: 'bg-gray-700' },
    wednesday: { batch: '', subject: 'Lunch Break', room: '', type: 'Break', color: 'bg-gray-700' },
    thursday: { batch: '', subject: 'Lunch Break', room: '', type: 'Break', color: 'bg-gray-700' },
    friday: { batch: '', subject: 'Lunch Break', room: '', type: 'Break', color: 'bg-gray-700' },
  },
  {
    time: '01:15 PM - 02:15 PM',
    monday: { batch: 'CSE-4C', subject: 'Distributed Systems', room: 'Room-228', type: 'Lecture', color: 'bg-purple-600' },
    tuesday: null,
    wednesday: { batch: 'CSE-3C', subject: 'Software Engineering', room: 'Room-415', type: 'Tutorial', color: 'bg-blue-700' },
    thursday: { batch: 'CSE-4B', subject: 'Distributed Systems', room: 'Room-529', type: 'Lecture', color: 'bg-purple-600' },
    friday: null,
  },
  {
    time: '02:30 PM - 04:30 PM',
    monday: { batch: 'CSE-3A', subject: 'Software Engineering Lab', room: 'Lab-301', type: 'Lab', color: 'bg-blue-800' },
    tuesday: { batch: 'CSE-3B', subject: 'Software Engineering Lab', room: 'Lab-402', type: 'Lab', color: 'bg-blue-800' },
    wednesday: { batch: 'CSE-4A', subject: 'Distributed Systems Lab', room: 'Lab-205', type: 'Lab', color: 'bg-purple-800' },
    thursday: { batch: 'CSE-3C', subject: 'Software Engineering Lab', room: 'Lab-518', type: 'Lab', color: 'bg-blue-800' },
    friday: { batch: 'CSE-4B', subject: 'Distributed Systems Lab', room: 'Lab-609', type: 'Lab', color: 'bg-purple-800' },
  },
  {
    time: '04:45 PM - 05:45 PM',
    monday: null,
    tuesday: { batch: 'CSE-4C', subject: 'Distributed Systems', room: 'Room-352', type: 'Tutorial', color: 'bg-purple-700' },
    wednesday: { batch: 'CSE-4B', subject: 'Distributed Systems', room: 'Room-726', type: 'Lecture', color: 'bg-purple-600' },
    thursday: null,
    friday: { batch: 'CSE-4C', subject: 'Distributed Systems Lab', room: 'Lab-714', type: 'Lab', color: 'bg-purple-800' },
  },
];

export default function FacultySchedulePage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'faculty') {
        router.push('/login');
      }
      setFaculty(user);
    }
  }, [router]);

  if (!faculty) return null;

  return (
    <div className="flex">
      <Sidebar userRole="faculty" />
      
      <div className="flex-1 ml-64">
        <Header title="My Schedule" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Weekly Teaching Schedule</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <StatCard label="Total Classes" value="22" subtitle="This week" />
            <StatCard label="Lectures" value="13" subtitle="Theory classes" />
            <StatCard label="Labs" value="6" subtitle="Practical sessions" />
            <StatCard label="Tutorials" value="5" subtitle="Problem solving" />
          </div>

          <div className="card-dark p-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-left font-semibold min-w-[140px]">
                    Time
                  </th>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[180px]">
                    Monday
                  </th>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[180px]">
                    Tuesday
                  </th>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[180px]">
                    Wednesday
                  </th>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[180px]">
                    Thursday
                  </th>
                  <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[180px]">
                    Friday
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-800 p-3 font-medium text-sm bg-[#0a0a0a]">
                      {row.time}
                    </td>
                    <td className="border border-gray-800 p-0">
                      {row.monday ? <ScheduleCell {...row.monday} /> : <EmptyCell />}
                    </td>
                    <td className="border border-gray-800 p-0">
                      {row.tuesday ? <ScheduleCell {...row.tuesday} /> : <EmptyCell />}
                    </td>
                    <td className="border border-gray-800 p-0">
                      {row.wednesday ? <ScheduleCell {...row.wednesday} /> : <EmptyCell />}
                    </td>
                    <td className="border border-gray-800 p-0">
                      {row.thursday ? <ScheduleCell {...row.thursday} /> : <EmptyCell />}
                    </td>
                    <td className="border border-gray-800 p-0">
                      {row.friday ? <ScheduleCell {...row.friday} /> : <EmptyCell />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <LegendItem color="bg-blue-600" label="Software Engineering - Lecture" />
            <LegendItem color="bg-purple-600" label="Distributed Systems - Lecture" />
            <LegendItem color="bg-blue-700" label="Software Eng. - Tutorial" />
            <LegendItem color="bg-purple-700" label="Distributed Sys. - Tutorial" />
            <LegendItem color="bg-blue-800" label="Software Eng. - Lab" />
            <LegendItem color="bg-purple-800" label="Distributed Sys. - Lab" />
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, subtitle }: any) {
  return (
    <div className="card-dark p-4">
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}

function ScheduleCell({ batch, subject, room, type, color }: any) {
  if (type === 'Break') {
    return (
      <div className={`${color} p-3 h-full flex items-center justify-center min-h-[80px]`}>
        <span className="text-sm font-medium text-gray-300">{subject}</span>
      </div>
    );
  }

  return (
    <div className={`${color} p-3 h-full min-h-[80px]`}>
      <div className="text-xs font-bold mb-1 text-white uppercase">{type}</div>
      <div className="text-sm font-semibold mb-1 text-white">{subject}</div>
      <div className="text-xs text-gray-200">{batch}</div>
      <div className="text-xs text-gray-300 mt-1">Room: {room}</div>
    </div>
  );
}

function EmptyCell() {
  return (
    <div className="bg-[#0a0a0a] p-3 h-full min-h-[80px] flex items-center justify-center">
      <span className="text-xs text-gray-600">Free</span>
    </div>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${color} rounded`}></div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
