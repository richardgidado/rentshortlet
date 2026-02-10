# AzulHomes Admin System Guide

## 🚀 **Admin Access**

### **How to Access Admin Panel**
1. Navigate to your website
2. Click **"Sign In"** in the navigation menu
3. You'll be redirected to: `/admin`
4. Use the demo credentials below to sign in

---

## 🔐 **Demo Credentials**

### **Admin Login Credentials**
```
Email: admin@azulhomes.com
Password: admin123
```

**Note**: These are mock credentials for demonstration purposes. In production, you would have a proper database with secure password hashing.

---

## 📊 **Admin Dashboard Features**

### **1. Dashboard Overview**
- **Property Statistics**: Total, Available, and Unavailable properties
- **Average Rating**: Overall property rating across all listings
- **Quick Actions**: Add properties, view reports, manage bookings
- **Real-time Stats**: Live counts and metrics

### **2. Property Management** 
- **View All Properties**: Grid layout showing all shortlets
- **Toggle Availability**: One-click to mark properties available/unavailable
- **Property Details**: Name, location, price, rating, amenities
- **Quick Actions**: Edit property, view bookings

### **3. Booking Management**
- **Future Feature**: Currently shows placeholder for booking management
- **Planned**: View all reservations, approve/reject bookings
- **Guest Information**: Contact details and special requests

---

## 🎯 **Key Functionality**

### **Managing Property Availability**

**To Mark a Property Available:**
1. Go to **Admin** → **Properties** tab
2. Find the property you want to update
3. Click **"Mark Available"** button (green)
4. Status immediately changes to "Available"

**To Mark a Property Unavailable:**
1. Go to **Admin** → **Properties** tab  
2. Find the property you want to update
3. Click **"Mark Unavailable"** button (red)
4. Status immediately changes to "Unavailable"

**Visual Indicators:**
- 🟢 **Green Badge**: Property is available for booking
- 🔴 **Red Badge**: Property is unavailable

---

## 🔄 **User Flow**

### **Admin Journey**
```
1. Click "Sign In" in navigation
2. Enter credentials: admin@azulhomes.com / admin123
3. View Dashboard Overview
4. Switch to "Properties" tab
5. Manage availability with toggle buttons
6. Click "Logout" when done
```

### **Guest Journey** (After Availability Changes)
```
1. Guest visits website
2. Views available properties only
3. Books available property
4. Booking request sent to admin via EmailJS
5. Admin receives email with booking details
```

---

## 💾 **Data Persistence**

### **Current Implementation**
- **Properties**: Uses mock data from `lib/constants.ts`
- **Availability**: Stored in component state (resets on page refresh)
- **Authentication**: Mock authentication (in-memory only)

### **Production Considerations**
- **Database**: Implement PostgreSQL/MongoDB for data persistence
- **Authentication**: Use NextAuth.js or similar with secure password hashing
- **Real-time**: Add WebSocket or polling for live updates
- **Backup**: Implement regular data backups

---

## 🛠️ **Technical Implementation**

### **File Structure**
```
azulhomes/
├── components/
│   ├── AdminLogin.tsx       # Login page with demo credentials
│   ├── AdminDashboard.tsx   # Main dashboard with property management
│   └── Navigation.tsx       # Updated with Admin link
├── app/
│   ├── admin/
│   │   └── page.tsx         # Admin route handler
│   └── page.tsx             # Main website
└── lib/
    └── constants.ts         # Mock property data
```

### **Key Features Implemented**
✅ **Admin Authentication**: Mock login system  
✅ **Dashboard Overview**: Statistics and quick actions  
✅ **Property Management**: Toggle availability status  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Navigation Integration**: Admin link in main menu  

### **Planned Features**
⏳ **Database Integration**: Persistent data storage  
⏳ **Real Authentication**: Secure user management  
⏳ **Booking System**: Full reservation management  
⏳ **Analytics**: Revenue and occupancy reports  
⏳ **Notifications**: Email alerts for bookings  

---

## 🚨 **Current Limitations**

### **Demo/Development Version**
1. **No Database**: Changes reset on page refresh
2. **Mock Authentication**: No real security
3. **No Email Notifications**: Admin doesn't receive booking emails yet
4. **Static Data**: Uses hardcoded property list

### **Production Requirements**
1. **Database Setup**: Implement proper data storage
2. **Authentication**: Secure login system
3. **Email Integration**: Connect to EmailJS for real notifications
4. **API Endpoints**: Create CRUD operations for properties
5. **User Management**: Role-based access control

---

## 🎯 **Testing the System**

### **Step-by-Step Test**
1. **Open website** → Click "Sign In" in navigation
2. **Login** → Use credentials: admin@azulhomes.com / admin123
3. **Dashboard** → See property statistics and overview
4. **Properties Tab** → View all properties with availability status
5. **Toggle Status** → Click "Mark Available/Unavailable" buttons
6. **Verify Changes** → Status updates immediately
7. **Logout** → Return to login screen

### **Expected Results**
- ✅ Admin login works with demo credentials
- ✅ Dashboard shows correct property statistics
- ✅ All properties display with current availability status
- ✅ Toggle buttons work instantly
- ✅ Visual status indicators update correctly

---

## 🔧 **Customization**

### **Adding New Properties**
Currently, properties are loaded from `lib/constants.ts`. To add new properties:

1. Edit `azulhomes/lib/constants.ts`
2. Add new property objects to the `mockShortlets` array
3. Include: name, location, price, rating, reviews, image, amenities, available, ownerEmail

### **Styling Changes**
- Admin components use Tailwind CSS
- Color scheme: Blue/cyan gradients for primary actions
- Status colors: Green (available), Red (unavailable)
- Fully responsive design

---

## 📞 **Support**

### **Troubleshooting**
- **Login Issues**: Use exact credentials: admin@azulhomes.com / admin123
- **Changes Not Saving**: Current version resets on page refresh (normal for demo)
- **Styling Issues**: Clear browser cache and reload

### **Future Development**
- Database integration for persistent data
- Real user authentication system
- Advanced booking management
- Revenue analytics and reporting