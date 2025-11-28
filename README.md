# 📋 Routine Monitor App - Full Stack Application

A modern, feature-rich Routine Monitor application with authentication, task management, team collaboration, and analytics dashboard. Built with React frontend and Java Spring Boot backend.

![Routine Monitor App Preview](https://via.placeholder.com/1200x600/1976d2/ffffff?text=Routine+Monitor+App+Dashboard)

## 🌟 Features

### 🔐 Authentication System
- **User Registration & Login** with form validation
- **JWT Token-based Authentication** for secure sessions
- **Protected Routes** with route guards
- **User Profile Management** with avatar support
- **Logout Functionality** with session cleanup

### 📝 Task Management
- **Create, Read, Update, Delete** tasks
- **Task Priorities** (Low, Medium, High, Urgent)
- **Task Status Tracking** (To Monitor, In Progress, Completed)
- **Due Date Management** with calendar integration
- **Search & Filter** functionality
- **Grid & List View** options

### 👥 Team Management
- **Team Member Profiles** with roles and contact info
- **CRUD Operations** for team members
- **Member Status Tracking** (Active, Inactive, On Leave)
- **Search & Filter** team members
- **Avatar Management** with fallback images

### 📊 Analytics Dashboard
- **Real-time Statistics** and metrics
- **Interactive Charts** for data visualization
- **Task Completion Tracking**
- **Performance Analytics**
- **Export Capabilities**

### ⚙️ Advanced Settings
- **Profile Management** with personal information
- **Notification Preferences** (Email, Push, In-app)
- **Security Settings** with 2FA options
- **Appearance Customization** (Theme, Typography)
- **Account Management** and privacy controls
- **Advanced Configuration** for developers
- **Third-party Integrations** (Slack, Google Workspace)

### 🎨 Modern UI/UX
- **Material-UI Design System** with consistent theming
- **Responsive Design** for all screen sizes
- **Dark/Light Mode** support
- **Smooth Animations** and transitions
- **Accessibility Features** (ARIA labels, keyboard navigation)

## 🏗️ Architecture

### Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Shared components
│   │   └── layout/        # Layout components
│   ├── pages/
│   │   ├── auth/          # Auth pages (Login, Signup)
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Tasks.jsx      # Task management
│   │   ├── team/          # Team management
│   │   ├── Settings.jsx   # Settings page
│   │   └── ...            # Other pages
│   └── App.jsx            # Main app component
```

### Backend (Java Spring Boot)
```
backend/
├── src/main/java/com/routinemonitor/backend/
│   ├── controller/        # REST API controllers
│   ├── model/            # JPA entities
│   ├── repository/       # Data access layer
│   ├── service/          # Business logic
│   └── security/         # Authentication & JWT
└── pom.xml               # Maven configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Java 17** or higher
- **Maven** 3.6+
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KubanjaElijahEldred/Routine-Monitor-App.git
   cd Routine-Monitor-App
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend will run on: `http://localhost:8080`

3. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on: `http://localhost:5173`

4. **Access the Application:**
   - Open [http://localhost:5173](http://localhost:5173)
   - Register a new account or login with existing credentials

## 🔧 Configuration

### Backend Configuration
- **Database:** H2 in-memory database (for development)
- **JWT Secret:** Configure in `application.properties`
- **CORS:** Enabled for `http://localhost:5173`
- **H2 Console:** Available at `http://localhost:8080/h2-console`

### Environment Variables
```bash
# Backend (application.properties)
JWT_SECRET=yourSecretKey
JWT_EXPIRATION=86400000

# Frontend (.env)
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/status` - Update task status

### Team Management
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member
- `PUT /api/team/{id}` - Update team member
- `DELETE /api/team/{id}` - Delete team member
- `GET /api/team/search` - Search team members

## 🛠 Technologies Used

### Frontend
- **React 18** - UI library
- **Material-UI (MUI) v5** - Component library
- **React Router v6** - Routing
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **React Hooks** - State management

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **JWT** - Token-based authentication
- **H2 Database** - In-memory database
- **Maven** - Dependency management

## 🌱 Development

### Project Structure
```
routine-monitor-app/
├── frontend/           # React frontend application
├── backend/            # Java Spring Boot backend
├── backend-node/       # Alternative Node.js backend (optional)
└── README.md          # This file
```

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
mvn spring-boot:run  # Start development server
mvn clean compile    # Compile the project
mvn test            # Run tests
mvn package         # Create JAR file
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test              # Run unit tests
npm run test:coverage # Run tests with coverage
```

### Backend Tests
```bash
cd backend
mvn test              # Run unit and integration tests
mvn test-coverage     # Run tests with coverage
```

## 📦 Deployment

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting service

### Backend Deployment
1. Package the application:
   ```bash
   mvn clean package
   ```
2. Deploy the JAR file to your server
3. Configure production database and environment variables

## 🔐 Security Features

- **JWT Authentication** with expiration
- **Password Encryption** using BCrypt
- **CORS Protection** for cross-origin requests
- **Input Validation** on all endpoints
- **SQL Injection Prevention** with JPA
- **XSS Protection** in React components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI Team** for excellent component library
- **Spring Boot Team** for powerful Java framework
- **React Team** for amazing frontend library
- **JWT.io** for token authentication standards

## 📧 Contact

**Elijah Kubanja** - [@KubanjaElijah](https://twitter.com/KubanjaElijah)

**Project Link:** [https://github.com/KubanjaElijahEldred/Routine-Monitor-App](https://github.com/KubanjaElijahEldred/Routine-Monitor-App)

---

⭐ **Star this repository** if it helped you learn something new or inspired you to build your own project!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

