# Breeze Flow - Productivity App

A clean, modern productivity application built with React and Vite. Features a persistent Pomodoro timer that continues counting even after page refreshes, task management, and a clean dashboard.

## ✨ Features

### 🍅 Persistent Pomodoro Timer
- **Continues counting across page refreshes** using localStorage
- 25-minute work sessions with 5-minute breaks
- Long 15-minute breaks every 4 cycles
- Browser notifications when sessions complete
- Customizable timer durations
- Clean, modern UI with progress indicators

### ✅ Task Management
- Add, complete, and delete tasks
- Tasks persist in localStorage
- Clean task list interface
- Progress tracking

### 📊 Dashboard
- Overview of daily focus time
- Total Pomodoros completed
- Task completion statistics
- Quick action buttons
- Motivational elements

### 🎨 Modern Design
- Responsive design that works on all devices
- Clean, minimalist interface
- Smooth animations and transitions
- Accessible UI components

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon system
- **React Router** - Client-side routing

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- Timer state (including current time when paused)
- Task list
- Focus session history
- Settings and preferences

**No backend required!** Your data stays private and local to your device.

## 🎯 Key Improvements Made

1. **Removed entire backend** - Now runs as a pure frontend application
2. **Persistent timer** - Timer state is saved and restored across page refreshes
3. **Cleaner codebase** - Removed unused dependencies and code
4. **Modern UI** - Updated to use latest design patterns
5. **Better performance** - Lightweight and fast-loading
6. **Simplified architecture** - Easy to understand and maintain

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FocusTimer/     # Pomodoro timer component
│   ├── TaskManager/    # Task management components
│   ├── Layout/         # Layout components
│   └── ui/             # Base UI components
├── pages/              # Page components
├── services/           # Local storage and API services
├── lib/                # Utility functions
└── main.jsx           # Application entry point
```

## 🔧 Customization

The timer durations can be customized through the settings dialog:
- Work session duration (1-60 minutes)
- Short break duration (1-30 minutes)
- Long break duration (1-60 minutes)

## 🌟 Features Highlights

- **🔄 Persistent Timer**: Timer continues exactly where you left off, even after closing the browser
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **🔔 Notifications**: Browser notifications when sessions complete
- **⚡ Fast**: Loads instantly with no server dependencies
- **🎨 Modern**: Beautiful, clean interface that's easy on the eyes
- **🔒 Private**: All data stays on your device

---

**Ready to boost your productivity? Start a focus session and get things done! 🚀**
