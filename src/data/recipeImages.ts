export type ImageAsset = {
  id: string;
  src: string;
  alt: string;
  source?: string;
  credit?: string;
};

const ids = [
  ["beef-pepper-rice", "牛肉彩椒饭"],
  ["chicken-quinoa-salad", "鸡胸肉藜麦沙拉"],
  ["salmon-avocado-rice", "三文鱼牛油果饭"],
  ["shrimp-broccoli-fried-rice", "虾仁西兰花炒饭"],
  ["egg-tofu-soba", "鸡蛋豆腐拌荞麦面"],
  ["tuna-veggie-rice", "金枪鱼蔬菜饭"],
  ["tomato-chicken-pasta", "番茄鸡肉意面"],
  ["teriyaki-chicken-rice", "日式照烧鸡腿饭"],
  ["beef-onion-don", "牛肉洋葱盖饭"],
  ["shrimp-corn-egg", "虾仁玉米蒸蛋"],
  ["chicken-pumpkin-bowl", "鸡胸肉南瓜碗"],
  ["tofu-mushroom-chicken-pot", "豆腐菌菇鸡肉锅"],
  ["tomato-beef-rice", "番茄牛腩饭"],
  ["salmon-spinach-salad", "三文鱼菠菜沙拉"],
  ["egg-avocado-toast", "鸡蛋牛油果全麦吐司"],
  ["shrimp-tomato-soba", "虾仁番茄荞麦面"],
  ["chicken-broccoli-sweet-potato", "鸡肉西兰花红薯餐"],
  ["beef-lettuce-wrap", "牛肉生菜包"],
  ["tofu-shrimp-soup", "豆腐虾仁蔬菜汤"],
  ["chicken-mushroom-pasta", "鸡胸肉蘑菇意面"],
  ["tuna-egg-salad-bowl", "金枪鱼鸡蛋沙拉碗"],
  ["beef-broccoli-brown-rice", "牛肉西兰花糙米饭"],
  ["shrimp-tofu-egg-rice", "虾仁豆腐蒸蛋饭"],
  ["tomato-egg-chicken-rice", "番茄鸡蛋鸡肉饭"],
  ["chicken-pepper-pumpkin", "鸡腿肉彩椒南瓜盘"],
  ["salmon-mushroom-rice", "三文鱼菌菇饭"],
  ["egg-spinach-wrap", "鸡蛋菠菜全麦卷"],
  ["tofu-beef-veggie-pot", "豆腐牛肉蔬菜锅"],
  ["shrimp-avocado-salad", "虾仁牛油果沙拉"],
  ["chicken-tomato-soba", "鸡胸肉番茄荞麦面"]
] as const;

export const recipeImages: Record<string, ImageAsset> = Object.fromEntries(
  ids.map(([id, name]) => [
    id,
    {
      id,
      src: `/images/recipes/${id}.svg`,
      alt: `${name}成品图`,
      source: "Local generated asset",
      credit: "Aster Shore"
    }
  ])
);
