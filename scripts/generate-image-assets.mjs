import { mkdir, writeFile } from "node:fs/promises";

const recipes = [
  ["beef-pepper-rice", "牛肉彩椒饭", ["牛肉", "彩椒", "米饭"]],
  ["chicken-quinoa-salad", "鸡胸肉藜麦沙拉", ["鸡胸肉", "藜麦", "生菜"]],
  ["salmon-avocado-rice", "三文鱼牛油果饭", ["三文鱼", "牛油果", "米饭"]],
  ["shrimp-broccoli-fried-rice", "虾仁西兰花炒饭", ["虾仁", "西兰花", "米饭"]],
  ["egg-tofu-soba", "鸡蛋豆腐拌荞麦面", ["鸡蛋", "豆腐", "荞麦面"]],
  ["tuna-veggie-rice", "金枪鱼蔬菜饭", ["金枪鱼", "蔬菜", "米饭"]],
  ["tomato-chicken-pasta", "番茄鸡肉意面", ["番茄", "鸡肉", "意面"]],
  ["teriyaki-chicken-rice", "日式照烧鸡腿饭", ["鸡腿肉", "西兰花", "米饭"]],
  ["beef-onion-don", "牛肉洋葱盖饭", ["牛肉", "洋葱", "米饭"]],
  ["shrimp-corn-egg", "虾仁玉米蒸蛋", ["虾仁", "玉米", "鸡蛋"]],
  ["chicken-pumpkin-bowl", "鸡胸肉南瓜碗", ["鸡胸肉", "南瓜", "藜麦"]],
  ["tofu-mushroom-chicken-pot", "豆腐菌菇鸡肉锅", ["豆腐", "菌菇", "鸡肉"]],
  ["tomato-beef-rice", "番茄牛腩饭", ["番茄", "牛肉", "米饭"]],
  ["salmon-spinach-salad", "三文鱼菠菜沙拉", ["三文鱼", "菠菜", "牛油果"]],
  ["egg-avocado-toast", "鸡蛋牛油果全麦吐司", ["鸡蛋", "牛油果", "吐司"]],
  ["shrimp-tomato-soba", "虾仁番茄荞麦面", ["虾仁", "番茄", "荞麦面"]],
  ["chicken-broccoli-sweet-potato", "鸡肉西兰花红薯餐", ["鸡肉", "西兰花", "红薯"]],
  ["beef-lettuce-wrap", "牛肉生菜包", ["牛肉", "生菜", "彩椒"]],
  ["tofu-shrimp-soup", "豆腐虾仁蔬菜汤", ["豆腐", "虾仁", "菠菜"]],
  ["chicken-mushroom-pasta", "鸡胸肉蘑菇意面", ["鸡胸肉", "菌菇", "意面"]],
  ["tuna-egg-salad-bowl", "金枪鱼鸡蛋沙拉碗", ["金枪鱼", "鸡蛋", "蔬菜"]],
  ["beef-broccoli-brown-rice", "牛肉西兰花糙米饭", ["牛肉", "西兰花", "糙米"]],
  ["shrimp-tofu-egg-rice", "虾仁豆腐蒸蛋饭", ["虾仁", "豆腐", "鸡蛋"]],
  ["tomato-egg-chicken-rice", "番茄鸡蛋鸡肉饭", ["番茄", "鸡蛋", "鸡肉"]],
  ["chicken-pepper-pumpkin", "鸡腿肉彩椒南瓜盘", ["鸡腿肉", "彩椒", "南瓜"]],
  ["salmon-mushroom-rice", "三文鱼菌菇饭", ["三文鱼", "菌菇", "米饭"]],
  ["egg-spinach-wrap", "鸡蛋菠菜全麦卷", ["鸡蛋", "菠菜", "全麦卷"]],
  ["tofu-beef-veggie-pot", "豆腐牛肉蔬菜锅", ["豆腐", "牛肉", "西兰花"]],
  ["shrimp-avocado-salad", "虾仁牛油果沙拉", ["虾仁", "牛油果", "生菜"]],
  ["chicken-tomato-soba", "鸡胸肉番茄荞麦面", ["鸡胸肉", "番茄", "荞麦面"]]
];

