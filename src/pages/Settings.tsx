import { useState } from "react"
import { Save, Bell, Shield, Palette, Globe, Mail, Database, Key } from "lucide-react"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "ITELIA",
    platformDescription: "Plateforme de gestion des livraisons contre-remboursement",
    supportEmail: "support@itelia.ci",
    timezone: "Africa/Abidjan",
    language: "fr",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    organizationAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    ipWhitelist: "",
    
    // API
    apiRateLimit: "1000",
    apiVersioning: true,
    webhookTimeout: "30",
    
    // Billing
    defaultCurrency: "XOF",
    taxRate: "18",
    invoicePrefix: "INV",
    paymentMethods: ["card", "mobile", "bank"],
    
    // Advanced
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    backupFrequency: "daily"
  })

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    console.log("Sauvegarde des paramètres:", settings)
    // Ici on sauvegarderait les paramètres
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
              <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
              <p className="text-muted-foreground mt-1">
                Configurez les paramètres de la plateforme
              </p>
            </div>
            <Button onClick={handleSave} className="w-fit">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
              <TabsTrigger value="advanced">Avancé</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Paramètres Généraux
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="platformName">Nom de la plateforme</Label>
                        <Input
                          id="platformName"
                          value={settings.platformName}
                          onChange={(e) => handleSettingChange("platformName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Email de support</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          value={settings.supportEmail}
                          onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platformDescription">Description</Label>
                      <Textarea
                        id="platformDescription"
                        value={settings.platformDescription}
                        onChange={(e) => handleSettingChange("platformDescription", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuseau horaire</Label>
                        <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Africa/Abidjan">Côte d'Ivoire (GMT)</SelectItem>
                            <SelectItem value="Africa/Dakar">Sénégal (GMT)</SelectItem>
                            <SelectItem value="Africa/Lagos">Nigeria (GMT+1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Langue par défaut</Label>
                        <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les notifications importantes par email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les notifications en temps réel</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Alertes organisations</Label>
                      <p className="text-sm text-muted-foreground">Alertes sur les nouvelles organisations</p>
                    </div>
                    <Switch
                      checked={settings.organizationAlerts}
                      onCheckedChange={(checked) => handleSettingChange("organizationAlerts", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Alertes paiements</Label>
                      <p className="text-sm text-muted-foreground">Alertes sur les paiements et abonnements</p>
                    </div>
                    <Switch
                      checked={settings.paymentAlerts}
                      onCheckedChange={(checked) => handleSettingChange("paymentAlerts", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Alertes système</Label>
                      <p className="text-sm text-muted-foreground">Alertes sur les erreurs et problèmes système</p>
                    </div>
                    <Switch
                      checked={settings.systemAlerts}
                      onCheckedChange={(checked) => handleSettingChange("systemAlerts", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">Activer 2FA pour plus de sécurité</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiration de session (minutes)</Label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Politique de mot de passe</Label>
                      <Select value={settings.passwordPolicy} onValueChange={(value) => handleSettingChange("passwordPolicy", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basique</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="strong">Forte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Liste blanche IP</Label>
                    <Textarea
                      placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                      value={settings.ipWhitelist}
                      onChange={(e) => handleSettingChange("ipWhitelist", e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Settings */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="h-5 w-5 mr-2" />
                    Configuration API
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Limite de taux (req/min)</Label>
                      <Input
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) => handleSettingChange("apiRateLimit", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeout webhook (secondes)</Label>
                      <Input
                        type="number"
                        value={settings.webhookTimeout}
                        onChange={(e) => handleSettingChange("webhookTimeout", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Versioning API</Label>
                      <p className="text-sm text-muted-foreground">Activer le versioning automatique de l'API</p>
                    </div>
                    <Switch
                      checked={settings.apiVersioning}
                      onCheckedChange={(checked) => handleSettingChange("apiVersioning", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Facturation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Devise par défaut</Label>
                      <Select value={settings.defaultCurrency} onValueChange={(value) => handleSettingChange("defaultCurrency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                          <SelectItem value="USD">Dollar (USD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Taux de TVA (%)</Label>
                      <Input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => handleSettingChange("taxRate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Préfixe facture</Label>
                      <Input
                        value={settings.invoicePrefix}
                        onChange={(e) => handleSettingChange("invoicePrefix", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Moyens de paiement acceptés</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={settings.paymentMethods.includes("card") ? "default" : "secondary"}>
                        Carte bancaire
                      </Badge>
                      <Badge variant={settings.paymentMethods.includes("mobile") ? "default" : "secondary"}>
                        Mobile Money
                      </Badge>
                      <Badge variant={settings.paymentMethods.includes("bank") ? "default" : "secondary"}>
                        Virement bancaire
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Paramètres Avancés
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Mode maintenance</Label>
                      <p className="text-sm text-muted-foreground">Mettre la plateforme en maintenance</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Mode debug</Label>
                      <p className="text-sm text-muted-foreground">Activer les logs de debug</p>
                    </div>
                    <Switch
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => handleSettingChange("debugMode", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Niveau de logs</Label>
                      <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange("logLevel", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Erreur</SelectItem>
                          <SelectItem value="warn">Attention</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fréquence de sauvegarde</Label>
                      <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Horaire</SelectItem>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}