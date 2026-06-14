// 발췌 수집기 주소 (배포된 GitHub Pages)
const COLLECTOR = "https://724ch.github.io/quote-collector/";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "clip",
    title: "✂️ 발췌 담기",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "clip") return;
  const q = (info.selectionText || "").trim();
  if (!q) return;
  const url = COLLECTOR
    + "?q=" + encodeURIComponent(q)
    + "&u=" + encodeURIComponent(info.pageUrl || (tab && tab.url) || "")
    + "&t=" + encodeURIComponent((tab && tab.title) || "")
    + "&popup=1";
  chrome.windows.create({ url, type: "popup", width: 380, height: 240, top: 80, left: 80 });
});
