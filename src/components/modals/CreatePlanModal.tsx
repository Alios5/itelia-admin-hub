import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Sparkles } from "lucide-react"
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

interface CreatePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePlanModal({ open, onOpenChange }: CreatePlanModalProps) {
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

  const onSubmit = async (data: PlanFormData) => {
    setIsLoading(true)
    try {
      // Simuler la création du plan
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const featuresArray = data.features.split('\n').filter(f => f.trim())
      
      console.log("Nouveau plan créé:", {
        ...data,
        features: featuresArray,
      })

      toast({
        title: "Plan créé avec succès!",
        description: `Le plan ${data.name} a été créé.`,
      })

      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du plan.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Créer un nouveau plan
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
              <div className="space-y-4 animate-slide-in">
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
              {isLoading ? "Création..." : "Créer le plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
