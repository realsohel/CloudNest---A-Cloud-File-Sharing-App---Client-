# CloudNest – Cloud File Sharing App (Frontend)

**Motto**: “Your Files. Your Cloud. Your Control.”

**Overview**:  
CloudNest is a modern **cloud file storage and sharing frontend application** built using **React + Vite**.

The platform allows users to upload, manage, download, delete, and share files through a **credit-based file upload system**. Users can purchase additional credits through **Razorpay**, while authentication and user sessions are managed using **Clerk Authentication**.

The frontend communicates with a **Spring Boot backend** deployed on AWS EC2, while uploaded files are stored in **Amazon S3** and file metadata is maintained in MongoDB.

---

## Pages & Features

### 1. Landing Page

The landing page introduces CloudNest and provides access to the application's core functionality.

- CloudNest introduction
- Clear call-to-action
- Authentication entry points
- Navigation to the application
- Responsive modern UI

---

### 2. Dashboard

The Dashboard provides an overview of the user's CloudNest activity.

- Personalized dashboard
- File upload section
- Recent files
- Current credit balance
- Quick access to file management
- Upload status and error notifications

---

### 3. Upload Files Page

Users can upload multiple files directly to CloudNest.

Features include:

- Multiple file selection
- Maximum **5 files per upload**
- Credit validation before upload
- Upload state handling
- Success and error notifications
- Remaining credit updates
- `multipart/form-data` file upload

### Upload Validation

The frontend validates:

- Maximum number of files
- Available user credits
- Empty file selection

Files are sent to the Spring Boot backend using Axios with the authenticated Clerk JWT.

---

### 4. My Files Page

The My Files section allows users to manage their uploaded files.

Users can:

- View uploaded files
- View file information
- Download files
- Delete files
- Toggle file visibility
- Access public sharing links

---

### 5. Public File View

CloudNest allows users to share files publicly.

Public files can be accessed through a dedicated route:

```text
/file/:fileId

                    CloudNest
                        │
                        ▼
              React + Vite Frontend
                        │
                        │ REST API
                        ▼
              Spring Boot Backend
                  /             \
                 /               \
                ▼                 ▼
          Amazon S3           MongoDB
             │                    │
             │                    ├── User Profiles
             │                    ├── File Metadata
             │                    ├── User Credits
             │                    └── Payment Transactions
             │
             └── Actual Files
