# OPUS — Opérations Policières Unifiées sur le Système

A cross-platform **Police Station Management System** with a desktop application, mobile Android app, and a REST API backend.

| Platform | Technology |
|----------|-----------|
| **Desktop** | Electron + React 18 + Vite 6 + TypeScript |
| **Mobile** | Android (Kotlin/Java) |
| **API** | PHP 8+ (pure, no framework) |
| **Database** | MySQL 8.0+ |

## Project Structure

```
opus/
├── api/               # PHP REST API backend
│   ├── config/        # App & database configuration
│   ├── public/        # Front controller (index.php)
│   ├── src/           # Controllers, Models, Middleware, Helpers
│   └── uploads/       # File uploads
├── android/           # Android mobile application
│   └── app/           # Android app module
├── database/          # SQL migration scripts
├── desktop/           # Electron desktop application
│   ├── electron/      # Main process & preload
│   ├── src/           # React renderer (pages, components, stores)
│   └── dist/          # Built renderer output
├── FEATURES.md        # Requirements & feature specification
└── SPECIFICATIONS.md  # Functional specifications (French)
```

## Prerequisites

- Node.js 18+
- npm 9+
- PHP 8.0+
- MySQL 8.0+
- Android Studio (for mobile development)

## Installation

```bash
git clone <repo-url>
cd opus

# Install desktop dependencies
cd desktop && npm install
cd ..
```

### Database Setup

```bash
# Create database and run migrations
mysql -u root -p < database/001_create_roles.sql
mysql -u root -p < database/002_create_personnel.sql
mysql -u root -p < database/003_create_users.sql
mysql -u root -p < database/004_seed_data.sql
```

## Development

### API Server

```bash
# Start the PHP development server
php -S localhost:8080 -t api/public
```

The API runs at `http://localhost:8080/api` and provides endpoints for auth, personnel, and user management.

### Desktop App

```bash
cd desktop
npm run dev
# or
npm run electron:dev
```

Runs the Vite dev server with Electron hot reload.

### Android App

Open the `android/` folder in Android Studio and run on device or emulator.

## Build

### Desktop

```bash
cd desktop
npm run build          # Build renderer + main process
npm run electron:build # Package into platform installer
```

### Android

```bash
cd android
./gradlew assembleDebug
```

## Code Quality

```bash
cd desktop
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint across src/
npm run format       # Prettier formatting
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh token |
| GET | `/api/auth/me` | Current user info |
| GET | `/api/personnel` | List personnel |
| GET | `/api/users` | List users |
| GET | `/api/health` | Health check |

## License

MIT
