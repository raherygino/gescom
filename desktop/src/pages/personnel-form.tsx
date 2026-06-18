import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotificationStore } from "@/stores/notification-store";
import { getPersonnelById, createPersonnel, updatePersonnel } from "@/lib/api/personnel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, UserPlus } from "lucide-react";

const grades = [
  "Commissaire Divisionnaire",
  "Commissaire",
  "Commissaire Adjoint",
  "Lieutenant",
  "Brigadier-Chef",
  "Brigadier",
  "Garde de la Paix",
  "Secrétaire Administratif",
  "Agent Spécialisé",
];

export function PersonnelForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  const [form, setForm] = useState<{
    im: string;
    lastname: string;
    firstname: string;
    grade: string;
    fonction: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
  }>({
    im: "",
    lastname: "",
    firstname: "",
    grade: "",
    fonction: "",
    email: "",
    phone: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadPersonnel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadPersonnel() {
    setLoading(true);
    try {
      const p = await getPersonnelById(Number(id));
      setForm({
        im: p.im,
        lastname: p.lastname,
        firstname: p.firstname,
        grade: p.grade,
        fonction: p.fonction,
        email: p.email || "",
        phone: p.phone || "",
        status: p.status,
      });
    } catch {
      addNotification("error", "Erreur", "Personnel introuvable");
      navigate("/personnel");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updatePersonnel(Number(id), form);
        addNotification("success", "Modifié", "Personnel mis à jour avec succès");
      } else {
        await createPersonnel(form);
        addNotification("success", "Créé", "Personnel créé avec succès");
      }
      navigate("/personnel");
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "response" in err
        ? (err as { response: { data: { message: string; errors?: Record<string, string> } } }).response?.data?.message || "Erreur lors de l'enregistrement"
        : "Erreur lors de l'enregistrement";
      addNotification("error", "Erreur", msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/personnel")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? "Modifier le personnel" : "Nouveau personnel"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEdit ? "Modifier les informations de l'agent" : "Enregistrer un nouvel agent"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="im">Matricule (IM) *</Label>
                <Input id="im" value={form.im} onChange={(e) => setForm({ ...form, im: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select
                  id="grade"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  options={grades.map((g) => ({ value: g, label: g }))}
                  placeholder="Sélectionner un grade"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastname">Nom *</Label>
                <Input id="lastname" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénom *</Label>
                <Input id="firstname" value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fonction">Fonction *</Label>
              <Input id="fonction" value={form.fonction} onChange={(e) => setForm({ ...form, fonction: e.target.value })} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
                options={[
                  { value: "active", label: "Actif" },
                  { value: "inactive", label: "Inactif" },
                ]}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" className="gap-2" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/personnel")}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
