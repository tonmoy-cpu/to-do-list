# Task Manager

Task Manager is a modern, responsive web application built with Next.js, designed to help users manage tasks efficiently. It features task creation, reminders with audio notifications, weather integration for outdoor tasks, and a customizable user interface with light/dark mode support. The app leverages TypeScript for type safety, Redux for state management, and a robust ESLint configuration for code quality.

## Features
### Task Management
- Add, delete, and mark tasks as complete.
- Filter tasks by categories like "Today," "Upcoming," and "Important."
- Search tasks by title, location, or reminder time.

### Reminders
- Set reminders with audio alerts and browser notifications.
- Automatically dismiss reminders when tasks are completed or expired.

### Weather Integration
- Display real-time weather for outdoor tasks based on location (fetched from a weather API).
- Visual weather icons for quick reference (e.g., ☀️ for clear, 🌧️ for rain).

### User Interface
- Responsive design with a collapsible sidebar for mobile and desktop.
- Light and dark mode toggle using `next-themes`.
- Progress tracking with a circular completion chart.

### User Experience
- Avatar generation using DiceBear Avatars for personalized user profiles.
- Smooth transitions and hover effects with Tailwind CSS.

### Development Tools
- **TypeScript** for static typing and improved developer experience.
- **ESLint** with Next.js and TypeScript rules for code consistency.
- **Prettier** integration for automatic code formatting.

## Technologies Used
- **Framework:** Next.js (React framework with App Router)
- **Language:** TypeScript
- **State Management:** Redux with Redux Toolkit
- **Styling:** Tailwind CSS
- **Theming:** next-themes
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Avatar Generation:** DiceBear Avatars
- **Linting:** ESLint with `eslint-plugin-next`, `@typescript-eslint`, and `eslint-config-prettier`
- **Build Tool:** Node.js with npm
- **Miscellaneous:** Web APIs for browser notifications and audio playback, Weather data integration

## Prerequisites
- Node.js (v18.x or later recommended)
- npm (v9.x or later, comes with Node.js)
- A code editor like VS Code
- (Optional) Git for cloning the repository

## Setup Project Environment

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
- `NEXT_PUBLIC_WEATHER_API_KEY`: Required for weather data (get one from OpenWeatherMap).
- `NEXT_PUBLIC_BASE_URL`: Base URL for the app (optional, adjust for production).

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```
Then start the production server:
```bash
npm start
```

### 6. Lint and Format Code (Optional)
Run ESLint to check for linting issues:
```bash
npm run lint
```
Fix linting issues automatically (if configured):
```bash
npm run lint -- --fix
```

## Project Structure
```
task-manager/
├── public/              # Static assets (e.g., alert.mp3)
├── src/
│   ├── app/            # Next.js App Router pages (e.g., page.tsx)
│   ├── components/     # Reusable components (e.g., TaskList.tsx, TaskInput.tsx)
│   ├── lib/            # Utility functions (e.g., cn.ts for Tailwind)
│   ├── redux/          # Redux store, actions, and reducers
│   ├── types/          # TypeScript type definitions (e.g., task.ts)
│   └── styles/         # Global styles (if any)
├── eslint.config.mjs    # ESLint configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## Usage
- **Add a Task:** Click "Add Task" to create a new task with optional reminder and location.
- **Set Reminders:** Specify a date/time for reminders; you’ll hear an audio alert and see a notification when due.
- **View Weather:** For outdoor tasks, enter a location to see current weather conditions.
- **Toggle Theme:** Switch between light and dark modes using the theme button (☀️/🌙).
- **Filter Tasks:** Use the sidebar to filter tasks by category or search via the top bar.



