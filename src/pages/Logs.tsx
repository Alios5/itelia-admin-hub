import { useState } from "react"
import { Search, Filter, Calendar, Download, Eye, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data pour les logs
const mockLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:32:15",
    type: "info",
    action: "Organization Created",
    user: "Admin",
    organization: "TechCorp Solutions",
    details: "Nouvelle organisation créée avec le plan Premium",
    ip: "192.168.1.100"
  },
  {
    id: "2", 
    timestamp: "2024-01-15 14:28:43",
    type: "success",
    action: "Payment Received",
    user: "System",
    organization: "Commerce Plus",
    details: "Paiement de 15,000 FCFA reçu pour l'abonnement Standard",
    ip: "192.168.1.101"
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:15:22",
    type: "warning",
    action: "Subscription Expiring",
    user: "System",
    organization: "Digital Agency",
    details: "L'abonnement Premium expire dans 3 jours",
    ip: "192.168.1.102"
  },
  {
    id: "4",
    timestamp: "2024-01-15 13:45:10",
    type: "error",
    action: "Login Failed",
    user: "user@example.com",
    organization: "Local Business",
    details: "Tentative de connexion échouée - mot de passe incorrect",
    ip: "192.168.1.103"
  },
  {
    id: "5",
    timestamp: "2024-01-15 13:30:55",
    type: "info",
    action: "User Added",
    user: "Admin",
    organization: "StartUp Innovante",
    details: "Nouvel utilisateur ajouté: john.doe@startup.com",
    ip: "192.168.1.104"
  },
  {
    id: "6",
    timestamp: "2024-01-15 12:18:30",
    type: "success",
    action: "Order Completed",
    user: "System",
    organization: "Mega Enterprise",
    details: "Commande #COD-2024-001 livrée avec succès",
    ip: "192.168.1.105"
  },
  {
    id: "7",
    timestamp: "2024-01-15 11:45:15",
    type: "warning",
    action: "High Order Volume",
    user: "System",
    organization: "TechCorp Solutions",
    details: "Volume de commandes élevé détecté - 50 commandes en 1h",
    ip: "192.168.1.106"
  },
  {
    id: "8",
    timestamp: "2024-01-15 10:22:08",
    type: "error",
    action: "API Error",
    user: "System",
    organization: "Commerce Plus",
    details: "Erreur API lors de la création de commande - Timeout",
    ip: "192.168.1.107"
  }
]

const logTypeConfig = {
  info: {
    label: "Info",
    variant: "secondary" as const,
    icon: Info,
    color: "text-info"
  },
  success: {
    label: "Succès",
    variant: "success" as const,
    icon: CheckCircle,
    color: "text-success"
  },
  warning: {
    label: "Attention",
    variant: "warning" as const,
    icon: AlertTriangle,
    color: "text-warning"
  },
  error: {
    label: "Erreur",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-destructive"
  }
}

export default function Logs() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || log.type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeCount = (type: string) => {
    if (type === "all") return mockLogs.length
    return mockLogs.filter(log => log.type === type).length
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Journal d'Activité</h1>
              <p className="text-muted-foreground mt-1">
                Consultez l'historique des actions sur la plateforme
              </p>
            </div>
            <Button variant="soft" className="w-fit">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{getTypeCount("all")}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <Badge variant="secondary">Tous</Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-info">{getTypeCount("info")}</p>
                  <p className="text-sm text-muted-foreground">Info</p>
                </div>
                <Info className="h-5 w-5 text-info" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-success">{getTypeCount("success")}</p>
                  <p className="text-sm text-muted-foreground">Succès</p>
                </div>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-warning">{getTypeCount("warning")}</p>
                  <p className="text-sm text-muted-foreground">Attention</p>
                </div>
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-destructive">{getTypeCount("error")}</p>
                  <p className="text-sm text-muted-foreground">Erreurs</p>
                </div>
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type de log" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
                <SelectItem value="warning">Attention</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="yesterday">Hier</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des Activités</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horodatage</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    const typeInfo = logTypeConfig[log.type as keyof typeof logTypeConfig]
                    const TypeIcon = typeInfo.icon
                    
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Badge variant={typeInfo.variant} className="text-xs">
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {typeInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {log.user}
                        </TableCell>
                        <TableCell>
                          {log.organization}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={log.details}>
                          {log.details}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun log trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Aucun log ne correspond à vos critères de recherche.
              </p>
              <Button variant="soft" onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
                setDateFilter("today")
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