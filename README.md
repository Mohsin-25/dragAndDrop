📝 Kanban Task Manager
A simple yet powerful drag-and-drop task management application built with React and Tailwind CSS, featuring backend persistence via a mock REST API (MockAPI.io).

Live Demo:
https://drag-and-drop-git-main-mohammad-mohsin-s-projects.vercel.app/

⚙️ Architecture
Component-Based Structure: Organized into modular, reusable React components.

Custom Hooks: Dedicated hooks for API communication (useGetTasks, useCreateTask, etc.) to keep logic separate from UI.

Service Layer: Centralized API requests handled cleanly via Axios services.

UI Components: Reusable button, modal, input components with Tailwind styling.

🔥 Features
Drag-and-Drop:
Move tasks across columns (To Do, In Progress, Completed) using intuitive drag-and-drop with inbuilt HTML functionalities,
with task editing and deletion support

Responsive Design:
Fully responsive and mobile-friendly — optimized layouts for all screen sizes.

Persistent Storage:
Task data is synced with a mock REST API for persistence across sessions.

Dynamic Modal Forms:
Add new tasks using a sleek modal form powered by Headless UI + Tailwind CSS.

Status Tracking:
Task counts are dynamically updated for each column (To Do / In Progress / Completed).

🚀 Tech Stack
Frontend: React.js, Tailwind CSS, Headless UI

API : React Query (TanStack Query), Axios

Backend (Mock API): MockAPI.io

Deployment: Vercel
