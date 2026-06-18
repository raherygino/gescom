import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Car,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Map,
  Radio,
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
  { label: "Patrouilles en cours", value: "4", change: "2 secteurs couverts", icon: Car, trend: "up" },
  { label: "Interventions aujourd'hui", value: "7", change: "+2 vs hier", icon: AlertTriangle, trend: "up" },
  { label: "Effectif en service", value: "18", change: "J:12 / N:6", icon: Shield, trend: "neutral" },
  { label: "Incidents signalés", value: "12", change: "Ce mois", icon: Activity, trend: "up" },
];

const activePatrols = [
  { sector: "Secteur A", team: "Équipe Alpha", status: "En patrouille", time: "08:00–16:00" },
  { sector: "Secteur B", team: "Équipe Bravo", status: "Intervention", time: "08:00–16:00" },
  { sector: "Secteur C", team: "Équipe Charlie", status: "En patrouille", time: "16:00–00:00" },
  { sector: "Secteur D", team: "Équipe Delta", status: "Repos", time: "16:00–00:00" },
];

export function SgDashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight">Division Service Général</h1>
        <p className="text-sm text-muted-foreground mt-1">Patrouilles, interventions et sécurité</p>
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
                <Map className="h-4 w-4" />
                Patrouilles actives
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {activePatrols.map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-3 text-sm">
                    <div>
                      <span className="font-medium">{p.sector}</span>
                      <span className="text-muted-foreground ml-2">— {p.team}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{p.time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "En patrouille" ? "bg-green-500/10 text-green-500" :
                        p.status === "Intervention" ? "bg-red-500/10 text-red-500" :
                        "bg-muted text-muted-foreground"
                      }`}>{p.status}</span>
                    </div>
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
                <Radio className="h-4 w-4" />
                Actions rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Nouvelle patrouille", icon: Car },
                { label: "Signaler incident", icon: AlertTriangle },
                { label: "Répartition secteur", icon: Map },
                { label: "Compte rendu", icon: Radio },
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
