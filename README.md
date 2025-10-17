# Uni-Verse 🚀

**Tagline:** *Where campus life connects seamlessly.*



Uni-Verse is a unified digital platform designed to centralize all aspects of college life. It was built as a hackathon project to solve the problem of fragmented communication and scattered resources that students face daily.

---

## 🎯 Problem Statement

> In most colleges, student communication is scattered across multiple unconnected platforms—WhatsApp groups, emails, notice boards, and social media. This leads to missed announcements, outdated study materials, and a disorganized campus experience, ultimately reducing student engagement and efficiency.

---

## ✨ Core Features

* 📢 **Smart Announcements:** A central feed for all official updates from clubs, departments, and hostels, with smart categorization.
* 📚 **Resource Hub:** A one-stop shop for students to share and find lecture notes, PDFs, and other academic materials.
* 💬 **Q&A Forum:** A campus-specific Quora where students can ask academic or general questions and get answers from peers.
* ♻️ **Barter System:** A peer-to-peer marketplace for students to exchange items like textbooks, electronics, and lab equipment.
* 📝 **Forms & Polls:** An in-built tool for clubs and faculty to create surveys, registration forms, and live polls without relying on third-party apps.
* 📅 **Event Hub:** A unified calendar that aggregates all campus events, from club meetings to fests and academic deadlines.

---

## 🛠️ Tech Stack

| Category              | Technology                                        |
| --------------------- | ------------------------------------------------- |
| **Frontend** | Next.js (App Router)                              |
| **UI/Styling** | Tailwind CSS & shadcn/ui                          |
| **Backend (BaaS)** | Firebase (Firestore, Auth, Storage)               |
| **Deployment** | Vercel                                            |
| **Node.js Management** | fnm                                               |
| **Package Manager** | pnpm                                              |

---

## 🏁 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following tools installed:
* [fnm](https://github.com/Schniz/fnm) (Fast Node Manager)
* [pnpm](https://pnpm.io/installation)
* [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/uni-verse.git](https://github.com/your-username/uni-verse.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd uni-verse
    ```

3.  **Set the correct Node.js version:**
    *fnm* will automatically pick up the version from the `.nvmrc` file in the project.
    ```bash
    fnm use
    ```

4.  **Install dependencies:**
    ```bash
    pnpm install
    ```

5.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of the project and copy the contents from `.env.example`. Then, fill in your Firebase project credentials.
    ```bash
    cp .env.example .env.local
    ```

6.  **Run the development server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file. You can get these from your Firebase project console.

Go to `Project settings` > `General` > `Your apps` > `SDK setup and configuration`.

```ini
# .env.example

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key_here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain_here"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id_here"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket_here"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id_here"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id_here"