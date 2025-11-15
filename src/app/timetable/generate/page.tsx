'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Download } from 'lucide-react';

export default function GenerateTimetablePage() {
  const [loading, setLoading] = useState(false);
  const [timetables, setTimetables] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    department: '',
    semester: '',
    periodsPerDay: 6,
    workingDays: 5,
    periodDuration: 60,
    numOptions: 3,
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setTimetables(data.timetables || []);
    } catch (error) {
      console.error('Error generating timetable:', error);
      alert('Failed to generate timetable. Please check your Gemini API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-headline font-bold text-primary-700">
              Generate Timetable
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-headline font-semibold mb-6">Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periods Per Day
                  </label>
                  <input
                    type="number"
                    value={formData.periodsPerDay}
                    onChange={(e) => setFormData({ ...formData, periodsPerDay: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Days
                  </label>
                  <input
                    type="number"
                    value={formData.workingDays}
                    onChange={(e) => setFormData({ ...formData, workingDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.periodDuration}
                    onChange={(e) => setFormData({ ...formData, periodDuration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Options
                  </label>
                  <input
                    type="number"
                    value={formData.numOptions}
                    onChange={(e) => setFormData({ ...formData, numOptions: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    min="1"
                    max="5"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  {loading ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {loading && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating optimized timetables...</p>
              </div>
            )}

            {!loading && timetables.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-headline font-semibold text-gray-900 mb-2">
                  Ready to Generate
                </h3>
                <p className="text-gray-600">
                  Configure your parameters and click Generate to create optimized timetables
                </p>
              </div>
            )}

            {!loading && timetables.length > 0 && (
              <div className="space-y-6">
                {timetables.map((tt, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-headline font-semibold">
                          Option {idx + 1}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Utilization: {tt.utilization}% | Conflicts: {tt.conflicts}
                        </p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3">Time</th>
                            <th className="text-left py-2 px-3">Monday</th>
                            <th className="text-left py-2 px-3">Tuesday</th>
                            <th className="text-left py-2 px-3">Wednesday</th>
                            <th className="text-left py-2 px-3">Thursday</th>
                            <th className="text-left py-2 px-3">Friday</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tt.schedule?.map((row: any, i: number) => (
                            <tr key={i} className="border-b">
                              <td className="py-2 px-3 font-medium">{row.time}</td>
                              {row.days.map((cell: any, j: number) => (
                                <td key={j} className="py-2 px-3">
                                  {cell && (
                                    <div className="text-xs bg-primary-50 p-2 rounded">
                                      <div className="font-medium">{cell.subject}</div>
                                      <div className="text-gray-600">{cell.faculty}</div>
                                      <div className="text-gray-500">{cell.room}</div>
                                    </div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
