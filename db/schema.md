# MongoDB Database Schema Documentation

## Database Connection
- **Database Name**: eventdb
- **Connection URL**: mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb

## Collections

### 1. Users Collection
**Collection Name**: `users`

**Schema Fields**:
- `_id`: ObjectId (Auto-generated)
- `name`: String (Required) - User's full name
- `email`: String (Required, Unique) - User's email address
- `idNumber`: String (Required, Unique) - Student/Employee ID
- `password`: String (Required) - Hashed password
- `role`: String (Enum: 'student', 'admin', 'club_head') - User's role
  - Determined by email domain:
  - `@student.com` → `student`
  - `@admin.com` → `admin`
  - `@head.com` → `club_head`
- `createdAt`: Date (Auto) - When the user was created
- `updatedAt`: Date (Auto) - When the user was last updated

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@student.com",
  "idNumber": "S001",
  "password": "$2a$10$...(hashed)",
  "role": "student",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

### 2. Events Collection
**Collection Name**: `events`

**Description**: Stores information about campus events

**Schema Fields**:
- `_id`: ObjectId (Auto-generated)
- `title`: String (Required) - Event title
- `description`: String - Event description
- `startDate`: Date - Event start date/time
- `endDate`: Date - Event end date/time
- `location`: String - Event location
- `capacity`: Number - Maximum participants
- `registrations`: Number - Current registrations
- `createdBy`: ObjectId (Reference to Users) - Creator's user ID
- `status`: String (Enum: 'draft', 'published', 'cancelled', 'completed') - Event status
- `createdAt`: Date (Auto)
- `updatedAt`: Date (Auto)

---

### 3. Registrations Collection
**Collection Name**: `registrations`

**Description**: Stores event registration records

**Schema Fields**:
- `_id`: ObjectId (Auto-generated)
- `userId`: ObjectId (Reference to Users) - Participant's user ID
- `eventId`: ObjectId (Reference to Events) - Event ID
- `registeredAt`: Date - Registration timestamp
- `status`: String (Enum: 'registered', 'attended', 'cancelled') - Registration status

---

### 4. Clubs Collection
**Collection Name**: `clubs`

**Description**: Stores club information

**Schema Fields**:
- `_id`: ObjectId (Auto-generated)
- `name`: String (Required) - Club name
- `description`: String - Club description
- `headId`: ObjectId (Reference to Users) - Club head's user ID
- `members`: Array of ObjectId - Member user IDs
- `createdAt`: Date (Auto)
- `updatedAt`: Date (Auto)

---

### 5. Announcements Collection
**Collection Name**: `announcements`

**Description**: Stores announcements

**Schema Fields**:
- `_id`: ObjectId (Auto-generated)
- `title`: String (Required) - Announcement title
- `content`: String (Required) - Announcement content
- `createdBy`: ObjectId (Reference to Users) - Creator's user ID
- `visibility`: String (Enum: 'public', 'admin', 'club') - Who can see it
- `createdAt`: Date (Auto)
- `updatedAt`: Date (Auto)

---

## Indexes Recommended

```javascript
// Users Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ idNumber: 1 }, { unique: true })

// Events Collection
db.events.createIndex({ createdBy: 1 })
db.events.createIndex({ startDate: 1 })

// Registrations Collection
db.registrations.createIndex({ userId: 1 })
db.registrations.createIndex({ eventId: 1 })

// Clubs Collection
db.clubs.createIndex({ headId: 1 })
```

## Current Status
✅ Empty collections created and ready for use
✅ User authentication with role-based access
✅ Database structure defined
