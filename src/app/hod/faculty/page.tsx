'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';

const facultyData = [
  { 
    id: '1', 
    name: 'Dr. Margaret Hamilton', 
    dept: 'Computer Science & Engineering',
    email: 'hamilton@college.edu',
    subjects: ['Software Engineering', 'Software Testing'],
    classes: 5,
    students: 215,
    experience: '15 years',
    rating: 4.8
  },
  { 
    id: '2', 
    name: 'Dr. Tim Berners-Lee', 
    dept: 'Computer Science & Engineering',
    email: 'berners@college.edu',
    subjects: ['Web Technologies', 'Internet Protocols'],
    classes: 4,
    students: 172,
    experience: '20 years',
    rating: 4.9
  },
  { 
    id: '3', 
    name: 'Dr. Andrew Ng', 
    dept: 'Computer Science & Engineering',
    email: 'ng@college.edu',
    subjects: ['Machine Learning', 'Deep Learning'],
    classes: 6,
    students: 240,
    experience: '18 years',
    rating: 4.9
  },
  { 
    id: '4', 
    name: 'Dr. Werner Vogels', 
    dept: 'Computer Science & Engineering',
    email: 'vogels@college.edu',
    subjects: ['Cloud Computing', 'Distributed Systems'],
    classes: 5,
    students: 205,
    experience: '22 years',
    rating: 4.7
  },
  { 
    id: '5', 
    name: 'Dr. Bruce Schneier', 
    dept: 'Computer Science & Engineering',
    email: 'schneier@college.edu',
    subjects: ['Cyber Security', 'Cryptography'],
    classes: 4,
    students: 180,
    experience: '25 years',
    rating: 4.8
  },
  { 
    id: '6', 
    name: 'Dr. Geoffrey Hinton', 
    dept: 'Computer Science & Engineering',
    email: 'hinton@college.edu',
    subjects: ['Artificial Intelligence', 'Neural Networks'],
    classes: 5,
    students: 200,
    experience: '30 years',
    rating: 5.0
  },
];

export default function HODFacultyPage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState(facultyData);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalFaculty = faculty.length;
  const totalClasses = faculty.reduce((sum, f) => sum + f.classes, 0);
  const totalStudents = faculty.reduce((sum, f) => sum + f.students, 0);
  const avgRating = (faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length).toFixed(1);

  return (
    <div className="flex">
      <Sidebar userRole="hod" />
      
      <div className="flex-1 ml-64">
        <Header title="Faculty Management" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Department Faculty</h2>
            <p className="text-gray-400">Computer Science & Engineering Department</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users />} title="Total Faculty" value={totalFaculty.toString()} subtitle="Active members" />
            <StatCard icon={<Calendar />} title="Total Classes" value={totalClasses.toString()} subtitle="Per week" />
            <StatCard icon={<BookOpen />} title="Total Students" value={totalStudents.toString()} subtitle="Enrolled" />
            <StatCard icon={<TrendingUp />} title="Avg. Rating" value={avgRating} subtitle="Faculty performance" />
          </div>

          <div className="card-dark p-6">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search faculty by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-600"
              />
            </div>

            <div className="space-y-4">
              {filteredFaculty.map((member) => (
                <FacultyCard key={member.id} {...member} />
              ))}
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

function FacultyCard({ name, email, subjects, classes, students, experience, rating }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
            👨‍🏫
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-400">{email}</p>
            <p className="text-xs text-gray-500 mt-1">{experience} experience</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-yellow-500">★</span>
            <span className="text-lg font-bold">{rating}</span>
          </div>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-[#1a1a1a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Classes/Week</div>
          <div className="text-xl font-bold">{classes}</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Students</div>
          <div className="text-xl font-bold">{students}</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Subjects</div>
          <div className="text-xl font-bold">{subjects.length}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">Teaching Subjects:</div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-primary-600/10 text-primary-500 rounded text-xs">
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          View Schedule
        </button>
        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          View Performance
        </button>
      </div>
    </div>
  );
}
