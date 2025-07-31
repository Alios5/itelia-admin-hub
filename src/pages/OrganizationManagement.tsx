import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { 
  ArrowLeft, 
  Users, 
  Package, 
  Crown, 
  Settings, 
  CreditCard, 
  AlertTriangle,
  Edit,
  Trash,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Types
type OrganizationStatus = "active" | "suspended" | "pending"
type SubscriptionType = "gratuit" | "standard" | "premium"

interface Organization {
  id: string
  name: string
  status: OrganizationStatus
  userCount: number
  ordersThisMonth: number
  subscription: SubscriptionType
  email: string
  phone: string
  address: string
  createdAt: string
  description: string
  industry: string
  employeeCount: number
  website: string
}

// Mock data pour l'organisation
const mockOrganization: Organization = {
  id: "1",
  name: "TechCorp Solutions",
  status: "active",
  userCount: 45,
  ordersThisMonth: 128,
  subscription: "premium",
  email: "contact@techcorp.com",
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de la Tech, 75001 Paris",
  createdAt: "2023-01-15",
  description: "Entreprise technologique spécialisée dans les solutions digitales innovantes.",
  industry: "Technologie",
  employeeCount: 150,
  website: "https://techcorp.com"
}

const statusConfig: Record<OrganizationStatus, { label: string; variant: "success" | "destructive" | "warning" }> = {
  active: { label: "Actif", variant: "success" as const },
  suspended: { label: "Suspendu", variant: "destructive" as const },
  pending: { label: "En attente", variant: "warning" as const }
}

const subscriptionConfig: Record<SubscriptionType, { label: string; variant: "secondary" | "default" | "warning"; icon?: any }> = {
  gratuit: { label: "Gratuit", variant: "secondary" as const },
  standard: { label: "Standard", variant: "default" as const },
  premium: { label: "Premium", variant: "warning" as const, icon: Crown }
}

export default function OrganizationManagement() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [organization, setOrganization] = useState(mockOrganization)
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSave = () => {
    toast({
      title: "Organisation mise à jour",
      description: "Les modifications ont été sauvegardées avec succès.",
    })
    setIsEditing(false)
  }

  const handleSuspend = () => {
    setOrganization(prev => ({ ...prev, status: "suspended" as OrganizationStatus }))
    toast({
      title: "Organisation suspendue",
      description: "L'organisation a été suspendue avec succès.",
      variant: "destructive"
    })
  }

  const statusInfo = statusConfig[organization.status]
  const subscriptionInfo = subscriptionConfig[organization.subscription]
  const SubscriptionIcon = subscriptionInfo.icon

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/organizations")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{organization.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  <Badge variant={subscriptionInfo.variant}>
                    {SubscriptionIcon && <SubscriptionIcon className="h-3 w-3 mr-1" />}
                    {subscriptionInfo.label}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Annuler" : "Modifier"}
              </Button>
              {organization.status !== "suspended" && (
                <Button variant="destructive" onClick={handleSuspend}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Suspendre
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{organization.userCount}</p>
                    <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{organization.ordersThisMonth}</p>
                    <p className="text-sm text-muted-foreground">Commandes ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{organization.employeeCount}</p>
                    <p className="text-sm text-muted-foreground">Employés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">€2,450</p>
                    <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom de l'organisation</Label>
                      <Input
                        id="name"
                        value={organization.name}
                        onChange={(e) => setOrganization(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Secteur d'activité</Label>
                      <Input
                        id="industry"
                        value={organization.industry}
                        onChange={(e) => setOrganization(prev => ({ ...prev, industry: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={organization.email}
                          onChange={(e) => setOrganization(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={organization.phone}
                          onChange={(e) => setOrganization(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        value={organization.website}
                        onChange={(e) => setOrganization(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select 
                        value={organization.status} 
                        onValueChange={(value) => setOrganization(prev => ({ ...prev, status: value as OrganizationStatus }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="suspended">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={organization.address}
                        onChange={(e) => setOrganization(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={organization.description}
                      onChange={(e) => setOrganization(prev => ({ ...prev, description: e.target.value }))}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le {new Date(organization.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave}>
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Facturation et abonnements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
