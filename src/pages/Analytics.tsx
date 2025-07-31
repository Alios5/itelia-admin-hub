import { useState } from "react"
import { Calendar, TrendingUp, TrendingDown, Users, Package, DollarSign } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

// Mock data pour les graphiques
const monthlyData = [
  { month: "Jan", orders: 1240, revenue: 1800000, organizations: 22 },
  { month: "Fév", orders: 1567, revenue: 2100000, organizations: 24 },
  { month: "Mar", orders: 1890, revenue: 2650000, organizations: 26 },
  { month: "Avr", orders: 2134, revenue: 3200000, organizations: 28 },
  { month: "Mai", orders: 1876, revenue: 2980000, organizations: 25 },
  { month: "Jun", orders: 2456, revenue: 3800000, organizations: 30 }
]

const organizationGrowth = [
  { month: "Jan", actives: 18, pending: 4, suspended: 2 },
  { month: "Fév", actives: 20, pending: 3, suspended: 1 },
  { month: "Mar", actives: 22, pending: 2, suspended: 2 },
  { month: "Avr", actives: 25, pending: 1, suspended: 2 },
  { month: "Mai", actives: 22, pending: 2, suspended: 1 },
  { month: "Jun", actives: 26, pending: 2, suspended: 2 }
]

const subscriptionData = [
  { name: "Gratuit", value: 8, color: "#94a3b8" },
  { name: "Standard", value: 12, color: "#3b82f6" },
  { name: "Premium", value: 6, color: "#f59e0b" }
]

const topOrganizations = [
  { name: "TechCorp Solutions", orders: 456, revenue: 680000, growth: 23 },
  { name: "Digital Agency", orders: 342, revenue: 520000, growth: 18 },
  { name: "Commerce Plus", orders: 298, revenue: 450000, growth: 15 },
  { name: "Mega Enterprise", orders: 267, revenue: 400000, growth: -5 },
  { name: "Local Business", orders: 189, revenue: 285000, growth: 12 }
]

export default function Analytics() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
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
              <h1 className="text-3xl font-bold text-foreground">Statistiques Globales</h1>
              <p className="text-muted-foreground mt-1">
                Analysez les performances de la plateforme
              </p>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">30 derniers jours</SelectItem>
                <SelectItem value="3months">3 derniers mois</SelectItem>
                <SelectItem value="6months">6 derniers mois</SelectItem>
                <SelectItem value="1year">1 an</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Commandes Totales"
              value="12,163"
              icon={Package}
            />
            <StatsCard
              title="Revenus Totaux"
              value="18,230,000 FCFA"
              icon={DollarSign}
            />
            <StatsCard
              title="Organisations Actives"
              value="26"
              icon={Users}
            />
            <StatsCard
              title="Taux de Croissance"
              value="32%"
              icon={TrendingUp}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Orders Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Commandes par Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Organization Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Organisations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={organizationGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="actives" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="suspended" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subscription Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Abonnements</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {subscriptionData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Organizations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Organisations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.orders} commandes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{org.revenue.toLocaleString()} FCFA</p>
                      <div className="flex items-center space-x-2">
                        {org.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <Badge 
                          variant={org.growth > 0 ? "success" : "destructive"}
                          className="text-xs"
                        >
                          {org.growth > 0 ? "+" : ""}{org.growth}%
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
