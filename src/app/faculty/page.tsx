'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { MoreVertical, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const initialFaculty = [
  { id: '1', name: 'Dr. Alan Turing', dept: 'Computer Science & Engineering', email: 'turing@college.edu', avatar: '👨‍🏫' },
  { id: '2', name: 'Dr. Grace Hopper', dept: 'Computer Science & Engineering', email: 'hopper@college.edu', avatar: '👩‍🏫' },
  { id: '3', name: 'Dr. Nikola Tesla', dept: 'Electrical & Electronics Engineering', email: 'tesla@college.edu', avatar: '👨‍🔬' },
  { id: '4', name: 'Dr. Marie Curie', dept: 'Chemical Engineering', email: 'curie@college.edu', avatar: '👩‍🔬' },
  { id: '5', name: 'Dr. Ada Lovelace', dept: 'Computer Science & Engineering', email: 'lovelace@college.edu', avatar: '👩‍💻' },
  { id: '6', name: 'Dr. Albert Einstein', dept: 'Mechanical Engineering', email: 'einstein@college.edu', avatar: '👨‍🔬' },
  { id: '7', name: 'Dr. Tim Berners-Lee', dept: 'Information Technology', email: 'berners@college.edu', avatar: '👨‍💼' },
  { id: '8', name: 'Dr. Charles Babbage', dept: 'Information Technology', email: 'babbage@college.edu', avatar: '👨‍🏫' },
];

export default function FacultyPage() {
  const { faculty, addFaculty } = useApp();
  const [localFaculty, setLocalFaculty] = useState(initialFaculty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dept: '',
    subjects: '',
    maxClasses: '6',
  });

  // Merge context faculty with local faculty
  const displayFaculty = [...localFaculty, ...faculty];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.dept) {
      alert('Please fill all required fields');
      return;
    }

    const newFaculty = {
      ...formData,
      avatar: '👨‍🏫',
      id: Date.now().toString(),
    };

    // Add to both context and local state
    addFaculty(newFaculty);
    setLocalFaculty([...localFaculty, newFaculty]);
    
    setFormData({
      name: '',
      email: '',
      dept: '',
      subjects: '',
      maxClasses: '6',
    });
    
    setIsModalOpen(false);
    alert('Faculty added successfully!');
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Faculty Management" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">Manage faculty members and their information.</p>

          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Faculty Members</h3>
                <p className="text-sm text-gray-400">A list of all faculty members in the institution.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Faculty
              </button>
            </div>

            <input
              type="text"
              placeholder="Search faculty by name or department..."
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:border-primary-600"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Department</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayFaculty.map((member: any, idx: number) => (
                    <tr key={member.id || idx} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                            {member.avatar || '👨‍🏫'}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-[#2a2a2a] rounded text-xs text-gray-400">
                          {member.dept}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-400">
                        {member.email}
                      </td>
                      <td className="py-4">
                        <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Faculty">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600"
              placeholder="john@college.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department *</label>
            <select
              required
              value={formData.dept}
              onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600"
            >
              <option value="">Select Department</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subjects (comma-separated)</label>
            <input
              type="text"
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600"
              placeholder="Data Structures, Algorithms"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Classes Per Day</label>
            <input
              type="number"
              value={formData.maxClasses}
              onChange={(e) => setFormData({ ...formData, maxClasses: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600"
              min="1"
              max="10"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Add Faculty
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
