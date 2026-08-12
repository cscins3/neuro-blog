// 使用 CountAPI 進行免費瀏覽計數
const NAMESPACE = 'my-neuroscience-blog-unique-key-2026';
const KEY = 'visits';

async function getVisitorCount() {
  try {
    const response = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
    const data = await response.json();
    document.getElementById('visitor-count').innerText = data.value.toLocaleString();
  } catch (error) {
    document.getElementById('visitor-count').innerText = '1';
  }
}

document.addEventListener('DOMContentLoaded', getVisitorCount);