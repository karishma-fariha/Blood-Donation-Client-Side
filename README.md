🩸Blood Donation Management System
BLOOD DONATION is a full-stack MERN application designed to bridge the gap between blood donors and those in need. It features a robust administrative system for managing donation requests, a secure funding platform, and a responsive user experience.

🚀 Live Link
View Live Site ()

✨ Key Features
👤 For Users (Donors)
Secure Authentication: Firebase-powered login and registration with custom JWT authorization.

Donation Requests: Create, edit, and delete personal blood donation requests.

Funding Page: A private portal to support the organization using Stripe Payment Integration.

Search & Filter: Find donors by blood group, district, and upazila.

🛠️ For Volunteers
Dashboard Access: Overview of all donation requests and users.

Content Management: Create and manage blog posts to raise awareness.

Status Control: Update donation request status (Pending, In-progress, Done, Canceled).

👑 For Admins
Full Control: Manage all users and promote/demote roles (User, Volunteer, Admin).

Analytics: Visualized dashboard showing total revenue, donor counts, and request statistics.

System Settings: High-level management of the entire blood donation ecosystem.

💻 Technologies Used
Frontend:

React.js (Vite)

Tailwind CSS & DaisyUI

TanStack Query (React Query)

Axios (with Interceptors)

React Hook Form & React Toastify

Backend:

Node.js & Express.js

MongoDB (Aggregation Pipelines)

JSON Web Token (JWT)

Stripe API (Payment Intent)

Authentication:

Firebase Authentication

🛠️ Installation & Setup
1. Clone the repository
Bash

git clone https://github.com/your-username/your-repo-name.git
2. Server Setup
Bash

cd server
npm install
Create a .env file in the server folder:

Plaintext

DB_USER=your_db_username
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_long_random_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the server: npm start or nodemon index.js.

3. Client Setup
Bash

cd client
npm install
Create a .env.local file in the client folder:

Plaintext

VITE_STRIPE_PK=your_stripe_publishable_key
VITE_apiKey=your_firebase_api_key
# ... other firebase config keys
Run the frontend: npm run dev.

🛡️ Core Concepts Implemented
JWT Hybrid Flow: Uses Firebase for identity and a custom JWT for backend authorization.

Axios Interceptors: A custom useAxiosSecure hook that automatically attaches Bearer tokens and handles 401/403 auto-logouts.

MongoDB Aggregation: Used $group and $sum operators to calculate organizational revenue efficiently.

Stripe Integration: Secure credit card processing using PaymentIntents and CardElement.

🤝 Contribution
Contributions, issues, and feature requests are welcome!