# Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### 2. Configure Gemini API Key
1. Get your free API key from: https://aistudio.google.com/app/apikey
2. Open `.env.local` file
3. Add your key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Login
- Go to http://localhost:3000/login
- Enter any email and password (demo mode)
- You'll be redirected to the dashboard

## Features to Explore

### Dashboard
- View statistics (classrooms, faculty, subjects, batches)
- Quick access to all features

### Data Input
- Add classrooms with capacity and type
- Register faculty members with subjects
- Create subjects with semester info
- Define student batches

### Generate Timetable
- Configure parameters (periods, days, duration)
- Generate multiple AI-optimized options
- View utilization and conflicts
- Export timetables

### View Timetables
- Browse all generated timetables
- Check approval status
- Download timetables

## Project Structure

```
src/
├── app/
│   ├── api/generate-timetable/  # AI generation endpoint
│   ├── dashboard/               # Main dashboard
│   ├── data-input/             # Data management
│   ├── login/                  # Authentication
│   ├── timetable/              # Timetable views
│   │   └── generate/           # Generation interface
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
└── types/
    └── index.ts                # TypeScript types
```

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### API Key Issues
- Make sure `.env.local` exists in the root directory
- Verify the key is correct (no extra spaces)
- Restart the dev server after adding the key

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

## Next Steps

1. **Add Database**: Integrate PostgreSQL or MongoDB for data persistence
2. **Authentication**: Implement proper auth with NextAuth.js
3. **PDF Export**: Add PDF generation for timetables
4. **Email Notifications**: Send timetables to faculty/students
5. **Analytics**: Track utilization and optimization metrics
6. **Mobile App**: Create React Native companion app

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the code comments
- Test the API endpoint at `/api/generate-timetable`
