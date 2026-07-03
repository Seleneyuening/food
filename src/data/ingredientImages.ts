import type { ImageAsset } from "./recipeImages";

const ids = [
  ["milk", "牛奶"],
  ["egg", "鸡蛋"],
  ["yogurt", "无糖酸奶"],
  ["oats", "燕麦片"],
  ["blueberry", "蓝莓"],
  ["spinach", "菠菜"],
  ["banana", "香蕉"],
  ["chicken-breast", "鸡胸肉"],
  ["chicken-thigh", "鸡腿肉"],
  ["salmon", "三文鱼"],
  ["beef", "牛肉"],
  ["shrimp", "虾仁"],
  ["tofu", "豆腐"],
  ["pepper", "彩椒"],
  ["broccoli", "西兰花"],
  ["sweet-potato", "红薯"],
  ["avocado", "牛油果"],
  ["tomato", "番茄"],
  ["soba", "荞麦面"],
  ["brown-rice", "糙米"],
  ["quinoa", "藜麦"],
  ["rice", "米饭"],
  ["corn", "玉米"],
  ["pumpkin", "南瓜"],
  ["mushroom", "菌菇"],
  ["onion", "洋葱"],
  ["lettuce", "生菜"],
  ["tuna", "金枪鱼"],
  ["pasta", "意面"],
  ["toast", "全麦吐司"],
  ["wrap", "全麦卷饼"],
  ["oil", "食用油"]
] as const;

export const ingredientImages: Record<string, ImageAsset> = Object.fromEntries(
  ids.map(([id, name]) => [
    id,
    {
      id,
      src: `/images/ingredients/${id}.svg`,
      alt: `${name}食材图`,
      source: "Local generated asset",
      credit: "Aster Shore"
    }
  ])
);
