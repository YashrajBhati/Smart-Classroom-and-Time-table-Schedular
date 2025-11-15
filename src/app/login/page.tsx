'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, User, Lock } from 'lucide-react';

// Demo credentials for each role
const demoCredentials = {
  student: { username: 'student_demo', password: 'student123' },
  faculty: { username: 'faculty_demo', password: 'faculty123' },
  hod: { username: 'hod_demo', password: 'hod123' },
  admin: { username: 'admin_demo', password: 'admin123' },
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: 'student_demo',
    password: 'student123',
    role: 'student',
  });

  // Auto-fill credentials when role changes
  useEffect(() => {
    const credentials = demoCredentials[formData.role as keyof typeof demoCredentials];
    setFormData(prev => ({
      ...prev,
      username: credentials.username,
      password: credentials.password,
    }));
  }, [formData.role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credentials
    const expectedCredentials = demoCredentials[formData.role as keyof typeof demoCredentials];
    if (formData.username !== expectedCredentials.username || formData.password !== expectedCredentials.password) {
      alert('Invalid credentials! Please use the demo credentials provided.');
      return;
    }
    
    // Store user data in localStorage
    const userData = {
      username: formData.username,
      role: formData.role,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect based on role
    switch (formData.role) {
      case 'student':
        router.push('/student/dashboard');
        break;
      case 'faculty':
        router.push('/faculty/dashboard');
        break;
      case 'hod':
        router.push('/hod/dashboard');
        break;
      case 'admin':
        router.push('/dashboard');
        break;
      default:
        router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">Smart Scheduler</span>
          </div>
          <p className="text-gray-400">Sign in to your account</p>
          <div className="mt-4 p-3 bg-primary-600/10 border border-primary-600/30 rounded-lg">
            <p className="text-xs text-primary-400 font-medium">Demo credentials auto-filled based on role selection</p>
          </div>
        </div>

        <div className="card-dark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary-600"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-primary-600"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-600"
              >
                <option value="student">Student (student_demo / student123)</option>
                <option value="faculty">Faculty (faculty_demo / faculty123)</option>
                <option value="hod">HOD (hod_demo / hod123)</option>
                <option value="admin">Admin (admin_demo / admin123)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
