'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const timetableData = [
  {
    time: '09:00 AM - 10:00 AM',
    monday: { code: 'CSE301', teacher: 'Dr. Alan Turing', room: 'A-201', batch: 'Section A', color: 'bg-blue-800/80' },
    tuesday: { code: 'CSE302', teacher: 'Dr. Grace Hopper', room: 'B-105', batch: 'Section A', color: 'bg-purple-800/80' },
    wednesday: { code: 'CSE303', teacher: 'Dr. Ada Lovelace', room: 'C-301', batch: 'Section A', color: 'bg-indigo-800/80' },
    thursday: { code: 'CSE304', teacher: 'Dr. Tim Berners-Lee', room: 'A-202', batch: 'Section A', color: 'bg-cyan-800/80' },
    friday: { code: 'CSE305', teacher: 'Dr. Dennis Ritchie', room: 'B-106', batch: 'Section A', color: 'bg-teal-800/80' },
  },
  {
    time: '10:15 AM - 11:15 AM',
    monday: { code: 'CSE306', teacher: 'Dr. Linus Torvalds', room: 'C-302', batch: 'Section A', color: 'bg-green-800/80' },
    tuesday: { code: 'CSE307', teacher: 'Dr. Bjarne Stroustrup', room: 'A-203', batch: 'Section A', color: 'bg-lime-800/80' },
    wednesday: { code: 'CSE308', teacher: 'Dr. James Gosling', room: 'B-107', batch: 'Section A', color: 'bg-amber-800/80' },
    thursday: { code: 'CSE309', teacher: 'Dr. Guido van Rossum', room: 'C-303', batch: 'Section A', color: 'bg-orange-800/80' },
    friday: { code: 'CSE310', teacher: 'Dr. Brendan Eich', room: 'A-204', batch: 'Section A', color: 'bg-red-800/80' },
  },
  {
    time: '11:30 AM - 12:30 PM',
    monday: { code: 'CSE311', teacher: 'Dr. Donald Knuth', room: 'B-108', batch: 'Section A', color: 'bg-pink-800/80' },
    tuesday: { code: 'CSE312', teacher: 'Dr. Ken Thompson', room: 'C-304', batch: 'Section A', color: 'bg-rose-800/80' },
    wednesday: { code: 'CSE313', teacher: 'Dr. Brian Kernighan', room: 'A-205', batch: 'Section A', color: 'bg-violet-800/80' },
    thursday: { code: 'CSE314', teacher: 'Dr. Edsger Dijkstra', room: 'B-109', batch: 'Section A', color: 'bg-fuchsia-800/80' },
    friday: { code: 'CSE315', teacher: 'Dr. John McCarthy', room: 'C-305', batch: 'Section A', color: 'bg-purple-800/80' },
  },
  {
    time: '12:30 PM - 01:30 PM',
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  },
  {
    time: '01:30 PM - 02:30 PM',
    monday: { code: 'CSE316', teacher: 'Dr. Marvin Minsky', room: 'Lab-A1', batch: 'Section A', color: 'bg-yellow-800/80' },
    tuesday: { code: 'CSE317', teacher: 'Dr. John von Neumann', room: 'Lab-B2', batch: 'Section A', color: 'bg-yellow-800/80' },
    wednesday: { code: 'CSE318', teacher: 'Dr. Claude Shannon', room: 'Lab-C3', batch: 'Section A', color: 'bg-yellow-800/80' },
    thursday: { code: 'CSE319', teacher: 'Dr. Niklaus Wirth', room: 'Lab-A2', batch: 'Section A', color: 'bg-yellow-800/80' },
    friday: { code: 'CSE320', teacher: 'Dr. Barbara Liskov', room: 'Lab-B3', batch: 'Section A', color: 'bg-yellow-800/80' },
  },
  {
    time: '02:45 PM - 03:45 PM',
    monday: { code: 'CSE321', teacher: 'Dr. Andrew Tanenbaum', room: 'A-206', batch: 'Section A', color: 'bg-blue-800/80' },
    tuesday: { code: 'CSE322', teacher: 'Dr. Larry Page', room: 'B-110', batch: 'Section A', color: 'bg-indigo-800/80' },
    wednesday: { code: 'CSE323', teacher: 'Dr. Sergey Brin', room: 'C-306', batch: 'Section A', color: 'bg-cyan-800/80' },
    thursday: { code: 'CSE324', teacher: 'Dr. Mark Zuckerberg', room: 'A-207', batch: 'Section A', color: 'bg-teal-800/80' },
    friday: { code: 'CSE325', teacher: 'Dr. Jeff Dean', room: 'B-111', batch: 'Section A', color: 'bg-green-800/80' },
  },
];

export default function TimetablePage() {
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Timetable" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">View the current timetable for classes.</p>

          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold mb-6">Current Timetable (CSE - Year 1)</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 w-32">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Monday</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Tuesday</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Wednesday</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Thursday</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {timetableData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm font-medium text-gray-300">{row.time}</td>
                      <td className="py-3 px-2">{row.monday && <ClassCard data={row.monday} />}</td>
                      <td className="py-3 px-2">{row.tuesday && <ClassCard data={row.tuesday} />}</td>
                      <td className="py-3 px-2">{row.wednesday && <ClassCard data={row.wednesday} />}</td>
                      <td className="py-3 px-2">{row.thursday && <ClassCard data={row.thursday} />}</td>
                      <td className="py-3 px-2">{row.friday && <ClassCard data={row.friday} />}</td>
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

function ClassCard({ data }: any) {
  return (
    <div className={`${data.color} border border-gray-600 rounded-lg p-3 text-xs min-h-[80px] flex flex-col justify-between`}>
      <div className="font-semibold text-white mb-1">{data.code}</div>
      <div className="text-gray-200 text-[10px] mb-1">{data.teacher}</div>
      <div className="flex items-center justify-between text-gray-300 text-[10px]">
        <span>{data.room}</span>
        <span className="bg-black/40 px-1.5 py-0.5 rounded">{data.batch}</span>
      </div>
    </div>
  );
}
