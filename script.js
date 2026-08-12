// 預設示範文章資料
const samplePosts = [
    {
        id: "post-1",
        title: "大腦功能性連接 (Functional Connectivity) 在早期認知衰退中的變化",
        category: "neuroimaging",
        categoryName: "神經影像",
        date: "2026-08-10",
        readTime: "6 分鐘",
        excerpt: "透過休息狀態 functional MRI (rs-fMRI) 觀察預設模式網絡 (DMN) 的超連接性與去連接現象，如何作為早期腦部病變特徵...",
        content: `
            <p>在近年來的神經影像學研究中，休息狀態功能性磁振造影 (resting-state fMRI) 已經成為探索腦網路連結度的重要工具。</p>
            <h3 class="font-bold text-slate-800 mt-4 mb-1">預設模式網絡 (DMN) 的臨床意義</h3>
            <p>特別是在觀察<strong>預設模式網絡 (Default Mode Network, DMN)</strong> 時，研究發現海馬迴與後扣帶皮質 (PCC) 之間的機能連接強度，在輕度認知障礙階段即會出現顯著下降。</p>
            <blockquote class="border-l-4 border-teal-500 pl-3 my-3 italic text-slate-500 bg-slate-50 py-2 pr-2 rounded-r-lg">「透過測量網絡間的功能鏈結度變化，我們得以在傳統結構性 MRI 尚未出現明顯萎縮前，捕捉到功能層面的早期異常。」</blockquote>
            <p>這對於未來的早期篩檢與介入治療評估提供了極具價值的客觀生物標記 (Biomarkers)。</p>
        `,
        comments: [
            { author: "陳研究員", time: "2026-08-11 14:20", text: "請問文章中提及的 DMN 連結度下降，在 artifact 消除上主要建議採用哪種分析管線 (pipeline)？" }
        ]
    },
    {
        id: "post-2",
        title: "認知功能障礙伴隨行為情緒症狀 (BPSD) 的非藥物處置策略研讀",
        category: "bpsd",
        categoryName: "失智症與BPSD",
        date: "2026-08-05",
        readTime: "8 分鐘",
        excerpt: "整理近期關於日落症候群與精神行為症狀的照護介入模式，強調個別化照護計畫與社區轉介系統的銜接...",
        content: `
            <p>行為與精神症狀 (Behavioral and Psychological Symptoms of Dementia, BPSD) 常是照護者最大的壓力來源。本篇文章整理近期發表於權威期刊的非藥物治療介入綜述。</p>
            <h3 class="font-bold text-slate-800 mt-4 mb-1">核心處置原則</h3>
            <p>1. <strong>環境調節</strong>：保持白天光線充足，減少夜間雜音刺激。<br>
            2. <strong>音樂與懷舊治療</strong>：透過熟悉的情境引導，有效降低焦躁情緒。<br>
            3. <strong>照護者支持系統</strong>：建立清晰的社區資源轉介鏈，提升家屬對病程發展的心理準備與因應能力。</p>
        `,
        comments: []
    },
    {
        id: "post-3",
        title: "重複性經顱磁刺激 (rTMS) 在神經復健上的新進展文獻回顧",
        category: "paper",
        categoryName: "論文研讀",
        date: "2026-07-28",
        readTime: "5 分鐘",
        excerpt: "針對高頻與低頻 rTMS 對大腦皮質興奮性調控的機制分析，探討其在運動功能恢復與神經可塑性 (Neuroplasticity) 中的角色...",
        content: `
            <p>經顱磁刺激 (rTMS) 作為一種非侵入性腦刺激技術，在促進中樞神經神經可塑性 (Neuroplasticity) 上展現了顯著的潛力。</p>
            <p>近期回顧文獻指出，針對受損健側皮質給予抑製性低頻刺激 (1Hz)，或是針對患側給予興奮性高頻刺激 (10Hz)，均有助於重新平衡兩側大腦半球間的抑制作用 (Interhemispheric inhibition)。</p>
        `,
        comments: []
    },
    {
        id: "post-4",
        title: "臨床腦波 (EEG) 偽影排除與訊號處理隨筆",
        category: "clinical",
        categoryName: "臨床筆記",
        date: "2026-07-15",
        readTime: "4 分鐘",
        excerpt: "在判讀腦波圖時，如何精準識別眼動、肌肉運動與環境電磁干擾，避免誤判波形...",
        content: `
            <p>在日常臨床腦波檢測中，正確辨識偽影 (Artifacts) 是極為關鍵的一環。</p>
            <p>最常見的偽影包含眼動 (EOG)、眨眼、肌電 (EMG) 以及心電 (ECG) 干擾。利用獨立成分分析 (ICA) 可以有效分離這些非神經來源訊號，確保判讀精準度。</p>
        `,
        comments: []
    }
];

