export type ImageStatus = "approved" | "placeholder" | "needs-review";

export type RecipeImageAsset = {
  src: string;
  alt: string;
  status: ImageStatus;
  keyIngredients: string[];
  note?: string;
  source?: string;
  credit?: string;
};

export const recipeImageMap: Record<string, RecipeImageAsset> = {
  "beef-pepper-rice": {
    src: "/images/recipes/beef-pepper-rice-bowl.jpg",
    alt: "牛肉胡椒饭，包含牛肉、米饭和玉米",
    status: "needs-review",
    keyIngredients: ["牛肉", "米饭", "玉米"],
    note: "真实照片来自 Wikimedia Commons，但图中不是红黄彩椒，需确认是否接受。",
    source: "https://commons.wikimedia.org/wiki/File:Beef_Pepper_Rice_of_Pepper_Lunch_(2).jpg",
    credit: "Wikimedia Commons"
  },
  "salmon-avocado-rice": {
    src: "/images/recipes/salmon-avocado-rice-bowl.jpg",
    alt: "三文鱼牛油果饭，包含三文鱼、牛油果、米饭和绿色蔬菜",
    status: "approved",
    keyIngredients: ["三文鱼", "牛油果", "米饭"],
    source: "https://commons.wikimedia.org/wiki/File:Salmon_Poke.jpg",
    credit: "Pokebros / Wikimedia Commons"
  },
  "shrimp-broccoli-fried-rice": {
    src: "/images/recipes/shrimp-broccoli-rice.jpg",
    alt: "虾仁西兰花炒饭，包含虾仁、西兰花和米饭",
    status: "approved",
    keyIngredients: ["虾仁", "西兰花", "米饭"],
    source: "https://commons.wikimedia.org/wiki/File:Shrimp_with_chili_garlic_paste,_stir_fried_broccoli,_fried_rice,_and_dumplings_(6306839645).jpg",
    credit: "Wikimedia Commons"
  },
  "tomato-chicken-pasta": {
    src: "/images/recipes/tomato-chicken-pasta.jpg",
    alt: "番茄鸡肉意面，包含鸡肉、番茄酱和意面",
    status: "approved",
    keyIngredients: ["番茄", "鸡肉", "意面"],
    source: "https://commons.wikimedia.org/wiki/File:Tomato_cream_sauce_on_pasta_and_chicken.jpg",
    credit: "Wikimedia Commons"
  },
  "beef-broccoli-brown-rice": {
    src: "/images/recipes/beef-broccoli-brown-rice.jpg",
    alt: "牛肉西兰花盖饭，包含牛肉、西兰花和米饭",
    status: "needs-review",
    keyIngredients: ["牛肉", "西兰花", "米饭"],
    note: "真实照片含牛肉、西兰花和米饭，但不能确认米饭是糙米。",
    source: "https://commons.wikimedia.org/wiki/File:Beef_and_Broccoli_over_rice_-yummy_-cookingday_-cookingistherapy_-beefandbroccoli_-foodbloggers_-cookingblog_thank_you_%40dianabrowne2_for_the_recipe.jpg",
    credit: "Monica Zorrilla Photography / Wikimedia Commons"
  },
  ...Object.fromEntries(([
  ["chicken-quinoa-salad", "chicken-quinoa-salad.svg", "鸡胸肉藜麦沙拉，包含鸡胸肉、藜麦和蔬菜", ["鸡胸肉", "藜麦", "生菜"]],
  ["egg-tofu-soba", "egg-tofu-soba.svg", "鸡蛋豆腐拌荞麦面，包含鸡蛋、豆腐和荞麦面", ["鸡蛋", "豆腐", "荞麦面"]],
  ["tuna-veggie-rice", "tuna-veggie-rice.svg", "金枪鱼蔬菜饭，包含金枪鱼、蔬菜和米饭", ["金枪鱼", "蔬菜", "米饭"]],
  ["teriyaki-chicken-rice", "teriyaki-chicken-rice.svg", "日式照烧鸡腿饭，包含鸡腿肉、蔬菜和米饭", ["鸡腿肉", "西兰花", "米饭"]],
  ["beef-onion-don", "beef-onion-don.svg", "牛肉洋葱盖饭，包含牛肉、洋葱和米饭", ["牛肉", "洋葱", "米饭"]],
  ["shrimp-corn-egg", "shrimp-corn-egg.svg", "虾仁玉米蒸蛋，包含虾仁、玉米和鸡蛋", ["虾仁", "玉米", "鸡蛋"]],
  ["chicken-pumpkin-bowl", "chicken-pumpkin-bowl.svg", "鸡胸肉南瓜碗，包含鸡胸肉、南瓜和藜麦", ["鸡胸肉", "南瓜", "藜麦"]],
  ["tofu-mushroom-chicken-pot", "tofu-mushroom-chicken-pot.svg", "豆腐菌菇鸡肉锅，包含豆腐、菌菇和鸡肉", ["豆腐", "菌菇", "鸡肉"]],
  ["tomato-beef-rice", "tomato-beef-rice.svg", "番茄牛腩饭，包含番茄、牛肉和米饭", ["番茄", "牛肉", "米饭"]],
  ["salmon-spinach-salad", "salmon-spinach-salad.svg", "三文鱼菠菜沙拉，包含三文鱼、菠菜和牛油果", ["三文鱼", "菠菜", "牛油果"]],
  ["egg-avocado-toast", "egg-avocado-toast.svg", "鸡蛋牛油果全麦吐司，包含鸡蛋、牛油果和吐司", ["鸡蛋", "牛油果", "吐司"]],
  ["shrimp-tomato-soba", "shrimp-tomato-soba.svg", "虾仁番茄荞麦面，包含虾仁、番茄和荞麦面", ["虾仁", "番茄", "荞麦面"]],
  ["chicken-broccoli-sweet-potato", "chicken-broccoli-sweet-potato.svg", "鸡肉西兰花红薯餐，包含鸡肉、西兰花和红薯", ["鸡肉", "西兰花", "红薯"]],
  ["beef-lettuce-wrap", "beef-lettuce-wrap.svg", "牛肉生菜包，包含牛肉、生菜和彩椒", ["牛肉", "生菜", "彩椒"]],
  ["tofu-shrimp-soup", "tofu-shrimp-soup.svg", "豆腐虾仁蔬菜汤，包含豆腐、虾仁和菠菜", ["豆腐", "虾仁", "菠菜"]],
  ["chicken-mushroom-pasta", "chicken-mushroom-pasta.svg", "鸡胸肉蘑菇意面，包含鸡胸肉、蘑菇和意面", ["鸡胸肉", "菌菇", "意面"]],
  ["tuna-egg-salad-bowl", "tuna-egg-salad-bowl.svg", "金枪鱼鸡蛋沙拉碗，包含金枪鱼、鸡蛋和蔬菜", ["金枪鱼", "鸡蛋", "蔬菜"]],
  ["shrimp-tofu-egg-rice", "shrimp-tofu-egg-rice.svg", "虾仁豆腐蒸蛋饭，包含虾仁、豆腐、鸡蛋和米饭", ["虾仁", "豆腐", "鸡蛋"]],
  ["tomato-egg-chicken-rice", "tomato-egg-chicken-rice.svg", "番茄鸡蛋鸡肉饭，包含番茄、鸡蛋、鸡肉和米饭", ["番茄", "鸡蛋", "鸡肉"]],
  ["chicken-pepper-pumpkin", "chicken-pepper-pumpkin.svg", "鸡腿肉彩椒南瓜盘，包含鸡腿肉、彩椒和南瓜", ["鸡腿肉", "彩椒", "南瓜"]],
  ["salmon-mushroom-rice", "salmon-mushroom-rice.svg", "三文鱼菌菇饭，包含三文鱼、菌菇和米饭", ["三文鱼", "菌菇", "米饭"]],
  ["egg-spinach-wrap", "egg-spinach-wrap.svg", "鸡蛋菠菜全麦卷，包含鸡蛋、菠菜和全麦卷", ["鸡蛋", "菠菜", "全麦卷"]],
  ["tofu-beef-veggie-pot", "tofu-beef-veggie-pot.svg", "豆腐牛肉蔬菜锅，包含豆腐、牛肉和蔬菜", ["豆腐", "牛肉", "西兰花"]],
  ["shrimp-avocado-salad", "shrimp-avocado-salad.svg", "虾仁牛油果沙拉，包含虾仁、牛油果和生菜", ["虾仁", "牛油果", "生菜"]],
  ["chicken-tomato-soba", "chicken-tomato-soba.svg", "鸡胸肉番茄荞麦面，包含鸡胸肉、番茄和荞麦面", ["鸡胸肉", "番茄", "荞麦面"]]
] as const).map(([id, fileName, alt, keyIngredients]) => [
    id,
    {
      src: `/images/recipes/${fileName}`,
      alt,
      status: "placeholder",
      keyIngredients: [...keyIngredients],
      note: "尚未找到严格匹配的可复用真实照片，正式页面显示占位图。"
    }
  ]))
};
