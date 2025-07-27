import { AlertTriangle, Clock, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  type: "subscription_expired" | "low_activity" | "payment_failed"
  title: string
  description: string
  organizationName: string
  severity: "high" | "medium" | "low"
  createdAt: string
}

interface AlertCardProps {
  alerts: Alert[]
}

const alertConfig = {
  subscription_expired: {
    icon: AlertTriangle,
    color: "text-destructive"
  },
  low_activity: {
    icon: TrendingDown,
    color: "text-warning"
  },
  payment_failed: {
    icon: Clock,
    color: "text-destructive"
  }
}

const severityConfig = {
  high: {
    variant: "destructive" as const,
    label: "Urgent"
  },
  medium: {
    variant: "warning" as const,
    label: "Modéré"
  },
  low: {
    variant: "secondary" as const,
    label: "Faible"
  }
}

export function AlertCard({ alerts }: AlertCardProps) {
  if (alerts.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>Alertes</span>
            <Badge variant="success" className="text-xs">
              Aucune alerte
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Toutes les organisations fonctionnent normalement.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Alertes</span>
          <Badge variant="destructive" className="text-xs">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.slice(0, 3).map((alert) => {
          const config = alertConfig[alert.type]
          const severity = severityConfig[alert.severity]
          const Icon = config.icon

          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 border border-border">
              <div className={`p-1 rounded-full bg-background ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alert.title}
                  </p>
                  <Badge variant={severity.variant} className="text-xs ml-2">
                    {severity.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.organizationName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
          )
        })}
        
        {alerts.length > 3 && (
          <Button variant="ghost" size="sm" className="w-full mt-3">
            Voir toutes les alertes ({alerts.length})
          </Button>
        )}
      </CardContent>
    </Card>
  )
}