# פרויקט חנות נעליים - Shoe Store

## תיאור הפרויקט
מערכת ניהול חנות נעליים מלאה עם אימות משתמשים, ניהול מוצרים, ו-API מלא.

---

## טכנולוגיות בשימוש

### Backend
- **Node.js** - סביבת הרצה
- **Express** - פריימוורק לשרת
- **MongoDB** - מסד נתונים
- **Mongoose** - ODM למונגו DB

### אבטחה
- **bcrypt** - הצפנת סיסמאות
- **jsonwebtoken (JWT)** - אימות משתמשים
- **dotenv** - ניהול משתני סביבה

### Frontend
- **EJS** - מנוע תבניות לדפי HTML

---

## מבנה הפרויקט

```
├── models/              # מודלים (סכמות)
│   ├── Shoe.js         # מודל נעל
│   └── user.js         # מודל משתמש
├── views/              # דפי EJS
│   ├── index.ejs       # דף הבית
│   ├── add-shoe.ejs    # טופס הוספת נעל
│   ├── register.ejs    # דף הרשמה
│   └── login.ejs       # דף התחברות
├── controllers/        # לוגיקה עסקית
│   ├── shoeController.js
│   └── userController.js
├── routes/            # ניתובים
│   ├── shoeRoutes.js
│   └── userRoutes.js
├── middlewares/       # Middleware
│   ├── checkShoeExists.js
│   ├── errorHandler.js
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── .env              # משתני סביבה
├── app.js            # קובץ ראשי
└── package.json      # תלויות
```

---

## Collections במסד הנתונים

### 1. Shoes (נעליים)
```javascript
{
  name: String,        // שם הנעל
  brand: String,       // מותג
  price: Number,       // מחיר
  size: Number,        // מידה
  color: String,       // צבע
  inStock: Boolean,    // במלאי?
  category: String,    // קטגוריה
  image: String        // קישור לתמונה
}
```

### 2. Users (משתמשים)
```javascript
{
  username: String,    // שם משתמש (ייחודי)
  email: String,       // אימייל (ייחודי)
  password: String,    // סיסמה מוצפנת
  role: String,        // תפקיד (user/admin)
  createdAt: Date      // תאריך יצירה
}
```

---

## API Endpoints

### משתמשים (Users)

#### הרשמה
- **POST** `/users/register`
- Body:
```json
{
  "username": "user1",
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

#### התחברות
- **POST** `/users/login`
- Body:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
- מחזיר: JWT token

---

### נעליים (Shoes)

#### קבלת כל הנעליים
- **GET** `/shoes`
- אין צורך באימות

#### קבלת נעל לפי ID
- **GET** `/shoes/:id`
- אין צורך באימות
- Middleware: בודק אם הנעל קיימת

#### הוספת נעל חדשה
- **POST** `/shoes`
- דורש: אימות + הרשאת admin
- Body:
```json
{
  "name": "Nike Air Max",
  "brand": "Nike",
  "price": 299.99,
  "size": 42,
  "color": "Black",
  "category": "ספורט",
  "inStock": true
}
```

#### עדכון נעל
- **PUT** `/shoes/:id`
- דורש: אימות + הרשאת admin
- Middleware: בודק אם הנעל קיימת

#### מחיקת נעל
- **DELETE** `/shoes/:id`
- דורש: אימות + הרשאת admin
- Middleware: בודק אם הנעל קיימת

---

## דפי EJS (דפדפן)

### דף הבית
- **URL:** `http://localhost:3000/`
- מציג: כל הנעליים וכל המשתמשים

### הוספת נעל
- **URL:** `http://localhost:3000/add-shoe`
- טופס להוספת נעל חדשה

### הרשמה
- **URL:** `http://localhost:3000/register`
- טופס הרשמת משתמש חדש

### התחברות
- **URL:** `http://localhost:3000/login`
- טופס התחברות למערכת

---

## Middleware

### 1. checkShoeExists
- בודק אם נעל קיימת לפני GET/PUT/DELETE
- מונע שגיאות ומשפר ביצועים

### 2. authMiddleware
- בודק אם המשתמש מחזיק JWT תקין
- מוסיף את פרטי המשתמש ל-`req.user`

### 3. roleMiddleware
- בודק אם למשתמש יש הרשאה מתאימה (admin/user)

### 4. errorHandler
- טיפול מרכזי בשגיאות
- מחזיר status codes מתאימים (400, 404, 500)

---

## אבטחה

### הצפנת סיסמאות
- שימוש ב-**bcrypt** עם 10 rounds
- הסיסמה לעולם לא נשמרת בטקסט פשוט

### JWT (JSON Web Token)
- נוצר בהתחברות
- תוקף: 24 שעות
- מכיל: id, username, role

### הגנה על Routes
- רק admin יכול להוסיף/לעדכן/למחוק נעליים
- משתמשים רגילים יכולים רק לצפות

---

## משתני סביבה (.env)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shoestore
JWT_SECRET=mySecretKey
```

---

## התקנה והרצה

### 1. התקנת תלויות
```bash
npm install
```

### 2. הרצת MongoDB
וודאי ש-MongoDB רץ על המחשב

### 3. הרצת השרת
```bash
node app.js
```

### 4. פתיחת הדפדפן
```
http://localhost:3000
```

---

## תלויות (Dependencies)

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "dotenv": "^16.0.3",
  "ejs": "^3.1.9",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2"
}
```

---

## תכונות מיוחדות

✅ **MVC Architecture** - הפרדה בין Model, View, Controller
✅ **CRUD מלא** - Create, Read, Update, Delete
✅ **אימות משתמשים** - הרשמה והתחברות
✅ **הצפנת סיסמאות** - bcrypt
✅ **JWT** - אימות מבוסס טוקן
✅ **הרשאות** - user / admin
✅ **Middleware** - בדיקת קיום, אימות, הרשאות
✅ **Error Handler מרכזי** - טיפול בשגיאות
✅ **ולידציה** - בדיקת שדות חובה
✅ **EJS Views** - דפי HTML דינמיים
✅ **Responsive Design** - עיצוב מותאם למובייל

---

## דוגמאות שימוש ב-Postman

### 1. הרשמה
```
POST http://localhost:3000/users/register
Content-Type: application/json

{
  "username": "admin1",
  "email": "admin@example.com",
  "password": "123456",
  "role": "admin"
}
```

### 2. התחברות
```
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "123456"
}
```

תקבל: `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`

### 3. הוספת נעל (עם token)
```
POST http://localhost:3000/shoes
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Adidas Superstar",
  "brand": "Adidas",
  "price": 299.99,
  "size": 42
}
```

---

## סטטוס קודים

- **200** - הצלחה
- **201** - נוצר בהצלחה
- **400** - בקשה שגויה (חסרים שדות)
- **401** - לא מאומת (אין token או token לא תקין)
- **403** - אין הרשאה (לא admin)
- **404** - לא נמצא
- **500** - שגיאת שרת

---

## יוצר הפרויקט
**ריבקה ניסן**

תאריך: 2025

---

## רישיון
פרויקט לימודי - כל הזכויות שמורות
