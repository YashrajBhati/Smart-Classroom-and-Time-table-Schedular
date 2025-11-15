# Timetable Scheduler

An intelligent timetable scheduling system for higher education institutions, powered by AI.

## Features

### Role-Based Access Control
- **4 User Roles**: Student, Faculty, HOD, Admin/Principal
- **Custom Dashboards**: Each role has tailored views and permissions
- **Secure Authentication**: Role-based access to features and data

### For Students
- View personal timetable
- Track attendance percentage
- Monitor performance across subjects
- View and submit assignments
- Check learning progress

### For Faculty
- Manage teaching schedule
- Mark attendance for classes
- Create and grade assignments
- Track student participation
- View class performance analytics
- Manage learning records

### For HOD
- Oversee all department faculty
- View faculty timetables and photos
- Monitor student performance department-wide
- Analyze batch performance
- Manage faculty workload
- Department-level analytics

### For Admin/Principal
- Full system access
- Manage all HODs and faculties
- AI-powered timetable generation using Google Gemini
- Conflict detection and resolution
- Multi-department support
- Resource allocation
- System-wide reports and analytics

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Fonts**: PT Sans (body), Space Grotesk (headlines)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login Credentials

The system supports 4 user roles with different access levels:

**Student Login:**
- Email: `student@college.edu`
- Password: `student123`
- Access: Personal timetable, attendance, performance, assignments

**Faculty Login:**
- Email: `faculty@college.edu`
- Password: `faculty123`
- Access: Teaching schedule, class management, attendance marking, grading

**HOD Login:**
- Email: `hod@college.edu`
- Password: `hod123`
- Access: Department faculty & student management, performance analytics

**Admin/Principal Login:**
- Email: `admin@college.edu`
- Password: `admin123`
- Access: Full system access, all departments, timetable generation

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-timetable/  # AI timetable generation endpoint
│   ├── dashboard/               # Main dashboard
│   ├── data-input/             # Data management forms
│   ├── login/                  # Authentication
│   ├── timetable/              # Timetable views
│   ├── layout.tsx
│   └── page.tsx
├── types/
│   └── index.ts                # TypeScript interfaces
└── components/                 # Reusable components (to be added)
```

## Key Parameters

The system considers the following parameters for timetable generation:

- Number of classrooms and their capacities
- Faculty availability and workload limits
- Subject requirements (theory/practical/elective)
- Student batch sizes
- Classes per week per subject
- Period duration and daily schedule
- Special slots and fixed classes
- Department and semester constraints

## Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real authentication system
- PDF export functionality
- Email notifications
- Mobile responsive improvements
- Historical data analytics
- Faculty leave management
- Student preference handling

## License

MIT
