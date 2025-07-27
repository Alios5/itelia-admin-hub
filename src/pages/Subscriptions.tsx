import { useState } from "react"
import { Crown, Package, Users, TrendingUp, Plus } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data pour les abonnements
const subscriptionPlans = [
  {
    id: "gratuit",
    name: "Gratuit",
    price: "0 FCFA",
    period: "/mois",
    color: "bg-muted",
    textColor: "text-muted-foreground",
    features: [
      "Jusqu'à 10 commandes/mois",
      "1 utilisateur",
      "Support par email",
      "Tableau de bord basique"
    ],
    organizations: 8,
    revenue: 0
  },
  {
    id: "standard", 
    name: "Standard",
    price: "15,000 FCFA",
    period: "/mois",
    color: "bg-info/10",
    textColor: "text-info",
    features: [
      "Jusqu'à 100 commandes/mois",
      "5 utilisateurs",
      "Support prioritaire",
      "Rapports avancés",
      "API d'intégration"
    ],
    organizations: 12,
    revenue: 180000
  },
  {
    id: "premium",
    name: "Premium", 
    price: "35,000 FCFA",
    period: "/mois",
    color: "bg-warning/10",
    textColor: "text-warning",
    features: [
      "Commandes illimitées",
      "Utilisateurs illimités",
      "Support 24/7",
      "Rapports personnalisés",
      "API complète",
      "Manager dédié"
    ],
    organizations: 6,
    revenue: 210000
  }
]

const recentTransactions = [
  {
    id: "1",
    organization: "TechCorp Solutions",
    plan: "Premium",
    amount: "35,000 FCFA", 
    date: "2024-01-15",
    status: "paid"
  },
  {
    id: "2",
    organization: "Commerce Plus",
    plan: "Standard",
    amount: "15,000 FCFA",
    date: "2024-01-14",
    status: "paid"
  },
  {
    id: "3",
    organization: "Digital Agency",
    plan: "Premium",
    amount: "35,000 FCFA",
    date: "2024-01-13", 
    status: "pending"
  },
  {
    id: "4",
    organization: "Local Business",
    plan: "Standard",
    amount: "15,000 FCFA",
    date: "2024-01-12",
    status: "paid"
  }
]

export default function Subscriptions() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const totalOrganizations = subscriptionPlans.reduce((sum, plan) => sum + plan.organizations, 0)
  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + plan.revenue, 0)

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Abonnements</h1>
              <p className="text-muted-foreground mt-1">
                Gérez les plans et les paiements
              </p>
            </div>
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau plan
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Organisations"
              value={totalOrganizations.toString()}
              icon={Users}
            />
            <StatsCard
              title="Revenus Mensuels"
              value={`${totalRevenue.toLocaleString()} FCFA`}
              icon={TrendingUp}
            />
            <StatsCard
              title="Taux de Conversion"
              value="68%"
              icon={Package}
            />
            <StatsCard
              title="Abonnements Actifs"
              value="18"
              icon={Crown}
            />
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="relative overflow-hidden">
                {plan.id === "premium" && (
                  <div className="absolute top-0 right-0 bg-warning text-warning-foreground px-3 py-1 text-xs font-medium">
                    Populaire
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${plan.color} flex items-center justify-center mb-4`}>
                    <Crown className={`h-6 w-6 ${plan.textColor}`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Organisations</span>
                      <Badge variant="secondary">{plan.organizations}</Badge>
                    </div>
                    <Progress 
                      value={(plan.organizations / totalOrganizations) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Fonctionnalités :</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenus mensuels</span>
                      <span className="font-medium text-foreground">
                        {plan.revenue.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Crown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.organization}</p>
                        <p className="text-sm text-muted-foreground">Plan {transaction.plan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{transaction.amount}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        <Badge 
                          variant={transaction.status === "paid" ? "success" : "warning"}
                          className="text-xs"
                        >
                          {transaction.status === "paid" ? "Payé" : "En attente"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}