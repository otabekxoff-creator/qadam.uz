# Step.uz API Documentation

## Overview

Step.uz - O'zbekiston yoshlari uchun karyera platformasi API. Bu API talabalar, kompaniyalar va startaplar uchun xizmatlarni taqdim etadi.

## Base URL

- **Production**: `https://step-uz.onrender.com`
- **Development**: `http://localhost:5000`

## Authentication

API JWT token orqali autentifikatsiyadan o'tadi. Token `Authorization` header da yuboriladi:

```
Authorization: Bearer <your_jwt_token>
```

## Rate Limiting

- Umumiy API: 100 so'rov / 15 daqiqa
- Auth endpointlar: 5 so'rov / 15 daqiqa

## Response Format

Barcha response lar JSON formatda:

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

Error response:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### Authentication

#### POST /api/auth/register
Foydalanuvchi ro'yxatdan o'tishi

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "STUDENT" | "COMPANY",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /api/auth/login
Foydalanuvchi kirishi

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/verify-register-code
Email tasdiqlash kodi

**Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

#### GET /api/auth/me
Joriy foydalanuvchi ma'lumotlari

**Headers:**
```
Authorization: Bearer <token>
```

#### POST /api/auth/logout
Chiqish

**Headers:**
```
Authorization: Bearer <token>
```

### Jobs

#### GET /api/jobs
Barcha ish o'rinlari ro'yxati

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string
- `location`: string
- `jobType`: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE"

#### GET /api/jobs/:id
Ish o'rinlari tafsilotlari

#### POST /api/jobs
Yangi ish o'rinlari qo'shish (faqat kompaniyalar)

**Body:**
```json
{
  "title": "Frontend Developer",
  "description": "Job description",
  "location": "Tashkent",
  "jobType": "FULL_TIME",
  "salary": "1000-2000$"
}
```

### Applications

#### GET /api/applications
Arizalar ro'yxati (faqat o'z arizalaringiz)

#### POST /api/applications
Ariza qoldirish

**Body:**
```json
{
  "jobId": "job_id",
  "coverLetter": "Cover letter text"
}
```

#### PUT /api/applications/:id
Arizani yangilash

#### DELETE /api/applications/:id
Arizani o'chirish

### Students

#### GET /api/students/profile
Talaba profili

#### PUT /api/students/profile
Talaba profilini yangilash

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+998901234567",
  "university": "TATU",
  "major": "Computer Science",
  "skills": ["React", "Node.js"]
}
```

#### POST /api/students/upload-avatar
Avatar yuklash

**Content-Type:** `multipart/form-data`

### Companies

#### GET /api/companies/profile
Kompaniya profili

#### PUT /api/companies/profile
Kompaniya profilini yangilash

**Body:**
```json
{
  "name": "Company Name",
  "description": "Company description",
  "industry": "Technology",
  "location": "Tashkent",
  "website": "https://company.com"
}
```

## Error Codes

- `UNAUTHORIZED`: Avtorizatsiya talab etiladi
- `FORBIDDEN`: Ruxsat yo'q
- `NOT_FOUND`: Resurs topilmadi
- `VALIDATION_ERROR`: Validatsiya xatosi
- `RATE_LIMIT_EXCEEDED`: So'rovlar limiti oshdi
- `INTERNAL_ERROR`: Server xatosi

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  role: "STUDENT" | "COMPANY" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}
```

### Student
```typescript
interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  university?: string;
  major?: string;
  skills?: string[];
  avatar?: string;
}
```

### Company
```typescript
interface Company {
  id: string;
  userId: string;
  name: string;
  description?: string;
  industry?: string;
  location?: string;
  website?: string;
  logo?: string;
}
```

### Job
```typescript
interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  jobType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE";
  salary?: string;
  status: "ACTIVE" | "CLOSED";
  createdAt: string;
}
```

## SDK va Misolalar

### JavaScript/TypeScript
```typescript
// API client
const API_BASE = 'https://step-uz.onrender.com/api';

class StepUzAPI {
  constructor(private token: string) {}

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async getJobs() {
    const response = await fetch(`${API_BASE}/jobs`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return response.json();
  }
}
```

### cURL
```bash
# Login
curl -X POST https://step-uz.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get jobs
curl -X GET https://step-uz.onrender.com/api/jobs \
  -H "Authorization: Bearer <token>"
```

## Support

- Email: support@step.uz
- GitHub: https://github.com/otabekxoff-creator/step.uz
- Documentation: https://docs.step.uz

## License

MIT License - see LICENSE file for details.
