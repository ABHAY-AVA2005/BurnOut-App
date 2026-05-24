# BurnOut ⚡

**Live Deployment:** [https://burnout-app-v1.vercel.app/](https://burnout-app-v1.vercel.app/)

## About The App
BurnOut is an elite, fully offline-capable HIIT (High-Intensity Interval Training) and Gym Tracker. Designed with a stunning, premium "Frozen Glassmorphism" dark-mode aesthetic, it provides users with intense pre-set training modules, an AI-styled Custom Workout Generator, and a built-in Zen Mode music player. Whether you are running endurance cardio, crushing the "Inferno Sprint," or doing focused core work, BurnOut keeps you locked in and motivated.

## Tech Stack

| Technology | What It Is Used For |
| :--- | :--- |
| **React (Vite)** | The core UI library used to build the interactive, component-based frontend with lightning-fast local development and production builds. |
| **TypeScript** | Provides strict static typing to catch errors early and ensure the codebase is robust and maintainable. |
| **Tailwind CSS** | Powers the entire design system. Used extensively for the premium glassmorphism, fluid animations, custom gradients, and responsive layouts. |
| **Vite PWA Plugin** | Transforms the web app into a Progressive Web App (PWA). Generates the manifest and Service Workers, allowing the app to be installed natively and used 100% offline. |
| **Web Audio API** | Powers the synthesized audio engine inside "Zen Mode", generating binaural beats, lofi focus tracks, and power surge audio dynamically without external MP3s. |
| **Lucide React** | Provides the crisp, modern SVG icons used throughout the interface to enhance the visual hierarchy. |
| **Vercel** | The hosting platform providing continuous deployment, automatic HTTPS, and fast global edge delivery. |

## Key Features & Why They Were Built

### 1. Progressive Web App (PWA) & Offline Capability
**Why:** Gyms and outdoor running paths often have poor cell service. Making BurnOut a PWA means users can install it to their phone's home screen and track their workouts flawlessly without an internet connection.

### 2. Built-in Zen Mode & Music Player
**Why:** Switching between a fitness tracker and a music app breaks concentration. The built-in Zen Player allows users to either generate synthetic focus/energy beats using the Web Audio API, or directly load a local folder of their own music complete with *Shuffle* and *Loop* controls.

### 3. Active Training Modules
**Why:** Users need quick access to routines. Pre-configured modules like *Inferno Sprint*, *Endurance Cardio*, and *Lower Body Power* give users an instant, structured workout with calculated METs, estimated burn, and timing so they don't have to think before they sweat.

### 4. Custom Workout Generator
**Why:** Not every day is the same. The custom generator lets users quickly enter their focus area, available time, and desired intensity to spin up a tailored session module instantly.

### 5. Premium "Glassmorphism" Dark Mode UI
**Why:** A fitness app should look as elite as the athletes using it. Moving away from generic flat designs, the app uses deep cyan/sky-blue neon accents, blurred glass panels (`backdrop-blur`), and fluid micro-animations to create a "wow" factor that keeps users engaged.

### 6. Global Training Benchmarks Dashboard
**Why:** Data drives progress. The integrated dashboard gives users a quick, high-level overview of the time, speed, and caloric burn expected for each module, keeping their goals transparent and achievable.
