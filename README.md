# E-Learning Management System Backend

A robust REST API backend for an E-Learning Management System built with **Node.js**, **Express**, **TypeScript**, **MySQL**, and **TypeORM**.

## Features

- Role-Based Access Control (RBAC) — Admin, Teacher, Student
- Permission-based authorization
- JWT authentication with bcrypt password hashing
- Standardized API response format
- Repository pattern for data access
- Service layer for business logic
- TypeORM entity relationships with CASCADE deletes

## Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Node.js + Express| Web server & routing             |
| TypeScript       | Type-safe development            |
| MySQL + mysql2   | Database                         |
| TypeORM          | ORM & database migrations        |
| JWT + bcrypt     | Authentication & password hashing|
| tsx              | TypeScript execution             |

## Project Structure

```
src/
├── config/
│   └── data-source.ts          # TypeORM database configuration
├── controllers/
│   ├── AuthController.ts
│   ├── CourseController.ts
│   ├── EnrollmentController.ts
│   ├── LessonController.ts
│   ├── ProgressController.ts
│   ├── QuestionController.ts
│   ├── QuizController.ts
│   └── QuizResultController.ts
├── enums/
│   └── Role.ts                 # RoleType enum (STUDENT, TEACHER, ADMIN)
├── entities/
│   ├── Course.ts
│   ├── Enrollment.ts
│   ├── Lesson.ts
│   ├── Permission.ts
│   ├── Progress.ts
│   ├── Question.ts
│   ├── Quiz.ts
│   ├── QuizResult.ts
│   ├── Role.ts
│   ├── RolePermission.ts
│   └── User.ts
├── middlewares/
│   ├── authMiddleware.ts       # JWT verification
│   ├── errorMiddleware.ts      # Global error handler
│   ├── permissionMiddleware.ts # Permission-based access
│   └── roleMiddleware.ts       # Role-based access
├── repositories/
│   ├── CourseRepository.ts
│   ├── EnrollmentRepository.ts
│   ├── LessonRepository.ts
│   ├── ProgressRepository.ts
│   ├── QuestionRepository.ts
│   ├── QuizRepository.ts
│   ├── QuizResultRepository.ts
│   └── UserRepository.ts
├── routes/
│   ├── adminRoutes.ts
│   ├── authRoutes.ts
│   ├── courseRoutes.ts
│   ├── enrollmentRoute.ts
│   ├── lessonRoutes.ts
│   ├── progressRoutes.ts
│   ├── questionRoutes.ts
│   ├── quizResultRoutes.ts
│   ├── quizRoutes.ts
│   ├── studentRoutes.ts
│   └── teacherRoute.ts
├── services/
│   ├── AuthService.ts
│   ├── CourseService.ts
│   ├── EnrollmentService.ts
│   ├── LessonService.ts
│   ├── ProgressService.ts
│   ├── QuestionService.ts
│   ├── QuizService.ts
│   └── QuizResultService.ts
├── utils/
│   ├── apiResponse.ts          # Standardized response helper
│   ├── appError.ts             # Custom error class
│   ├── generateToken.ts        # JWT token generation
│   └── hashPassword.ts         # bcrypt password utilities
├── app.ts                      # Express app configuration
└── server.ts                   # Server entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL server
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd E_Learning_Management_System_Backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the root directory:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=your_password
# DB_DATABASE=e_learning
# JWT_SECRET=your_jwt_secret_key
# PORT=3000
```

### Database Setup

Ensure MySQL is running, then the database connection is configured in `src/config/data-source.ts`.

### Run the Application