let currentCategory = 'all';
let allPosts = [...samplePosts];

document.addEventListener('DOMContentLoaded', () => {
    initVisitorCount();
    renderCategoryCounts();
    renderPosts();
    setupEventListeners();
});

async function initVisitorCount() {
    const countEl = document.getElementById('visitor-count');
    let localVisits = parseInt(localStorage.getItem('blog_visits') || '131');
    localVisits += 1;
    localStorage.setItem('blog_visits', localVisits);
    countEl.innerText = localVisits.toLocaleString();
}

function renderCategoryCounts() {
    document.getElementById('count-all').innerText = allPosts.length;
    document.getElementById('count-paper').innerText = allPosts.filter(p => p.category === 'paper').length;
    document.getElementById('count-neuroimaging').innerText = allPosts.filter(p => p.category === 'neuroimaging').length;
    document.getElementById('count-clinical').innerText = allPosts.filter(p => p.category === 'clinical').length;
    document.getElementById('count-bpsd').innerText = allPosts.filter(p => p.category === 'bpsd').length;
}

// 精準還原第一版卡片 HTML 與 CSS
function renderPosts(searchTerm = '') {
    const grid = document.getElementById('posts-grid');
    grid.innerHTML = '';

    const filtered = allPosts.filter(post => {
        const matchCategory = (currentCategory === 'all' || post.category === currentCategory);
        const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 text-xs">查無相關主題的文章。</div>`;
        return;
    }

    filtered.forEach(post => {
        const card = document.createElement('div');
        // 第一版白底、圓角 2xl、細邊框與柔和陰影
        card.className = 'bg-white rounded-2xl p-6 border border-slate-200/80 card-shadow hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group';
        card.onclick = () => openArticleModal(post.id);

        card.innerHTML = `
            <div class="space-y-3">
                <div>
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700">
                        ${post.categoryName}
                    </span>
                </div>
                <h3 class="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug">
                    ${post.title}
                </h3>
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    ${post.excerpt}
                </p>
            </div>
            <div class="flex justify-between items-center text-xs text-slate-400 pt-4 mt-4 border-t border-slate-100">
                <span>🗓️ ${post.date}</span>
                <span class="text-teal-600 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    閱讀全文 &rarr;
                </span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openArticleModal(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (!post) return;

    document.getElementById('modal-category').innerText = post.categoryName;
    document.getElementById('modal-title').innerText = post.title;
    document.getElementById('modal-date').innerText = `🗓️ ${post.date}`;
    document.getElementById('modal-read-time').innerText = `⏱️ 閱讀時間 ${post.readTime}`;
    document.getElementById('modal-body').innerHTML = post.content;
    document.getElementById('form-article-id').value = post.id;

    renderComments(post.comments);

    document.getElementById('article-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function renderComments(comments) {
    const list = document.getElementById('comments-list');
    list.innerHTML = '';

    if (!comments || comments.length === 0) {
        list.innerHTML = `<p class="text-xs text-slate-400 italic">目前尚無留言，歡迎成為第一個留言的讀者！</p>`;
        return;
    }

    comments.forEach(c => {
        const item = document.createElement('div');
        item.className = 'bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs space-y-1';
        item.innerHTML = `
            <div class="flex justify-between font-medium">
                <span class="text-slate-800">👤 ${escapeHtml(c.author)}</span>
                <span class="text-slate-400 text-[10px]">${c.time}</span>
            </div>
            <div class="text-slate-600">${escapeHtml(c.text)}</div>
        `;
        list.appendChild(item);
    });
}

function setupEventListeners() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.cat-btn').forEach(b => {
                b.classList.remove('bg-teal-50', 'text-teal-700', 'font-semibold');
                b.classList.add('text-slate-600');
            });
            const target = e.currentTarget;
            target.classList.add('bg-teal-50', 'text-teal-700', 'font-semibold');
            target.classList.remove('text-slate-600');
            
            currentCategory = target.getAttribute('data-category');
            document.getElementById('current-category-title').innerText = target.querySelector('span').innerText;
            renderPosts();
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const handleSearch = () => renderPosts(searchInput.value.trim());
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    const modal = document.getElementById('article-modal');
    const closeBtn = document.getElementById('modal-close');
    
    closeBtn.onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    document.getElementById('comment-form').addEventListener('submit', (e) => {
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        const articleId = document.getElementById('form-article-id').value;

        const post = allPosts.find(p => p.id === articleId);
        if (post) {
            post.comments.push({
                author: name,
                time: new Date().toLocaleString('zh-TW', { hour12: false }),
                text: message
            });
            renderComments(post.comments);
        }

        document.getElementById('comment-name').value = '';
        document.getElementById('comment-message').value = '';
        alert('留言發表成功！');
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
