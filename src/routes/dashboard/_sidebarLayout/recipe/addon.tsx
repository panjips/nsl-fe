import { ListAddonRecipePage, useAddonRecipeStore } from '@/modules/feature-addon-recipe'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_sidebarLayout/recipe/addon')({
  component: RouteComponent,
  beforeLoad: async () => {
    const store = useAddonRecipeStore.getState();
    await store.addonRecipes.getAllAddonRecipes();
  }
})

function RouteComponent() {
  return <div><ListAddonRecipePage/></div>
}
