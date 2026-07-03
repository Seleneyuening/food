"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChefHat,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  History,
  Moon,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ShoppingBasket,
  Sprout,
  Sun,
  Undo2,
  X
} from "lucide-react";
import {
  defaultIngredients,
  defaultLogs,
  defaultMealPlan,
  Ingredient,
  InventoryLog,
  MealPlan,
  Recipe,
  recipes
} from "@/lib/meal-data";
import { ingredientImages } from "@/src/data/ingredientImages";
import { recipeImages } from "@/src/data/recipeImages";

const storeKey = "light-meal-calendar-v1";
const tabs = ["家里库存", "食材分类", "保质期提醒", "历史记录"];
const heroInventory = ["milk", "egg", "oats", "blueberry", "spinach", "yogurt"];

type Store = { ingredients: Ingredient[]; logs: InventoryLog[]; mealPlan: MealPlan[]; lastDeduct?: InventoryLog[] };

function withDefaults(store: Store): Store {
  const saved = new Map(store.ingredients.map((item) => [item.id, item]));
  return {
    ...store,
    ingredients: defaultIngredients.map((item) => ({ ...item, ...saved.get(item.id) })),
    mealPlan: store.mealPlan?.length ? store.mealPlan : defaultMealPlan,
    logs: store.logs ?? []
  };
}

function loadStore(): Store {
  if (typeof window === "undefined") return { ingredients: defaultIngredients, logs: defaultLogs, mealPlan: defaultMealPlan };
  const saved = window.localStorage.getItem(storeKey);
  if (!saved) return { ingredients: defaultIngredients, logs: defaultLogs, mealPlan: defaultMealPlan };
  try {
    return withDefaults(JSON.parse(saved) as Store);
  } catch {
    return { ingredients: defaultIngredients, logs: defaultLogs, mealPlan: defaultMealPlan };
  }
}

function pct(item: Ingredient) {
  return Math.max(0, Math.min(100, Math.round((item.currentQuantity / item.initialQuantity) * 100)));
}

function daysLeft(date: string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
}

function status(item: Ingredient) {
  if (daysLeft(item.expiryDate) <= 2) return ["即将过期", "bg-[#efe0cf] text-[#7f4c41]"] as const;
  if (item.currentQuantity <= item.minQuantity) return ["偏少", "bg-[#f8ded9] text-[#9b4d45]"] as const;
  if (pct(item) < 55) return ["适中", "bg-[#f6e7bd] text-[#8a6b27]"] as const;
  return ["充足", "bg-[#dfe9dc] text-[#536f56]"] as const;
}

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function recipeScore(recipe: Recipe, ingredients: Ingredient[]) {
  const urgent = ingredients.filter((item) => daysLeft(item.expiryDate) <= 2).map((item) => item.id);
  const owned = recipe.ingredients.filter((part) => {
    const item = ingredients.find((candidate) => candidate.id === part.ingredientId);
    return item && item.currentQuantity >= part.quantity;
  }).length;
  const urgentHit = recipe.ingredients.find((part) => urgent.includes(part.ingredientId));
  return {
    score: owned / recipe.ingredients.length + (urgentHit ? 1 : 0),
    percent: Math.round((owned / recipe.ingredients.length) * 100),
    missing: recipe.ingredients.length - owned,
    reason: urgentHit ? `优先消耗${urgentHit.name}` : "现有食材友好"
  };
}

function missingForRecipe(recipe: Recipe, ingredients: Ingredient[]) {
  return recipe.ingredients.flatMap((part) => {
    const item = ingredients.find((candidate) => candidate.id === part.ingredientId);
    const current = item?.currentQuantity ?? 0;
    return current >= part.quantity ? [] : [{ ...part, missing: part.quantity - current }];
  });
}

function availablePercent(recipe: Recipe, ingredients: Ingredient[]) {
  return Math.round(((recipe.ingredients.length - missingForRecipe(recipe, ingredients).length) / recipe.ingredients.length) * 100);
}

function prepTips(recipe: Recipe) {
  return recipe.ingredients.slice(0, 3).map((part) => {
    if (["salmon", "shrimp", "beef", "chicken-breast", "chicken-thigh"].includes(part.ingredientId)) return `${part.name}解冻`;
    return part.name;
  });
}

