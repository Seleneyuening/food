# Aster Shore

主品牌官网第一版：Next.js + TypeScript + Tailwind CSS。Supabase Auth 保护个人轻食工具页面。

## 本地运行

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

打开 `http://localhost:3000`。

`.env.local` 里填 Supabase Project URL 和 Publishable key。不要把 secret key 或 service role key 放进前端环境变量。

## 部署到 Vercel

1. 把项目推送到 GitHub。
2. 在 Vercel 新建项目，选择这个仓库。
3. Framework 选择 Next.js，默认构建命令 `npm run build`。
4. 部署即可。

部署环境变量同样需要设置 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`。

## 绑定 astershore.com

1. 在 Vercel 项目里进入 `Settings > Domains`。
2. 添加 `astershore.com` 和 `www.astershore.com`。
3. 按 Vercel 提示在域名 DNS 里添加记录。
4. 等待 DNS 生效后，Vercel 会自动签发 HTTPS 证书。

## 后续编辑

- 导航、文章、项目和入口内容集中在 `lib/content.ts`。
- 页面在 `app/` 下，组件在 `components/` 下。
- 首页主视觉图片在 `public/images/aster-shore-hero.png`，背景样式在 `app/globals.css` 的 `.home-cover`。后续替换同名图片即可。
- 文章卡片视觉图仍用轻量 CSS placeholder，类名在 `app/globals.css`。
- 外部项目链接目前在 `lib/content.ts`：`beauty.snowqin.com` 和 `shihai.snowqin.com`。
