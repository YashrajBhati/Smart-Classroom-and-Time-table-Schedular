'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { TrendingUp, Award, Users, Target } from 'lucide-react';

export default function HODPerformancePage() {
  const router = useRouter();

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

  return (
    <div className="flex">
      <Sidebar userRole="hod" />
      
      <div className="flex-1 ml-64">
        <Header title="Performance Analytics" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Department Performance</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<TrendingUp />} title="Dept. Average" value="8.8" subtitle="CGPA" />
            <StatCard icon={<Award />} title="Pass Rate" value="94%" subtitle="This semester" />
            <StatCard icon={<Users />} title="Placement" value="87%" subtitle="Students placed" />
            <StatCard icon={<Target />} title="Research" value="24" subtitle="Papers published" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Batch Performance</h3>
              <div className="space-y-4">
                <PerformanceBar batch="CSE-3A" cgpa={8.9} />
                <PerformanceBar batch="CSE-3B" cgpa={8.7} />
                <PerformanceBar batch="CSE-3C" cgpa={8.6} />
                <PerformanceBar batch="CSE-4A" cgpa={9.0} />
                <PerformanceBar batch="CSE-4B" cgpa={8.8} />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Faculty Performance</h3>
              <div className="space-y-4">
                <FacultyBar name="Dr. Margaret Hamilton" rating={4.8} />
                <FacultyBar name="Dr. Tim Berners-Lee" rating={4.9} />
                <FacultyBar name="Dr. Andrew Ng" rating={4.9} />
                <FacultyBar name="Dr. Werner Vogels" rating={4.7} />
                <FacultyBar name="Dr. Geoffrey Hinton" rating={5.0} />
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

function PerformanceBar({ batch, cgpa }: any) {
  const percentage = (cgpa / 10) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{batch}</span>
        <span className="text-gray-400">{cgpa} CGPA</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function FacultyBar({ name, rating }: any) {
  const percentage = (rating / 5) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{name}</span>
        <span className="text-gray-400">★ {rating}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
