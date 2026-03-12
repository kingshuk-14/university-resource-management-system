// MongoDB Connection and Database Setup Guide

// Database: eventdb
// Connection URL: mongodb+srv://supersepm_project:IronMan%403000@campus-events-cluster.7tojnhs.mongodb.net/eventdb

// To initialize the database with empty collections, run these commands in MongoDB Compass or MongoDB CLI:

// 1. Create Users Collection
db.createCollection("users")

// 2. Create Events Collection
db.createCollection("events")

// 3. Create Registrations Collection
db.createCollection("registrations")

// 4. Create Clubs Collection
db.createCollection("clubs")

// 5. Create Announcements Collection
db.createCollection("announcements")

// 6. Create Indexes for better performance

// Users Collection Indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ idNumber: 1 }, { unique: true })

// Events Collection Indexes
db.events.createIndex({ createdBy: 1 })
db.events.createIndex({ startDate: 1 })

// Registrations Collection Indexes
db.registrations.createIndex({ userId: 1 })
db.registrations.createIndex({ eventId: 1 })

// Clubs Collection Indexes
db.clubs.createIndex({ headId: 1 })

// Run these commands one by one in MongoDB Compass to set up all collections
