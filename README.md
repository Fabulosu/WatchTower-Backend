# WatchTower

**WatchTower** is a status monitoring application that allows users to create customizable status pages for their services. Track components, log incidents, schedule maintenances, and keep your audience informed with real-time updates.

---

## Features

### 🛠️ Core Features
- **Responsive and Modern Design**: Enjoy a seamless experience on any device, with fully responsive layouts and modern UI components.
- **Component Monitoring**: Define and monitor key components of your infrastructure.
- **Incident Management**: Log and update incidents with detailed descriptions and affected components.
- **Maintenance Scheduling**: Plan and display upcoming maintenance windows to your users, with the possibility to automatically start and complete the maintenance.
- **Uptime Statistics**: View component uptime over the last 90 days with visual indicators.
- **Real-Time Updates**: Provide live updates for ongoing incidents and maintenance events.

---

## Getting Started

### 🚀 Prerequisites
Before setting up the project, ensure you have:
- **Node.js** (v16 or newer)

### 📥 Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Fabulosu/WatchTower-Backend.git
cd WatchTower-Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run Prisma migrations:**
```bash
npx prisma migrate dev --name init
```

4. **Run the development server:**
```bash
npm run start:dev
```

4. **Download and setup the frontend server from [WatchTower](https://github.com/Fabulosu/WatchTower)**

<br/>

Open http://localhost:3000 with your browser to see the result.

## License

This project is licensed under the MIT License.
