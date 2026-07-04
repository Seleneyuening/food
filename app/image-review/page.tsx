import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/meal-data";
import { recipeImageMap } from "@/src/data/recipeImageMap";

export default function ImageReviewPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] px-4 py-8 text-[#2f332c] sm:px-6">
      <section className="mx-auto max-w-[88rem]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#7f966b]">IMAGE REVIEW</p>
            <h1 className="mt-2 font-serif text-3xl text-[#2f4328]">30 道菜品图片审核</h1>
            <p className="mt-2 text-sm text-[#777568]">固定本地图片，只按 recipe.id 映射。</p>
          </div>
          <Link href="/" className="rounded-full bg-[#6f835e] px-5 py-2 text-sm font-semibold text-white">
            返回首页
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {recipes.map((recipe) => {
            const image = recipeImageMap[recipe.id];
            const src = image?.src ?? "/images/placeholders/recipe-placeholder.svg";
            return (
              <article key={recipe.id} className="overflow-hidden rounded-[14px] border border-[#ece6dc] bg-white shadow-[0_12px_34px_rgba(70,63,48,.07)]">
                <div className="relative aspect-[4/3] bg-[#f3efe2]">
                  <Image src={src} alt={image?.alt ?? recipe.name} fill className="object-cover" sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, 50vw" />
                </div>
                <div className="space-y-2 p-4 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-serif text-lg text-[#2f4328]">{recipe.name}</h2>
                    <span className="rounded-full bg-[#dfe9dc] px-2 py-1 text-[11px] text-[#536f56]">{image ? "approved" : "placeholder"}</span>
                  </div>
                  <p className="break-all text-xs text-[#777568]">id: {recipe.id}</p>
                  <p className="break-all text-xs text-[#777568]">{src}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
