import { recipes } from "@/src/data/recipes";
import type { Recipe } from "@/src/types/recipe";

export type VisualType = "liquid" | "count" | "weight" | "package";
export type LogType = "use" | "restock" | "auto_deduct" | "adjust";

export type Ingredient = {
  id: string;
  name: string;
  category: string;
  unit: string;
  initialQuantity: number;
  currentQuantity: number;
  minQuantity: number;
  expiryDate: string;
  purchaseDate: string;
  isStaple: boolean;
  visualType: VisualType;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type InventoryLog = {
  id: string;
  ingredientId: string;
  type: LogType;
  quantityChange: number;
  unit: string;
  note: string;
  sourceRecipeId?: string;
  createdAt: string;
};

export type MealPlan = {
  date: string;
  breakfast: string;
  lunchRecipeId: string;
  snack: string;
  dinnerStatus: string;
  completedStatus: { breakfast: boolean; lunch: boolean; snack: boolean; dinner: boolean };
};

const now = "2026-07-03T09:00:00.000Z";

export const defaultIngredients: Ingredient[] = [
  ["milk", "牛奶", "乳制品", "ml", 1000, 750, 250, "2026-07-06", "2026-07-01", true, "liquid"],
  ["egg", "鸡蛋", "蛋奶", "个", 12, 10, 4, "2026-07-14", "2026-07-01", true, "count"],
  ["oats", "燕麦", "主食", "g", 1000, 450, 200, "2026-09-01", "2026-06-28", true, "weight"],
  ["yogurt", "无糖酸奶", "乳制品", "g", 500, 260, 150, "2026-07-07", "2026-07-01", true, "weight"],
  ["blueberry", "蓝莓", "水果", "g", 250, 120, 80, "2026-07-05", "2026-07-02", false, "weight"],
  ["banana", "香蕉", "水果", "根", 6, 4, 2, "2026-07-06", "2026-07-02", false, "count"],
  ["spinach", "菠菜", "蔬菜", "g", 200, 80, 80, "2026-07-04", "2026-07-01", false, "weight"],
  ["beef", "牛肉", "肉类", "g", 600, 420, 150, "2026-07-08", "2026-07-02", false, "weight"],
  ["chicken-breast", "鸡胸肉", "肉类", "g", 800, 520, 180, "2026-07-09", "2026-07-01", true, "weight"],
  ["chicken-thigh", "鸡腿肉", "肉类", "g", 600, 360, 160, "2026-07-08", "2026-07-01", false, "weight"],
  ["salmon", "三文鱼", "鱼类", "g", 400, 220, 120, "2026-07-06", "2026-07-02", false, "weight"],
  ["shrimp", "虾仁", "海鲜", "g", 500, 150, 120, "2026-07-06", "2026-07-01", false, "weight"],
  ["tofu", "豆腐", "豆制品", "g", 600, 360, 150, "2026-07-05", "2026-07-02", true, "weight"],
  ["tuna", "金枪鱼", "罐头", "g", 300, 160, 80, "2026-10-01", "2026-06-20", true, "package"],
  ["rice", "米饭", "主食", "g", 1000, 700, 200, "2026-07-10", "2026-07-01", true, "weight"],
  ["brown-rice", "糙米饭", "主食", "g", 800, 450, 180, "2026-07-12", "2026-07-01", true, "weight"],
  ["quinoa", "藜麦", "主食", "g", 500, 260, 100, "2026-09-15", "2026-06-20", true, "weight"],
  ["soba", "荞麦面", "主食", "g", 500, 300, 100, "2026-09-20", "2026-06-20", true, "weight"],
  ["pasta", "意面", "主食", "g", 500, 300, 100, "2026-10-01", "2026-06-20", true, "weight"],
  ["toast", "全麦吐司", "主食", "片", 8, 5, 2, "2026-07-06", "2026-07-01", true, "count"],
  ["wrap", "全麦卷饼", "主食", "张", 6, 4, 2, "2026-07-09", "2026-07-01", true, "count"],
  ["pepper", "彩椒", "蔬菜", "g", 400, 260, 100, "2026-07-07", "2026-07-01", false, "weight"],
  ["broccoli", "西兰花", "蔬菜", "g", 500, 280, 120, "2026-07-06", "2026-07-01", false, "weight"],
  ["tomato", "番茄", "蔬菜", "g", 600, 420, 150, "2026-07-06", "2026-07-01", false, "weight"],
  ["avocado", "牛油果", "水果", "个", 4, 2, 1, "2026-07-05", "2026-07-02", false, "count"],
  ["corn", "玉米", "蔬菜", "g", 400, 260, 100, "2026-07-09", "2026-07-01", true, "weight"],
  ["pumpkin", "南瓜", "蔬菜", "g", 700, 420, 150, "2026-07-10", "2026-07-01", true, "weight"],
  ["mushroom", "菌菇", "蔬菜", "g", 400, 240, 100, "2026-07-05", "2026-07-02", false, "weight"],
  ["onion", "洋葱", "蔬菜", "g", 500, 360, 100, "2026-07-15", "2026-06-30", true, "weight"],
  ["lettuce", "生菜", "蔬菜", "g", 300, 180, 80, "2026-07-05", "2026-07-02", false, "weight"],
  ["sweet-potato", "红薯", "主食", "g", 700, 460, 150, "2026-07-16", "2026-07-01", true, "weight"],
  ["oil", "食用油", "调味", "ml", 1000, 620, 150, "2026-12-01", "2026-06-01", true, "liquid"]
].map(([id, name, category, unit, initialQuantity, currentQuantity, minQuantity, expiryDate, purchaseDate, isStaple, visualType]) => ({
  id: id as string,
  name: name as string,
  category: category as string,
  unit: unit as string,
  initialQuantity: initialQuantity as number,
  currentQuantity: currentQuantity as number,
  minQuantity: minQuantity as number,
  expiryDate: expiryDate as string,
  purchaseDate: purchaseDate as string,
  isStaple: isStaple as boolean,
  visualType: visualType as VisualType,
  image: `/images/ingredients/${id}.svg`,
  createdAt: now,
  updatedAt: now
}));

export { recipes };
export type { Recipe };

export const legacyRecipeIdMap: Record<string, string> = {
  "beef-pepper-rice": "beef-pepper-rice-bowl",
  "salmon-avocado-rice": "salmon-avocado-rice-bowl",
  "tuna-veggie-rice": "tuna-vegetable-rice",
  "teriyaki-chicken-rice": "teriyaki-chicken-thigh-rice",
  "beef-onion-don": "beef-onion-rice-bowl",
  "shrimp-corn-egg": "shrimp-corn-steamed-egg",
  "tofu-mushroom-chicken-pot": "tofu-mushroom-chicken-hotpot",
  "tomato-beef-rice": "tomato-beef-stew-rice",
  "egg-avocado-toast": "egg-avocado-wholewheat-toast",
  "chicken-broccoli-sweet-potato": "chicken-broccoli-sweet-potato-plate",
  "tofu-shrimp-soup": "tofu-shrimp-vegetable-soup",
  "shrimp-tofu-egg-rice": "shrimp-tofu-steamed-egg-rice",
  "chicken-pepper-pumpkin": "chicken-thigh-pepper-pumpkin-plate",
  "egg-spinach-wrap": "egg-spinach-wholewheat-wrap",
  "tofu-beef-veggie-pot": "tofu-beef-vegetable-hotpot"
};

export const defaultMealPlan: MealPlan[] = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((date, index) => ({
  date,
  breakfast: index % 2 ? "牛奶燕麦杯 + 蓝莓" : "鸡蛋全麦吐司 + 无糖酸奶",
  lunchRecipeId: recipes[index].id,
  snack: index % 2 ? "无糖酸奶 120g" : "蓝莓酸奶碗",
  dinnerStatus: "不吃正餐 / 可选恢复餐",
  completedStatus: { breakfast: false, lunch: false, snack: false, dinner: false }
}));

export const defaultLogs: InventoryLog[] = [
  { id: "log-1", ingredientId: "milk", type: "use", quantityChange: -250, unit: "ml", note: "今日早餐：牛奶燕麦杯", createdAt: now },
  { id: "log-2", ingredientId: "egg", type: "use", quantityChange: -2, unit: "个", note: "今日早餐：全麦吐司配蛋", createdAt: now }
];
