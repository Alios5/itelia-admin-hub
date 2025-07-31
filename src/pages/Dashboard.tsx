import { useState } from "react"
import { Building2, Users, Package, TrendingUp, DollarSign, AlertTriangle } from "lucide-react"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { OrganizationCard } from "@/components/dashboard/OrganizationCard"
import { AlertCard } from "@/components/dashboard/AlertCard"

// Mock data
const mockOrganizations = [
  {
    id: "1",
    name: "Express Delivery CI",
    status: "active" as const,
    userCount: 24,
    ordersThisMonth: 156,
    subscription: "premium" as const
  },
  {
    id: "2", 
    name: "Fast Food Delivery",
    status: "active" as const,
    userCount: 12,
    ordersThisMonth: 89,
    subscription: "standard" as const
  },
  {
    id: "3",
    name: "Pharmacia Livraison",
    status: "suspended" as const,
    userCount: 8,
    ordersThisMonth: 23,
    subscription: "gratuit" as const
  },
  {
    id: "4",
    name: "E-Commerce Plus",
    status: "active" as const,
    userCount: 45,
    ordersThisMonth: 234,
    subscription: "premium" as const
  },
  {
    id: "5",
    name: "Local Market",
    status: "pending" as const,
    userCount: 5,
    ordersThisMonth: 12,
    subscription: "gratuit" as const
  },
  {
    id: "6",
    name: "Restaurant Network",
    status: "active" as const,
    userCount: 18,
    ordersThisMonth: 67,
    subscription: "standard" as const
  }
]

const mockAlerts = [
  {
    id: "1",
    type: "subscription_expired" as const,
    title: "Abonnement expiré",
    description: "L'abonnement Premium a expiré il y a 2 jours",
    organizationName: "Express Delivery CI",
    severity: "high" as const,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    type: "low_activity" as const,
    title: "Activité faible",
    description: "Aucune commande depuis 7 jours",
    organizationName: "Pharmacia Livraison",
    severity: "medium" as const,
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    type: "payment_failed" as const,
    title: "Paiement échoué",
    description: "Échec du renouvellement automatique",
    organizationName: "Local Market",
    severity: "high" as const,
    createdAt: "2024-01-13"
  }
]

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleManageOrganization = (id: string) => {
    console.log("Manage organization:", id)
  }

  const totalOrganizations = mockOrganizations.length
  const activeOrganizations = mockOrganizations.filter(org => org.status === "active").length
  const totalOrders = mockOrganizations.reduce((sum, org) => sum + org.ordersThisMonth, 0)
  const totalUsers = mockOrganizations.reduce((sum, org) => sum + org.userCount, 0)

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Tableau de bord NOMADE
            </h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de la plateforme de livraison COD à Abidjan
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Organisations"
              value={totalOrganizations}
              change={`${activeOrganizations} actives`}
              changeType="positive"
              icon={Building2}
              iconColor="text-info"
            />
            <StatsCard
              title="Utilisateurs totaux"
              value={totalUsers}
              change="+12% ce mois"
              changeType="positive"
              icon={Users}
              iconColor="text-success"
            />
            <StatsCard
              title="Commandes ce mois"
              value={totalOrders.toLocaleString()}
              change="+8% vs mois dernier"
              changeType="positive"
              icon={Package}
              iconColor="text-primary"
            />
            <StatsCard
              title="Revenus estimés"
              value="2,485,000 FCFA"
              change="+15% ce mois"
              changeType="positive"
              icon={DollarSign}
              iconColor="text-warning"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Organizations List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Organisations clientes
                </h2>
                <span className="text-sm text-muted-foreground">
                  {mockOrganizations.length} organisations
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {mockOrganizations.map((org) => (
                  <OrganizationCard
                    key={org.id}
                    organization={org}
                    onManage={handleManageOrganization}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar - Alerts and Quick Stats */}
            <div className="space-y-6">
              <AlertCard alerts={mockAlerts} />
              
              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Actions rapides</h3>
                
                <div className="grid gap-3">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Abonnements</p>
                        <p className="text-xs text-muted-foreground">3 expirent bientôt</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-warning" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Support</p>
                        <p className="text-xs text-muted-foreground">5 tickets ouverts</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-info" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
