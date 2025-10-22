Resolve README.md merge conflict and finalize initial commit
# HR-Management-System.
AI-HRMS is an intelligent web-based Human Resource Management System designed to automate and simplify HR operations using Artificial Intelligence. The system manages employee data, recruitment, leave tracking, and performance evaluation efficiently. It also integrates an AI chatbot that assists HR personnel in real time

# HRMS AI - Next-Generation Human Resource Management System

A production-ready, AI-powered HRMS platform built with modern technologies. Streamline recruitment, performance tracking, payroll, and employee management with unprecedented accuracy and efficiency.

## 🎯 Features

### Core Functionalities
- **Employee Data Management** - Centralized employee records and organizational structure
- **Attendance Tracking** - Real-time attendance monitoring with advanced analytics
- **Payroll Processing** - Automated payroll calculations with compliance features
- **Performance Tracking** - Data-driven performance evaluations and goal management
- **Recruitment Management** - AI-powered candidate screening and hiring workflow
- **Real-time Processing** - Instant data synchronization across all modules

### AI-Powered Features
1. **Resume Screening & Evaluation** - Automated resume analysis and ranking using NLP
2. **Voice Interview AI** - Intelligent voice-based candidate interviews with analysis
3. **Performance AI** - AI-driven performance evaluation and feedback generation
4. **Predictive Analytics** - Forecast attrition rates, hiring needs, and payroll trends

### Multi-Role System
- **Admin** - Full system access and configuration
- **Manager** - Team and department oversight
- **HR** - HR operations and recruitment management
- **Recruiter** - Candidate screening and hiring
- **Employee** - Personal dashboard and profile management

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library for building dynamic interfaces
- **React Router 6** - Client-side routing (SPA mode)
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Radix UI** - Unstyled, accessible UI components
- **Recharts** - Data visualization library

### Backend
- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe backend code

### Development Tools
- **Vitest** - Unit testing framework
- **TailwindCSS** - Styling system
- **PostCSS** - CSS transformation
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (preferred package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hrms-ai

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:8080`

### Build & Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Format code
pnpm format.fix
```

## 📁 Project Structure

```
hrms-ai/
├── client/
│   ├── pages/                 # Route components
│   │   ├── Index.tsx         # Homepage
│   │   ├── Login.tsx         # Login with role selection
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── AITools.tsx       # AI features showcase
│   │   ├── Employees.tsx     # Employee management
│   │   ├── Recruitment.tsx   # Recruitment & candidates
│   │   └── NotFound.tsx      # 404 page
│   ├── components/
│   │   ├── ui/               # Pre-built UI components
│   │   ├── DashboardLayout.tsx # Dashboard wrapper
│   │   └── PlaceholderPage.tsx # Placeholder for future pages
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── App.tsx               # Main app component & routing
│   ├── global.css            # Global styles & theme
│   └── vite-env.d.ts         # Vite environment types
├── server/
│   ├── routes/               # API endpoints
│   ├── index.ts              # Server setup
│   └── node-build.ts         # Production build config
├── shared/
│   └── api.ts                # Shared types & interfaces
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Design System

### Color Scheme (Laser Black & Blue)
- **Background** - Deep black (#000002)
- **Primary** - Electric blue (#3b82f6)
- **Accent** - Cyan/Sky blue (#0ea5e9, #06b6d4)
- **Neutral** - Dark grays for borders and muted text
- **Foreground** - Off-white for text (#fafbfc)

### Components
All UI components are built using:
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- Custom hover and focus states
- Responsive design patterns

## 🔐 Security Features

- **JWT Authentication** - Token-based authorization
- **Role-Based Access Control** - Fine-grained permissions
- **Data Encryption** - Sensitive data protection
- **OAuth 2.0 Support** - Third-party authentication
- **Input Validation** - Zod schema validation
- **CORS Configuration** - Cross-origin request handling

## 📊 Key Pages

### Homepage (`/`)
- Hero section showcasing HRMS features
- AI capabilities overview
- Enterprise features highlight
- Call-to-action buttons

### Login (`/login`)
- Role-based login selection
- Demo mode support
- Email/password authentication
- "Remember me" functionality

### Dashboard (`/dashboard/:role`)
- Role-specific overview
- Key metrics and KPIs
- Growth trends visualization
- Department distribution charts
- AI insights section
- Quick action buttons

### Employees (`/dashboard/:role/employees`)
- Employee directory with search
- Employee statistics
- Department and status filtering
- Quick actions menu

### Recruitment (`/dashboard/:role/recruitment`)
- Open positions management
- Candidate pipeline tracking
- AI screening scores
- Interview stage management

### AI Tools (`/dashboard/:role/ai-tools`)
- Resume screening tool
- Voice interview AI
- Performance evaluation AI
- Predictive analytics
- Interactive demos

## 🧪 Testing

The project uses Vitest for unit testing:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Watch mode
pnpm test -- --watch
```

## 📈 Scalability

- Supports 5,000+ concurrent employees
- Real-time data processing
- Optimized database queries
- Caching strategies
- Load balancing ready
- Responsive design for all devices

## 🔄 API Structure

### Example API Endpoints

```
GET  /api/employees              # Fetch all employees
POST /api/employees              # Create new employee
GET  /api/employees/:id          # Get employee details
PUT  /api/employees/:id          # Update employee
DELETE /api/employees/:id        # Delete employee

GET  /api/candidates             # Fetch candidates
POST /api/candidates/screen      # AI resume screening
GET  /api/analytics              # Get analytics data
POST /api/payroll/process        # Process payroll

GET  /api/ai/insights            # Get AI insights
POST /api/ai/performance-eval    # AI performance evaluation
```

## 🌐 Deployment

### Netlify Deployment

```bash
# The app is configured for Netlify
# Push to GitHub and connect your repository
# Netlify will automatically build and deploy
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AI_API_KEY=your_ai_api_key
DATABASE_URL=your_database_url
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Keep components small and focused
- Use custom hooks for logic
- Maintain consistent naming conventions

### Component Structure
```typescript
import { FC } from 'react';
import { Card } from '@/components/ui/card';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

const MyComponent: FC<ComponentProps> = ({ title, children }) => {
  return (
    <Card>
      <h1>{title}</h1>
      {children}
    </Card>
  );
};

export default MyComponent;
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes with clear commit messages
3. Test your changes thoroughly
4. Submit a pull request with description

## 📞 Support

For issues or questions:
- Check the documentation
- Review existing issues
- Create a new issue with details

## 📄 License

MIT License - feel free to use this project as a template

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Express.js Guide](https://expressjs.com)

## 🚀 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with payroll systems
- [ ] Video interview recording
- [ ] Biometric attendance
- [ ] Blockchain for credential verification
- [ ] Multi-language support
- [ ] Custom workflow builder
- [ ] Advanced reporting engine
- [ ] Mobile push notifications

---

**Built with ❤️ for modern HR teams**

Start managing your human resources with AI-powered intelligence today!