# 資料來源與豆標圖片說明

## 來源

1. 星巴克台灣官方咖啡豆總覽：https://www.starbucks.com.tw/coffee/our-coffees.jspx?cat=bean
2. 星巴克台灣官方線上咖啡護照：https://www.starbucks.com.tw/passport/coffeebeans
3. 星巴克台灣蘇門答臘產品頁：https://www.starbucks.com.tw/coffee/our-coffees/product.jspx?id=152
4. 星巴克台灣咖啡產地介紹：https://www.starbucks.com.tw/coffee/ethical-sourcing/sumatra.jspx
5. Starbucks at Home 咖啡處理法基礎：https://athome.starbucks.com/learn/what-are-green-coffee-beans
6. 使用者提供的 2025 Holiday、2026 Summer 1/2、2026 Autumn、2026 Holiday PPK 截圖，以及使用者整理的常態與季節豆資料表。

## 資料品質限制

- 這份網站為課堂作品，並非星巴克官方網站。
- PPK 截圖包含尚未完整核對的內容；資料已盡可能依截圖整理，但不是逐款完成官方交叉驗證的資料庫。
- 特定年度的季節豆應以該年度的包裝及文件為準，不要把不同年份混為一款。
- 若無法核實產區、處理法或烘焙程度，請改成「待確認」，不要推測。
- `coffees.json` 的 `sourceLabel` 是來源類型；`sourceUrl` 只放可確認的公開網址。
- 咖啡故事為依據已知資訊重新撰寫的簡介，並非官方原文或官方逐字引述。

## 如何加入真實豆標照片

網站不會生成虛構星巴克豆標，也不會把有內部浮水印的訓練資料截圖直接公開到 GitHub。請使用你有權公開的實際包裝或豆標照片。

1. 在專案根目錄建立 `images/` 資料夾。
2. 放入實際照片，例如 `images/sb-sumatra.jpg`。
3. 開啟 `coffees.json`，找到對應 `id` 的物件。
4. 將 `"image": ""` 改為 `"image": "images/sb-sumatra.jpg"`。
5. 儲存並推送 GitHub。照片會自動出現在卡片與詳細頁。

建議先完成圖片拍攝／授權確認，再上傳到公開網站。官方產品頁圖片如欲下載重用，也應確認使用權限，不建議直接盜連或擷取內部簡報。
