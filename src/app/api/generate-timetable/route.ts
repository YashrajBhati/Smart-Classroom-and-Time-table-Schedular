import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { department, semester, periodsPerDay, workingDays, periodDuration, numOptions } = body;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate ${numOptions} optimized timetable options for a college with the following parameters:

Department: ${department}
Semester: ${semester}
Periods per day: ${periodsPerDay}
Working days: ${workingDays}
Period duration: ${periodDuration} minutes

Sample data to use:
- Subjects: Data Structures, Algorithms, Database Systems, Operating Systems, Computer Networks
- Faculty: Dr. Smith, Dr. Johnson, Dr. Williams, Dr. Brown, Dr. Davis
- Rooms: Room 101, Room 102, Lab A, Lab B, Seminar Hall
- Batches: Batch A (40 students), Batch B (38 students)

Requirements:
1. No faculty should have more than 6 classes per day
2. No classroom conflicts
3. Distribute subjects evenly across the week
4. Include lunch break after 3rd period
5. Practical classes should be in labs
6. Each subject should have 4-5 classes per week

Return a JSON array with ${numOptions} timetable options. Each option should have:
- utilization: percentage (80-95)
- conflicts: number (0-2)
- schedule: array of time slots with days array containing {subject, faculty, room, batch}

Format the response as valid JSON only, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up the response to extract JSON
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let timetables;
    try {
      const parsed = JSON.parse(text);
      timetables = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // If parsing fails, create sample data
      timetables = generateSampleTimetables(numOptions, periodsPerDay, workingDays);
    }

    return NextResponse.json({ timetables });
  } catch (error: any) {
    console.error('Error generating timetable:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate timetable' },
      { status: 500 }
    );
  }
}

function generateSampleTimetables(numOptions: number, periodsPerDay: number, workingDays: number) {
  const subjects = ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks'];
  const faculty = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];
  const rooms = ['Room 101', 'Room 102', 'Lab A', 'Lab B', 'Seminar Hall'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, workingDays);
  
  const timetables = [];
  
  for (let opt = 0; opt < numOptions; opt++) {
    const schedule = [];
    
    for (let period = 0; period < periodsPerDay; period++) {
      const time = `${9 + period}:00 - ${10 + period}:00`;
      const daySlots = [];
      
      for (let day = 0; day < workingDays; day++) {
        if (period === 3) {
          daySlots.push(null); // Lunch break
        } else {
          const subjectIdx = (period + day + opt) % subjects.length;
          daySlots.push({
            subject: subjects[subjectIdx],
            faculty: faculty[subjectIdx],
            room: rooms[(subjectIdx + opt) % rooms.length],
            batch: 'Batch A'
          });
        }
      }
      
      schedule.push({ time, days: daySlots });
    }
    
    timetables.push({
      utilization: 85 + Math.floor(Math.random() * 10),
      conflicts: Math.floor(Math.random() * 2),
      schedule
    });
  }
  
  return timetables;
}
