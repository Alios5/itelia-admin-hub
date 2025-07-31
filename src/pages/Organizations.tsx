import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { OrganizationCard } from "@/components/dashboard/OrganizationCard"
import { CreateOrganizationModal } from "@/components/modals/CreateOrganizationModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data pour les organisations
const mockOrganizations = [
  {
    id: "1",
    name: "TechCorp Solutions",
    status: "active" as const,
    userCount: 45,
    ordersThisMonth: 128,
    subscription: "premium" as const,
  },
  {
    id: "2", 
    name: "Commerce Plus",
    status: "active" as const,
    userCount: 23,
    ordersThisMonth: 67,
    subscription: "standard" as const,
  },
  {
    id: "3",
    name: "StartUp Innovante",
    status: "pending" as const,
    userCount: 8,
    ordersThisMonth: 15,
    subscription: "gratuit" as const,
  },
  {
    id: "4",
    name: "Mega Enterprise",
    status: "suspended" as const,
    userCount: 156,
    ordersThisMonth: 0,
    subscription: "premium" as const,
  },
  {
    id: "5",
    name: "Local Business",
    status: "active" as const,
    userCount: 12,
    ordersThisMonth: 34,
    subscription: "standard" as const,
  },
  {
    id: "6",
    name: "Digital Agency",
    status: "active" as const,
    userCount: 28,
    ordersThisMonth: 89,
    subscription: "premium" as const,
  }
]

export default function Organizations() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleManageOrganization = (id: string) => {
    navigate(`/organizations/${id}`)
  }

  const handleOrganizationCreated = () => {
    // Ici on pourrait rafraîchir la liste des organisations
    console.log("Organisation créée avec succès")
  }

  const filteredOrganizations = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || org.status === statusFilter
    const matchesSubscription = subscriptionFilter === "all" || org.subscription === subscriptionFilter
    return matchesSearch && matchesStatus && matchesSubscription
  })

  const getStatusCount = (status: string) => {
    if (status === "all") return mockOrganizations.length
    return mockOrganizations.filter(org => org.status === status).length
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Organisations</h1>
              <p className="text-muted-foreground mt-1">
                Gérez toutes les organisations clientes
              </p>
            </div>
            <CreateOrganizationModal onSuccess={handleOrganizationCreated} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{getStatusCount("all")}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <Badge variant="secondary">Toutes</Badge>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-success">{getStatusCount("active")}</p>
                  <p className="text-sm text-muted-foreground">Actives</p>
                </div>
                <Badge variant="success">Actif</Badge>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-warning">{getStatusCount("pending")}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
                <Badge variant="warning">Attente</Badge>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-destructive">{getStatusCount("suspended")}</p>
                  <p className="text-sm text-muted-foreground">Suspendues</p>
                </div>
                <Badge variant="destructive">Suspendu</Badge>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une organisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les abonnements</SelectItem>
                <SelectItem value="gratuit">Gratuit</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Organizations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                onManage={handleManageOrganization}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucune organisation trouvée
              </h3>
              <p className="text-muted-foreground mb-4">
                Aucune organisation ne correspond à vos critères de recherche.
              </p>
              <Button variant="soft" onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setSubscriptionFilter("all")
              }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
