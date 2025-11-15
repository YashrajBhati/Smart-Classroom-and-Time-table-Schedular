export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar';
  department?: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  maxClassesPerDay: number;
  avgLeavesPerMonth: number;
  unavailableSlots?: TimeSlot[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: number;
  type: 'theory' | 'practical' | 'elective';
  classesPerWeek: number;
  duration: number; // in minutes
  requiresLab: boolean;
}

export interface Batch {
  id: string;
  name: string;
  department: string;
  semester: number;
  studentCount: number;
  subjects: string[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  period: number;
}

export interface ScheduleEntry {
  id: string;
  batchId: string;
  subjectId: string;
  facultyId: string;
  classroomId: string;
  timeSlot: TimeSlot;
  isSpecialClass?: boolean;
}

export interface Timetable {
  id: string;
  name: string;
  semester: string;
  department: string;
  schedule: ScheduleEntry[];
  createdAt: Date;
  status: 'draft' | 'pending' | 'approved';
  conflicts?: Conflict[];
}

export interface Conflict {
  type: 'faculty' | 'classroom' | 'batch';
  description: string;
  entries: string[];
}

export interface ScheduleConstraints {
  maxClassesPerDay: number;
  workingDays: string[];
  periodsPerDay: number;
  periodDuration: number;
  breakSlots: TimeSlot[];
  specialSlots: ScheduleEntry[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hod' | 'coordinator';
  department?: string;
}
