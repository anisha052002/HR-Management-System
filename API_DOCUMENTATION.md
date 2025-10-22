# HRMS AI - API Documentation

Complete API reference for the HRMS AI platform. All endpoints support REST architecture with JSON payloads.

## Base URL

```
http://localhost:8080/api
```

## Authentication

All API requests require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null,
  "timestamp": "2024-04-15T10:30:00Z"
}
```

---

## Employee Management

### Get All Employees

```http
GET /api/employees
```

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 20
- `department` (optional): Filter by department
- `status` (optional): Filter by status (Active, On Leave, etc.)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "EMP001",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@company.com",
      "department": "Engineering",
      "position": "Senior Engineer",
      "status": "Active",
      "joinDate": "2021-06-15",
      "salary": "$125,000"
    }
  ],
  "pagination": {
    "total": 1245,
    "page": 1,
    "limit": 20,
    "pages": 63
  }
}
```

### Get Employee by ID

```http
GET /api/employees/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "EMP001",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@company.com",
    "phone": "+1 (555) 123-4567",
    "department": "Engineering",
    "position": "Senior Engineer",
    "status": "Active",
    "joinDate": "2021-06-15",
    "salary": "$125,000",
    "manager": "John Smith",
    "reportingTo": "DEPT001"
  }
}
```

### Create Employee

```http
POST /api/employees
```

**Request Body:**
```json
{
  "name": "New Employee",
  "email": "new@company.com",
  "phone": "+1 (555) 123-4567",
  "department": "Engineering",
  "position": "Junior Engineer",
  "salary": "$80,000",
  "joinDate": "2024-04-15",
  "reportingTo": "DEPT001"
}
```

### Update Employee

```http
PUT /api/employees/:id
```

**Request Body:** (Same as Create, with fields to update)

### Delete Employee

```http
DELETE /api/employees/:id
```

---

## Recruitment & Candidates

### Get All Candidates

```http
GET /api/candidates
```

**Query Parameters:**
- `position` (optional): Filter by position
- `stage` (optional): Filter by stage (Applied, Screening, Interview, Offer, etc.)
- `sortBy` (optional): Sort by field (aiScore, appliedDate, etc.)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "CAN001",
      "name": "Alex Thompson",
      "email": "alex.thompson@email.com",
      "position": "Senior Engineer",
      "aiScore": 92,
      "stage": "Interview",
      "appliedDate": "2024-01-15",
      "resume": "url_to_resume.pdf"
    }
  ]
}
```

### AI Resume Screening

```http
POST /api/candidates/screen
```

**Request Body:**
```json
{
  "resumeUrl": "https://...",
  "jobDescription": "Job description text",
  "candidateId": "CAN001"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "candidateId": "CAN001",
    "matchScore": 92,
    "keySkills": ["Python", "React", "DevOps"],
    "missingSkills": ["Kubernetes"],
    "experience": "Senior",
    "analysis": "Strong candidate with relevant experience...",
    "recommendation": "Fast Track"
  }
}
```

### Schedule Voice Interview

```http
POST /api/candidates/voice-interview
```

**Request Body:**
```json
{
  "candidateId": "CAN001",
  "questions": [
    "Tell us about your experience with...",
    "How do you handle..."
  ],
  "duration": 15,
  "scheduledAt": "2024-04-20T14:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "interviewId": "INT001",
    "status": "Scheduled",
    "link": "https://interview.hrms.ai/INT001",
    "scheduledAt": "2024-04-20T14:00:00Z"
  }
}
```

---

## Attendance Management

### Get Attendance Records

```http
GET /api/attendance
```

**Query Parameters:**
- `date` (optional): Specific date (YYYY-MM-DD)
- `employeeId` (optional): Filter by employee
- `month` (optional): Filter by month (YYYY-MM)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ATT001",
      "employeeId": "EMP001",
      "date": "2024-04-15",
      "checkIn": "09:00 AM",
      "checkOut": "05:30 PM",
      "duration": "8h 30m",
      "status": "Present"
    }
  ]
}
```

### Check In/Check Out

```http
POST /api/attendance/checkin
```

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "timestamp": "2024-04-15T09:00:00Z",
  "location": "Office - Building A"
}
```

---

## Payroll Management

### Get Payroll Records

```http
GET /api/payroll
```

**Query Parameters:**
- `month` (optional): Filter by month (YYYY-MM)
- `status` (optional): Filter by status (Processed, In Review, Pending)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "PAY001",
      "month": "2024-04-01",
      "status": "Processed",
      "totalAmount": "$192,450",
      "employeeCount": 154,
      "accuracy": 99.8,
      "processedAt": "2024-04-15T10:00:00Z"
    }
  ]
}
```

### Process Payroll

```http
POST /api/payroll/process
```

