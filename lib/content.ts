import { BookOpen, Compass, Feather, Flower2, Gem, Moon, PenLine, Shell, Sparkles, Waves } from "lucide-react";

export const navLinks = [
  { href: "/journal", label: "Journal" },
  { href: "/the-edit", label: "The Edit" },
  { href: "/the-current", label: "The Current" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
];

export const worlds = [
  { href: "/journal", title: "Journal", intro: "思考、记录与灵感", body: "生活和成长的每一刻", icon: PenLine },
  { href: "/the-edit", title: "The Edit", intro: "美妆、穿搭、生活方式", body: "找到属于你的风格", icon: Flower2 },
  { href: "/the-current", title: "The Current", intro: "计划、习惯、复盘系统", body: "让每一天都更靠近自己", icon: Waves },
  { href: "/projects", title: "Projects", intro: "AI 工具、创作实验与产品", body: "构建未来的可能性", icon: Compass }
];

export const heroCards = [
  { href: "/the-edit", title: "The Edit", body: "发现美，成为你想成为的自己", icon: Gem },
  { href: "/the-current", title: "The Current", body: "每日系统，让成长自然发生", icon: Moon },
  { href: "/projects", title: "Projects", body: "探索我在创造的工具与实验", icon: Sparkles }
];

export const posts = [
  { category: "Thoughts", title: "关于自由：我想要的生活", excerpt: "真正的自由，不是逃离什么，而是选择什么。", date: "May 20, 2026", visual: "visual-coast" },
  { category: "The Edit", title: "我的日系护肤步骤分享", excerpt: "简单、温和、有效，是我一直坚持的原则。", date: "May 18, 2026", visual: "visual-beauty" },
  { category: "AI Creation", title: "用 AI 构建我的创作宇宙", excerpt: "工具不是终点，创造属于自己的世界才是终点。", date: "May 15, 2026", visual: "visual-stars" },
  { category: "Growth", title: "让每天更接近自己", excerpt: "温柔的系统，比短暂的热情更可靠。", date: "May 12, 2026", visual: "visual-coast" },
  { category: "Beauty", title: "香气、镜子与早晨", excerpt: "仪式感不是复杂，是认真对待自己的开始。", date: "May 08, 2026", visual: "visual-beauty" },
  { category: "Travel", title: "海岸线上的片刻", excerpt: "有些答案，会在安静的路上慢慢出现。", date: "May 02, 2026", visual: "visual-stars" }
];

export const projects = [
  { title: "SignalScope", body: "AI trends, creator intelligence, and signal discovery.", status: "In development", icon: Sparkles },
  { title: "Beauty Atlas", body: "A curated beauty and skincare system.", href: "https://beauty.snowqin.com", status: "Live", icon: Flower2 },
  { title: "Boot Plan", body: "A daily reset and personal operating system.", status: "Coming soon", icon: BookOpen },
  { title: "Poetry Sea", body: "A visual universe of Chinese poetry.", href: "https://shihai.snowqin.com", status: "Live", icon: Shell }
];
