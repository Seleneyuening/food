import type { ImageStatus } from "./recipeImageMap";

export type IngredientImageAsset = {
  src: string;
  alt: string;
  status: ImageStatus;
};

const ingredientRows = [
  ["milk", "milk.svg", "一瓶牛奶"],
  ["egg", "egg.svg", "一盒鸡蛋"],
  ["yogurt", "yogurt.svg", "一杯无糖酸奶"],
  ["oats", "oats.svg", "一罐燕麦片"],
  ["blueberry", "blueberry.svg", "一碗蓝莓"],
  ["spinach", "spinach.svg", "一把菠菜"],
  ["banana", "banana.svg", "香蕉"],
  ["chicken-breast", "chicken-breast.svg", "鸡胸肉"],
  ["chicken-thigh", "chicken-breast.svg", "鸡腿肉"],
  ["salmon", "salmon.svg", "三文鱼"],
  ["beef", "beef.svg", "牛肉"],
  ["shrimp", "shrimp.svg", "虾仁"],
  ["tofu", "tofu.svg", "豆腐"],
  ["pepper", "pepper.svg", "彩椒"],
  ["broccoli", "broccoli.svg", "西兰花"],
  ["sweet-potato", "sweet-potato.svg", "红薯"],
  ["avocado", "avocado.svg", "牛油果"],
  ["tomato", "tomato.svg", "番茄"],
  ["soba", "soba.svg", "荞麦面"],
  ["brown-rice", "brown-rice.svg", "糙米"],
  ["quinoa", "quinoa.svg", "藜麦"],
  ["rice", "rice.svg", "米饭"],
  ["corn", "corn.svg", "玉米"],
  ["pumpkin", "pumpkin.svg", "南瓜"],
  ["mushroom", "mushroom.svg", "菌菇"],
  ["onion", "onion.svg", "洋葱"],
  ["lettuce", "lettuce.svg", "生菜"],
  ["tuna", "tuna.svg", "金枪鱼"],
  ["pasta", "pasta.svg", "意面"],
  ["toast", "toast.svg", "全麦吐司"],
  ["wrap", "wrap.svg", "全麦卷饼"],
  ["oil", "oil.svg", "食用油"]
] as const;

export const ingredientImageMap: Record<string, IngredientImageAsset> = Object.fromEntries(
  ingredientRows.map(([id, fileName, alt]) => [
    id,
    {
      src: `/images/ingredients/${fileName}`,
      alt,
      status: "approved"
    }
  ])
);
