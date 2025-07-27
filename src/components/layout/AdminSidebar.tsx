import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/",
    color: "text-primary"
  },
  {
    title: "Organisations",
    icon: Building2,
    path: "/organizations",
    color: "text-info"
  },
  {
    title: "Abonnements",
    icon: CreditCard,
    path: "/subscriptions",
    color: "text-warning"
  },
  {
    title: "Statistiques globales",
    icon: BarChart3,
    path: "/analytics",
    color: "text-success"
  },
  {
    title: "Journal",
    icon: FileText,
    path: "/logs",
    color: "text-muted-foreground"
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/settings",
    color: "text-muted-foreground"
  }
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          collapsed ? "-translate-x-full lg:w-16" : "translate-x-0 w-72 lg:w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white">IT</span>
                </div>
                <span className="text-lg font-bold text-foreground">ITELIA</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground group",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                      : "text-muted-foreground hover:text-foreground",
                    collapsed && "lg:justify-center lg:px-2"
                  )}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-primary" : item.color,
                      !collapsed && "mr-3"
                    )} 
                  />
                  {!collapsed && (
                    <span className="truncate">{item.title}</span>
                  )}
                  {collapsed && (
                    <span className="sr-only">{item.title}</span>
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "space-x-3"
            )}>
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-medium text-white">
                AD
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Administrateur
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    admin@itelia.ci
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}