'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, Building2, BookOpen, Network } from 'lucide-react';

export default function DashboardPage() {

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Dashboard" />
        
        <main className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Faculty" value="18" subtitle="Base system data" />
            <StatCard icon={<Building2 />} title="Total Classrooms" value="17" subtitle="Base system data" />
            <StatCard icon={<BookOpen />} title="Total Subjects" value="18" subtitle="Base system data" />
            <StatCard icon={<Network />} title="Total Departments" value="9" subtitle="From system data" />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 card-dark p-6">
              <h3 className="text-lg font-semibold mb-6">Resource Usage</h3>
              <p className="text-sm text-gray-400 mb-4">A summary of resource usage by department.</p>
              
              {/* Simple Bar Chart */}
              <div className="space-y-6 mt-8">
                <BarItem label="CSE" percentage={80} color="bg-blue-600" />
                <BarItem label="ECE" percentage={60} color="bg-blue-600" />
                <BarItem label="ME" percentage={50} color="bg-blue-600" />
                <BarItem label="CE" percentage={40} color="bg-blue-600" />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-6">Departments</h3>
              <p className="text-sm text-gray-400 mb-4">List of all engineering departments.</p>
              
              <div className="space-y-3">
                <DeptItem name="Computer Science & Engineering" code="CSE" />
                <DeptItem name="Electronics & Communication" code="ECE" />
                <DeptItem name="Mechanical Engineering" code="ME" />
                <DeptItem name="Civil Engineering" code="CE" />
                <DeptItem name="Information Technology" code="IT" />
                <DeptItem name="Electrical & Electronics Engineering" code="EEE" />
                <DeptItem name="Aerospace Engineering" code="AE" />
                <DeptItem name="Chemical Engineering" code="CHE" />
                <DeptItem name="Biomedical Engineering" code="BME" />
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

function DeptItem({ name, code }: { name: string; code: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800">
      <span className="text-sm">{name}</span>
      <span className="text-xs text-gray-500 bg-[#2a2a2a] px-2 py-1 rounded">{code}</span>
    </div>
  );
}

function BarItem({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full h-8 bg-gray-800 rounded-lg overflow-hidden">
        <div 
          className={`h-full ${color} rounded-lg transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
