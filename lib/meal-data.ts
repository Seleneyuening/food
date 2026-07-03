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

export type Recipe = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
  ingredients: { ingredientId: string; name: string; quantity: number; unit: string }[];
  steps: string[];
  steamerFriendly: boolean;
  substitutions: string[];
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

const defs: Array<[string, string, string[], boolean, Array<[string, number, string]>]> = [
  ["beef-pepper-rice", "牛肉彩椒饭", ["高蛋白", "补铁", "15 分钟"], false, [["beef", 150, "g"], ["pepper", 120, "g"], ["rice", 150, "g"], ["onion", 50, "g"], ["oil", 8, "ml"]]],
  ["chicken-quinoa-salad", "鸡胸肉藜麦沙拉", ["高蛋白", "低油", "适合减脂"], true, [["chicken-breast", 150, "g"], ["quinoa", 80, "g"], ["lettuce", 80, "g"], ["tomato", 80, "g"], ["oil", 5, "ml"]]],
  ["salmon-avocado-rice", "三文鱼牛油果饭", ["优质脂肪", "高蛋白", "快手"], true, [["salmon", 150, "g"], ["avocado", 1, "个"], ["rice", 150, "g"], ["spinach", 60, "g"], ["oil", 5, "ml"]]],
  ["shrimp-broccoli-fried-rice", "虾仁西兰花炒饭", ["高蛋白", "15 分钟", "低油"], false, [["shrimp", 140, "g"], ["broccoli", 120, "g"], ["rice", 150, "g"], ["egg", 1, "个"], ["oil", 8, "ml"]]],
  ["egg-tofu-soba", "鸡蛋豆腐拌荞麦面", ["蒸笼友好", "低油", "高蛋白"], true, [["egg", 2, "个"], ["tofu", 150, "g"], ["soba", 90, "g"], ["spinach", 60, "g"], ["oil", 4, "ml"]]],
  ["tuna-veggie-rice", "金枪鱼蔬菜饭", ["高蛋白", "免炒", "快手"], false, [["tuna", 100, "g"], ["rice", 150, "g"], ["lettuce", 80, "g"], ["corn", 60, "g"], ["tomato", 80, "g"]]],
  ["tomato-chicken-pasta", "番茄鸡肉意面", ["高蛋白", "番茄红", "适合备餐"], false, [["chicken-breast", 140, "g"], ["tomato", 180, "g"], ["pasta", 90, "g"], ["onion", 50, "g"], ["oil", 8, "ml"]]],
  ["teriyaki-chicken-rice", "日式照烧鸡腿饭", ["高蛋白", "日式", "满足感"], true, [["chicken-thigh", 170, "g"], ["rice", 150, "g"], ["broccoli", 100, "g"], ["onion", 40, "g"], ["oil", 6, "ml"]]],
  ["beef-onion-don", "牛肉洋葱盖饭", ["补铁", "快手", "高蛋白"], false, [["beef", 150, "g"], ["onion", 100, "g"], ["rice", 160, "g"], ["egg", 1, "个"], ["oil", 6, "ml"]]],
  ["shrimp-corn-egg", "虾仁玉米蒸蛋", ["蒸笼友好", "低油", "高蛋白"], true, [["shrimp", 120, "g"], ["corn", 80, "g"], ["egg", 2, "个"], ["rice", 120, "g"], ["oil", 2, "ml"]]],
  ["chicken-pumpkin-bowl", "鸡胸肉南瓜碗", ["蒸笼友好", "适合减脂", "高蛋白"], true, [["chicken-breast", 150, "g"], ["pumpkin", 180, "g"], ["spinach", 60, "g"], ["quinoa", 70, "g"], ["oil", 5, "ml"]]],
  ["tofu-mushroom-chicken-pot", "豆腐菌菇鸡肉锅", ["蒸笼友好", "低油", "暖胃"], true, [["tofu", 180, "g"], ["mushroom", 120, "g"], ["chicken-breast", 120, "g"], ["spinach", 60, "g"], ["oil", 3, "ml"]]],
  ["tomato-beef-rice", "番茄牛腩饭", ["补铁", "番茄红", "饱腹"], true, [["beef", 160, "g"], ["tomato", 180, "g"], ["rice", 150, "g"], ["onion", 60, "g"], ["oil", 6, "ml"]]],
  ["salmon-spinach-salad", "三文鱼菠菜沙拉", ["优先消耗绿叶菜", "高蛋白", "低油"], true, [["salmon", 150, "g"], ["spinach", 100, "g"], ["avocado", 1, "个"], ["tomato", 80, "g"], ["oil", 5, "ml"]]],
  ["egg-avocado-toast", "鸡蛋牛油果全麦吐司", ["15 分钟", "早餐也可", "高蛋白"], false, [["egg", 2, "个"], ["avocado", 1, "个"], ["toast", 2, "片"], ["lettuce", 50, "g"], ["tomato", 60, "g"]]],
  ["shrimp-tomato-soba", "虾仁番茄荞麦面", ["15 分钟", "低油", "高蛋白"], false, [["shrimp", 130, "g"], ["tomato", 160, "g"], ["soba", 90, "g"], ["spinach", 50, "g"], ["oil", 6, "ml"]]],
  ["chicken-broccoli-sweet-potato", "鸡肉西兰花红薯餐", ["蒸笼友好", "适合减脂", "高蛋白"], true, [["chicken-breast", 150, "g"], ["broccoli", 130, "g"], ["sweet-potato", 180, "g"], ["oil", 5, "ml"]]],
  ["beef-lettuce-wrap", "牛肉生菜包", ["低碳", "补铁", "高蛋白"], false, [["beef", 150, "g"], ["lettuce", 120, "g"], ["pepper", 80, "g"], ["onion", 50, "g"], ["oil", 6, "ml"]]],
  ["tofu-shrimp-soup", "豆腐虾仁蔬菜汤", ["蒸笼友好", "低油", "暖胃"], true, [["tofu", 180, "g"], ["shrimp", 120, "g"], ["spinach", 60, "g"], ["mushroom", 80, "g"], ["oil", 2, "ml"]]],
  ["chicken-mushroom-pasta", "鸡胸肉蘑菇意面", ["高蛋白", "快手", "适合备餐"], false, [["chicken-breast", 140, "g"], ["mushroom", 120, "g"], ["pasta", 90, "g"], ["spinach", 50, "g"], ["oil", 8, "ml"]]],
  ["tuna-egg-salad-bowl", "金枪鱼鸡蛋沙拉碗", ["免炒", "高蛋白", "低油"], false, [["tuna", 100, "g"], ["egg", 2, "个"], ["lettuce", 100, "g"], ["corn", 60, "g"], ["tomato", 80, "g"]]],
  ["beef-broccoli-brown-rice", "牛肉西兰花糙米饭", ["补铁", "高蛋白", "低油"], false, [["beef", 150, "g"], ["broccoli", 130, "g"], ["brown-rice", 150, "g"], ["onion", 50, "g"], ["oil", 6, "ml"]]],
  ["shrimp-tofu-egg-rice", "虾仁豆腐蒸蛋饭", ["蒸笼友好", "高蛋白", "低油"], true, [["shrimp", 120, "g"], ["tofu", 150, "g"], ["egg", 2, "个"], ["rice", 130, "g"], ["oil", 2, "ml"]]],
  ["tomato-egg-chicken-rice", "番茄鸡蛋鸡肉饭", ["家常", "高蛋白", "番茄红"], false, [["tomato", 180, "g"], ["egg", 2, "个"], ["chicken-breast", 120, "g"], ["rice", 150, "g"], ["oil", 8, "ml"]]],
  ["chicken-pepper-pumpkin", "鸡腿肉彩椒南瓜盘", ["蒸笼友好", "高蛋白", "彩色蔬菜"], true, [["chicken-thigh", 170, "g"], ["pepper", 120, "g"], ["pumpkin", 160, "g"], ["broccoli", 80, "g"], ["oil", 6, "ml"]]],
  ["salmon-mushroom-rice", "三文鱼菌菇饭", ["蒸笼友好", "高蛋白", "优质脂肪"], true, [["salmon", 150, "g"], ["mushroom", 120, "g"], ["rice", 150, "g"], ["spinach", 50, "g"], ["oil", 5, "ml"]]],
  ["egg-spinach-wrap", "鸡蛋菠菜全麦卷", ["15 分钟", "优先消耗菠菜", "低油"], false, [["egg", 2, "个"], ["spinach", 90, "g"], ["wrap", 1, "张"], ["tomato", 60, "g"], ["oil", 4, "ml"]]],
  ["tofu-beef-veggie-pot", "豆腐牛肉蔬菜锅", ["蒸笼友好", "补铁", "高蛋白"], true, [["tofu", 160, "g"], ["beef", 130, "g"], ["mushroom", 100, "g"], ["broccoli", 90, "g"], ["oil", 4, "ml"]]],
  ["shrimp-avocado-salad", "虾仁牛油果沙拉", ["低油", "优质脂肪", "高蛋白"], true, [["shrimp", 140, "g"], ["avocado", 1, "个"], ["lettuce", 100, "g"], ["blueberry", 40, "g"], ["oil", 5, "ml"]]],
  ["chicken-tomato-soba", "鸡胸肉番茄荞麦面", ["15 分钟", "高蛋白", "低油"], false, [["chicken-breast", 140, "g"], ["tomato", 160, "g"], ["soba", 90, "g"], ["spinach", 50, "g"], ["oil", 6, "ml"]]]
];

