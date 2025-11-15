'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';

export default function FacultyDashboard() {
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
        <Header title="Faculty Dashboard" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome, Dr. Faculty!</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Students" value="214" subtitle="Across all batches" />
            <StatCard icon={<Calendar />} title="Classes Today" value="4" subtitle="2 lectures, 2 labs" />
            <StatCard icon={<FileText />} title="Pending Evaluations" value="12" subtitle="Assignments to grade" />
            <StatCard icon={<TrendingUp />} title="Avg. Attendance" value="91%" subtitle="This semester" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                <ClassItem time="09:00 - 10:00" subject="Data Structures" batch="Section A" room="102" />
                <ClassItem time="10:00 - 11:00" subject="Data Structures" batch="Section B" room="103" />
                <ClassItem time="14:00 - 16:00" subject="DS Lab" batch="Section A" room="Lab-A" />
                <ClassItem time="16:00 - 18:00" subject="DS Lab" batch="Section B" room="Lab-B" />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Class Performance</h3>
              <div className="space-y-4">
                <ClassPerf batch="Section A" attendance={92} avgScore={88} />
                <ClassPerf batch="Section B" attendance={89} avgScore={85} />
                <ClassPerf batch="Section C" attendance={90} avgScore={84} />
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <ActivityItem 
                action="Attendance marked" 
                details="Section A - Data Structures" 
                time="2 hours ago" 
              />
              <ActivityItem 
                action="Assignment graded" 
                details="Assignment 3 - 45 submissions" 
                time="5 hours ago" 
              />
              <ActivityItem 
                action="Class completed" 
                details="Section B - Algorithms" 
                time="Yesterday" 
              />
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

function ClassItem({ time, subject, batch, room }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{subject}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="text-xs text-gray-400">{batch}</div>
      <div className="text-xs text-gray-500">Room: {room}</div>
    </div>
  );
}

function ClassPerf({ batch, attendance, avgScore }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
      <div className="font-medium mb-3">{batch}</div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400 mb-1">Attendance</div>
          <div className="text-lg font-bold text-green-500">{attendance}%</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Avg Score</div>
          <div className="text-lg font-bold text-primary-500">{avgScore}%</div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ action, details, time }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div>
        <div className="font-medium text-sm">{action}</div>
        <div className="text-xs text-gray-400">{details}</div>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
}
