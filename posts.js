/* =========================================================================
   文章內容 — 你平常只要編輯這個檔案就能發文
   -------------------------------------------------------------------------
   每篇文章是一個物件，欄位如下：
     id       : 這篇的唯一代號（英數與 - 即可，不要重複；留言串會用它區分）
     title    : 標題
     category : 分類，需為以下三者之一（大小寫需一致）
                "Paper Review" / "Neuroimaging" / "Clinical Notes"
     date     : 日期字串 "YYYY-MM-DD"
     image    : 圖片，可留空 ""；若要放圖，把檔案丟進 images/ 資料夾，
                然後寫相對路徑，例如 "images/eeg.jpg"
     body     : 內文。空一行（兩個換行）代表分段；單一換行也會保留。

   新增文章 = 在陣列最前面貼一個新物件、push 上 GitHub 即可。
   ========================================================================= */

window.POSTS = [
  {
    id: "dmn-fmri",
    title: "Default Mode Network & fMRI Connectivity",
    category: "Neuroimaging",
    date: "2026-02-02",
    image: "",
    body:
`The Default Mode Network (DMN) is a set of brain regions that stay active when a person is not focused on the outside world. Recent fMRI work points to within-network connectivity as an early biomarker for neurodegenerative disease.

By tracking the Blood-Oxygen-Level-Dependent (BOLD) signal we can map the functional hubs that coordinate internal cognition, memory retrieval, and theory of mind — and watch how their coupling loosens before symptoms appear.

The open question I keep returning to: is reduced DMN coherence a cause, a consequence, or simply a convenient readout of something deeper?`
  },
  {
    id: "hearing-dementia",
    title: "聽力損失與失智：2024 Lancet Commission 讀後",
    category: "Paper Review",
    date: "2026-01-24",
    image: "",
    body:
`2024 Lancet Commission 把可調控的失智風險因子擴充到 14 項，其中聽力損失以 PAF 約 7% 高居單一可調控因子之首。

ACHIEVE trial 的分層結果提醒我們：在失智風險本就較高的族群，介入助聽的效益更明顯。這給了社區失智共照一個很具體的切入點——把聽力篩檢往前放，當成腦部保護的第一道關卡。

我正把它整理成「護聽護腦」雙篩的服務構想：聽力這個低門檻入口，成為民眾願意接觸腦健康的起點。`
  },
  {
    id: "dar-rtms-pilot",
    title: "以 DAR 追蹤 rTMS 反應：一則 pilot 觀察",
    category: "Clinical Notes",
    date: "2026-01-15",
    image: "",
    body:
`意識障礙（DoC / VS-UWS）的 pilot 中，我們用額區 delta/alpha ratio（DAR）當 EEG biomarker，對照 rTMS 前後的 CRS-R 變化。

小樣本（n=5）下 DAR 與 CRS-R 改善呈現相當強的負相關（r ≈ −0.813）——DAR 下降、意識評分上升，與皮質活動由慢波主導往較高頻恢復的直覺一致。

n=5 只能當訊號、不能當結論。下一步要處理個體內時間序列的穩定度，以及 DAR 相對其他頻譜指標的增益。`
  }
];