**Request Body:**
```json
{
  "month": "2024-04-01",
  "includeBonus": true,
  "includeBenefits": true,
  "taxCalculation": "standard"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payrollId": "PAY001",
    "status": "Processing",
    "month": "2024-04-01",
    "estimatedTotal": "$192,450",
    "employees": 154,
    "estimatedCompletion": "2024-04-16T12:00:00Z"
  }
}
```

### Get Employee Salary Details

```http
GET /api/payroll/employee/:employeeId/:month
```

**Response:**
```json
{
  "success": true,
  "data": {
    "employeeId": "EMP001",
    "name": "Sarah Johnson",
    "month": "2024-04-01",
    "baseSalary": "$8,000",
    "bonus": "$500",
    "allowances": "$200",
    "deductions": "$200",
    "taxAmount": "$1,500",
    "netSalary": "$7,000",
    "paymentDate": "2024-04-30"
  }
}
```

---

## Performance & Analytics

### Get Analytics Dashboard Data

```http
GET /api/analytics/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "employeeRetention": "94.2%",
      "avgPerformanceScore": "8.6/10",
      "timeToHire": "18 days",
      "payrollAccuracy": "99.8%"
    },
    "trends": {
      "employeeGrowth": [...],
      "performanceByDepartment": [...],
      "attritionForecast": [...]
    }
  }
}
```

### Get Performance Evaluations

```http
GET /api/performance
```

**Query Parameters:**
- `period` (optional): Time period
- `department` (optional): Filter by department

### AI Performance Evaluation

```http
POST /api/ai/performance-eval
```

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "period": "2024-Q1",
  "metrics": {
    "productivity": 8.5,
    "quality": 9.0,
    "teamwork": 8.2,
    "leadership": 7.8
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "employeeId": "EMP001",
    "overallScore": 8.6,
    "strengths": ["Leadership", "Quality Work"],
    "improvementAreas": ["Time Management"],
    "recommendedDevelopment": ["Advanced Project Management"],
    "recommendation": "Promotion Ready"
  }
}
```

---

## AI Features

### Resume Screening

```http
POST /api/ai/resume-screen
```

### Voice Interview Analysis

```http
POST /api/ai/voice-interview/analyze
```

### Predictive Analytics

```http
GET /api/ai/predictions
```

**Response:**
```json
{
  "success": true,
  "data": {
    "attritionRisk": {
      "nextQuarter": "4.2%",
      "riskEmployees": ["EMP045", "EMP089"]
    },
    "hiringNeeds": {
      "nextQuarter": "+127",
      "byDepartment": {
        "Engineering": 45,
        "Sales": 35,
        "Marketing": 22,
        "HR": 10,
        "Other": 15
      }
    },
    "payrollForecasts": {
      "nextQuarter": "$589,340",
      "trend": "Stable"
    }
  }
}
```

---

## Authentication

### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@company.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "USR001",
      "name": "Admin User",
      "email": "admin@company.com",
      "role": "admin"
    },
    "expiresIn": 86400
  }
}
```

### Logout

```http
POST /api/auth/logout
```

### Refresh Token

```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "token..."
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

### Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

- Rate limit: 1000 requests per hour per API key
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Webhooks

### Supported Events

- `employee.created`
- `employee.updated`
- `employee.deleted`
- `payroll.processed`
- `candidate.applied`
- `interview.completed`
- `performance.evaluated`

### Webhook Payload

```json
{
  "event": "employee.created",
  "timestamp": "2024-04-15T10:30:00Z",
  "data": {
    "employeeId": "EMP001",
    "name": "New Employee",
    "email": "new@company.com"
  }
}
```

---

## Code Examples

### JavaScript/Node.js

```javascript
const API_BASE = 'http://localhost:8080/api';
const TOKEN = 'your_jwt_token';

// Get all employees
async function getEmployees() {
  const response = await fetch(`${API_BASE}/employees`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

// Screen resume with AI
async function screenResume(resumeUrl, jobDescription) {
  const response = await fetch(`${API_BASE}/candidates/screen`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      resumeUrl,
      jobDescription
    })
  });
  return response.json();
}
```

### Python

```python
import requests

API_BASE = 'http://localhost:8080/api'
TOKEN = 'your_jwt_token'

headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}

# Get all employees
response = requests.get(f'{API_BASE}/employees', headers=headers)
employees = response.json()

# Process payroll
payroll_data = {
    'month': '2024-04-01',
    'includeBonus': True,
    'includeBenefits': True
}
response = requests.post(f'{API_BASE}/payroll/process', 
                        json=payroll_data, headers=headers)
result = response.json()
```

---

## Support

For API support and questions:
- Email: api-support@hrms-ai.com
- Documentation: https://docs.hrms-ai.com
- Status Page: https://status.hrms-ai.com
