'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar } from 'lucide-react';

const timetableData = [
  {
    time: '08:30 AM - 09:30 AM',
    monday: { code: 'CS301', subject: 'Software Engineering', teacher: 'Dr. Margaret Hamilton', room: 'Room-401', color: 'bg-blue-600' },
    tuesday: { code: 'CS302', subject: 'Web Technologies', teacher: 'Dr. Tim Berners-Lee', room: 'Room-215', color: 'bg-purple-600' },
    wednesday: { code: 'CS303', subject: 'Machine Learning', teacher: 'Dr. Andrew Ng', room: 'Room-312', color: 'bg-indigo-600' },
    thursday: { code: 'CS304', subject: 'Cloud Computing', teacher: 'Dr. Werner Vogels', room: 'Room-508', color: 'bg-cyan-600' },
    friday: { code: 'CS305', subject: 'Cyber Security', teacher: 'Dr. Bruce Schneier', room: 'Room-623', color: 'bg-teal-600' },
  },
  {
    time: '09:45 AM - 10:45 AM',
    monday: { code: 'CS306', subject: 'Artificial Intelligence', teacher: 'Dr. Geoffrey Hinton', room: 'Room-517', color: 'bg-green-600' },
    tuesday: { code: 'CS301', subject: 'Software Engineering', teacher: 'Dr. Margaret Hamilton', room: 'Room-329', color: 'bg-blue-600' },
    wednesday: { code: 'CS307', subject: 'Mobile App Development', teacher: 'Dr. Andy Rubin', room: 'Room-441', color: 'bg-amber-600' },
    thursday: { code: 'CS302', subject: 'Web Technologies', teacher: 'Dr. Tim Berners-Lee', room: 'Room-218', color: 'bg-purple-600' },
    friday: { code: 'CS308', subject: 'Data Science', teacher: 'Dr. Hadley Wickham', room: 'Room-735', color: 'bg-pink-600' },
  },
  {
    time: '11:00 AM - 12:00 PM',
    monday: { code: 'CS303', subject: 'Machine Learning', teacher: 'Dr. Andrew Ng', room: 'Room-614', color: 'bg-indigo-600' },
    tuesday: { code: 'CS305', subject: 'Cyber Security', teacher: 'Dr. Bruce Schneier', room: 'Room-527', color: 'bg-teal-600' },
    wednesday: { code: 'CS304', subject: 'Cloud Computing', teacher: 'Dr. Werner Vogels', room: 'Room-419', color: 'bg-cyan-600' },
    thursday: { code: 'CS306', subject: 'Artificial Intelligence', teacher: 'Dr. Geoffrey Hinton', room: 'Room-322', color: 'bg-green-600' },
    friday: { code: 'CS301', subject: 'Software Engineering', teacher: 'Dr. Margaret Hamilton', room: 'Room-536', color: 'bg-blue-600' },
  },
  {
    time: '12:00 PM - 01:00 PM',
    monday: { code: 'LUNCH', subject: 'Lunch Break', teacher: '', room: '', color: 'bg-gray-700' },
    tuesday: { code: 'LUNCH', subject: 'Lunch Break', teacher: '', room: '', color: 'bg-gray-700' },
    wednesday: { code: 'LUNCH', subject: 'Lunch Break', teacher: '', room: '', color: 'bg-gray-700' },
    thursday: { code: 'LUNCH', subject: 'Lunch Break', teacher: '', room: '', color: 'bg-gray-700' },
    friday: { code: 'LUNCH', subject: 'Lunch Break', teacher: '', room: '', color: 'bg-gray-700' },
  },
  {
    time: '01:15 PM - 02:15 PM',
    monday: { code: 'CS307', subject: 'Mobile App Development', teacher: 'Dr. Andy Rubin', room: 'Room-228', color: 'bg-amber-600' },
    tuesday: { code: 'CS308', subject: 'Data Science', teacher: 'Dr. Hadley Wickham', room: 'Room-641', color: 'bg-pink-600' },
    wednesday: { code: 'CS306', subject: 'Artificial Intelligence', teacher: 'Dr. Geoffrey Hinton', room: 'Room-415', color: 'bg-green-600' },
    thursday: { code: 'CS307', subject: 'Mobile App Development', teacher: 'Dr. Andy Rubin', room: 'Room-529', color: 'bg-amber-600' },
    friday: { code: 'CS302', subject: 'Web Technologies', teacher: 'Dr. Tim Berners-Lee', room: 'Room-334', color: 'bg-purple-600' },
  },
  {
    time: '02:30 PM - 04:30 PM',
    monday: { code: 'LAB', subject: 'Software Engineering Lab', teacher: 'Dr. Margaret Hamilton', room: 'Lab-301', color: 'bg-blue-800' },
    tuesday: { code: 'LAB', subject: 'Web Technologies Lab', teacher: 'Dr. Tim Berners-Lee', room: 'Lab-402', color: 'bg-purple-800' },
    wednesday: { code: 'LAB', subject: 'Machine Learning Lab', teacher: 'Dr. Andrew Ng', room: 'Lab-205', color: 'bg-indigo-800' },
    thursday: { code: 'LAB', subject: 'Cloud Computing Lab', teacher: 'Dr. Werner Vogels', room: 'Lab-518', color: 'bg-cyan-800' },
    friday: { code: 'LAB', subject: 'Cyber Security Lab', teacher: 'Dr. Bruce Schneier', room: 'Lab-609', color: 'bg-teal-800' },
  },
  {
    time: '04:45 PM - 05:45 PM',
    monday: { code: 'CS308', subject: 'Data Science', teacher: 'Dr. Hadley Wickham', room: 'Room-447', color: 'bg-pink-600' },
    tuesday: { code: 'CS304', subject: 'Cloud Computing', teacher: 'Dr. Werner Vogels', room: 'Room-352', color: 'bg-cyan-600' },
    wednesday: { code: 'CS305', subject: 'Cyber Security', teacher: 'Dr. Bruce Schneier', room: 'Room-726', color: 'bg-teal-600' },
    thursday: { code: 'CS308', subject: 'Data Science', teacher: 'Dr. Hadley Wickham', room: 'Room-431', color: 'bg-pink-600' },
    friday: { code: 'CS303', subject: 'Machine Learning', teacher: 'Dr. Andrew Ng', room: 'Room-545', color: 'bg-indigo-600' },
  },
];

