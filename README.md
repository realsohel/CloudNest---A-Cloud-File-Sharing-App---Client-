# CloudNest – Secure Cloud File Sharing App (Frontend)

**Motto**: "Your Files, Your Cloud, Your Control."

**Overview**:
CloudNest is a modern **cloud-based file storage and sharing frontend application** built using **React + Vite**.
The platform enables users to upload, manage, and share files securely, control access through **public/private visibility toggles**, and purchase storage credits using **Razorpay**.
User authentication, authorization, and session handling are managed using **Clerk Authentication**.

---
## LLD with Flowchart
![LLD of CloudNest](https://drive.google.com/uc?export=view&id=1dAPAriQ4O8LPGlD2IL0fsKKGSXctLunG)


## Pages & Features

### 1. Landing Page
- Hero section with sign-in / sign-up call-to-action
- Feature highlights section
- Pricing plans preview
- Testimonials section
- CTA section with footer
- Auto-redirects signed-in users to the Dashboard

---

### 2. Dashboard
- Quick upload widget (drag & drop, up to 5 files at once)
- Real-time credit validation before upload
- Recently uploaded files list (latest 5, sorted by upload date)
- Inline success/error/info messaging

---

### 3. My Files Page
- List and grid view toggle for uploaded files
- File type detection with dynamic icons (video, audio, image, document, other)
- Toggle file visibility between **Public** and **Private**
- Generate and copy shareable public links
- Download files directly from S3
- Delete files with confirmation dialog

---

### 4. Public File View Page
- Publicly accessible page for shared files (`/file/:fileId`)
- Displays file name, type, size, and shared date
- Download button for public access
- Share link modal for re-sharing
- Notice banner indicating the file is publicly accessible

---

### 5. Uploads Page
- Dedicated multi-file upload interface
- Enforces a maximum of 5 files per upload batch
- Credit-based upload restriction (blocks upload if credits are insufficient)
- Upload progress and status messaging

---

### 6. Subscription Page
- Displays current credit balance
- Credit plans with feature comparison:
  1. **Premium Package**
     - 500 credits
     - Popular/highlighted plan
  2. **Ultimate Package**
     - 5000 credits
- Razorpay Checkout integration for secure purchase
- "How credits work" info section

---

### 7. Transaction History Page
- Displays all successful payment transactions
- Shows date, plan, amount paid, credits added, and payment ID
- Empty-state prompt directing users to the Subscription page

---

### 8. Not Found Page
- Custom 404 page for invalid routes with a link back to home

---

## Authentication & User Management

Authentication is handled using **Clerk**, providing:
- Email & password login
- OAuth authentication
- Secure JWT-based session handling (RS256, verified against Clerk's JWKS)
- Protected routes via `ProtectedLayout` (redirects signed-out users to sign-in)

User details are automatically synced with the backend via **Clerk Webhooks**, which listen for `user.created`, `user.updated`, and `user.deleted` events and keep the MongoDB profile store in sync with Clerk.

---

## Credit Management System

- Each file upload consumes **1 credit**
- New users start with **5 free credits**
- Credits are stored globally using **React Context API** (`UserCreditsContext`)
- Credits update instantly after:
  - Successful file upload
  - Successful credit purchase
- Maximum of 5 files can be uploaded in a single batch, gated by both file count and remaining credits

---

## File Upload & Sharing Flow

1. User selects up to 5 files
2. Authentication and credit availability are verified
3. Files are sent to the backend as `multipart/form-data`
4. Backend uploads each file to **AWS S3** and stores metadata in MongoDB
5. One credit is deducted per file uploaded
6. File appears in **My Files**, private by default
7. User can toggle a file to **Public**, generating a shareable link (`/file/:fileId`)
8. Anyone with the public link can view file details and download it, no login required

---

## Payment Integration

- Razorpay Checkout for order creation and payment
- Backend creates a pending order and verifies payment via **HMAC SHA-256** signature validation
- Credits are added instantly after successful verification
- Transaction status (`PENDING`, `SUCCESS`, `FAILED`, `ERROR`) is tracked per payment
- UI updates credits in real time upon successful payment

---

## State Management

Global state is managed using **React Context API**:
- User credits (`UserCreditsContext`)
- File list and upload queue
- Auth-aware routing and redirects
- Backend communication via a shared Axios instance

---

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React (icons)
- React Hot Toast

### Authentication & Payments
- Clerk Authentication (`@clerk/react`)
- Razorpay Payment Gateway

### Backend Integration
- Spring Boot REST API
- MongoDB (file metadata, profiles, credits, transactions)
- AWS S3 (file storage)
- Clerk JWT verification + Webhooks (user sync)

---

## Deployment

- **Frontend**: Deployed on **Vercel**
- **Backend**: Hosted on an **AWS EC2** instance
- **Webhook Tunneling**: **ngrok** used to expose local/EC2 backend endpoints to Clerk for webhook delivery
- **File Storage**: **AWS S3** bucket for uploaded files

---

## Conclusion

CloudNest Frontend is a production-ready, secure, and responsive application demonstrating real-world usage of authentication, credit-based access control, cloud file storage, payments, and modern UI/UX practices.
The project showcases clean architecture, context-driven state management, and seamless integration with a Spring Boot + MongoDB + AWS S3 backend.
