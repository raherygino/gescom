import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCog,
  LogOut,
  Building2,
  Car,
  Scale,
  Settings,
} from "lucide-react";
import type { RoleCode } from "@/types";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: RoleCode[];
}

function getNavItems(roleCode?: RoleCode): NavItem[] {
  const items: NavItem[] = [];

  // Dashboard (all roles)
  items.push({ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" });

  // Division-specific dashboards
  if (roleCode === "HEAD_SED" || roleCode === "RECEPTION" || roleCode === "CLERK") {
    items.push({ icon: Building2, label: "Sédentaire", path: "/sedentaire/dashboard" });
  }
  if (roleCode === "HEAD_SG" || roleCode === "OFFICER") {
    items.push({ icon: Car, label: "Service Général", path: "/sg/dashboard" });
  }
  if (roleCode === "HEAD_PJ" || roleCode === "INVESTIGATOR" || roleCode === "CUSTODY") {
    items.push({ icon: Scale, label: "Police Judiciaire", path: "/pj/dashboard" });
  }

  // Admin/Chief can see all divisions
  if (roleCode === "SUPER_ADMIN" || roleCode === "CHIEF" || roleCode === "STATION_ADMIN") {
    items.push(
      { icon: Building2, label: "Sédentaire", path: "/sedentaire/dashboard" },
      { icon: Car, label: "Service Général", path: "/sg/dashboard" },
      { icon: Scale, label: "Police Judiciaire", path: "/pj/dashboard" },
    );
  }

  // Personnel Management (admin roles)
  if (roleCode === "SUPER_ADMIN" || roleCode === "STATION_ADMIN" || roleCode === "CLERK") {
    items.push({ icon: Users, label: "Personnel", path: "/personnel" });
  }

  // User Management (super admin only)
  if (roleCode === "SUPER_ADMIN") {
    items.push({ icon: UserCog, label: "Utilisateurs", path: "/users" });
  }

  return items;
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, width } = useSidebarStore();
  const { user, logout } = useAuthStore();

  const navItems = getNavItems(user?.role_code);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const userInitials = user
    ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`
    : "??";

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0 border-r border-border bg-sidebar overflow-hidden"
          style={{ width }}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-12 items-center px-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                  <span className="text-[10px] font-bold text-primary-foreground">G</span>
                </div>
                <span className="text-sm font-semibold">OPUS</span>
              </div>
            </div>

            <ScrollArea className="flex-1 px-2 py-3">
              <div className="space-y-1">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Navigation
                </p>
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/" &&
                      location.pathname.startsWith(item.path));
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-9 px-2 text-sm font-normal",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                      onClick={() => navigate(item.path)}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>

              <Separator className="my-4" />

              <div className="space-y-1">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Système
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-9 px-2 text-sm font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="h-4 w-4 shrink-0" />
                  Paramètres
                </Button>
              </div>
            </ScrollArea>

            <div className="border-t border-sidebar-border p-3 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-medium text-primary shrink-0">
                  {userInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium truncate">
                    {user?.firstname} {user?.lastname}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {user?.role_name}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-8 text-xs text-muted-foreground hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-3.5 w-3.5" />
                Déconnexion
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
