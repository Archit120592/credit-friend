# Credit Friend - AI-Powered Credit Analysis SaaS

Credit Friend is a comprehensive AI-powered SaaS tool designed to assist sales teams in small financial companies (e.g., NBFCs in India) with professional-level credit analysis for SMEs applying for supply chain finance loans.

## 🚀 Features

### Core Functionality
- **AI-Powered Credit Analysis**: Automated underwriting with OpenAI integration
- **Financial Ratio Computation**: DIO, DSO, DPO, CCC, Current Ratio, Quick Ratio, Debt/Equity, Interest Coverage Ratio, TOL/TNW
- **Risk Segmentation**: Intelligent borrower categorization into risk buckets
- **Report Generation**: Structured reports mimicking senior risk officer analysis
- **Real-time Research**: Market research and industry analysis via AI

### User Management
- **Role-based Access**: Admin and Sales user roles with different permissions
- **JWT Authentication**: Secure authentication with token-based sessions
- **License Key Validation**: Company-wide license management
- **Profile Management**: User profiles with preferences and achievements

### Data Management
- **Flexible Input Methods**: Manual entry, PDF/Excel upload with OCR fallback
- **Document Parsing**: Intelligent extraction of financial data from documents
- **Company Management**: Comprehensive company profiles and financial data
- **Report History**: Version control and audit trail for all reports

### Gamification & Learning
- **Finance Academy**: Interactive tutorials and learning modules
- **Achievement System**: Badges, points, and progress tracking
- **Quizzes**: Knowledge assessment with scoring
- **Progress Analytics**: Performance tracking and insights

### UI/UX Features
- **Modern Design**: Material-UI with custom theme
- **Responsive Layout**: Mobile-friendly interface
- **Interactive Charts**: Recharts integration for data visualization
- **Animations**: Framer Motion for smooth transitions
- **Real-time Updates**: Live data updates and notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **OpenAI API** for AI-powered analysis
- **Multer** for file uploads
- **pdf-parse** and **Tesseract.js** for document processing
- **bcrypt** for password hashing

### Frontend
- **React.js** with React Router
- **Material-UI (MUI)** for UI components
- **Recharts** for data visualization
- **Framer Motion** for animations
- **React Query** for data fetching and caching
- **Formik & Yup** for form handling and validation
- **React Hot Toast** for notifications

### Development Tools
- **Jest** and **Supertest** for testing
- **ESLint** and **Prettier** for code formatting
- **Nodemon** for development server
- **Concurrently** for running multiple scripts

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- OpenAI API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd credit-friend
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/credit-friend
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```

## 🚀 Usage

### Initial Setup

1. **Access the application** at `http://localhost:3000`
2. **Register an admin account** with your license key
3. **Configure credit logic** in the Admin Panel
4. **Add users** and assign roles as needed

### Workflow

1. **Add Companies**: Upload company data or manually enter financial information
2. **Generate Reports**: Use AI to analyze companies and generate credit reports
3. **Review & Approve**: Review generated reports and approve/reject as needed
4. **Track Progress**: Monitor performance through the dashboard and analytics

### Key Features

#### Company Management
- Add new companies with comprehensive financial data
- Upload documents (PDF/Excel) for automated data extraction
- View detailed company profiles with calculated ratios
- Track company status and risk categories

#### Report Generation
- AI-powered credit analysis with structured narratives
- Customizable report templates and sections
- Export reports to PDF format
- Version control and approval workflow

#### Admin Functions
- User management and role assignment
- Credit logic configuration and versioning
- System analytics and performance monitoring
- License key management

#### Finance Academy
- Interactive learning modules
- Progress tracking and achievements
- Quizzes and assessments
- Gamification elements

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile

### Companies
- `GET /api/company` - Get all companies
- `POST /api/company` - Create new company
- `GET /api/company/:id` - Get company details
- `PUT /api/company/:id` - Update company
- `DELETE /api/company/:id` - Delete company

### Reports
- `GET /api/report` - Get all reports
- `POST /api/report/generate` - Generate AI report
- `GET /api/report/:id` - Get report details
- `PUT /api/report/:id` - Update report
- `DELETE /api/report/:id` - Delete report

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `GET /api/admin/logic` - Get credit logic
- `POST /api/admin/logic` - Create credit logic

### Academy
- `GET /api/academy` - Get academy data
- `GET /api/academy/progress` - Get user progress
- `POST /api/academy/complete-lesson` - Complete lesson
- `POST /api/academy/submit-quiz` - Submit quiz

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📦 Deployment

### Backend Deployment (Heroku)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set OPENAI_API_KEY=your-openai-key
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting platform
```

## 🔧 Configuration

### Credit Logic Configuration
The system allows customization of credit analysis criteria through the Admin Panel:

- **Risk Buckets**: Define risk categories and thresholds
- **Scoring Weights**: Configure importance of different factors
- **Decision Matrix**: Set approval/rejection criteria
- **Benchmarks**: Industry-specific benchmarks for ratios

### AI Configuration
- **OpenAI Model**: Configure which GPT model to use
- **Prompt Templates**: Customize AI prompts for different report types
- **Analysis Depth**: Control the level of detail in AI analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔮 Roadmap

### Upcoming Features
- **Advanced Analytics**: Machine learning models for risk prediction
- **Mobile App**: Native mobile application
- **API Integration**: Third-party data providers
- **Advanced Reporting**: Custom report builder
- **Multi-language Support**: Internationalization
- **Advanced Security**: Two-factor authentication, audit logs

### Performance Improvements
- **Caching**: Redis integration for better performance
- **CDN**: Content delivery network for static assets
- **Database Optimization**: Query optimization and indexing
- **Image Processing**: Advanced OCR and document processing

---

**Credit Friend** - Empowering financial institutions with AI-driven credit analysis. 