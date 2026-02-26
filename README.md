# 🏡📊 Mutuo Simulator 

Plan smarter. Simulate your mortgage, adjust variables in real time, and see how your future home truly costs.

A simple web application to simulate mortgage ("mutuo") calculations — determine monthly payments, understand duration and rate impact, and preview estimated outcomes.

Built with TypeScript, React, Vite, and TailwindCSS. Uses MUI Icons and is structured for i18n (react-i18next).

---

## 🚀 Features

- 🧮 Mortgage amount input
- 🔁 Adjustable interest rate
- 📅 Duration (years) selection
- 💵 Variables such as value, rate, etc.
- 🖥️ Responsive UI with range and text inputs
- ❗ Input validation with error messaging

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+ recommended

### Install
```bash
npm install
```

### Run (Dev)
```bash
npm run dev
```
Vite will print a local URL (usually http://localhost:5173).

### Build (Prod)
```bash
npm run build
```
The production build will be in the `dist/` folder.

### Preview (Serve built app)
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

---

## 🛠 Tech Stack
- TypeScript
- React
- Vite
- TailwindCSS
- MUI Icons
- i18n: i18next, react-i18next, browser language detector, http backend

---

## Project Structure (high level)
```
/
├─ src/
│  ├─ components/         # Reusable UI and feature components
│  ├─ pages/              # Route-level pages (e.g., Home, DashboardPage)
│  ├─ App.*               # App entry (if present)
│  └─ main.tsx            # React root bootstrap (typical Vite)
├─ public/                # Static assets
├─ index.html             # Vite HTML entry
├─ tailwind.config.js     # Tailwind configuration
├─ vite.config.ts         # Vite configuration
├─ eslint.config.js       # ESLint configuration
├─ tsconfig*.json         # TypeScript configs
└─ package.json
```

Note: The UI uses Tailwind utility classes. Some components may import MUI icons. Internationalization packages are included, so translation files/providers might exist or be planned.

---

## Deployment
This project includes a GitHub Pages deploy script:
1. Ensure the repo is connected to GitHub and `gh-pages` package is installed (already in devDependencies).
2. Set the repository settings for Pages to serve from the `gh-pages` branch (created by the deploy script).
3. Run:
   ```bash
   npm run deploy
   ```
4. If your project is not at the repo root (or needs a base path), configure `base` in `vite.config.ts` accordingly.

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgements
- React and Vite communities
- TailwindCSS
- MUI Icons
- i18next ecosystem