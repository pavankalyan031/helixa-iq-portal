# Helixa IQ Portal — Starter

This is a scaffolded React + Vite + Tailwind + Firebase starter app for **Helixa IQ Portal**.

## Features included
- Signup and login with Firebase Authentication (email/password).
- University email domain restriction (configure `VITE_ALLOWED_DOMAIN`).
- Home page with 4-year boxes, semesters, specializations and example subjects.
- Profile page with avatar upload (uses Firebase Storage).
- Header, Sidebar, Footer with contact and social links.
- Courses section with external YouTube links.
- Client-side routing (React Router).

## How to run locally

1. Install dependencies:
```bash
npm install
```
2. Create a Firebase project and enable Authentication (Email/Password), Firestore and Storage.
3. Create a `.env` file in the project root with your Firebase config:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ALLOWED_DOMAIN=helixa.iq
```
4. Run the dev server:
```bash
npm run dev
```

## Notes & Next steps
- This scaffold focuses on frontend + Firebase as a simple full-stack backend (Firestore).
- You should create Firestore security rules to restrict writes/reads to authenticated users and validate email domain if required.
- Add resource upload, search, and download functionality by storing resource metadata in Firestore and files in Storage.
- Integrate Telegram bot by creating a bot (BotFather) and linking webhooks or using a simple `mailto:` or form to relay messages.

