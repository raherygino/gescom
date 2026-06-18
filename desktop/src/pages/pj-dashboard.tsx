import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scale,
  FileSearch,
  Lock,
  ScrollText,
  ArrowUpRight,
  Clock,
  Gavel,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { label: "Enquêtes en cours", value: "8", change: "3 nouvelles cette semaine", icon: FileSearch, trend: "up" },
  { label: "GAV en cours", value: "2", change: "Limite légale respectée", icon: Lock, trend: "neutral" },
  { label: "Plaintes reçues", value: "15", change: "Ce mois", icon: ScrollText, trend: "up" },
  { label: "Mandats actifs", value: "4", change: "2 en attente d'exécution", icon: Scale, trend: "neutral" },
];

const pendingCases = [
  { ref: "PJ-2024-001", type: "Plainte directe", assigned: "I. Sow", status: "En cours" },
  { ref: "PJ-2024-002", type: "Saisine", assigned: "I. Sow", status: "Instruction" },
  { ref: "PJ-2024-003", type: "ST Parquet", assigned: "M. Kane", status: "Clôture" },
  { ref: "PJ-2024-004", type: "Plainte directe", assigned: "A. Ba", status: "Suspendue" },
];

export function PjDashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight">Division Police Judiciaire</h1>
        <p className="text-sm text-muted-foreground mt-1">Enquêtes, plaintes et procédure judiciaire</p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="inline-flex items-center text-xs font-medium text-green-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                Dossiers en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {pendingCases.map((c, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-3 text-sm">
                    <div>
                      <span className="font-medium">{c.ref}</span>
                      <span className="text-muted-foreground ml-2">— {c.type}</span>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.assigned}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      c.status === "En cours" ? "bg-blue-500/10 text-blue-500" :
                      c.status === "Instruction" ? "bg-yellow-500/10 text-yellow-500" :
                      c.status === "Clôture" ? "bg-green-500/10 text-green-500" :
                      "bg-muted text-muted-foreground"
                    }`}>{c.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Actions rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Nouvelle plainte", icon: ScrollText },
                { label: "Enregistrer GAV", icon: Lock },
                { label: "Créer mandat", icon: Scale },
                { label: "Requérir expertise", icon: FileSearch },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm hover:bg-accent transition-colors text-left"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {action.label}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
