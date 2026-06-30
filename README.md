# NexusAI — Productivity Command Center

> A smart productivity dashboard built for the hackathon that optimizes task triage and schedule management using AI-driven cognitive load balancing.

🔗 **Live Demo:** [the-lastminute-lifesaver-ae905.web.app](https://the-lastminute-lifesaver-ae905.web.app)

---

## Overview

NexusAI goes beyond a traditional to-do list. Instead of treating every task equally, it tracks the user's mental energy through a **Brain Battery** system and uses AI scoring to schedule work during peak cognitive windows — helping users sustain focus, avoid burnout, and get more done with less friction.

---

## Features

- **AI Cognitive Load Scheduling** — Sorts and prioritizes tasks based on urgency, deadline proximity, and mental effort required.
- **Brain Battery Tracking** — Real-time visual indicators for Focus, Flow State, and Cognitive Load.
- **Ruthless Mode** — A hyper-focus state that auto-suspends low-priority tasks and declines non-essential meetings to protect critical work time.
- **Zero-to-One Auto-Starter** — Helps overcome procrastination by drafting the first step of a task.
- **Context-Aware Reminders** — Smart notifications surfaced at the right moment, not just a fixed time.
- **Habit & Goal Analytics** — Visual tracking of streaks, weekly completions, and focus-hour trends.
- **Agent Logs** — A live execution stream showing real-time AI scheduling and prioritization decisions.
- **Voice Assistant** — Voice-command interface for hands-free task and schedule control.
- **Dark / Light Mode** — Full theme support for accessibility and personal preference.

---

## Tech Stack

| Category   | Technology                          |
|------------|--------------------------------------|
| Framework  | React.js                             |
| Build Tool | Vite                                  |
| Language   | JavaScript (JSX)                     |
| Icons      | Lucide React                         |
| Styling    | Custom CSS with CSS variables (theming) |
| Hosting    | Firebase Hosting (Google Cloud)      |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Pridhi-24/The-Last-Minute-Life-Saver.git

# Navigate into the project
cd The-Last-Minute-Life-Saver/my-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist` folder.

---

## Project Structure

```
my-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Deployment

This project is deployed using **Firebase Hosting** on Google Cloud.

```bash
npm run build
firebase deploy --only hosting
```

---

## Author

**Pridhi** — Built for **Vibe2Ship** (Coding Ninjas x Google for Developers)

---

## License

This project is open for educational and demonstration purposes.
