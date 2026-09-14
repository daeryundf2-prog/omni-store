#!/usr/bin/env node
/* 언어별 랜딩 페이지 생성기 — studio.html의 DOC_TYPES를 평가해
 * 각 언어에서 사용 가능한 문서 목록으로 정적 페이지(lang-XX.html)를 만든다.
 * 사용: node build_lang_pages.js
 */
const fs = require('fs');
global.window = { OMNI_SETTLEMENT: null };
eval(fs.readFileSync('settlement_config.js', 'utf8'));
const src = fs.readFileSync('studio.html', 'utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];
const el = () => ({ innerHTML: '', textContent: '', value: '', dataset: {}, style: {}, classList: { add() {}, remove() {}, toggle() {} }, appendChild() {}, setAttribute() {}, addEventListener() {}, scrollIntoView() {}, querySelector: el, querySelectorAll: () => [], closest: el, getContext: () => ({}), toDataURL: () => '', setPointerCapture() {} });
global.document = {
  getElementById: (id) => (String(id).startsWith('f_') ? null : el()),
  querySelector: el, querySelectorAll: () => [], addEventListener() {}, createElement: el,
  body: { appendChild() {}, classList: { add() {}, remove() {}, toggle() {} } }
};
const store = {};
global.localStorage = { getItem: k => store[k] ?? null, setItem() {}, removeItem() {} };
global.history = {}; global.location = {};
global.matchMedia = () => ({ matches: false, addEventListener() {} });
global.crypto = require('crypto').webcrypto;

eval(js + `
global.__OUT__ = { DOC_TYPES, LANGUAGES, CATEGORIES, STUDIO };
`);

const { DOC_TYPES, LANGUAGES, CATEGORIES, STUDIO } = global.__OUT__;
const CAT_NAME = Object.fromEntries(CATEGORIES.map(c => [c.id, c.name]));
const escHtml = s => String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 언어별 페이지 메타 — 제목·설명·UI 문자열은 해당 언어로 */
const META = {
  en: { title: "Document Templates in English", desc: "Fill in a guided form and generate demand letters, NDAs, contracts and more — clean originals, watermark-free.", h1: "English Document Templates", sub: "Guided form → instant document. Free watermarked preview, pay only for the clean original.", open: "Open form →" },
  ko: { title: "한국어 문서 양식 모음", desc: "고소장·내용증명·계약서 등 표준 서식을 폼 입력만으로 즉시 생성.", h1: "한국어 문서 양식", sub: "폼 입력만으로 문서 즉시 생성. 미리보기 무료, 원본 출력만 유료.", open: "작성하기 →" },
  ja: { title: "日本語ドキュメントテンプレート", desc: "退職願・念書・示談書・通知書など、フォーム入力で即時生成。", h1: "日本語ドキュメント", sub: "ガイド付きフォーム → 即時ドキュメント。プレビューは無料。", open: "作成する →" },
  zh: { title: "中文文书模板", desc: "辞职信·授权委托书·催告函等，填表即生成。", h1: "中文文书模板", sub: "引导式表单 → 即时生成。预览免费，原件输出付费。", open: "开始填写 →" },
  de: { title: "Deutsche Dokumentvorlagen", desc: "Kündigung, Mahnung, Vollmacht, Abmahnung u.v.m. — Formular ausfüllen, Dokument erhalten.", h1: "Deutsche Dokumente", sub: "Geführtes Formular → sofortiges Dokument. Vorschau kostenlos.", open: "Formular öffnen →" },
  fr: { title: "Modèles de documents en français", desc: "Mise en demeure, lettre de résiliation, démission — formulaire guidé, document immédiat.", h1: "Documents en français", sub: "Formulaire guidé → document instantané. Aperçu gratuit.", open: "Ouvrir →" },
  es: { title: "Plantillas de documentos en español", desc: "Carta de renuncia, finiquito, requerimiento — formulario guiado.", h1: "Documentos en español", sub: "Formulario guiado → documento inmediato. Vista previa gratuita.", open: "Abrir →" },
  pt: { title: "Modelos de documentos em português", desc: "Carta de demissão, procuração, notificação extrajudicial — formulário guiado.", h1: "Documentos em português", sub: "Formulário guiado → documento imediato. Prévia gratuita.", open: "Abrir →" },
  id: { title: "Template dokumen Bahasa Indonesia", desc: "Surat pengunduran diri, somasi, perjanjian — formulir terpandu.", h1: "Dokumen Bahasa Indonesia", sub: "Formulir terpandu → dokumen instan. Pratinjau gratis.", open: "Buka →" },
  ru: { title: "Шаблоны документов на русском", desc: "Претензия, договор займа, NDA — заполните форму и получите документ.", h1: "Документы на русском", sub: "Форма → мгновенный документ. Предпросмотр бесплатно.", open: "Открыть →" },
  ar: { title: "نماذج مستندات بالعربية", desc: "إشعار مطالبة، عقد قرض، اتفاقية عدم إفصاح — نموذج إرشادي.", h1: "مستندات بالعربية", sub: "نموذج إرشادي → مستند فوري. المعاينة مجانية.", open: "افتح النموذج ←" },
  it: { title: "Modelli di documenti in italiano", desc: "Diffida e messa in mora, contratto di prestito, NDA — modulo guidato.", h1: "Documenti in italiano", sub: "Modulo guidato → documento immediato. Anteprima gratuita.", open: "Apri →" },
  tr: { title: "Türkçe belge şablonları", desc: "İhtarname, sözleşme, talep mektubu — yönlendirmeli form.", h1: "Türkçe belgeler", sub: "Yönlendirmeli form → anında belge. Önizleme ücretsiz.", open: "Formu aç →" },
  pl: { title: "Szablony dokumentów po polsku", desc: "Wypowiedzenie, umowa, wezwanie — formularz prowadzący.", h1: "Dokumenty po polsku", sub: "Formularz prowadzący → natychmiastowy dokument. Podgląd bezpłatny.", open: "Otwórz →" },
  nl: { title: "Nederlandse documentsjablonen", desc: "Opzeggingsbrief, contract, aanmaning — begeleid formulier.", h1: "Nederlandse documenten", sub: "Begeleid formulier → direct document. Preview gratis.", open: "Openen →" },
  vi: { title: "Mẫu tài liệu tiếng Việt", desc: "Đơn xin nghỉ việc, thư yêu cầu, hợp đồng — biểu mẫu có hướng dẫn.", h1: "Tài liệu tiếng Việt", sub: "Biểu mẫu hướng dẫn → tài liệu ngay. Xem trước miễn phí.", open: "Mở →" },
  th: { title: "แม่แบบเอกสารภาษาไทย", desc: "หนังสือลาออก หนังสือแจ้งเตือน สัญญา — แบบฟอร์มนำทาง", h1: "เอกสารภาษาไทย", sub: "แบบฟอร์มนำทาง → เอกสารทันที ดูตัวอย่างฟรี", open: "เปิดแบบฟอร์ม →" },
};


const CSS = `
  * { box-sizing: border-box; margin: 0; }
  body { font-family: -apple-system, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Arabic", "Noto Sans Thai", sans-serif; background: #0B1220; color: #E2E8F0; padding: 40px 20px; }
  main { max-width: 960px; margin: 0 auto; }
  h1 { font-size: 1.8rem; margin-bottom: 8px; }
  .sub { color: #94A3B8; margin-bottom: 28px; line-height: 1.6; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
  .card { background: #111A2E; border: 1px solid #1E293B; border-radius: 12px; padding: 16px 18px; display: flex; flex-direction: column; gap: 8px; }
  .card h3 { font-size: 1rem; line-height: 1.4; }
  .card .cat { font-size: 0.75rem; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; }
  .card .price { font-size: 0.85rem; color: #38BDF8; font-weight: 700; }
  .card a { margin-top: auto; color: #38BDF8; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
  .card a:hover { text-decoration: underline; }
  .note { margin-top: 32px; padding: 14px 18px; background: #111A2E; border-left: 3px solid #F59E0B; font-size: 0.85rem; color: #94A3B8; line-height: 1.6; }
  .back { margin-top: 24px; } .back a { color: #64748B; font-size: 0.85rem; }
`;

let total = 0;
for (const lang of LANGUAGES) {
  const docs = DOC_TYPES.filter(d => d.langs.includes(lang.id));
  const meta = META[lang.id] || META.en;
  const dir = lang.id === "ar" ? "rtl" : "ltr";
  const cards = docs.map(d => `
      <article class="card">
        <div class="cat">${escHtml(CAT_NAME[d.cat] || d.cat)}</div>
        <h3>${escHtml(d.name)}</h3>
        <div class="price">₩${(STUDIO.prices && STUDIO.prices[d.id] || d.price || STUDIO.priceKrw).toLocaleString()}</div>
        <a href="studio.html?doc=${d.id}&lang=${lang.id}">${escHtml(meta.open)}</a>
        <a href="docs/${lang.id}/${d.id}.html" style="font-size:0.8rem;opacity:0.75">${escHtml(meta.open)} ▸</a>
      </article>`).join("");
  const html = `<!DOCTYPE html>
<html lang="${lang.id}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(meta.title)} — OmniLegal</title>
  <meta name="description" content="${escHtml(meta.desc)}" />
  <link rel="canonical" href="https://daeryundf2-prog.github.io/omni-store/lang-${lang.id}.html" />
  <style>${CSS}</style>
</head>
<body>
<main>
  <h1>${escHtml(meta.h1)}</h1>
  <p class="sub">${escHtml(meta.sub)}</p>
  <div class="grid">${cards}
  </div>
  <div class="note">Standard-template automation — not legal advice. Generated documents should be reviewed by a qualified professional in your jurisdiction for consequential matters. All input stays in your browser; nothing is sent to a server.</div>
  <div class="back"><a href="studio.html">← OmniLegal Document Studio (all languages)</a></div>
</main>
</body>
</html>`;
  fs.writeFileSync(`lang-${lang.id}.html`, html);
  console.log(`lang-${lang.id}.html — ${docs.length} docs`);
  total++;
}
console.log(`generated ${total} language pages`);
