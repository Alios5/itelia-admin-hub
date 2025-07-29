import { useState } from "react"
import { Crown, Package, Users, TrendingUp, Plus, Sparkles } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { CreatePlanModal } from "@/components/modals/CreatePlanModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

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
    revenue: 0,
    isPromo: false
  },
  {
    id: "standard", 
    name: "Standard",
    price: "15,000 FCFA",
    originalPrice: "20,000 FCFA",
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
    revenue: 180000,
    isPromo: true,
    promoText: "Offre limitée -25%"
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
    revenue: 210000,
    isPromo: false
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const totalOrganizations = subscriptionPlans.reduce((sum, plan) => sum + plan.organizations, 0)
  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + plan.revenue, 0)

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Abonnements</h1>
              <p className="text-muted-foreground mt-1">
                Gérez les plans et les paiements
              </p>
            </div>
            <Button className="w-fit" onClick={() => setIsCreateModalOpen(true)}>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "relative overflow-hidden transition-all duration-300",
                  plan.isPromo && "ring-2 ring-primary/50 shadow-lg",
                  plan.isPromo && "animate-pulse"
                )}
                style={{
                  animation: plan.isPromo ? "glow 2s ease-in-out infinite alternate" : undefined
                }}
              >
                {/* Badge de promotion */}
                {plan.isPromo && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-warning text-white px-3 py-1 text-xs font-medium flex items-center gap-1 z-10">
                    <Sparkles className="h-3 w-3" />
                    PROMO
                  </div>
                )}
                
                {/* Badge populaire */}
                {plan.id === "premium" && !plan.isPromo && (
                  <div className="absolute top-0 right-0 bg-warning text-warning-foreground px-3 py-1 text-xs font-medium">
                    Populaire
                  </div>
                )}
                
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300",
                    plan.color,
                    plan.isPromo && "shadow-lg ring-2 ring-primary/30"
                  )}>
                    <Crown className={cn("h-6 w-6", plan.textColor)} />
                  </div>
                  
                  <CardTitle className="text-xl flex items-center gap-2">
                    {plan.name}
                    {plan.isPromo && (
                      <Badge variant="warning" className="text-xs animate-bounce">
                        <Sparkles className="h-3 w-3 mr-1" />
                        PROMO
                      </Badge>
                    )}
                  </CardTitle>
                  
                  <div className="flex items-baseline gap-2">
                    {plan.isPromo && plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className={cn(
                      "text-3xl font-bold",
                      plan.isPromo ? "text-primary" : "text-foreground"
                    )}>
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  
                  {plan.isPromo && plan.promoText && (
                    <div className="mt-2 p-2 bg-primary/10 border border-primary/20 rounded-md">
                      <p className="text-xs text-primary font-medium flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {plan.promoText}
                      </p>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Organisations</span>
                      <Badge 
                        variant={plan.isPromo ? "warning" : "secondary"}
                        className={plan.isPromo ? "animate-pulse" : ""}
                      >
                        {plan.organizations}
                      </Badge>
                    </div>
                    <Progress 
                      value={(plan.organizations / totalOrganizations) * 100} 
                      className={cn(
                        "h-2",
                        plan.isPromo && "ring-1 ring-primary/30"
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Fonctionnalités :</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            plan.isPromo ? "bg-primary animate-pulse" : "bg-primary"
                          )} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Revenus mensuels</span>
                      <span className={cn(
                        "font-medium",
                        plan.isPromo ? "text-primary" : "text-foreground"
                      )}>
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
      
      <CreatePlanModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />
    </div>
  )
}