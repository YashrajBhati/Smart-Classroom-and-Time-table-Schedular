'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { FileText, Clock, CheckCircle, Upload, File } from 'lucide-react';

const initialAssignments = [
  { id: '1', title: 'Data Structures - Assignment 3', subject: 'Data Structures', dueDate: 'Tomorrow', status: 'pending', marks: '20' },
  { id: '2', title: 'Algorithms - Quiz 2', subject: 'Algorithms', dueDate: 'Today', status: 'pending', marks: '10' },
  { id: '3', title: 'Database Systems - Project 1', subject: 'Database Systems', dueDate: '3 days', status: 'pending', marks: '30' },
  { id: '4', title: 'Operating Systems - Lab Report', subject: 'Operating Systems', dueDate: 'Submitted', status: 'completed', marks: '15', score: '14' },
];

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      if (user.role !== 'student') {
        router.push('/login');
      }
    }

    // Load assignments from localStorage, but keep initial ones if nothing saved
    const savedAssignments = localStorage.getItem('studentAssignments');
    if (savedAssignments) {
      try {
        const parsed = JSON.parse(savedAssignments);
        if (parsed && parsed.length > 0) {
          setAssignments(parsed);
        }
      } catch (error) {
        console.error('Error loading assignments:', error);
        // Keep initial assignments if there's an error
      }
    }
  }, [router]);

  const handleSubmitClick = (assignment: any) => {
    console.log('Opening modal for assignment:', assignment);
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    // Update assignment status
    const updatedAssignments = assignments.map(a => 
      a.id === selectedAssignment.id 
        ? { ...a, status: 'completed', submittedFile: file.name, submittedAt: new Date().toISOString(), comments }
        : a
    );

    setAssignments(updatedAssignments);
    localStorage.setItem('studentAssignments', JSON.stringify(updatedAssignments));

    // Reset form
    setFile(null);
    setComments('');
    setIsModalOpen(false);
    alert('Assignment submitted successfully!');
  };

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;

  return (
    <div className="flex">
      <Sidebar userRole="student" />
      
      <div className="flex-1 ml-64">
        <Header title="Assignments" />
        
        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">My Assignments</h2>
            <p className="text-gray-400">Track and submit your assignments</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard icon={<Clock />} title="Pending" value={pendingCount.toString()} subtitle="Due this week" />
            <StatCard icon={<CheckCircle />} title="Completed" value={completedCount.toString()} subtitle="This semester" />
            <StatCard icon={<FileText />} title="Total" value={assignments.length.toString()} subtitle="All assignments" />
          </div>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id}
                {...assignment}
                onSubmit={() => handleSubmitClick(assignment)}
              />
            ))}
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit Assignment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-1">{selectedAssignment?.title}</h4>
            <p className="text-sm text-gray-400">{selectedAssignment?.subject}</p>
            <p className="text-xs text-gray-500 mt-2">Due: {selectedAssignment?.dueDate}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload File *</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.zip,.rar"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 w-full bg-[#0a0a0a] border-2 border-dashed border-gray-800 rounded-lg px-4 py-8 cursor-pointer hover:border-primary-600 transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-gray-400">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, ZIP, RAR (Max 10MB)</p>
          </div>

          {file && (
            <div className="bg-primary-600/10 border border-primary-600 rounded-lg p-3 flex items-center gap-3">
              <File className="w-5 h-5 text-primary-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-400 text-sm"
              >
                Remove
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Comments (Optional)</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-600 min-h-[100px]"
              placeholder="Add any comments or notes about your submission..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setFile(null);
                setComments('');
              }}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Submit Assignment
            </button>
          </div>
        </form>
      </Modal>
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

function AssignmentCard({ title, subject, dueDate, status, marks, score, onSubmit }: any) {
  return (
    <div className="card-dark p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{subject}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'pending' 
            ? 'bg-yellow-500/10 text-yellow-500' 
            : 'bg-green-500/10 text-green-500'
        }`}>
          {status === 'pending' ? 'Pending' : 'Submitted'}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-400">Due: {dueDate}</span>
        <span className="text-gray-400">
          {score ? `Score: ${score}/${marks}` : `Max Marks: ${marks}`}
        </span>
      </div>
      {status === 'pending' && (
        <button 
          onClick={onSubmit}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" />
          Submit Assignment
        </button>
      )}
      {status === 'completed' && (
        <div className="bg-green-500/10 border border-green-500 rounded-lg p-3 text-center">
          <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
          <span className="text-sm text-green-500 font-medium">Assignment Submitted</span>
        </div>
      )}
    </div>
  );
}
