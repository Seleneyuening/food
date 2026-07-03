export type RecipeImageStatus = "approved" | "placeholder" | "needs-review";

export type RecipeImageAsset = {
  src: string;
  alt: string;
  status: RecipeImageStatus;
};

export const recipeImageMap: Record<string, RecipeImageAsset> = {
  "beef-pepper-rice": { src: "/images/recipes/beef-pepper-rice-bowl.jpg", alt: "牛肉彩椒饭", status: "approved" },
  "chicken-quinoa-salad": { src: "/images/recipes/chicken-quinoa-salad.jpg", alt: "鸡胸肉藜麦沙拉", status: "approved" },
  "salmon-avocado-rice": { src: "/images/recipes/salmon-avocado-rice-bowl.jpg", alt: "三文鱼牛油果饭", status: "approved" },
  "shrimp-broccoli-fried-rice": { src: "/images/recipes/shrimp-broccoli-fried-rice.jpg", alt: "虾仁西兰花炒饭", status: "approved" },
  "egg-tofu-soba": { src: "/images/recipes/egg-tofu-soba.jpg", alt: "鸡蛋豆腐拌荞麦面", status: "approved" },
  "tuna-veggie-rice": { src: "/images/recipes/tuna-vegetable-rice.jpg", alt: "金枪鱼蔬菜饭", status: "approved" },
  "tomato-chicken-pasta": { src: "/images/recipes/tomato-chicken-pasta.jpg", alt: "番茄鸡肉意面", status: "approved" },
  "teriyaki-chicken-rice": { src: "/images/recipes/teriyaki-chicken-thigh-rice.jpg", alt: "日式照烧鸡腿饭", status: "approved" },
  "beef-onion-don": { src: "/images/recipes/beef-onion-rice-bowl.jpg", alt: "牛肉洋葱盖饭", status: "approved" },
  "shrimp-corn-egg": { src: "/images/recipes/shrimp-corn-steamed-egg.jpg", alt: "虾仁玉米蒸蛋", status: "approved" },
  "chicken-pumpkin-bowl": { src: "/images/recipes/chicken-pumpkin-bowl.jpg", alt: "鸡胸肉南瓜碗", status: "approved" },
  "tofu-mushroom-chicken-pot": { src: "/images/recipes/tofu-mushroom-chicken-hotpot.jpg", alt: "豆腐菌菇鸡肉锅", status: "approved" },
  "tomato-beef-rice": { src: "/images/recipes/tomato-beef-stew-rice.jpg", alt: "番茄牛腩饭", status: "approved" },
  "salmon-spinach-salad": { src: "/images/recipes/salmon-spinach-salad.jpg", alt: "三文鱼菠菜沙拉", status: "approved" },
  "egg-avocado-toast": { src: "/images/recipes/egg-avocado-wholewheat-toast.jpg", alt: "鸡蛋牛油果全麦吐司", status: "approved" },
  "shrimp-tomato-soba": { src: "/images/recipes/shrimp-tomato-soba.jpg", alt: "虾仁番茄荞麦面", status: "approved" },
  "chicken-broccoli-sweet-potato": { src: "/images/recipes/chicken-broccoli-sweet-potato-plate.jpg", alt: "鸡肉西兰花红薯餐", status: "approved" },
  "beef-lettuce-wrap": { src: "/images/recipes/beef-lettuce-wrap.jpg", alt: "牛肉生菜包", status: "approved" },
  "tofu-shrimp-soup": { src: "/images/recipes/tofu-shrimp-vegetable-soup.jpg", alt: "豆腐虾仁蔬菜汤", status: "approved" },
  "chicken-mushroom-pasta": { src: "/images/recipes/chicken-mushroom-pasta.jpg", alt: "鸡胸肉蘑菇意面", status: "approved" },
  "tuna-egg-salad-bowl": { src: "/images/recipes/tuna-egg-salad-bowl.jpg", alt: "金枪鱼鸡蛋沙拉碗", status: "approved" },
  "beef-broccoli-brown-rice": { src: "/images/recipes/beef-broccoli-brown-rice.jpg", alt: "牛肉西兰花糙米饭", status: "approved" },
  "shrimp-tofu-egg-rice": { src: "/images/recipes/shrimp-tofu-steamed-egg-rice.jpg", alt: "虾仁豆腐蒸蛋饭", status: "approved" },
  "tomato-egg-chicken-rice": { src: "/images/recipes/tomato-egg-chicken-rice.jpg", alt: "番茄鸡蛋鸡肉饭", status: "approved" },
  "chicken-pepper-pumpkin": { src: "/images/recipes/chicken-thigh-pepper-pumpkin-plate.jpg", alt: "鸡腿肉彩椒南瓜盘", status: "approved" },
  "salmon-mushroom-rice": { src: "/images/recipes/salmon-mushroom-rice.jpg", alt: "三文鱼菌菇饭", status: "approved" },
  "egg-spinach-wrap": { src: "/images/recipes/egg-spinach-wholewheat-wrap.jpg", alt: "鸡蛋菠菜全麦卷", status: "approved" },
  "tofu-beef-veggie-pot": { src: "/images/recipes/tofu-beef-vegetable-hotpot.jpg", alt: "豆腐牛肉蔬菜锅", status: "approved" },
  "shrimp-avocado-salad": { src: "/images/recipes/shrimp-avocado-salad.jpg", alt: "虾仁牛油果沙拉", status: "approved" },
  "chicken-tomato-soba": { src: "/images/recipes/chicken-tomato-soba.jpg", alt: "鸡胸肉番茄荞麦面", status: "approved" }
};
