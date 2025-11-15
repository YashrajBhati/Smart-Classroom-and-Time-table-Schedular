'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Users, TrendingUp, Lightbulb, Thermometer, Volume2, AlertTriangle } from 'lucide-react';

export default function ClassroomsPage() {
  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Classroom Management" />
        
        <main className="p-8">
          <p className="text-gray-400 text-sm mb-8">Monitoring and analytics for effective classroom and resource management.</p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Attendance Rate</span>
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <div className="text-3xl font-bold mb-4">93.4%</div>
              <p className="text-xs text-gray-500 mb-4">Average attendance across all classes this week.</p>
              <div className="h-16 flex items-end gap-2">
                {[85, 90, 88, 92, 94, 93, 95].map((val, i) => (
                  <div key={i} className="flex-1 bg-primary-600 rounded-t" style={{ height: `${val}%` }}></div>
                ))}
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Student Engagement</span>
                <TrendingUp className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mb-4">Activity and participation metrics.</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Participation</span>
                    <span className="text-gray-500">85%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Digital Tools</span>
                    <span className="text-gray-500">76%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Quiz Responses</span>
                    <span className="text-gray-500">92%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Resource Utilization</span>
                <Lightbulb className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mb-4">Usage frequency for key resources.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-primary-600 rounded"></div>
                  <span className="text-xs text-gray-500 w-20">Classrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-yellow-600 rounded" style={{ width: '70%' }}></div>
                  <span className="text-xs text-gray-500 w-20">Projectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-orange-600 rounded" style={{ width: '50%' }}></div>
                  <span className="text-xs text-gray-500 w-20">Labs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Scheduling Conflicts</span>
                <AlertTriangle className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mb-4">Clashes detected and resolution efficiency.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-gray-500">Conflicts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-xs text-gray-500">Resolved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">83%</div>
                  <div className="text-xs text-gray-500">Resolution Rate</div>
                </div>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Satisfaction Scores</span>
                <TrendingUp className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mb-4">Recent survey ratings from faculty and students.</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Faculty</span>
                    <span className="text-gray-500">4.5 / 5</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Students</span>
                    <span className="text-gray-500">4.2 / 5</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Communication</span>
                <Volume2 className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mb-4">Effectiveness of notifications and alerts.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-xs text-gray-500">Sent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs text-gray-500">Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">99%</div>
                  <div className="text-xs text-gray-500">On Time</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Learning Outcomes</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Assessment and completion metrics.</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Assignments Completion</span>
                    <span className="text-gray-500">92%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Tests Completion</span>
                    <span className="text-gray-500">81%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">IT Infrastructure</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Uptime and availability of critical systems.</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">99.9%</div>
                  <div className="text-xs text-gray-500">Network</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">99.5%</div>
                  <div className="text-xs text-gray-500">LMS</div>
                </div>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Environment Quality</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Average classroom environmental data.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">22°C</div>
                  <div className="text-xs text-gray-500">Temp</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-xs text-gray-500">Lighting</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">45dB</div>
                  <div className="text-xs text-gray-500">Noise</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-dark p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Discipline & Behavior Records</h3>
            <p className="text-xs text-gray-500 mb-4">Recent incidents and interventions logged.</p>
            
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-sm">Wifi Down</td>
                  <td className="py-3 text-sm text-gray-400">201</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">Resolved</span>
                  </td>
                  <td className="py-3 text-sm text-gray-400">2 hours ago</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-sm">Noise Complaint</td>
                  <td className="py-3 text-sm text-gray-400">103</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs">Pending</span>
                  </td>
                  <td className="py-3 text-sm text-gray-400">3 hours ago</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-sm">Projector Issue</td>
                  <td className="py-3 text-sm text-gray-400">101</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">Resolved</span>
                  </td>
                  <td className="py-3 text-sm text-gray-400">Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
