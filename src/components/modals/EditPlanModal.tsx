import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Sparkles, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const planSchema = z.object({
  name: z.string().min(1, "Le nom du plan est requis"),
  price: z.string().min(1, "Le prix est requis"),
  originalPrice: z.string().optional(),
  description: z.string().min(1, "La description est requise"),
  features: z.string().min(1, "Les fonctionnalités sont requises"),
  maxOrders: z.string().min(1, "Le nombre maximum de commandes est requis"),
  maxUsers: z.string().min(1, "Le nombre maximum d'utilisateurs est requis"),
  isPromo: z.boolean().default(false),
  promoText: z.string().optional(),
})

type PlanFormData = z.infer<typeof planSchema>

interface PlanData {
  id: string
  name: string
  price: string
  originalPrice?: string
  period: string
  color: string
  textColor: string
  features: string[]
  organizations: number
  revenue: number
  isPromo: boolean
  promoText?: string
}

interface EditPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planData: PlanData | null
}

export function EditPlanModal({ open, onOpenChange, planData }: EditPlanModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      features: "",
      maxOrders: "",
      maxUsers: "",
      isPromo: false,
      promoText: "",
    },
  })

  const isPromo = form.watch("isPromo")

  // Populate form when planData changes
  useEffect(() => {
    if (planData && open) {
      form.reset({
        name: planData.name,
        price: planData.price.replace(" FCFA", "").replace(",", ""),
        originalPrice: planData.originalPrice?.replace(" FCFA", "").replace(",", "") || "",
        description: `Plan ${planData.name} avec ${planData.features.length} fonctionnalités`,
        features: planData.features.join("\n"),
        maxOrders: "100", // Default values since we don't have this data in mock
        maxUsers: "5",
        isPromo: planData.isPromo || false,
        promoText: planData.promoText || "",
      })
    }
  }, [planData, open, form])

  const onSubmit = async (data: PlanFormData) => {
    setIsLoading(true)
    try {
      // Simuler la modification du plan
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const featuresArray = data.features.split('\n').filter(f => f.trim())
      
      console.log("Plan modifié:", {
        id: planData?.id,
        ...data,
        features: featuresArray,
      })

      toast({
        title: "Plan modifié avec succès!",
        description: `Le plan ${data.name} a été mis à jour.`,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du plan.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!planData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Modifier le plan {planData.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du plan *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Premium"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix (FCFA) *</Label>
                <Input
                  id="price"
                  placeholder="35000"
                  type="number"
                  {...form.register("price")}
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Description du plan d'abonnement..."
                rows={3}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Limites */}
          <div className="space-y-4">
            <h3 className="font-medium">Limites du plan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxOrders">Max commandes/mois *</Label>
                <Input
                  id="maxOrders"
                  placeholder="100"
                  {...form.register("maxOrders")}
                />
                {form.formState.errors.maxOrders && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.maxOrders.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUsers">Max utilisateurs *</Label>
                <Input
                  id="maxUsers"
                  placeholder="5"
                  {...form.register("maxUsers")}
                />
                {form.formState.errors.maxUsers && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.maxUsers.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-2">
            <Label htmlFor="features">Fonctionnalités *</Label>
            <Textarea
              id="features"
              placeholder="Une fonctionnalité par ligne&#10;Support prioritaire&#10;Rapports avancés&#10;API d'intégration"
              rows={4}
              {...form.register("features")}
            />
            <p className="text-xs text-muted-foreground">
              Écrivez une fonctionnalité par ligne
            </p>
            {form.formState.errors.features && (
              <p className="text-sm text-destructive">
                {form.formState.errors.features.message}
              </p>
            )}
          </div>

          {/* Promotion */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isPromo" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-warning" />
                  Activer la promotion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des effets visuels spéciaux au plan
                </p>
              </div>
              <Switch
                id="isPromo"
                checked={isPromo}
                onCheckedChange={(checked) => form.setValue("isPromo", checked)}
              />
            </div>

            {isPromo && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Prix original (FCFA)</Label>
                  <Input
                    id="originalPrice"
                    placeholder="50000"
                    type="number"
                    {...form.register("originalPrice")}
                  />
                  <p className="text-xs text-muted-foreground">
                    Affiché barré à côté du prix promotionnel
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promoText">Texte de promotion</Label>
                  <Input
                    id="promoText"
                    placeholder="Ex: Offre limitée, -30% pour les nouveaux clients"
                    {...form.register("promoText")}
                  />
                </div>

                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-warning" />
                    <Badge variant="warning" className="text-xs">PROMO</Badge>
                  </div>
                  <p className="text-sm text-warning">
                    Ce plan aura des effets visuels spéciaux : bordure animée, badge promo, et prix barré
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Statistiques actuelles */}
          <div className="p-4 bg-muted/20 border border-border rounded-lg">
            <h3 className="font-medium mb-3">Statistiques actuelles</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Organisations:</span>
                <span className="ml-2 font-medium">{planData.organizations}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Revenus:</span>
                <span className="ml-2 font-medium">{planData.revenue.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Modification..." : "Modifier le plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
