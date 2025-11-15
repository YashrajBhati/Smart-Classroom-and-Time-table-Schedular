'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { Users, TrendingUp, UserCheck, X, Check } from 'lucide-react';

const studentsList = [
  { id: '1', name: 'John Doe', rollNo: 'CS001', present: false },
  { id: '2', name: 'Jane Smith', rollNo: 'CS002', present: false },
  { id: '3', name: 'Mike Johnson', rollNo: 'CS003', present: false },
  { id: '4', name: 'Sarah Williams', rollNo: 'CS004', present: false },
  { id: '5', name: 'David Brown', rollNo: 'CS005', present: false },
  { id: '6', name: 'Emily Davis', rollNo: 'CS006', present: false },
  { id: '7', name: 'Chris Wilson', rollNo: 'CS007', present: false },
  { id: '8', name: 'Lisa Anderson', rollNo: 'CS008', present: false },
];

const classesData = [
  { id: '1', batch: 'Section A', subject: 'Data Structures (DS201)', students: 45, avgScore: 88, attendance: 92 },
  { id: '2', batch: 'Section B', subject: 'Data Structures (DS201)', students: 42, avgScore: 85, attendance: 89 },
  { id: '3', batch: 'Section A', subject: 'Algorithms (ALGO202)', students: 45, avgScore: 90, attendance: 94 },
  { id: '4', batch: 'Section B', subject: 'Algorithms (ALGO202)', students: 42, avgScore: 86, attendance: 88 },
  { id: '5', batch: 'Section C', subject: 'Data Structures (DS201)', students: 40, avgScore: 84, attendance: 90 },
];

export default function FacultyClassesPage() {
  const router = useRouter();
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [attendanceList, setAttendanceList] = useState(studentsList);

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

  const handleMarkAttendance = (classData: any) => {
    setSelectedClass(classData);
    setAttendanceList(studentsList.map(s => ({ ...s, present: false })));
    setIsAttendanceModalOpen(true);
  };

  const handleViewDetails = (classData: any) => {
    setSelectedClass(classData);
    setIsDetailsModalOpen(true);
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceList(attendanceList.map(s => 
      s.id === studentId ? { ...s, present: !s.present } : s
    ));
  };

  const markAllPresent = () => {
    setAttendanceList(attendanceList.map(s => ({ ...s, present: true })));
  };

  const markAllAbsent = () => {
    setAttendanceList(attendanceList.map(s => ({ ...s, present: false })));
  };

  const handleSubmitAttendance = () => {
    const presentCount = attendanceList.filter(s => s.present).length;
    const totalCount = attendanceList.length;
    
    alert(`Attendance marked successfully!\nPresent: ${presentCount}/${totalCount}`);
    setIsAttendanceModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar userRole="faculty" />
      
      <div className="flex-1 ml-64">
        <Header title="My Classes" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Class Management</h2>
            <p className="text-gray-400">Manage your classes and student performance</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Students" value="214" subtitle="Across all batches" />
            <StatCard icon={<TrendingUp />} title="Avg. Performance" value="87%" subtitle="Class average" />
            <StatCard icon={<Users />} title="Active Batches" value="5" subtitle="This semester" />
          </div>

          <div className="space-y-4">
            {classesData.map((classItem) => (
              <ClassCard 
                key={classItem.id}
                {...classItem}
                onMarkAttendance={() => handleMarkAttendance(classItem)}
                onViewDetails={() => handleViewDetails(classItem)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Mark Attendance Modal */}
      <Modal isOpen={isAttendanceModalOpen} onClose={() => setIsAttendanceModalOpen(false)} title="Mark Attendance">
        <div className="space-y-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-1">{selectedClass?.batch} - {selectedClass?.subject}</h4>
            <p className="text-sm text-gray-400">Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={markAllPresent}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Absent
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {attendanceList.map((student) => (
              <div
                key={student.id}
                onClick={() => toggleAttendance(student.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  student.present 
                    ? 'bg-green-600/20 border border-green-600' 
                    : 'bg-[#0a0a0a] border border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    student.present ? 'bg-green-600' : 'bg-gray-800'
                  }`}>
                    {student.present ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.rollNo}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  student.present 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {student.present ? 'Present' : 'Absent'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={() => setIsAttendanceModalOpen(false)}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitAttendance}
              className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Class Details">
        <div className="space-y-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-xl mb-2">{selectedClass?.batch}</h4>
            <p className="text-gray-400 mb-4">{selectedClass?.subject}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Students</p>
                <p className="text-2xl font-bold">{selectedClass?.students}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Average Score</p>
                <p className="text-2xl font-bold text-primary-500">{selectedClass?.avgScore}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-green-500">{selectedClass?.attendance}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Classes Held</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
            <h5 className="font-semibold mb-3">Recent Performance</h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Assignment 1</span>
                  <span className="text-gray-400">85%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Assignment 2</span>
                  <span className="text-gray-400">90%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mid-term Exam</span>
                  <span className="text-gray-400">88%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDetailsModalOpen(false)}
            className="w-full px-4 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
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

function ClassCard({ batch, subject, students, avgScore, attendance, onMarkAttendance, onViewDetails }: any) {
  return (
    <div className="card-dark p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{batch}</h3>
          <p className="text-sm text-gray-400">{subject}</p>
        </div>
        <span className="px-3 py-1 bg-primary-600/10 text-primary-500 rounded-full text-xs font-medium">
          {students} Students
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-2">Average Score</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 rounded-full" style={{ width: `${avgScore}%` }}></div>
            </div>
            <span className="text-lg font-bold">{avgScore}%</span>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-2">Attendance</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: `${attendance}%` }}></div>
            </div>
            <span className="text-lg font-bold">{attendance}%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onMarkAttendance}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <UserCheck className="w-4 h-4" />
          Mark Attendance
        </button>
        <button 
          onClick={onViewDetails}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