export function LightMealApp({ view = "home" }: { view?: "home" | "inventory" }) {
  const [store, setStore] = useState<Store>({ ingredients: defaultIngredients, logs: defaultLogs, mealPlan: defaultMealPlan });
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("家里库存");
  const [activeRecipeId, setActiveRecipeId] = useState(store.mealPlan[0].lunchRecipeId);
  const [pendingRecipe, setPendingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loaded = loadStore();
    setStore(loaded);
    setActiveRecipeId(loaded.mealPlan[0]?.lunchRecipeId ?? recipes[0].id);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storeKey, JSON.stringify(store));
  }, [ready, store]);

  const today = store.mealPlan[0] ?? defaultMealPlan[0];
  const tomorrow = store.mealPlan[1] ?? defaultMealPlan[1];
  const todayRecipe = recipes.find((recipe) => recipe.id === today.lunchRecipeId) ?? recipes[0];
  const tomorrowRecipe = recipes.find((recipe) => recipe.id === tomorrow.lunchRecipeId) ?? recipes[1];
  const activeRecipe = recipes.find((recipe) => recipe.id === activeRecipeId) ?? todayRecipe;
  const tomorrowMissing = missingForRecipe(tomorrowRecipe, store.ingredients);
  const recommendations = useMemo(
    () => recipes.map((recipe) => ({ recipe, meta: recipeScore(recipe, store.ingredients) })).sort((a, b) => b.meta.score - a.meta.score).slice(0, 3),
    [store.ingredients]
  );

  function changeInventory(ingredientId: string, quantityChange: number, type: InventoryLog["type"], note: string, sourceRecipeId?: string) {
    const ingredient = store.ingredients.find((item) => item.id === ingredientId);
    if (!ingredient) return null;
    const log: InventoryLog = {
      id: id(),
      ingredientId,
      type,
      quantityChange,
      unit: ingredient.unit,
      note,
      sourceRecipeId,
      createdAt: new Date().toISOString()
    };
    setStore((current) => ({
      ...current,
      ingredients: current.ingredients.map((item) =>
        item.id === ingredientId
          ? { ...item, currentQuantity: Math.max(0, item.currentQuantity + quantityChange), updatedAt: log.createdAt }
          : item
      ),
      logs: [log, ...current.logs]
    }));
    return log;
  }

  function restock(item: Ingredient) {
    const raw = window.prompt(`补货 ${item.name}，输入数量（单位：${item.unit}）`, `${item.initialQuantity}`);
    if (!raw) return;
    const amount = Number(raw);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const expiryDate = window.prompt("保质期日期 YYYY-MM-DD", item.expiryDate) || item.expiryDate;
    const purchaseDate = window.prompt("购买日期 YYYY-MM-DD", new Date().toISOString().slice(0, 10)) || new Date().toISOString().slice(0, 10);
    const log = {
      id: id(),
      ingredientId: item.id,
      type: "restock" as const,
      quantityChange: amount,
      unit: item.unit,
      note: `补货：${item.name} +${amount}${item.unit}`,
      createdAt: new Date().toISOString()
    };
    setStore((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient) =>
        ingredient.id === item.id
          ? {
              ...ingredient,
              currentQuantity: ingredient.currentQuantity + amount,
              initialQuantity: ingredient.initialQuantity + amount,
              expiryDate,
              purchaseDate,
              isStaple: window.confirm("设为常备食材吗？"),
              updatedAt: log.createdAt
            }
          : ingredient
      ),
      logs: [log, ...current.logs]
    }));
  }

  function customUse(item: Ingredient) {
    const raw = window.prompt(`记录使用 ${item.name}，输入数量（单位：${item.unit}）`, item.visualType === "count" ? "1" : "100");
    const amount = Number(raw);
    if (Number.isFinite(amount) && amount > 0) changeInventory(item.id, -amount, "use", `手动记录：${item.name} -${amount}${item.unit}`);
  }

  function completeLunch(recipe: Recipe) {
    const createdAt = new Date().toISOString();
    const logs = recipe.ingredients.map((part) => {
      const ingredient = store.ingredients.find((item) => item.id === part.ingredientId);
      return {
        id: id(),
        ingredientId: part.ingredientId,
        type: "auto_deduct" as const,
        quantityChange: -part.quantity,
        unit: ingredient?.unit ?? part.unit,
        note: `今日午餐：${recipe.name}`,
        sourceRecipeId: recipe.id,
        createdAt
      };
    });
    setStore((current) => ({
      ...current,
      ingredients: current.ingredients.map((item) => {
        const used = recipe.ingredients.find((part) => part.ingredientId === item.id);
        return used ? { ...item, currentQuantity: Math.max(0, item.currentQuantity - used.quantity), updatedAt: createdAt } : item;
      }),
      logs: [...logs, ...current.logs],
      lastDeduct: logs,
      mealPlan: current.mealPlan.map((day, index) =>
        index === 0 ? { ...day, completedStatus: { ...day.completedStatus, lunch: true } } : day
      )
    }));
  }

  function undoLastDeduct() {
    if (!store.lastDeduct?.length) return;
    const undoLogs = store.lastDeduct.map((log) => ({ ...log, id: id(), type: "adjust" as const, quantityChange: Math.abs(log.quantityChange), note: `撤销扣减：${log.note}` }));
    setStore((current) => ({
      ...current,
      ingredients: current.ingredients.map((item) => {
        const undo = undoLogs.find((log) => log.ingredientId === item.id);
        return undo ? { ...item, currentQuantity: item.currentQuantity + undo.quantityChange, updatedAt: undo.createdAt } : item;
      }),
      logs: [...undoLogs, ...current.logs],
      lastDeduct: undefined,
      mealPlan: current.mealPlan.map((day, index) =>
        index === 0 ? { ...day, completedStatus: { ...day.completedStatus, lunch: false } } : day
      )
    }));
  }

  function setLunch(dayIndex: number, recipeId: string) {
    setStore((current) => ({
      ...current,
      mealPlan: current.mealPlan.map((day, index) => (index === dayIndex ? { ...day, lunchRecipeId: recipeId } : day))
    }));
  }

  function randomWeek() {
    const picked = [...recipes].sort(() => Math.random() - 0.5).slice(0, 7);
    setStore((current) => ({
      ...current,
      mealPlan: current.mealPlan.map((day, index) => ({ ...day, lunchRecipeId: picked[index].id }))
    }));
  }

  const completion = Object.values(today.completedStatus).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#2f332c]">
      <section className="mx-auto max-w-[88rem] px-4 pb-14 pt-7 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="rounded-[14px] border border-[#ece6dc] bg-white p-8 shadow-[0_16px_42px_rgba(70,63,48,.08)]">
            <h1 className="font-serif text-[27px] leading-tight text-[#2f4328]">Good morning, Selene <span className="text-[#7f966b]">枝</span></h1>
            <p className="mt-2 text-[15px] text-[#33382f]">今天是星期三</p>
            <div className="mt-5 divide-y divide-[#ece6dc]">
              <MealPill icon="sun" label="早餐" value={today.breakfast} done={today.completedStatus.breakfast} />
              <MealPill icon="sun-hot" label="午餐" value={todayRecipe.name} done={today.completedStatus.lunch} active />
              <MealPill icon="coffee" label="下午加餐" value={today.snack} done={today.completedStatus.snack} />
              <MealPill icon="moon" label="晚餐" value={today.dinnerStatus} done={today.completedStatus.dinner} />
            </div>
            <div className="mt-5 rounded-lg bg-[#f0f1e7] px-5 py-4 text-[15px] text-[#384231]">
              <Sprout className="mr-2 inline h-4 w-4 text-[#7f966b]" />今天的目标：稳定、轻盈、不挨饿
            </div>
          </div>

          <RecipeHero recipe={todayRecipe} onComplete={() => setPendingRecipe(todayRecipe)} onUndo={undoLastDeduct} canUndo={Boolean(store.lastDeduct?.length)} />
        </div>

        {view === "home" ? (
          <>
            <section className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
              <PlanCard
                title="今天计划"
                day="今天 · 星期三"
                plan={today}
                recipe={todayRecipe}
                completion={completion * 25}
                deducted={today.completedStatus.lunch}
                featured
              />
              <PlanCard
                title="明天计划"
                day="明天 · 星期四"
                plan={tomorrow}
                recipe={tomorrowRecipe}
                missing={tomorrowMissing}
                available={availablePercent(tomorrowRecipe, store.ingredients)}
              />
            </section>

            <section id="week-plan" className="mt-6">
              <Panel title="WEEK PLAN · 一周午餐计划（晚餐不安排）" kicker="" action={<button onClick={randomWeek} className="soft-button"><RefreshCw className="h-4 w-4" />随机生成</button>}>
                <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">
                  {store.mealPlan.map((day, index) => {
                    const recipe = recipes.find((item) => item.id === day.lunchRecipeId) ?? recipes[0];
                    return (
                      <button key={day.date} onClick={() => setActiveRecipeId(recipe.id)} className={`rounded-[12px] border bg-white p-3 text-center shadow-[0_10px_28px_rgba(70,63,48,.06)] transition hover:-translate-y-0.5 ${index === 2 ? "border-[#8fa27c] bg-[#f3f5e9]" : "border-[#ece6dc]"}`}>
                        <span className="block font-semibold">{day.date}</span>
                        <RecipeImage recipe={recipe} className="mx-auto mt-3 h-[70px] w-[120px] rounded-xl" />
                        <b className="mt-3 block text-sm">{recipe.name}</b>
                        <select onClick={(event) => event.stopPropagation()} value={day.lunchRecipeId} onChange={(event) => setLunch(index, event.target.value)} className="mt-3 w-full rounded-full border border-[#ded7ca] bg-[#fbfaf6] px-2 py-1.5 text-xs">
                          {recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
                        </select>
                      </button>
                    );
                  })}
                </div>
              </Panel>
            </section>

            <section className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
              <Panel title="食材库" kicker="清楚看到家里有什么，吃得安心，买得不多余。" action={<div className="flex gap-3"><div className="hidden rounded-lg border border-[#e3ddd1] px-4 py-2 text-sm text-[#8c887a] sm:block"><Search className="mr-2 inline h-4 w-4" />搜索食材</div><Link href="/ingredients" className="soft-button"><SlidersHorizontal className="h-4 w-4" />筛选</Link></div>}>
                <div className="grid gap-4 xl:grid-cols-[.78fr_1.22fr_1.1fr]">
                  <InventorySummary ingredients={store.ingredients} />
                  <FeaturedInventory item={store.ingredients.find((item) => item.id === "milk") ?? store.ingredients[0]} onUse={changeInventory} onRestock={restock} />
                  <InventoryGrid items={store.ingredients.filter((item) => ["egg", "oats", "yogurt", "blueberry", "spinach", "banana"].includes(item.id)).slice(0, 6)} compact mini onUse={changeInventory} onRestock={restock} onCustom={customUse} />
                </div>
              </Panel>

              <Panel title="优先消耗这些食材" kicker="SMART PICK">
                <div className="grid gap-3">
                  {recommendations.map(({ recipe, meta }) => (
                    <button key={recipe.id} onClick={() => setActiveRecipeId(recipe.id)} className="grid grid-cols-[84px_1fr] gap-3 rounded-[12px] bg-[#f3efe2] p-3 text-left transition hover:-translate-y-0.5">
                      <RecipeImage recipe={recipe} className="h-20 rounded-lg" />
                      <span>
                        <b>{recipe.name}</b>
                        <p className="mt-2 text-sm text-[#7d7668]">{meta.reason} · 现有食材可完成 {meta.percent}% · 还需购买 {meta.missing} 样</p>
                      </span>
                    </button>
                  ))}
                </div>
              </Panel>
            </section>

            <section id="shopping" className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_.95fr_.9fr]">
              <Panel title="今天蒸什么" kicker="简单蒸一蒸，美味又省心">
                <RecipeDetail recipe={activeRecipe} ingredients={store.ingredients} />
              </Panel>
              <Panel title="购物清单" kicker="MARKET LIST">
                <ul className="space-y-3 text-sm">
                  {store.ingredients.filter((item) => item.currentQuantity <= item.minQuantity || daysLeft(item.expiryDate) <= 2).slice(0, 6).map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-[#fbfaf6] px-3 py-2">
                      <span className="flex items-center gap-3"><IngredientImage ingredient={item} className="h-10 w-12 rounded-lg" />{item.name}</span>
                      <span className="text-[#a05a50]">{item.currentQuantity}{item.unit}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title="今日完成度" kicker="DAILY CHECK">
                <div className="grid place-items-center rounded-[12px] bg-[#f2f4e9] p-8 text-center">
                  <p className="font-serif text-6xl text-[#6f835e]">{completion * 25}%</p>
                  <p className="mt-2 text-sm text-[#777368]">早餐、午餐、加餐、晚间恢复</p>
                </div>
              </Panel>
            </section>

            <section id="history" className="mt-6">
              <Panel title="库存历史记录" kicker="HISTORY">
                <LogList logs={store.logs.slice(0, 5)} ingredients={store.ingredients} />
              </Panel>
            </section>
          </>
        ) : (
          <section className="mt-8">
            <Panel title="食材库" kicker="PANTRY SYSTEM">
              <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map((item) => (
                  <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm ${tab === item ? "bg-[#667a5f] text-white" : "bg-[#f2eadc] text-[#6f7668]"}`}>
                    {item}
                  </button>
                ))}
              </div>
              {tab === "家里库存" && <InventoryGrid items={store.ingredients} onUse={changeInventory} onRestock={restock} onCustom={customUse} />}
              {tab === "食材分类" && <CategoryView ingredients={store.ingredients} />}
              {tab === "保质期提醒" && <ExpiryView ingredients={store.ingredients} />}
              {tab === "历史记录" && <LogList logs={store.logs} ingredients={store.ingredients} />}
            </Panel>
          </section>
        )}
      </section>
      {pendingRecipe && (
        <DeductDialog
          recipe={pendingRecipe}
          onCancel={() => setPendingRecipe(null)}
          onConfirm={() => {
            completeLunch(pendingRecipe);
            setPendingRecipe(null);
          }}
        />
      )}
    </main>
  );
}

function MealPill({ icon, label, value, done, active }: { icon: "sun" | "sun-hot" | "coffee" | "moon"; label: string; value: string; done: boolean; active?: boolean }) {
  const Icon = icon === "coffee" ? Coffee : icon === "moon" ? Moon : Sun;
  return (
    <div className="grid grid-cols-[42px_90px_1fr] items-center gap-3 py-3">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${icon === "moon" ? "bg-[#eef1f7] text-[#7281a1]" : icon === "coffee" ? "bg-[#eef3e7] text-[#6f835e]" : "bg-[#fff1d0] text-[#e89635]"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="font-semibold">{label}</span>
      <span className="flex items-center justify-between gap-3 text-sm">
        <span>{value}</span>
        {done ? <Check className="h-4 w-4 shrink-0 text-[#6f835e]" /> : <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? "bg-[#f07a2b]" : "bg-[#7f8578]"}`} />}
      </span>
    </div>
  );
}

function PlanCard({
  title,
  day,
  plan,
  recipe,
  completion,
  deducted,
  missing = [],
  available,
  featured
}: {
  title: string;
  day: string;
  plan: MealPlan;
  recipe: Recipe;
  completion?: number;
  deducted?: boolean;
  missing?: Array<{ name: string; missing: number; unit: string }>;
  available?: number;
  featured?: boolean;
}) {
  return (
    <section className={`rounded-[14px] border p-5 shadow-[0_16px_42px_rgba(70,63,48,.07)] ${featured ? "border-[#dce5d6] bg-[#f7f9f0]" : "border-[#ece6dc] bg-white"}`}>
      <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
        <RecipeImage recipe={recipe} className="h-36 rounded-xl" />
        <div>
          <p className="text-sm font-semibold text-[#7b866f]">{day}</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl text-[#2f4328]">{title}</h2>
            {typeof completion === "number" && <span className="rounded-full bg-white px-3 py-1 text-sm text-[#6f835e]">{completion}% 完成</span>}
          </div>
          <div className="mt-4 grid gap-2 text-sm text-[#555a50]">
            <PlanLine label="早餐" value={plan.breakfast} />
            <PlanLine label="午餐" value={recipe.name} />
            <PlanLine label="下午加餐" value={plan.snack} />
            <PlanLine label="晚餐" value={plan.dinnerStatus} />
          </div>
          {featured ? (
            <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm text-[#667a5f]">{deducted ? "午餐库存已扣减" : "午餐完成后可一键扣减库存"}</p>
          ) : (
            <div className="mt-4 rounded-lg bg-[#fbfaf6] px-4 py-3 text-sm text-[#6f675b]">
              <p><Sprout className="mr-2 inline h-4 w-4 text-[#7f966b]" />提前准备：{prepTips(recipe).join("、")}</p>
              <p className="mt-2">
                {missing.length
                  ? <>还缺：{missing.slice(0, 3).map((item) => `${item.name} ${item.missing}${item.unit}`).join("、")} <Link href="#shopping" className="ml-2 text-[#6f835e] underline">去购物清单</Link></>
                  : <>现有库存可完成 {available}%</>}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PlanLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#eee7dc] pb-2">
      <span className="font-semibold">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function Panel({ title, kicker, action, children }: { title: string; kicker: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-[14px] border border-[#ece6dc] bg-white p-5 shadow-[0_16px_42px_rgba(70,63,48,.07)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2f4328]">{title}</h2>
          {kicker && <p className="mt-1 text-sm text-[#888577]">{kicker}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function RecipeHero({ recipe, onComplete, onUndo, canUndo }: { recipe: Recipe; onComplete: () => void; onUndo: () => void; canUndo: boolean }) {
  return (
    <div className="relative min-h-[336px] overflow-hidden rounded-[14px] border border-[#ece6dc] bg-[#eee6d8] shadow-[0_16px_42px_rgba(70,63,48,.08)]">
      <RecipeImage recipe={recipe} className="h-full min-h-[336px]" />
      <div className="absolute left-10 top-10 max-w-[210px] rounded-[8px] bg-white/86 p-6 shadow-[0_14px_34px_rgba(70,63,48,.10)] backdrop-blur">
        <p className="font-serif text-sm uppercase tracking-wide text-[#4d5148]">TODAY&apos;S TABLE</p>
        <div className="mt-3 h-px w-10 bg-[#6f835e]" />
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1f241e]">{recipe.name}</h2>
        <p className="mt-5 text-sm leading-7 text-[#4f554b]">{recipe.ingredients.slice(0, 3).map((item) => item.name).join("、")}组合，营养均衡，轻盈满足。</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full bg-[#6f835e] px-3 py-2 text-xs font-semibold text-white"><ChefHat className="h-4 w-4" />扣库存</button>
          {canUndo && <button onClick={onUndo} className="inline-flex items-center gap-2 rounded-full bg-[#f0eadf] px-3 py-2 text-xs text-[#4f554b]"><Undo2 className="h-4 w-4" />撤销</button>}
        </div>
      </div>
    </div>
  );
}

function RecipeImage({ recipe, className }: { recipe: Recipe; className: string }) {
  const image = recipeImages[recipe.id];
  if (!image) return <ImageFallback label={recipe.name} className={className} />;
  return (
    <img src={image.src} alt={image.alt} className={`${className} w-full object-cover`} loading="lazy" />
  );
}

function IngredientImage({ ingredient, className }: { ingredient: Ingredient; className: string }) {
  const image = ingredientImages[ingredient.id];
  if (!image) return <ImageFallback label={ingredient.name} className={className} />;
  return (
    <img src={image.src} alt={image.alt} className={`${className} object-cover`} loading="lazy" />
  );
}

function ImageFallback({ label, className }: { label: string; className: string }) {
  return (
    <div className={`${className} grid place-items-center bg-[#f3efe2] text-center text-sm font-semibold text-[#6f835e]`}>
      <span>{label}</span>
    </div>
  );
}

function DeductDialog({ recipe, onCancel, onConfirm }: { recipe: Recipe; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#2f332c]/35 px-4 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-[18px] border border-[#ece6dc] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(47,51,44,.24)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8b947f]">AUTO DEDUCT</p>
            <h2 className="mt-2 font-serif text-2xl text-[#2f4328]">是否按本菜谱自动扣减库存？</h2>
            <p className="mt-2 text-sm text-[#777568]">完成「{recipe.name}」后，将记录到库存历史。</p>
          </div>
          <button onClick={onCancel} className="grid h-9 w-9 place-items-center rounded-full bg-[#f0eadf]" aria-label="关闭">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {recipe.ingredients.map((item) => (
            <div key={item.ingredientId} className="flex items-center justify-between rounded-lg bg-[#f7f1e7] px-4 py-3 text-sm">
              <span>{item.name}</span>
              <span className="text-[#a05a50]">-{item.quantity}{item.unit}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-full bg-[#f0eadf] px-5 py-2 text-sm text-[#555a50]">先不扣</button>
          <button onClick={onConfirm} className="rounded-full bg-[#6f835e] px-5 py-2 text-sm font-semibold text-white">确认扣减</button>
        </div>
      </section>
    </div>
  );
}

function InventoryGrid({ items, compact, mini, onUse, onRestock, onCustom }: { items: Ingredient[]; compact?: boolean; mini?: boolean; onUse: (id: string, qty: number, type: InventoryLog["type"], note: string) => void; onRestock: (item: Ingredient) => void; onCustom: (item: Ingredient) => void }) {
  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map((item) => <InventoryCard key={item.id} item={item} mini={mini} onUse={onUse} onRestock={onRestock} onCustom={onCustom} />)}
    </div>
  );
}

function InventoryCard({ item, mini, onUse, onRestock, onCustom }: { item: Ingredient; mini?: boolean; onUse: (id: string, qty: number, type: InventoryLog["type"], note: string) => void; onRestock: (item: Ingredient) => void; onCustom: (item: Ingredient) => void }) {
  const [label, color] = status(item);
  const steps = item.visualType === "liquid" ? [100, 250, 500] : item.visualType === "count" ? [1, 2, 3] : [50, 100, 150];
  return (
    <div className={`rounded-[10px] border border-[#ece6dc] bg-white p-4 shadow-[0_10px_24px_rgba(70,63,48,.05)] ${mini ? "min-h-[132px]" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="mt-1 text-sm text-[#64675e]">{item.currentQuantity}{item.unit} / {item.initialQuantity}{item.unit}</p>
          {!mini && <p className="text-xs text-[#9b9483]">约可用 {Math.max(1, Math.ceil(item.currentQuantity / Math.max(item.minQuantity, 1)))} 天 · 保质期 {item.expiryDate}</p>}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${color}`}>{label}</span>
      </div>
      <IngredientImage ingredient={item} className={`${mini ? "mt-3 h-16" : "mt-4 h-24"} w-full rounded-xl`} />
      <div className={`${mini ? "my-3 min-h-10" : "my-5 min-h-28"} grid place-items-center`}>
        {item.visualType === "liquid" ? <LiquidVisual item={item} /> : item.visualType === "count" ? <CountVisual item={item} /> : <WeightVisual item={item} />}
      </div>
      {!mini && <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <button key={step} onClick={() => onUse(item.id, -step, "use", `快速记录：${item.name} -${step}${item.unit}`)} className="rounded-full bg-[#f4ecdf] px-3 py-1.5 text-xs text-[#665f52]">-{step}{item.unit}</button>
        ))}
        <button onClick={() => onCustom(item)} className="rounded-full bg-[#eef3e7] px-3 py-1.5 text-xs text-[#596b52]">自定义</button>
        <button onClick={() => onRestock(item)} className="rounded-full bg-[#45513e] px-3 py-1.5 text-xs text-white">补货</button>
      </div>}
    </div>
  );
}

function InventorySummary({ ingredients }: { ingredients: Ingredient[] }) {
  const enough = ingredients.filter((item) => status(item)[0] === "充足").length;
  const medium = ingredients.filter((item) => status(item)[0] === "适中").length;
  const low = ingredients.filter((item) => status(item)[0] === "偏少").length;
  const expiring = ingredients.filter((item) => status(item)[0] === "即将过期").length;
  const fullness = Math.round((ingredients.reduce((sum, item) => sum + pct(item), 0) / ingredients.length));
  return (
    <div className="rounded-[12px] border border-[#ece6dc] bg-white p-5 shadow-[0_10px_24px_rgba(70,63,48,.05)]">
      <h3 className="font-serif text-xl">家里库存概览</h3>
      <div className="mx-auto mt-5 grid h-36 w-36 place-items-center rounded-full border-[10px] border-[#6f835e] bg-[#fbfaf6] text-center">
        <div>
          <p className="font-serif text-3xl text-[#466239]">{fullness}%</p>
          <p className="text-xs text-[#777568]">库存充足度</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-[#62675c]">
        <SummaryDot color="#6f835e" label="充足" value={`${enough} 种`} />
        <SummaryDot color="#e7aa2e" label="适中" value={`${medium} 种`} />
        <SummaryDot color="#d76b57" label="偏少" value={`${low} 种`} />
        <SummaryDot color="#8f5ea3" label="即将过期" value={`${expiring} 种`} />
      </div>
      <Link href="/ingredients" className="mt-5 flex items-center justify-between rounded-lg bg-[#f0f1e7] px-4 py-3 text-sm text-[#596b52]">
        查看过期预警 <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SummaryDot({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: color }} />{label}</span>
      <span>{value}</span>
    </div>
  );
}

function FeaturedInventory({ item, onUse, onRestock }: { item: Ingredient; onUse: (id: string, qty: number, type: InventoryLog["type"], note: string) => void; onRestock: (item: Ingredient) => void }) {
  const [label, color] = status(item);
  return (
    <div className="grid rounded-[12px] border border-[#ece6dc] bg-white p-6 shadow-[0_10px_24px_rgba(70,63,48,.05)] md:grid-cols-[.9fr_1fr]">
      <LiquidVisual item={item} large />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-2xl">{item.name}</h3>
          <span className={`rounded-full px-3 py-1 text-xs ${color}`}>{label}</span>
        </div>
        <p className="mt-5 font-serif text-4xl text-[#466239]">{item.currentQuantity}{item.unit} <span className="text-xl text-[#62675c]">/ {item.initialQuantity}{item.unit}</span></p>
        <p className="mt-4 text-[#74786d]">今日已喝 250ml</p>
        <p className="mt-4 text-[#74786d]"><Sprout className="mr-2 inline h-4 w-4 text-[#7f966b]" />约可用 3 天</p>
        <p className="mt-8 text-sm text-[#8f8b7f]">保质期：{item.expiryDate}</p>
        <div className="mt-5 flex gap-2">
          <button onClick={() => onUse(item.id, -250, "use", "记录饮用：牛奶 -250ml")} className="flex-1 rounded-lg bg-[#f0f1e7] px-4 py-3 text-sm text-[#596b52]">记录饮用</button>
          <button onClick={() => onRestock(item)} className="rounded-lg bg-[#6f835e] px-4 py-3 text-sm text-white">补货</button>
        </div>
      </div>
    </div>
  );
}

function LiquidVisual({ item, large }: { item: Ingredient; large?: boolean }) {
  return (
    <div className="flex items-end gap-3">
      <div className={`relative overflow-hidden rounded-b-[24px] rounded-t-[12px] border-2 border-[#cfd5c7] bg-white shadow-inner ${large ? "h-72 w-28" : "h-28 w-16"}`}>
        <div className="absolute bottom-0 left-0 right-0 bg-[#f7f1df] transition-all" style={{ height: `${pct(item)}%` }} />
        <div className="absolute inset-x-4 top-2 h-3 rounded-full bg-white/80" />
      </div>
      <div className={`grid content-between text-[10px] text-[#777568] ${large ? "h-72" : "h-28"}`}>
        {[item.initialQuantity, item.initialQuantity * 0.75, item.initialQuantity * 0.5, item.initialQuantity * 0.25, 0].map((mark) => <span key={mark}>{mark}{item.unit}</span>)}
      </div>
    </div>
  );
}

function CountVisual({ item }: { item: Ingredient }) {
  const total = Math.min(12, item.initialQuantity);
  const left = Math.min(total, item.currentQuantity);
  return (
    <div className="grid grid-cols-6 gap-2 rounded-2xl bg-[#f4ecdf] p-3">
      {Array.from({ length: total }).map((_, index) => <span key={index} className={`h-7 w-7 rounded-full ${index < left ? "bg-[#f2c36b] shadow-inner" : "bg-[#ded4c5]"}`} />)}
    </div>
  );
}

function WeightVisual({ item }: { item: Ingredient }) {
  return (
    <div className="w-full">
      <div className="h-4 overflow-hidden rounded-full bg-[#efe8dc]">
        <div className="h-full rounded-full bg-[#9dad8f] transition-all" style={{ width: `${pct(item)}%` }} />
      </div>
      <p className="mt-3 text-center font-serif text-3xl text-[#667a5f]">{pct(item)}%</p>
    </div>
  );
}

function RecipeDetail({ recipe, ingredients }: { recipe: Recipe; ingredients: Ingredient[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-[.75fr_1fr]">
      <RecipeImage recipe={recipe} className="h-40 rounded-xl" />
      <div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => <span key={tag} className="rounded-full bg-[#eef3e7] px-3 py-1 text-xs text-[#5d7056]">{tag}</span>)}
        </div>
        <h3 className="mt-3 font-serif text-2xl">{recipe.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-[#817d70]"><Clock3 className="h-4 w-4" />准备 {recipe.prepTime} 分钟 / 烹饪 {recipe.cookTime} 分钟</p>
        <div className="mt-4 grid gap-2 text-sm">
          {recipe.ingredients.map((part) => {
            const item = ingredients.find((ingredient) => ingredient.id === part.ingredientId);
            return <span key={part.ingredientId} className="flex justify-between rounded-full bg-[#faf5eb] px-3 py-2"><span>{part.name}</span><span>{part.quantity}{part.unit} · 库存 {item?.currentQuantity ?? 0}{item?.unit ?? part.unit}</span></span>;
          })}
        </div>
      </div>
    </div>
  );
}

function LogList({ logs, ingredients }: { logs: InventoryLog[]; ingredients: Ingredient[] }) {
  return (
    <div className="grid gap-3">
      {logs.map((log) => {
        const ingredient = ingredients.find((item) => item.id === log.ingredientId);
        return (
          <div key={log.id} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 text-sm">
            <History className="h-4 w-4 text-[#9dad8f]" />
            <span className="flex-1">{log.note}</span>
            <span className={log.quantityChange < 0 ? "text-[#a05a50]" : "text-[#667a5f]"}>{log.quantityChange > 0 ? "+" : ""}{log.quantityChange}{ingredient?.unit ?? log.unit}</span>
          </div>
        );
      })}
    </div>
  );
}

function CategoryView({ ingredients }: { ingredients: Ingredient[] }) {
  const groups = [...new Set(ingredients.map((item) => item.category))];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group} className="rounded-3xl bg-[#faf5eb] p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Sprout className="h-4 w-4" />{group}</h3>
          <p className="text-sm text-[#817d70]">{ingredients.filter((item) => item.category === group).map((item) => item.name).join("、")}</p>
        </div>
      ))}
    </div>
  );
}

function ExpiryView({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div className="grid gap-3">
      {[...ingredients].sort((a, b) => daysLeft(a.expiryDate) - daysLeft(b.expiryDate)).slice(0, 12).map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#faf5eb] p-4">
          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#9dad8f]" />{item.name}</span>
          <span>{daysLeft(item.expiryDate) <= 0 ? "今天到期" : `${daysLeft(item.expiryDate)} 天后到期`}</span>
        </div>
      ))}
    </div>
  );
}