const ingredientName = (id: string) => defaultIngredients.find((item) => item.id === id)?.name ?? id;

export const recipes: Recipe[] = defs.map(([id, name, tags, steamerFriendly, ingredients], index) => ({
  id,
  name,
  category: "午餐",
  tags,
  image: "",
  prepTime: 8 + (index % 4) * 2,
  cookTime: steamerFriendly ? 18 : 12 + (index % 3) * 3,
  servings: 1,
  nutrition: {
    calories: 420 + (index % 7) * 28,
    protein: 28 + (index % 6) * 3,
    carbs: 42 + (index % 5) * 5,
    fat: 12 + (index % 4) * 3
  },
  ingredients: ingredients.map(([ingredientId, quantity, unit]) => ({
    ingredientId,
    name: ingredientName(ingredientId),
    quantity,
    unit
  })),
  steps: steamerFriendly
    ? ["主食提前备好或同步蒸煮。", "蛋白质和蔬菜简单调味后入蒸笼。", "组合装盘，按口味补少量酱汁。"]
    : ["食材洗净切好，主食提前备好。", "少油加热蛋白质和蔬菜。", "加入主食拌匀或分区装盘。"],
  steamerFriendly,
  substitutions: ["同类蛋白可互换", "绿叶菜可换成生菜或西兰花", "主食可换糙米、荞麦面或红薯"]
}));

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
