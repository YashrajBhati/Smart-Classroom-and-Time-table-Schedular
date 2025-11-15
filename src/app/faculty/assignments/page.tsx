'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { FileText, Clock, CheckCircle, Users } from 'lucide-react';

const assignmentsData = [
  { 
    id: '1', 
    title: 'Software Engineering - Assignment 3', 
    batch: 'CSE-3A', 
    dueDate: 'Tomorrow', 
    submitted: 42, 
    total: 45, 
    status: 'active' 
  },
  { 
    id: '2', 
    title: 'Software Engineering - Quiz 2', 
    batch: 'CSE-3B', 
    dueDate: 'Today', 
    submitted: 38, 
    total: 42, 
    status: 'active' 
  },
  { 
    id: '3', 
    title: 'Distributed Systems - Project 1', 
    batch: 'CSE-4A', 
    dueDate: '3 days', 
    submitted: 35, 
    total: 40, 
    status: 'active' 
  },
  { 
    id: '4', 
    title: 'Software Engineering - Lab Report', 
    batch: 'CSE-3C', 
    dueDate: 'Completed', 
    submitted: 40, 
    total: 40, 
    status: 'completed',
    graded: 40 
  },
  { 
    id: '5', 
    title: 'Distributed Systems - Assignment 2', 
    batch: 'CSE-4B', 
    dueDate: 'Completed', 
    submitted: 38, 
    total: 38, 
    status: 'completed',
    graded: 38 
  },
];

export default function FacultyAssignmentsPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState(assignmentsData);

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

  const activeCount = assignments.filter(a => a.status === 'active').length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submitted, 0);
  const pendingGrading = assignments.filter(a => a.status === 'completed' && !a.graded).length;

  return (
    <div className="flex">
      <Sidebar userRole="faculty" />
      
      <div className="flex-1 ml-64">
        <Header title="Assignments" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Assignment Management</h2>
            <p className="text-gray-400">Track and manage student assignments</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Clock />} title="Active" value={activeCount.toString()} subtitle="Ongoing assignments" />
            <StatCard icon={<CheckCircle />} title="Completed" value={completedCount.toString()} subtitle="Finished assignments" />
            <StatCard icon={<FileText />} title="Total Submissions" value={totalSubmissions.toString()} subtitle="All batches" />
            <StatCard icon={<Users />} title="Pending Grading" value={pendingGrading.toString()} subtitle="Need evaluation" />
          </div>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id}
                {...assignment}
              />
            ))}
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

function AssignmentCard({ title, batch, dueDate, submitted, total, status, graded }: any) {
  const submissionRate = Math.round((submitted / total) * 100);
  
  return (
    <div className="card-dark p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{batch}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'active' 
            ? 'bg-yellow-500/10 text-yellow-500' 
            : 'bg-green-500/10 text-green-500'
        }`}>
          {status === 'active' ? 'Active' : 'Completed'}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Due Date</div>
          <div className="text-sm font-medium">{dueDate}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Submissions</div>
          <div className="text-sm font-medium">{submitted}/{total}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Submission Rate</div>
          <div className="text-sm font-medium">{submissionRate}%</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{submissionRate}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${status === 'active' ? 'bg-yellow-600' : 'bg-green-600'}`}
            style={{ width: `${submissionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-3">
        {status === 'active' && (
          <>
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              View Submissions
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Send Reminder
            </button>
          </>
        )}
        {status === 'completed' && (
          <>
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Grade Submissions
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              View Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}
