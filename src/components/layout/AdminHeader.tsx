import { Bell, Plus, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreateOrganizationModal } from "@/components/modals/CreateOrganizationModal"

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une organisation..."
                className="w-64 pl-9 bg-muted/50"
              />
            </div>
          </div>
        </div>

        {/* Center - Logo for mobile */}
        <div className="flex items-center lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white">NO</span>
            </div>
            <span className="text-lg font-bold text-foreground">NOMADE</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Add Organization Button */}
          <CreateOrganizationModal 
            trigger={
              <Button size="sm" className="hidden sm:flex">
                <Plus className="h-4 w-4 mr-1" />
                Ajouter organisation
              </Button>
            }
          />
          
          <CreateOrganizationModal 
            trigger={
              <Button size="sm" variant="soft" className="sm:hidden">
                <Plus className="h-4 w-4" />
              </Button>
            }
          />

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-medium text-white">
              AD
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}