const ingredients = [
  ["milk", "牛奶", "#f8f0dc"],
  ["egg", "鸡蛋", "#f3c879"],
  ["yogurt", "无糖酸奶", "#fff8ea"],
  ["oats", "燕麦片", "#d6b477"],
  ["blueberry", "蓝莓", "#526184"],
  ["spinach", "菠菜", "#587a4f"],
  ["banana", "香蕉", "#edc553"],
  ["chicken-breast", "鸡胸肉", "#e9c0a8"],
  ["salmon", "三文鱼", "#e78b6f"],
  ["beef", "牛肉", "#8a4b38"],
  ["shrimp", "虾仁", "#f0a17f"],
  ["tofu", "豆腐", "#fff4df"],
  ["pepper", "彩椒", "#d96045"],
  ["broccoli", "西兰花", "#66864f"],
  ["sweet-potato", "红薯", "#c87842"],
  ["avocado", "牛油果", "#8da25f"],
  ["tomato", "番茄", "#d75c4a"],
  ["soba", "荞麦面", "#9d7754"],
  ["brown-rice", "糙米", "#b99263"],
  ["quinoa", "藜麦", "#d8bd83"],
  ["rice", "米饭", "#fffdf3"],
  ["corn", "玉米", "#efbf3c"],
  ["pumpkin", "南瓜", "#d98a39"],
  ["mushroom", "菌菇", "#b38b6e"],
  ["onion", "洋葱", "#d8c2a9"],
  ["lettuce", "生菜", "#8eac69"],
  ["tuna", "金枪鱼", "#b9bec7"],
  ["pasta", "意面", "#deb56e"],
  ["toast", "全麦吐司", "#c9965d"],
  ["wrap", "全麦卷饼", "#d8b983"],
  ["oil", "食用油", "#e9c86d"]
];

const colors = {
  牛肉: "#8a4b38", 彩椒: "#d95f44", 米饭: "#fffdf2", 鸡胸肉: "#e6b99c", 鸡肉: "#e6b99c",
  藜麦: "#d8bd83", 生菜: "#8cad68", 三文鱼: "#e7896d", 牛油果: "#8aa15d", 虾仁: "#f09b78",
  西兰花: "#63854e", 鸡蛋: "#f2c35e", 豆腐: "#fff1d6", 荞麦面: "#8f6a4d", 金枪鱼: "#b8bec7",
  蔬菜: "#7f9b68", 番茄: "#d75948", 意面: "#d7a95c", 鸡腿肉: "#cf8e63", 洋葱: "#d5bba2",
  玉米: "#efbd3d", 南瓜: "#d98636", 菌菇: "#a77d62", 菠菜: "#557b4b", 吐司: "#c89155",
  红薯: "#bd7240", 糙米: "#b98d5d", 全麦卷: "#d6b47f"
};

function escape(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" })[char]);
}

function recipeSvg(name, parts) {
  const dots = parts.map((part, index) => {
    const x = 470 + Math.cos(index * 2.1) * 82;
    const y = 205 + Math.sin(index * 2.1) * 54;
    const color = colors[part] ?? "#8da25f";
    return `<g><ellipse cx="${x}" cy="${y}" rx="58" ry="38" fill="${color}" opacity=".95"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="20" fill="#fffaf2" font-family="PingFang SC,Arial">${escape(part)}</text></g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
  <rect width="960" height="600" rx="42" fill="#f7f1e7"/>
  <path d="M0 430 C180 370 310 520 500 438 C690 356 800 404 960 334 L960 600 L0 600Z" fill="#e5decc"/>
  <ellipse cx="600" cy="285" rx="260" ry="154" fill="#d8c9ac"/>
  <ellipse cx="600" cy="252" rx="238" ry="136" fill="#fffaf0"/>
  <ellipse cx="650" cy="240" rx="100" ry="78" fill="#fffdf5"/>
  ${dots}
  <path d="M720 455 L922 344" stroke="#7d5434" stroke-width="12" stroke-linecap="round" opacity=".75"/>
  <path d="M700 428 L902 318" stroke="#906542" stroke-width="8" stroke-linecap="round" opacity=".65"/>
  <rect x="54" y="58" width="290" height="218" rx="22" fill="#fffaf0" opacity=".9"/>
  <text x="82" y="110" font-size="24" fill="#596550" font-family="Georgia,serif" letter-spacing="2">TODAY'S TABLE</text>
  <line x1="82" y1="138" x2="140" y2="138" stroke="#6f835e" stroke-width="3"/>
  <text x="82" y="190" font-size="42" fill="#20251f" font-family="PingFang SC,serif">${escape(name)}</text>
  <text x="82" y="236" font-size="22" fill="#6f675b" font-family="PingFang SC,Arial">${escape(parts.join(" · "))}</text>
</svg>`;
}

function ingredientSvg(name, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="420" viewBox="0 0 560 420">
  <rect width="560" height="420" rx="36" fill="#fbf8ef"/>
  <ellipse cx="280" cy="318" rx="178" ry="36" fill="#e6dece"/>
  <circle cx="282" cy="190" r="96" fill="${color}"/>
  <circle cx="248" cy="154" r="38" fill="#fffaf0" opacity=".38"/>
  <path d="M224 284 C268 306 320 306 362 282" fill="none" stroke="#6f835e" stroke-width="10" stroke-linecap="round" opacity=".45"/>
  <text x="280" y="372" text-anchor="middle" font-size="34" fill="#2f4328" font-family="PingFang SC,serif">${escape(name)}</text>
</svg>`;
}

await mkdir("public/images/ingredients", { recursive: true });

// Recipe photos now come from the fixed user-provided dish reference image.
await Promise.all(ingredients.map(([id, name, color]) => writeFile(`public/images/ingredients/${id}.svg`, ingredientSvg(name, color))));
