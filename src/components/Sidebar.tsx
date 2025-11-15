'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Building2, BookOpen, GraduationCap, Settings, Award, FileText, TrendingUp } from 'lucide-react';

export default function Sidebar({ userRole = 'admin' }: { userRole?: string }) {
  const pathname = usePathname();

  const getMenuItems = () => {
    if (userRole === 'student') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/student/dashboard' },
        { icon: Calendar, label: 'My Timetable', href: '/student/timetable' },
        { icon: Award, label: 'Performance', href: '/student/performance' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
      ];
    }
    
    if (userRole === 'faculty') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/faculty/dashboard' },
        { icon: Calendar, label: 'My Schedule', href: '/faculty/schedule' },
        { icon: Users, label: 'My Classes', href: '/faculty/classes' },
        { icon: FileText, label: 'Assignments', href: '/faculty/assignments' },
        { icon: Award, label: 'Attendance', href: '/faculty/attendance' },
      ];
    }
    
    if (userRole === 'hod') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/hod/dashboard' },
        { icon: Users, label: 'Faculty', href: '/hod/faculty' },
        { icon: GraduationCap, label: 'Students', href: '/hod/students' },
        { icon: Calendar, label: 'Timetables', href: '/hod/timetables' },
        { icon: TrendingUp, label: 'Performance', href: '/hod/performance' },
      ];
    }
    
    // Admin menu
    return [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Calendar, label: 'Timetable', href: '/timetable' },
      { icon: Users, label: 'Faculty', href: '/faculty' },
      { icon: Building2, label: 'Classrooms', href: '/classrooms' },
      { icon: BookOpen, label: 'Subjects', href: '/subjects' },
      { icon: GraduationCap, label: 'Batches', href: '/batches' },
      { icon: Settings, label: 'Settings', href: '/settings' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-black border-r border-gray-800 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Smart Scheduler</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
