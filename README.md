# Neuroscience Blog Platform

一個極簡暗色的個人神經科學部落格，純靜態網頁，可直接發布到 GitHub Pages。
訪客人次用 GoatCounter，留言用 Giscus（GitHub Discussions），兩者都免費、都不需要自架伺服器。

---

## 檔案結構

| 檔案 | 用途 | 你會不會常改 |
|------|------|--------------|
| `index.html` | 網頁骨架 | 幾乎不用 |
| `styles.css` | 樣式（暗色、襯線） | 想微調外觀時 |
| `app.js` | 程式邏輯 **＋最上方的 CONFIG 設定區** | 一開始設定一次 |
| `posts.js` | **文章內容** | 每次發文都改這裡 |
| `images/` | 放文章圖片 | 有圖時 |
| `README.md` | 本說明 | — |

---

## A. 先讓網站上線（GitHub Pages）

1. 在 GitHub 建一個 **public** repo（例如 `neuro-blog`）。
2. 把這個資料夾裡的所有檔案上傳／push 到 repo 根目錄。
3. repo 頁面 → **Settings → Pages** → Source 選 `Deploy from a branch`，
   Branch 選 `main`、資料夾選 `/ (root)`，儲存。
4. 等一兩分鐘，網址會是 `https://<你的帳號>.github.io/neuro-blog/`。

此時文章、分類、閱讀頁都能正常運作了。人次與留言需要下面兩步才會啟用。

---

## B. 開啟訪客人次（GoatCounter）

1. 到 https://www.goatcounter.com 免費註冊，取得你的代號。
   （若你註冊的是 `myblog.goatcounter.com`，代號就是 `myblog`。）
2. 到 GoatCounter 的 **Settings**，勾選 **Allow adding visitor counts on your website**。
3. 打開 `app.js`，把最上面的
   ```js
   goatcounterCode: "",
   ```
   改成
   ```js
   goatcounterCode: "myblog",
   ```
4. push 上去，頁面下方的 **Total Views** 就會開始顯示累計人次。

---

## C. 開啟留言（Giscus）

1. 在 repo：**Settings → General → Features**，勾選 **Discussions**。
2. 到 https://github.com/apps/giscus 安裝 giscus app，授權給這個 repo。
3. （建議）到 repo 的 **Discussions** 頁，新增一個分類叫 **Comments**，
   格式選 **Announcement**（這樣只有 giscus 機器人能開新討論串，避免有人亂發）。
4. 到 https://giscus.app ，在「Repository」填 `你的帳號/你的repo`，
   下方會產生 `data-repo-id` 與 `data-category-id`（挑你剛建的 Comments 分類）。
5. 打開 `app.js`，把 CONFIG 裡的 giscus 區塊填好：
   ```js
   giscus: {
     repo: "你的帳號/neuro-blog",
     repoId: "R_kgD...",        // 從 giscus.app 複製
     category: "Comments",
     categoryId: "DIC_kwD...",  // 從 giscus.app 複製
     theme: "transparent_dark",
     lang: "zh-TW"
   }
   ```
6. push 上去。每篇文章底部就會出現留言框。
   讀者需要用 GitHub 帳號登入才能留言（可有效擋垃圾留言）。
   每篇文章用它的 `id` 當作獨立留言串，你之後可在 repo 的 Discussions 裡管理／回覆。

> 註：Giscus 的留言框只有在**已部署的公開網址**上才會完整載入，
> 在本機直接打開 `index.html` 看不到留言框是正常的。

---

## D. 怎麼發新文章

打開 `posts.js`，在陣列**最前面**貼一個新物件：

```js
{
  id: "my-new-post",              // 唯一代號，英數與 -，別重複
  title: "我的新文章標題",
  category: "Clinical Notes",      // 三選一，見下
  date: "2026-03-01",
  image: "images/scan.jpg",        // 沒圖就寫 ""
  body:
`第一段內容。

空一行代表換段落。`
},
```

分類（`category`）只能是這三個之一，大小寫要一致：
`"Paper Review"`、`"Neuroimaging"`、`"Clinical Notes"`。

存檔、push，文章就上線了。要放圖就把圖片檔丟進 `images/` 再用相對路徑引用。

---

## 想改成中文介面 / 改分類名稱？

- 側欄與分類文字：改 `app.js` 最上面的 `CATS` 與 `NAV`（同時 `posts.js` 裡的 `category` 要跟著改成一樣的字）。
- 「Total Views / Category」等字樣：在 `index.html` 直接改。
- 顏色與字體：在 `styles.css` 最上面的 `:root` 變數調整。

---

有需要我可以再幫你加：RSS、標籤系統、深淺色切換、或把首頁做成卡片牆版型。
