'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';

export default function StudentDashboard() {
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
        <Header title="Student Dashboard" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome, Student!</h2>
            <p className="text-gray-400">Computer Science & Engineering - Batch A - Semester 3</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<TrendingUp />} title="Overall Performance" value="88%" subtitle="Above class average" />
            <StatCard icon={<Award />} title="Attendance" value="92%" subtitle="Excellent attendance" />
            <StatCard icon={<Calendar />} title="Classes This Week" value="24" subtitle="6 subjects" />
            <StatCard icon={<Clock />} title="Pending Assignments" value="3" subtitle="Due this week" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Timetable</h3>
              <div className="space-y-3">
                <ClassItem time="09:00 - 10:00" subject="Data Structures" teacher="Dr. Ada Lovelace" room="102" />
                <ClassItem time="10:00 - 11:00" subject="Algorithms" teacher="Dr. Alan Turing" room="103" />
                <ClassItem time="11:00 - 12:00" subject="Database Systems" teacher="Dr. Grace Hopper" room="101" />
                <ClassItem time="14:00 - 15:00" subject="Operating Systems Lab" teacher="Dr. Tim Berners-Lee" room="Lab-A" />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
              <div className="space-y-4">
                <SubjectPerf subject="Data Structures" score={92} />
                <SubjectPerf subject="Algorithms" score={88} />
                <SubjectPerf subject="Database Systems" score={85} />
                <SubjectPerf subject="Operating Systems" score={90} />
                <SubjectPerf subject="Computer Networks" score={87} />
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Record</h3>
            <div className="grid grid-cols-6 gap-4">
              <AttendanceCard subject="Data Structures" percentage={95} />
              <AttendanceCard subject="Algorithms" percentage={90} />
              <AttendanceCard subject="Database Systems" percentage={92} />
              <AttendanceCard subject="Operating Systems" percentage={88} />
              <AttendanceCard subject="Computer Networks" percentage={94} />
              <AttendanceCard subject="OS Lab" percentage={100} />
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

function ClassItem({ time, subject, teacher, room }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{subject}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="text-xs text-gray-400">{teacher}</div>
      <div className="text-xs text-gray-500">Room: {room}</div>
    </div>
  );
}

function SubjectPerf({ subject, score }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{subject}</span>
        <span className="text-gray-400">{score}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

function AttendanceCard({ subject, percentage }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold mb-1">{percentage}%</div>
      <div className="text-xs text-gray-400">{subject}</div>
    </div>
  );
}