export default function StudentTimetablePage() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'student') {
        router.push('/login');
      }
      setStudent(user);
    }
  }, [router]);

  if (!student) return null;

  return (
    <div className="flex">
      <Sidebar userRole="student" />
      
      <div className="flex-1 ml-64">
        <Header title="My Timetable" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Weekly Timetable</h2>
            <p className="text-gray-400">Computer Science & Engineering - Section A - Semester 3</p>
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
                {timetableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-800 p-3 font-medium text-sm bg-[#0a0a0a]">
                      {row.time}
                    </td>
                    <td className="border border-gray-800 p-0">
                      <TimetableCell {...row.monday} />
                    </td>
                    <td className="border border-gray-800 p-0">
                      <TimetableCell {...row.tuesday} />
                    </td>
                    <td className="border border-gray-800 p-0">
                      <TimetableCell {...row.wednesday} />
                    </td>
                    <td className="border border-gray-800 p-0">
                      <TimetableCell {...row.thursday} />
                    </td>
                    <td className="border border-gray-800 p-0">
                      <TimetableCell {...row.friday} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <LegendItem color="bg-blue-600" label="Software Engineering" />
            <LegendItem color="bg-purple-600" label="Web Technologies" />
            <LegendItem color="bg-indigo-600" label="Machine Learning" />
            <LegendItem color="bg-cyan-600" label="Cloud Computing" />
            <LegendItem color="bg-teal-600" label="Cyber Security" />
            <LegendItem color="bg-green-600" label="Artificial Intelligence" />
            <LegendItem color="bg-amber-600" label="Mobile App Development" />
            <LegendItem color="bg-pink-600" label="Data Science" />
          </div>
        </main>
      </div>
    </div>
  );
}

function TimetableCell({ code, subject, teacher, room, color }: any) {
  if (code === 'LUNCH') {
    return (
      <div className={`${color} p-3 h-full flex items-center justify-center min-h-[80px]`}>
        <span className="text-sm font-medium text-gray-300">{subject}</span>
      </div>
    );
  }

  return (
    <div className={`${color} p-3 h-full min-h-[80px]`}>
      <div className="text-xs font-bold mb-1 text-white">{code}</div>
      <div className="text-sm font-semibold mb-1 text-white">{subject}</div>
      <div className="text-xs text-gray-200">{teacher}</div>
      <div className="text-xs text-gray-300 mt-1">Room: {room}</div>
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
