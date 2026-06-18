import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/stores/theme-store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { AppLayout } from "@/components/layout/app-layout";
import { CommandPalette } from "@/components/layout/command-palette";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

// Auth
const LoginPage = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.LoginPage })),
);

// Admin Dashboard
const Dashboard = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.Dashboard })),
);

// Division Dashboards
const SedentaireDashboard = lazy(() =>
  import("@/pages/sedentaire-dashboard").then((m) => ({ default: m.SedentaireDashboard })),
);
const SgDashboard = lazy(() =>
  import("@/pages/sg-dashboard").then((m) => ({ default: m.SgDashboard })),
);
const PjDashboard = lazy(() =>
  import("@/pages/pj-dashboard").then((m) => ({ default: m.PjDashboard })),
);

// Personnel
const PersonnelList = lazy(() =>
  import("@/pages/personnel-list").then((m) => ({ default: m.PersonnelList })),
);
const PersonnelForm = lazy(() =>
  import("@/pages/personnel-form").then((m) => ({ default: m.PersonnelForm })),
);

// Users
const UsersList = lazy(() =>
  import("@/pages/users-list").then((m) => ({ default: m.UsersList })),
);
const UserForm = lazy(() =>
  import("@/pages/users-form").then((m) => ({ default: m.UserForm })),
);

// Legacy notes (keep for now)
const Notes = lazy(() =>
  import("@/pages/notes").then((m) => ({ default: m.Notes })),
);
const Settings = lazy(() =>
  import("@/pages/settings").then((m) => ({ default: m.Settings })),
);

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="h-screen w-screen overflow-hidden bg-background text-foreground antialiased">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Admin Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Dashboard />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            {/* Division: Sédentaire */}
            <Route path="/sedentaire">
              <Route
                index
                element={<Navigate to="/sedentaire/dashboard" replace />}
              />
              <Route
                path="dashboard"
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <SedentaireDashboard />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </Route>

            {/* Division: Service Général */}
            <Route path="/sg">
              <Route
                index
                element={<Navigate to="/sg/dashboard" replace />}
              />
              <Route
                path="dashboard"
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <SgDashboard />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </Route>

            {/* Division: Police Judiciaire */}
            <Route path="/pj">
              <Route
                index
                element={<Navigate to="/pj/dashboard" replace />}
              />
              <Route
                path="dashboard"
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <PjDashboard />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </Route>

            {/* Personnel Management */}
            <Route
              path="/personnel"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<TableSkeleton />}>
                    <PersonnelList />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/personnel/new"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<FormSkeleton />}>
                    <PersonnelForm />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/personnel/:id/edit"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<FormSkeleton />}>
                    <PersonnelForm />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            {/* User Management */}
            <Route
              path="/users"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<TableSkeleton />}>
                    <UsersList />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/users/new"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<FormSkeleton />}>
                    <UserForm />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/users/:id/edit"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<FormSkeleton />}>
                    <UserForm />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            {/* Legacy routes */}
            <Route
              path="/notes"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Notes />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Notes />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/settings"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Settings />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <AnimatePresence>
          <CommandPalette />
        </AnimatePresence>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
