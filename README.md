# 🏡📊 Mutuo Simulator

Plan smarter. Simulate your mortgage, adjust variables in real time, and see how your future home truly costs.

A simple web application to simulate mortgage ("mutuo") calculations — determine monthly payments, understand duration
and rate impact, and preview estimated outcomes.

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

Note: The UI uses Tailwind utility classes. Some components may import MUI icons. Internationalization packages are
included, so translation files/providers might exist or be planned.

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

Absolutely! Here's the **full Docker + Kubernetes section translated and polished in professional English** for your
README. It keeps all the commands, explanations, and workflow.

---

# 🐳 Docker & ☸️ Kubernetes Deployment

---

## 🐳 Docker

### 📦 Build the image

```bash
docker build -t mutuo-simulator:1.0.0 .
```

---

### ▶️ Run container locally

```bash
docker compose up
```

Access the app at:

```
http://localhost:3000/mutuo-simulator
```

---

# ☸️ Kubernetes

The application is deployed on Kubernetes using:

* Deployment
* Service
* Ingress

Folder structure:

```
k8s/
 ├── deployment.yaml
 ├── service.yaml
 └── ingress.yaml
```

---

## 🚀 Prerequisites

```bash
minikube start
```

Enable ingress:

```bash
minikube addons enable ingress
```

Start the tunnel (required for Ingress access):

```bash
sudo minikube tunnel
```

---

## 📦 Deployment

Build & load the image
```bash
docker compose build
minikube image load mutuo-simulator:1.0.0
```

Apply all resources:

```bash
kubectl apply -f k8s/
```

Or individually:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## 🌍 Access the application

The app is exposed via Ingress at:

```
http://mutuo.localtest.me/mutuo-simulator
```

If needed, add this to your `/etc/hosts`:

```
<MINIKUBE-IP> mutuo.localtest.me
```

Retrieve the Minikube IP:

```bash
kubectl get ingress
```

---

# 🔎 Kubernetes cheatsheet

### 📜 View logs

| Description     | Command                          |
|-----------------|----------------------------------|
| POD Logs        | ```kubectl logs <pod-name>```    |
| POD Logs (tail) | ```kubectl logs -f <pod-name>``` |

### 🛠 Debugging

| Description           | Command                                                             |
|-----------------------|---------------------------------------------------------------------|
| Describe a POD        | ```kubectl describe pod <pod-name>```                               |
| Enter a POD           | ```bash kubectl exec -it <pod-name> -- sh```                        |
| Restart deployment    | ```kubectl rollout restart deployment mutuo-simulator-deployment``` |
| Check rollout status  | ```kubectl rollout status deployment mutuo-simulator-deployment```  |
| Check resource status | ```kubectl get [pods/deployments/svc/all]```                        |

### 🗑 Delete resources

| Description          | Command                                                    |
|----------------------|------------------------------------------------------------|
| Delete all resources | ```kubectl delete -f k8s/```                               |
| Delete Deployment    | ```kubectl delete deployment mutuo-simulator-deployment``` |
| Delete Service       | ```kubectl delete service service mutuo-simulator-svc```   |
| Delete Ingress       | ```kubectl delete ingress mutuo-simulator-ingress```       |

## 🔁 Development workflow

```bash
docker build -t mutuo-simulator:latest .
kubectl rollout restart deployment mutuo-simulator-deployment
kubectl get pods
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgements

- React and Vite communities
- TailwindCSS
- MUI Icons
- i18next ecosystem