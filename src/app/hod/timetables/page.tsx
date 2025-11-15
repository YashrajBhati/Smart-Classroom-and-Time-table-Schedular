'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar, Users, BookOpen, Clock } from 'lucide-react';

const timetablesData = [
  {
    id: '1',
    batch: 'CSE-3A',
    semester: '3rd Semester',
    students: 45,
    subjects: 8,
    faculty: 6,
    classesPerWeek: 32,
    status: 'Active'
  },
  {
    id: '2',
    batch: 'CSE-3B',
    semester: '3rd Semester',
    students: 42,
    subjects: 8,
    faculty: 6,
    classesPerWeek: 32,
    status: 'Active'
  },
  {
    id: '3',
    batch: 'CSE-3C',
    semester: '3rd Semester',
    students: 40,
    subjects: 8,
    faculty: 6,
    classesPerWeek: 32,
    status: 'Active'
  },
  {
    id: '4',
    batch: 'CSE-4A',
    semester: '4th Semester',
    students: 38,
    subjects: 7,
    faculty: 5,
    classesPerWeek: 30,
    status: 'Active'
  },
  {
    id: '5',
    batch: 'CSE-4B',
    semester: '4th Semester',
    students: 35,
    subjects: 7,
    faculty: 5,
    classesPerWeek: 30,
    status: 'Active'
  },
];

const sampleTimetable = [
  {
    time: '08:30 AM - 09:30 AM',
    monday: 'Software Engineering',
    tuesday: 'Web Technologies',
    wednesday: 'Machine Learning',
    thursday: 'Cloud Computing',
    friday: 'Cyber Security',
  },
  {
    time: '09:45 AM - 10:45 AM',
    monday: 'Artificial Intelligence',
    tuesday: 'Software Engineering',
    wednesday: 'Mobile App Dev',
    thursday: 'Web Technologies',
    friday: 'Data Science',
  },
  {
    time: '11:00 AM - 12:00 PM',
    monday: 'Machine Learning',
    tuesday: 'Cyber Security',
    wednesday: 'Cloud Computing',
    thursday: 'Artificial Intelligence',
    friday: 'Software Engineering',
  },
  {
    time: '12:00 PM - 01:00 PM',
    monday: 'Lunch Break',
    tuesday: 'Lunch Break',
    wednesday: 'Lunch Break',
    thursday: 'Lunch Break',
    friday: 'Lunch Break',
  },
  {
    time: '01:15 PM - 02:15 PM',
    monday: 'Mobile App Dev',
    tuesday: 'Data Science',
    wednesday: 'Artificial Intelligence',
    thursday: 'Mobile App Dev',
    friday: 'Web Technologies',
  },
  {
    time: '02:30 PM - 04:30 PM',
    monday: 'Software Eng Lab',
    tuesday: 'Web Tech Lab',
    wednesday: 'ML Lab',
    thursday: 'Cloud Lab',
    friday: 'Security Lab',
  },
];

export default function HODTimetablesPage() {
  const router = useRouter();
  const [timetables, setTimetables] = useState(timetablesData);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

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

  const totalBatches = timetables.length;
  const totalStudents = timetables.reduce((sum, t) => sum + t.students, 0);
  const totalClasses = timetables.reduce((sum, t) => sum + t.classesPerWeek, 0);
  const activeTimetables = timetables.filter(t => t.status === 'Active').length;

  return (
    <div className="flex">
      <Sidebar userRole="hod" />
      
      <div className="flex-1 ml-64">
        <Header title="Timetables Management" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Department Timetables</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Calendar />} title="Total Batches" value={totalBatches.toString()} subtitle="Active timetables" />
            <StatCard icon={<Users />} title="Total Students" value={totalStudents.toString()} subtitle="All batches" />
            <StatCard icon={<Clock />} title="Total Classes" value={totalClasses.toString()} subtitle="Per week" />
            <StatCard icon={<BookOpen />} title="Active" value={activeTimetables.toString()} subtitle="Current semester" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {timetables.map((timetable) => (
              <TimetableCard 
                key={timetable.id} 
                {...timetable}
                onView={() => setSelectedBatch(timetable.batch)}
              />
            ))}
          </div>

          {selectedBatch && (
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedBatch} - Weekly Timetable</h3>
                  <p className="text-sm text-gray-400">Current semester schedule</p>
                </div>
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-left font-semibold min-w-[140px]">Time</th>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[150px]">Monday</th>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[150px]">Tuesday</th>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[150px]">Wednesday</th>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[150px]">Thursday</th>
                      <th className="border border-gray-800 bg-[#0a0a0a] p-3 text-center font-semibold min-w-[150px]">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleTimetable.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-800 p-3 font-medium text-sm bg-[#0a0a0a]">{row.time}</td>
                        <td className="border border-gray-800 p-3 text-center text-sm">{row.monday}</td>
                        <td className="border border-gray-800 p-3 text-center text-sm">{row.tuesday}</td>
                        <td className="border border-gray-800 p-3 text-center text-sm">{row.wednesday}</td>
                        <td className="border border-gray-800 p-3 text-center text-sm">{row.thursday}</td>
                        <td className="border border-gray-800 p-3 text-center text-sm">{row.friday}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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

function TimetableCard({ batch, semester, students, subjects, faculty, classesPerWeek, status, onView }: any) {
  return (
    <div className="card-dark p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{batch}</h3>
          <p className="text-sm text-gray-400">{semester}</p>
        </div>
        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Students</div>
          <div className="text-xl font-bold">{students}</div>
        </div>
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Subjects</div>
          <div className="text-xl font-bold">{subjects}</div>
        </div>
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Faculty</div>
          <div className="text-xl font-bold">{faculty}</div>
        </div>
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Classes/Week</div>
          <div className="text-xl font-bold">{classesPerWeek}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onView}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View Timetable
        </button>
        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  );
}
