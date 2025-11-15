import Link from 'next/link';
import { Calendar, Users, BookOpen, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-headline font-bold text-primary-700">
              Timetable Scheduler
            </h1>
            <Link 
              href="/login"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-headline font-bold text-gray-900 mb-4">
            Smart Class Scheduling for Higher Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered timetable generation that maximizes resource utilization, 
            minimizes conflicts, and adapts to NEP 2020 requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Optimized Scheduling"
            description="Generate conflict-free timetables with maximum resource utilization"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Faculty Management"
            description="Balance workload and track availability across departments"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Multi-Department"
            description="Support for multiple departments, shifts, and elective courses"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="Real-time Updates"
            description="Dynamic adjustments for leaves, special classes, and changes"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-3xl font-headline font-bold text-gray-900 mb-6">
            Key Features
          </h3>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Maximized classroom and laboratory utilization
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Minimized workload distribution
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Multiple optimized timetable options
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Conflict detection and resolution
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Review and approval workflow
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Support for special slots and fixed classes
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-headline font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
