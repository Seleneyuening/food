import { LightMealApp } from "@/components/LightMealApp";
import { recipes } from "@/lib/meal-data";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LightMealApp view="recipe" recipeId={id} />;
}