```bash
# Development (with hot reload)
npm run dev

# Build
npm run build

# Start production server
npm start

# Seed database (if seed script exists)
npm run seed
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint         | Access      | Description          |
|--------|------------------|-------------|----------------------|
| POST   | /api/auth/register | Public     | Register new user    |
| POST   | /api/auth/login    | Public     | Login and get token  |

### Admin

| Method | Endpoint              | Access         | Description       |
|--------|----------------------|----------------|-------------------|
| GET    | /api/admin/dashboard | Admin only     | Admin dashboard   |

### Student

| Method | Endpoint              | Access               | Description           |
|--------|----------------------|-----------------------|-----------------------|
| GET    | /api/student/dashboard | Student only        | Student dashboard     |
| POST   | /api/student/enroll    | Student + permission | Enroll in a course    |

### Teacher

| Method | Endpoint           | Access         | Description     |
|--------|-------------------|----------------|-----------------|
| GET    | /api/teacher/...  | Teacher only   | Teacher routes  |

### Courses

| Method | Endpoint        | Access              | Description         |
|--------|----------------|---------------------|---------------------|
| POST   | /api/courses/  | Teacher             | Create course       |
| GET    | /api/courses/  | Public              | Get all courses     |
| GET    | /api/courses/:id | Public            | Get course by ID    |
| PUT    | /api/courses/:id | Teacher           | Update course       |
| DELETE | /api/courses/:id | Teacher           | Delete course       |

### Lessons

| Method | Endpoint        | Access              | Description         |
|--------|----------------|---------------------|---------------------|
| POST   | /api/lessons/  | Teacher             | Create lesson       |
| GET    | /api/lessons/  | Public              | Get all lessons     |
| GET    | /api/lessons/:id | Public            | Get lesson by ID    |
| PUT    | /api/lessons/:id | Teacher           | Update lesson       |
| DELETE | /api/lessons/:id | Teacher           | Delete lesson       |

### Quizzes

| Method | Endpoint        | Access              | Description         |
|--------|----------------|---------------------|---------------------|
| POST   | /api/quizzes/  | Teacher             | Create quiz         |
| GET    | /api/quizzes/  | Public              | Get all quizzes     |
| GET    | /api/quizzes/:id | Public            | Get quiz by ID      |
| PUT    | /api/quizzes/:id | Teacher           | Update quiz         |
| DELETE | /api/quizzes/:id | Teacher           | Delete quiz         |

### Questions

| Method | Endpoint         | Access              | Description          |
|--------|-----------------|---------------------|----------------------|
| POST   | /api/questions/ | Teacher             | Create question      |
| GET    | /api/questions/ | Public              | Get all questions    |
| GET    | /api/questions/:id | Public           | Get question by ID   |
| PUT    | /api/questions/:id | Teacher          | Update question      |
| DELETE | /api/questions/:id | Teacher          | Delete question      |

### Progress

| Method | Endpoint              | Access         | Description          |
|--------|----------------------|----------------|----------------------|
| POST   | /api/progress/complete | Student      | Mark lesson complete |
| GET    | /api/progress/my-progress | Student   | Get student progress |

### Quiz Results

| Method | Endpoint             | Access         | Description          |
|--------|---------------------|----------------|----------------------|
| POST   | /api/quiz-results/submit | Student    | Submit quiz result   |
| GET    | /api/quiz-results/my-results | Student | Get student results  |

### Enrollments

| Method | Endpoint         | Access              | Description          |
|--------|-----------------|---------------------|----------------------|
| POST   | /api/enrollments/ | Student + permission | Enroll in course     |

## Response Format

All API responses follow a standardized format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## Authentication

The API uses JWT (JSON Web Token) for authentication.

1. Register or login to receive a token.
2. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token>
```

## Roles & Permissions

| Role     | Access                                    |
|----------|-------------------------------------------|
| Admin    | Full system access                        |
| Teacher  | Create/manage courses, lessons, quizzes   |
| Student  | Enroll, view content, track progress      |

Permissions are managed through the `role_permissions` junction table.

## Database Schema

```
users ──┬── courses (as teacher)
        ├── enrollments
        ├── progress
        └── quiz_results

courses ──┬── lessons
          ├── enrollments
          └── quizzes

quizzes ──┬── questions
          └── quiz_results

lessons ─── progress

roles ── role_permissions ─── permissions
  │
  └── users
```

## Scripts

```bash
npm run dev      # Start development server with tsx watch
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
npm run seed     # Seed database with initial data
```

## License

ISC
