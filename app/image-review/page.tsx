import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/meal-data";
import { recipeImageMap } from "@/src/data/recipeImageMap";

const statusStyle = {
  approved: "bg-[#dfe9dc] text-[#536f56]",
  placeholder: "bg-[#f0eadf] text-[#7d6d58]",
  "needs-review": "bg-[#f6e7bd] text-[#8a6b27]"
};

export default function ImageReviewPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] px-4 py-10 text-[#2f332c] sm:px-6">
      <section className="mx-auto max-w-[88rem]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#8b947f]">IMAGE REVIEW</p>
            <h1 className="mt-2 font-serif text-4xl text-[#2f4328]">菜品图片审核页</h1>
            <p className="mt-2 text-sm text-[#777568]">固定图片资产库，不搜索、不随机、不热链。未确认图片在正式页面显示占位图。</p>
          </div>
          <Link className="rounded-full bg-[#6f835e] px-5 py-2 text-sm font-semibold text-white" href="/">
            返回首页
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => {
            const image = recipeImageMap[recipe.id];
            return (
              <article key={recipe.id} className="rounded-[14px] border border-[#ece6dc] bg-white p-4 shadow-[0_16px_42px_rgba(70,63,48,.07)]">
                <div className="relative h-48 overflow-hidden rounded-xl bg-[#f3efe2]">
                  {image ? (
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-[#6f835e]">图片待补充</div>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-[#2f4328]">{recipe.name}</h2>
                    <p className="mt-1 text-xs text-[#8b8678]">{recipe.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${statusStyle[image?.status ?? "placeholder"]}`}>
                    {image?.status ?? "placeholder"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(image?.keyIngredients ?? recipe.ingredients.slice(0, 3).map((item) => item.name)).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#eef3e7] px-3 py-1 text-xs text-[#5d7056]">{tag}</span>
                  ))}
                </div>
                <p className="mt-3 break-all rounded-lg bg-[#fbfaf6] p-3 text-xs text-[#777568]">{image?.src ?? "未配置图片路径"}</p>
                {image?.source && (
                  <p className="mt-2 break-all rounded-lg bg-[#fbfaf6] p-3 text-xs text-[#777568]">
                    Source: {image.source}
                    {image.credit ? ` · ${image.credit}` : ""}
                  </p>
                )}
                {image?.note && <p className="mt-2 text-xs text-[#9b4d45]">{image.note}</p>}
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <button className="rounded-full border border-[#c8d3be] px-4 py-2 text-[#536f56]">正确</button>
                  <button className="rounded-full border border-[#e1c7bd] px-4 py-2 text-[#9b4d45]">需要替换</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
