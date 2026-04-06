FinanceControl & RBAC Dashboard (Clone Chain)
A production-grade MERN stack financial management system featuring Role-Based Access Control (RBAC), secure JWT-based authentication, and an automated Audit Logging system.

🚀 Key Features
Secure Authentication: Dual-token system (Access & Refresh) stored in HTTP-Only Cookies for maximum XSS protection.

Role-Based Access Control (RBAC): Tiered permissions for Admin, Analyst, and Viewer roles.

Financial Intelligence: Real-time summary (Income, Expense, Balance) powered by MongoDB Aggregation Pipelines.

Automated Audit Logs: "Silent" background logging of all sensitive actions (deletions, role changes, logins) for system accountability.

Industrial Error Handling: Centralized ApiError class and asyncHandler for consistent JSON responses.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB Atlas (Mongoose ODM)

Authentication: JSON Web Tokens (JWT) & Bcrypt.js

Security: CORS, Cookie-Parser, Helmet

📁 Project Structure
Plaintext
src/
├── controllers/    # Business logic & Request handling
├── models/         # Mongoose schemas (User, Transaction, AuditLog)
├── middlewares/    # Auth, Role-check, and Error middlewares
├── routes/         # API endpoint definitions
├── db/             # Database connection logic
├── utils/          # Standardized ApiError & ApiResponse classes
└── index.js        # Entry point
⚙️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/lavishawasthi/Zorvyn-project.git
cd project-name
Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root directory and add the following:

Code snippet
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=http://localhost:5173
Run the server:

Bash
npm run dev
📡 API Endpoints
Authentication
POST /api/v1/users/register - Create account

POST /api/v1/users/login - Authenticate & Set Cookies

POST /api/v1/users/logout - Clear session

Transactions (RBAC Protected)
GET /api/v1/transactions/ - Get all user records

POST /api/v1/transactions/ - Add new record (Admin/Analyst)

GET /api/v1/transactions/summary - Aggregate financial stats

Admin & Audit
GET /api/v1/audit/ - View system logs (Admin Only)

PATCH /api/v1/users/update-role - Manage permissions (Admin Only)

🛡️ Security Implementation
This project follows OWASP security principles:

No LocalStorage: Sensitive tokens are never stored in the browser's local storage to prevent data theft via XSS.

Data Isolation: Every database query is strictly scoped to the req.user._id, ensuring users cannot access or modify each other's financial data.

Input Validation: Sanitization of inputs to prevent NoSQL injection.

🔗 Documentation
For detailed request/response examples, view the Live Postman Documentation.
