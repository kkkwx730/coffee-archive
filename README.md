# Coffee Archive｜咖啡風味檔案館

一個可持續擴充的咖啡風味收藏網站，使用 HTML、CSS、JavaScript 與 JSON 製作，適合部署至 GitHub Pages。

## 功能
- 六款示範咖啡豆圖鑑、風味介紹與詳細資訊
- 關鍵字搜尋、烘焙程度與處理法篩選
- 沖煮指南、品牌介紹、響應式設計
- 透過 `coffees.json` 新增資料，無需複製 HTML 卡片

## 本機預覽
因瀏覽器安全限制，請勿直接雙擊 `index.html` 讀取 JSON。於專案資料夾開啟終端機：

```bash
python -m http.server 8000
```

接著開啟 http://localhost:8000

## GitHub Pages 部署
1. 在 GitHub 建立公開 Repository，例如 `coffee-archive`。
2. 上傳 `index.html`、`styles.css`、`app.js`、`coffees.json`、`AGENTS.md`、`README.md`。
3. 進入 Settings → Pages → Build and deployment，選擇 Deploy from a branch，Branch 選 `main`，資料夾選 `/ (root)`，按 Save。
4. 等待部署完成，開啟 GitHub 提供的網站網址。GitHub Pages 網址通常為 `https://使用者名稱.github.io/coffee-archive/`。

## AI 擴充示範
請 AI 先讀 `AGENTS.md` 和 `coffees.json`，新增一筆符合格式的咖啡紀錄，並檢查搜尋、篩選、詳細資訊。資料內容應由使用者提供或明確標註為示例。

> 注意：目前六款豆款為示範資料，風味及沖煮參數僅供教學展示，不代表特定品牌或批次的官方資訊。
