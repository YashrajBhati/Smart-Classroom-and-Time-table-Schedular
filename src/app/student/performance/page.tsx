'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';

export default function StudentPerformancePage() {
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

  const subjects = [
    { name: 'Software Engineering', score: 92, grade: 'A+', credits: 4 },
    { name: 'Web Technologies', score: 88, grade: 'A', credits: 3 },
    { name: 'Machine Learning', score: 85, grade: 'A', credits: 4 },
    { name: 'Cloud Computing', score: 90, grade: 'A+', credits: 3 },
    { name: 'Cyber Security', score: 87, grade: 'A', credits: 3 },
    { name: 'Artificial Intelligence', score: 91, grade: 'A+', credits: 4 },
    { name: 'Mobile App Development', score: 86, grade: 'A', credits: 3 },
    { name: 'Data Science', score: 89, grade: 'A', credits: 4 },
  ];

  const cgpa = 8.8;
  const totalCredits = 28;

  return (
    <div className="flex">
      <Sidebar userRole="student" />
      
      <div className="flex-1 ml-64">
        <Header title="Performance" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Academic Performance</h2>
            <p className="text-gray-400">Semester 3 - Computer Science & Engineering</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<TrendingUp />} title="CGPA" value={cgpa.toFixed(2)} subtitle="Overall performance" />
            <StatCard icon={<Award />} title="Total Credits" value={totalCredits.toString()} subtitle="This semester" />
            <StatCard icon={<Target />} title="Class Rank" value="12/120" subtitle="In your batch" />
            <StatCard icon={<BookOpen />} title="Subjects" value={subjects.length.toString()} subtitle="Enrolled" />
          </div>

          <div className="card-dark p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Subject-wise Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium text-center">Credits</th>
                    <th className="pb-3 font-medium text-center">Score</th>
                    <th className="pb-3 font-medium text-center">Grade</th>
                    <th className="pb-3 font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4 font-medium">{subject.name}</td>
                      <td className="py-4 text-center text-gray-400">{subject.credits}</td>
                      <td className="py-4 text-center font-semibold">{subject.score}%</td>
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${
                          subject.grade === 'A+' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {subject.grade}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-600 rounded-full" 
                              style={{ width: `${subject.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-400 min-w-[45px]">{subject.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Semester Progress</h3>
              <div className="space-y-4">
                <ProgressItem label="Attendance" value={92} color="bg-green-600" />
                <ProgressItem label="Assignments Completed" value={85} color="bg-blue-600" />
                <ProgressItem label="Lab Work" value={95} color="bg-purple-600" />
                <ProgressItem label="Project Work" value={88} color="bg-cyan-600" />
              </div>
            </div>

            <div className="card-dark p-6">
              <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
              <div className="space-y-3">
                <GradeItem grade="A+" count={3} total={8} />
                <GradeItem grade="A" count={5} total={8} />
                <GradeItem grade="B+" count={0} total={8} />
                <GradeItem grade="B" count={0} total={8} />
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

function ProgressItem({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="text-gray-400">{value}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function GradeItem({ grade, count, total }: any) {
  const percentage = (count / total) * 100;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold w-12">{grade}</span>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden w-48">
          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <span className="text-sm text-gray-400">{count} subjects</span>
    </div>
  );
}
