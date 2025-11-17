# LTSU Student Portal - Backend API Documentation

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [User Management](#user-management)
4. [Content Management](#content-management)
5. [Academic Management](#academic-management)
6. [Analytics](#analytics)
7. [System Management](#system-management)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)

## 🚀 Introduction

The LTSU Student Portal Backend provides a comprehensive REST API for managing all aspects of the student portal system. Built with Express.js and Firebase, it offers secure, scalable, and feature-rich endpoints for admin operations.

### Base URL
```
http://localhost:3001/api
```

### Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "data": {...},
  "message": "Optional message",
  "error": "Error message if applicable",
  "timestamp": "ISO timestamp"
}
```

## 🔐 Authentication

### Admin Authentication
All admin endpoints require authentication with admin privileges.

**Headers:**
```
Authorization: Bearer <firebase-token>
X-API-Key: <api-key> (optional)
```

### Permission Levels
- **Student**: Can access own data and public content
- **Admin**: Full access to all system features

## 👥 User Management

### Get All Users
```http
GET /users
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 50)
- `search` (string): Search term
- `year` (string): Filter by year
- `specialization` (string): Filter by specialization
- `status` (string): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@ltsu.edu",
      "currentYear": "3",
      "specialization": "AI & ML",
      "status": "active"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 50
}
```

### Get User by ID
```http
GET /users/:id
```

### Update User
```http
PUT /users/:id
```

**Body:**
```json
{
  "firstName": "Updated Name",
  "status": "inactive"
}
```

### Delete User
```http
DELETE /users/:id
```

### Search Users
```http
GET /users/search/:term
```

### Export Users
```http
GET /users/export/:format
```

**Formats:** `json`, `csv`

### Bulk Update Users
```http
POST /users/bulk-update
```

**Body:**
```json
{
  "userIds": ["user1", "user2"],
  "updateData": {
    "status": "active"
  }
}
```

## 📝 Content Management

### Generic Content CRUD
```http
POST   /content/:type
GET    /content/:type
PUT    /content/:type/:id
DELETE /content/:type/:id
```

**Content Types:**
- `events`
- `announcements`
- `deadlines`
- `subjects`
- `syllabus`

### Create Event
```http
POST /content/events
```

**Body:**
```json
{
  "title": "Tech Talk: AI in Education",
  "description": "Exploring AI applications in education",
  "date": "2024-03-15T10:00:00Z",
  "location": "Auditorium A",
  "category": "academic",
  "status": "active"
}
```

### Get Upcoming Events
```http
GET /events/upcoming?limit=10
```

### Create Announcement
```http
POST /content/announcements
```

**Body:**
```json
{
  "title": "Exam Schedule Released",
  "content": "Mid-term exam schedule is now available",
  "priority": "high",
  "status": "active"
}
```

### Get Active Announcements
```http
GET /announcements/active?limit=20
```

### Create Deadline
```http
POST /content/deadlines
```

**Body:**
```json
{
  "title": "Data Structures Assignment",
  "description": "Submit algorithm analysis",
  "dueDate": "2024-03-20T23:59:00Z",
  "subjectCode": "CS201",
  "status": "active"
}
```

### Get Upcoming Deadlines
```http
GET /deadlines/upcoming?limit=10
```

### Get Syllabus by Specialization
```http
GET /syllabus/:specialization/:year/:semester
```

## 📊 Academic Management

### Grades Management

#### Create Grade
```http
POST /grades
```

**Body:**
```json
{
  "studentId": "user-id",
  "subjectCode": "CS201",
  "subjectName": "Data Structures",
  "grade": "A",
  "credits": 4,
  "year": "3",
  "semester": "1"
}
```

#### Get Student Grades
```http
GET /grades/:studentId
```

#### Calculate GPA
```http
GET /grades/:studentId/gpa?year=3&semester=1
```

**Response:**
```json
{
  "success": true,
  "gpa": 8.5,
  "totalCredits": 20,
  "totalSubjects": 5
}
```

### Attendance Management

#### Create Attendance
```http
POST /attendance
```

**Body:**
```json
{
  "studentId": "user-id",
  "subjectCode": "CS201",
  "date": "2024-03-15",
  "status": "present"
}
```

#### Get Student Attendance
```http
GET /attendance/:studentId
```

#### Calculate Attendance Percentage
```http
GET /attendance/:studentId/percentage?subject=CS201&month=3&year=2024
```

**Response:**
```json
{
  "success": true,
  "percentage": 92.5,
  "totalClasses": 40,
  "presentClasses": 37,
  "absentClasses": 3
}
```

#### Bulk Create Attendance
```http
POST /attendance/bulk
```

**Body:**
```json
{
  "records": [
    {
      "studentId": "user1",
      "subjectCode": "CS201",
      "date": "2024-03-15",
      "status": "present"
    }
  ]
}
```

### Academic Statistics
```http
GET /academic/stats
```

## 📈 Analytics

### System Overview
```http
GET /analytics/overview
```

### User Analytics
```http
GET /analytics/users
```

### Content Analytics
```http
GET /analytics/content
```

### Academic Analytics
```http
GET /analytics/academic
```

### Generate Reports
```http
GET /reports/:type?format=json
```

**Report Types:**
- `user-activity`
- `content-performance`
- `academic-performance`
- `system-overview`

### Custom Queries
```http
POST /analytics/query
```

**Body:**
```json
{
  "collection": "users",
  "filters": {
    "currentYear": "3"
  },
  "aggregations": {
    "groupBy": "specialization",
    "count": true
  }
}
```

## ⚙️ System Management

### Dashboard Data
```http
GET /dashboard
```

### System Health Check
```http
GET /status
```

### Real-time Metrics
```http
GET /metrics
```

### Create Backup
```http
POST /backup
```

**Body:**
```json
{
  "includeUsers": true,
  "includeContent": true,
  "includeAcademic": true
}
```

### Restore Backup
```http
POST /restore
```

**Body:** (Backup JSON data)

### System Configuration
```http
GET /config
```

### Clear Cache
```http
POST /cache/clear
```

### System Logs
```http
GET /logs
```

## 🚨 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {...}
}
```

### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `ADMIN_REQUIRED`: Admin privileges required
- `PERMISSION_DENIED`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## ⏱️ Rate Limiting

### Limits
- **Authenticated Users**: 100 requests per 15 minutes
- **Admins**: 500 requests per 15 minutes
- **Public Endpoints**: 50 requests per 15 minutes

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Response
```json
{
  "success": false,
  "error": "Too many requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 900
}
```

## 🔧 Development

### Environment Setup
1. Copy `.env.example` to `.env`
2. Configure Firebase credentials
3. Set environment variables
4. Run `npm install`
5. Start server with `npm run dev`

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

### API Testing
Use tools like Postman or curl:

```bash
curl -X GET "http://localhost:3001/api/health" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📞 Support

For API support or questions:
- Check this documentation first
- Review error messages for details
- Contact the development team

---

**Version:** 1.0.0
**Last Updated:** 2024-03-15
**API Version:** v1