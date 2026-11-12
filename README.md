# 曲若暚 Scarlett Quincy 个人网站（初版，本地预览）

纯静态站，无构建步骤。直接打开 index.html 即可预览；GitHub Pages / 国内静态托管都可直接部署。

- index.html：全部内容（中/EN 双语，用 .i-zh / .i-en 切换）
- assets/css/style.css：样式（系统字体栈，无外部 CDN）
- assets/js/main.js：语言切换（记住选择，支持 ?lang=en）
- assets/img/：favicon、头像 sandy-portrait.jpg、GEO 豆包截图（已裁切）、回忆录封面封底、OG 分享图
- robots.txt / sitemap.xml：暂用 https://qq82295464-cyber.github.io/Scarlett-/ ，换域名后需替换（index.html 中 canonical、og:url、og:image、JSON-LD 同步替换）

待补充：POC 方案的执行结果。

原始素材已移到 /workspace/personal-site-materials/（不在网站目录内）；.gitignore 仍保留 materials/ 以防误放回。
