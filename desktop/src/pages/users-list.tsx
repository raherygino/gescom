import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";
import { getUserList, deleteUser } from "@/lib/api/users";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Shield, Circle } from "lucide-react";
import type { User } from "@/types";

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "text-red-500",
  CHIEF: "text-purple-500",
  STATION_ADMIN: "text-blue-500",
  HEAD_SG: "text-green-500",
  HEAD_SED: "text-yellow-500",
  HEAD_PJ: "text-orange-500",
  INVESTIGATOR: "text-cyan-500",
  OFFICER: "text-indigo-500",
  RECEPTION: "text-pink-500",
  CLERK: "text-slate-500",
  CUSTODY: "text-teal-500",
};

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const isSuperAdmin = currentUser?.role_code === "SUPER_ADMIN";

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getUserList();
      setUsers(data);
    } catch {
      addNotification("error", "Erreur", "Impossible de charger la liste des utilisateurs");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      addNotification("success", "Supprimé", "Utilisateur supprimé avec succès");
      loadUsers();
    } catch {
      addNotification("error", "Erreur", "Impossible de supprimer cet utilisateur");
    }
  }

  const columns: Column<User>[] = [
    { key: "username", header: "Nom d'utilisateur", sortable: true },
    { key: "lastname", header: "Nom", sortable: true },
    { key: "firstname", header: "Prénom", sortable: true },
    { key: "im", header: "Matricule", sortable: true },
    {
      key: "role_name",
      header: "Rôle",
      sortable: true,
      render: (u) => (
        <span className={`inline-flex items-center gap-1.5 text-sm ${roleColors[u.role_code] || ""}`}>
          <Circle className="h-2 w-2 fill-current" />
          {u.role_name}
        </span>
      ),
    },
    {
      key: "is_active",
      header: "Statut",
      render: (u) => (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          u.is_active
            ? "bg-green-500/10 text-green-500"
            : "bg-red-500/10 text-red-500"
        }`}>
          {u.is_active ? "Actif" : "Inactif"}
        </span>
      ),
    },
    {
      key: "last_login",
      header: "Dernière connexion",
      render: (u) => (
        <span className="text-xs text-muted-foreground">
          {u.last_login ? new Date(u.last_login).toLocaleString("fr-FR") : "Jamais"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[100px]",
      render: (u) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate(`/users/${u.id}/edit`)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          {isSuperAdmin && (
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(u.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestion des comptes utilisateurs du système</p>
        </div>
        {isSuperAdmin && (
          <Button onClick={() => navigate("/users/new")} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Comptes utilisateurs ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
            keyExtractor={(u) => u.id}
            loading={loading}
            searchable
            searchPlaceholder="Rechercher un utilisateur..."
            onRowClick={(u) => navigate(`/users/${u.id}/edit`)}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
