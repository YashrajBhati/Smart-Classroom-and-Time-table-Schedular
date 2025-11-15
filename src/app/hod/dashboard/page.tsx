'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, GraduationCap, Calendar, TrendingUp } from 'lucide-react';

export default function HODDashboard() {
  const router = useRouter();
  const [hod, setHod] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'hod') {
        router.push('/login');
      }
      setHod(user);
    }
  }, [router]);

  if (!hod) return null;

  return (
    <div className="flex">
      <Sidebar userRole="hod" />
      
      <div className="flex-1 ml-64">
        <Header title="HOD Dashboard" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome, Head of Department!</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Faculty" value="18" subtitle="Active members" />
            <StatCard icon={<GraduationCap />} title="Total Students" value="450" subtitle="All batches" />
            <StatCard icon={<Calendar />} title="Active Courses" value="24" subtitle="This semester" />
            <StatCard icon={<TrendingUp />} title="Dept. Performance" value="89%" subtitle="Overall average" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Faculty Overview</h3>
              <div className="space-y-3">
                <FacultyItem name="Dr. Alan Turing" courses={3} students={135} />
                <FacultyItem name="Dr. Grace Hopper" courses={2} students={90} />
                <FacultyItem name="Dr. Ada Lovelace" courses={3} students={135} />
                <FacultyItem name="Dr. Tim Berners-Lee" courses={2} students={90} />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Department Statistics</h3>
              <div className="space-y-4">
                <StatItem label="Average Attendance" value="91%" />
                <StatItem label="Pass Percentage" value="94%" />
                <StatItem label="Placement Rate" value="87%" />
                <StatItem label="Research Papers" value="24" />
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

function FacultyItem({ name, courses, students }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3">
      <div className="font-medium mb-2">{name}</div>
      <div className="flex gap-4 text-xs text-gray-400">
        <span>{courses} Courses</span>
        <span>{students} Students</span>
      </div>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-xl font-bold text-primary-500">{value}</span>
    </div>
  );
}
