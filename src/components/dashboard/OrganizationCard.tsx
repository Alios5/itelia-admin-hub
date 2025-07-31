import { MoreHorizontal, Users, Package, Crown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Organization {
  id: string
  name: string
  status: "active" | "suspended" | "pending"
  userCount: number
  ordersThisMonth: number
  subscription: "gratuit" | "standard" | "premium"
  logo?: string
}

interface OrganizationCardProps {
  organization: Organization
  onManage: (id: string) => void
}

const subscriptionConfig = {
  gratuit: {
    label: "Gratuit",
    variant: "secondary" as const,
    icon: null
  },
  standard: {
    label: "Standard",
    variant: "default" as const,
    icon: null
  },
  premium: {
    label: "Premium",
    variant: "warning" as const,
    icon: Crown
  }
}

const statusConfig = {
  active: {
    label: "Actif",
    variant: "success" as const,
    dot: "bg-success"
  },
  suspended: {
    label: "Suspendu",
    variant: "destructive" as const,
    dot: "bg-destructive"
  },
  pending: {
    label: "En attente",
    variant: "warning" as const,
    dot: "bg-warning"
  }
}

export function OrganizationCard({ organization, onManage }: OrganizationCardProps) {
  const subscriptionInfo = subscriptionConfig[organization.subscription]
  const statusInfo = statusConfig[organization.status]
  const SubscriptionIcon = subscriptionInfo.icon

  return (
    <Card className="shadow-card hover:shadow-float transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {organization.logo ? (
              <img 
                src={organization.logo} 
                alt={organization.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {organization.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {organization.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className={cn("h-2 w-2 rounded-full", statusInfo.dot)} />
                <span className="text-xs text-muted-foreground">
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onManage(organization.id)}>
                Gérer l'organisation
              </DropdownMenuItem>
              <DropdownMenuItem>
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem>
                Modifier l'abonnement
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Suspendre
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Subscription */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Abonnement</span>
          <Badge variant={subscriptionInfo.variant} className="text-xs">
            {SubscriptionIcon && <SubscriptionIcon className="h-3 w-3 mr-1" />}
            {subscriptionInfo.label}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{organization.userCount}</p>
              <p className="text-xs text-muted-foreground">Utilisateurs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{organization.ordersThisMonth}</p>
              <p className="text-xs text-muted-foreground">Commandes</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="pt-2">
          <Button 
            variant="soft" 
            size="sm" 
            className="w-full"
            onClick={() => onManage(organization.id)}
          >
            Gérer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
