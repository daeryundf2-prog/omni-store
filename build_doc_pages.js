#!/usr/bin/env node
/* 문서×언어별 SEO 랜딩 페이지 생성기 — node build_doc_pages.js
 * 각 양식의 실제 렌더링 결과(샘플 데이터)를 본문에 포함한 독립 페이지를
 * docs/{lang}/{docId}.html 로 생성한다. */
const FS = require('fs');
const PATH = require('path');
const GUIDES = require('./doc_guides.js');
const CAT_GUIDE = GUIDES.CAT_GUIDE;

global.window = { OMNI_SETTLEMENT: null };
eval(FS.readFileSync('settlement_config.js', 'utf8'));
const src = FS.readFileSync('studio.html', 'utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];
const el = () => ({ innerHTML: '', textContent: '', value: '', dataset: {}, style: {}, classList: { add() {}, remove() {}, toggle() {} }, appendChild() {}, setAttribute() {}, addEventListener() {}, scrollIntoView() {}, querySelector: el, querySelectorAll: () => [], closest: el, getContext: () => ({ lineWidth: 0, lineCap: '', strokeStyle: '', beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, clearRect() {}, drawImage() {} }), toDataURL: () => 'data:image/png;base64,x', setPointerCapture() {} });
global.document = { getElementById: (id) => (String(id).startsWith('f_') ? null : el()), querySelector: el, querySelectorAll: () => [], addEventListener() {}, createElement: el, body: { appendChild() {}, classList: { add() {}, remove() {}, toggle() {} } } };
const store = {};
global.localStorage = { getItem: k => store[k] ?? null, setItem(k, v) { store[k] = v }, removeItem(k) { delete store[k] } };
global.history = {}; global.location = {};
global.matchMedia = () => ({ matches: false, addEventListener() {} });
global.crypto = require('crypto').webcrypto;
global.navigator = {};
global.__FS = FS;
global.__OUT = { pages: [] };

/* 페이지 chrome 다국어 문자열 */
const T = {
  ko: { what: "이 문서가 필요한 경우", need: "폼에 정보를 입력하면 이 양식이 자동으로 완성됩니다. 무료로 워터마크 미리보기를 확인한 뒤, 원본은 결제 후 잠금 해제됩니다.", fields: "작성에 필요한 정보", preview: "작성 예시 (실제 출력)", cta: "무료 미리보기·작성하기", unlock: "원본 다운로드", rel: "관련 문서", disc: "본 페이지의 문서는 일반적인 양식 예시이며 개별 사안에 대한 법률 자문이 아닙니다. 중요한 문서는 전문가 검토를 권합니다.", home: "홈", studio: "문서 스튜디오", how: "작성 방법", how1: "아래 버튼으로 스튜디오에 접속합니다", how2: "안내에 따라 항목을 입력합니다", how3: "실시간 미리보기를 확인하고 원본을 다운로드합니다" },
  en: { what: "When you need this document", need: "Fill in the form and this document is generated automatically. Preview it free with a watermark — the clean original unlocks after payment.", fields: "Information you'll need", preview: "Sample output (actual rendering)", cta: "Free preview & fill", unlock: "Download original", rel: "Related documents", disc: "This document is a general template, not legal advice for your specific case. Have important documents reviewed by a professional.", home: "Home", studio: "Document Studio", how: "How it works", how1: "Open the studio with the button below", how2: "Fill in the guided fields", how3: "Check the live preview and download the original" },
  ja: { what: "この書類が必要な場面", need: "フォームに入力するだけで書類が自動生成されます。透かし入りプレビューは無料、原本は決済後にロック解除されます。", fields: "入力する情報", preview: "作成例（実際の出力）", cta: "無料プレビュー・作成", unlock: "原本をダウンロード", rel: "関連書類", disc: "本ページの書類は一般的な様式例であり、個別事案への法的助言ではありません。", home: "ホーム", studio: "書類スタジオ", how: "作成方法", how1: "下のボタンでスタジオを開きます", how2: "案内に沿って項目を入力します", how3: "プレビューを確認し原本をダウンロードします" },
  zh: { what: "何时需要此文件", need: "填写表单即可自动生成此文件。免费查看带水印的预览，付款后解锁无水印原件。", fields: "所需信息", preview: "填写示例（实际输出）", cta: "免费预览·填写", unlock: "下载原件", rel: "相关文件", disc: "本页文件为通用格式示例，不构成针对个案的法律意见。", home: "首页", studio: "文件工作室", how: "使用方法", how1: "点击下方按钮打开工作室", how2: "按提示填写各项内容", how3: "确认实时预览并下载原件" },
  de: { what: "Wann Sie dieses Dokument brauchen", need: "Formular ausfüllen — das Dokument wird automatisch erstellt. Kostenlose Vorschau mit Wasserzeichen, das Original wird nach Zahlung freigeschaltet.", fields: "Benötigte Angaben", preview: "Ausfüllbeispiel (tatsächliche Ausgabe)", cta: "Kostenlose Vorschau", unlock: "Original herunterladen", rel: "Ähnliche Dokumente", disc: "Dieses Dokument ist eine allgemeine Vorlage und keine Rechtsberatung im Einzelfall.", home: "Start", studio: "Dokumenten-Studio", how: "So funktioniert es", how1: "Studio über die Schaltfläche unten öffnen", how2: "Die geführten Felder ausfüllen", how3: "Vorschau prüfen und Original herunterladen" },
  fr: { what: "Quand avez-vous besoin de ce document", need: "Remplissez le formulaire et le document est généré automatiquement. Aperçu gratuit avec filigrane, l'original se débloque après paiement.", fields: "Informations nécessaires", preview: "Exemple rempli (rendu réel)", cta: "Aperçu gratuit", unlock: "Télécharger l'original", rel: "Documents associés", disc: "Ce document est un modèle général et ne constitue pas un conseil juridique.", home: "Accueil", studio: "Studio de documents", how: "Mode d'emploi", how1: "Ouvrez le studio via le bouton ci-dessous", how2: "Remplissez les champs guidés", how3: "Vérifiez l'aperçu et téléchargez l'original" },
  es: { what: "Cuándo necesita este documento", need: "Rellene el formulario y el documento se genera automáticamente. Vista previa gratuita con marca de agua; el original se desbloquea tras el pago.", fields: "Información necesaria", preview: "Ejemplo rellenado (salida real)", cta: "Vista previa gratis", unlock: "Descargar original", rel: "Documentos relacionados", disc: "Este documento es una plantilla general, no asesoramiento legal para su caso.", home: "Inicio", studio: "Estudio de documentos", how: "Cómo funciona", how1: "Abra el estudio con el botón inferior", how2: "Complete los campos guiados", how3: "Revise la vista previa y descargue el original" },
  vi: { what: "Khi nào bạn cần tài liệu này", need: "Điền vào biểu mẫu và tài liệu được tạo tự động. Xem trước miễn phí có watermark — bản gốc mở khóa sau khi thanh toán.", fields: "Thông tin cần thiết", preview: "Ví dụ điền (kết quả thực tế)", cta: "Xem trước miễn phí", unlock: "Tải bản gốc", rel: "Tài liệu liên quan", disc: "Tài liệu này là mẫu chung, không phải tư vấn pháp lý cho trường hợp cụ thể.", home: "Trang chủ", studio: "Studio tài liệu", how: "Cách sử dụng", how1: "Mở studio bằng nút bên dưới", how2: "Điền các trường được hướng dẫn", how3: "Kiểm tra bản xem trước và tải bản gốc" },
  th: { what: "เมื่อไรที่คุณต้องการเอกสารนี้", need: "กรอกแบบฟอร์มแล้วเอกสารจะถูกสร้างอัตโนมัติ ดูตัวอย่างฟรีพร้อมลายน้ำ — ต้นฉบับปลดล็อกหลังชำระเงิน", fields: "ข้อมูลที่ต้องใช้", preview: "ตัวอย่างการกรอก (ผลลัพธ์จริง)", cta: "ดูตัวอย่างฟรี", unlock: "ดาวน์โหลดต้นฉบับ", rel: "เอกสารที่เกี่ยวข้อง", disc: "เอกสารนี้เป็นแบบฟอร์มทั่วไป ไม่ใช่คำแนะนำทางกฎหมายสำหรับกรณีของคุณ", home: "หน้าแรก", studio: "สตูดิโอเอกสาร", how: "วิธีใช้งาน", how1: "เปิดสตูดิโอด้วยปุ่มด้านล่าง", how2: "กรอกข้อมูลตามคำแนะนำ", how3: "ตรวจสอบตัวอย่างและดาวน์โหลดต้นฉบับ" },
  pt: { what: "Quando você precisa deste documento", need: "Preencha o formulário e o documento é gerado automaticamente. Prévia gratuita com marca d'água — o original é desbloqueado após o pagamento.", fields: "Informações necessárias", preview: "Exemplo preenchido (saída real)", cta: "Prévia gratuita", unlock: "Baixar original", rel: "Documentos relacionados", disc: "Este documento é um modelo geral, não aconselhamento jurídico para o seu caso.", home: "Início", studio: "Estúdio de documentos", how: "Como funciona", how1: "Abra o estúdio pelo botão abaixo", how2: "Preencha os campos guiados", how3: "Confira a prévia e baixe o original" },
  id: { what: "Kapan Anda membutuhkan dokumen ini", need: "Isi formulir dan dokumen dibuat otomatis. Pratinjau gratis dengan watermark — dokumen asli terbuka setelah pembayaran.", fields: "Informasi yang dibutuhkan", preview: "Contoh pengisian (hasil nyata)", cta: "Pratinjau gratis", unlock: "Unduh dokumen asli", rel: "Dokumen terkait", disc: "Dokumen ini adalah templat umum, bukan nasihat hukum untuk kasus Anda.", home: "Beranda", studio: "Studio dokumen", how: "Cara penggunaan", how1: "Buka studio melalui tombol di bawah", how2: "Isi kolom yang dipandu", how3: "Periksa pratinjau dan unduh dokumen asli" },
  ru: { what: "Когда вам нужен этот документ", need: "Заполните форму — документ создаётся автоматически. Бесплатный предпросмотр с водяным знаком, оригинал открывается после оплаты.", fields: "Необходимая информация", preview: "Пример заполнения (реальный вывод)", cta: "Бесплатный предпросмотр", unlock: "Скачать оригинал", rel: "Похожие документы", disc: "Этот документ является общим шаблоном, а не юридической консультацией по вашему делу.", home: "Главная", studio: "Студия документов", how: "Как это работает", how1: "Откройте студию по кнопке ниже", how2: "Заполните поля по подсказкам", how3: "Проверьте предпросмотр и скачайте оригинал" },
  ar: { what: "متى تحتاج إلى هذه الوثيقة", need: "املأ النموذج وسيتم إنشاء الوثيقة تلقائياً. معاينة مجانية بعلامة مائية — النسخة الأصلية تُفتح بعد الدفع.", fields: "المعلومات المطلوبة", preview: "مثال معبأ (المخرجات الفعلية)", cta: "معاينة مجانية", unlock: "تنزيل الأصل", rel: "وثائق ذات صلة", disc: "هذه الوثيقة نموذج عام وليست استشارة قانونية لحالتك.", home: "الرئيسية", studio: "استوديو الوثائق", how: "كيفية الاستخدام", how1: "افتح الاستوديو عبر الزر أدناه", how2: "املأ الحقول الموجهة", how3: "راجع المعاينة ونزّل الأصل" },
  it: { what: "Quando ti serve questo documento", need: "Compila il modulo e il documento viene generato automaticamente. Anteprima gratuita con filigrana — l'originale si sblocca dopo il pagamento.", fields: "Informazioni necessarie", preview: "Esempio compilato (output reale)", cta: "Anteprima gratuita", unlock: "Scarica l'originale", rel: "Documenti correlati", disc: "Questo documento è un modello generale, non una consulenza legale per il tuo caso.", home: "Home", studio: "Studio documenti", how: "Come funziona", how1: "Apri lo studio con il pulsante qui sotto", how2: "Compila i campi guidati", how3: "Controlla l'anteprima e scarica l'originale" },
  tr: { what: "Bu belgeye ne zaman ihtiyacınız olur", need: "Formu doldurun, belge otomatik oluşturulur. Filigranlı önizleme ücretsiz — orijinal, ödeme sonrası açılır.", fields: "Gerekli bilgiler", preview: "Doldurma örneği (gerçek çıktı)", cta: "Ücretsiz önizleme", unlock: "Orijinali indir", rel: "İlgili belgeler", disc: "Bu belge genel bir şablondur, durumunuza özel hukuki danışmanlık değildir.", home: "Ana sayfa", studio: "Belge stüdyosu", how: "Nasıl kullanılır", how1: "Aşağıdaki düğmeyle stüdyoyu açın", how2: "Yönlendirilen alanları doldurun", how3: "Önizlemeyi kontrol edip orijinali indirin" },
  pl: { what: "Kiedy potrzebujesz tego dokumentu", need: "Wypełnij formularz, a dokument zostanie wygenerowany automatycznie. Darmowy podgląd ze znakiem wodnym — oryginał odblokowuje się po płatności.", fields: "Potrzebne informacje", preview: "Przykład wypełnienia (rzeczywisty wynik)", cta: "Darmowy podgląd", unlock: "Pobierz oryginał", rel: "Powiązane dokumenty", disc: "Ten dokument to ogólny wzór, a nie porada prawna dla Twojej sprawy.", home: "Strona główna", studio: "Studio dokumentów", how: "Jak to działa", how1: "Otwórz studio przyciskiem poniżej", how2: "Wypełnij prowadzone pola", how3: "Sprawdź podgląd i pobierz oryginał" },
  nl: { what: "Wanneer heeft u dit document nodig", need: "Vul het formulier in en het document wordt automatisch gegenereerd. Gratis voorbeeld met watermerk — het origineel wordt na betaling ontgrendeld.", fields: "Benodigde gegevens", preview: "Invulvoorbeeld (werkelijke output)", cta: "Gratis voorbeeld", unlock: "Origineel downloaden", rel: "Gerelateerde documenten", disc: "Dit document is een algemeen sjabloon, geen juridisch advies voor uw situatie.", home: "Home", studio: "Documentstudio", how: "Zo werkt het", how1: "Open de studio via de knop hieronder", how2: "Vul de begeleide velden in", how3: "Controleer het voorbeeld en download het origineel" }
};

const BASE = "https://daeryundf2-prog.github.io/omni-store";

const run = `
const escH = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
for (const d of DOC_TYPES) {
  activeDoc = d;
  Object.keys(formState).forEach(k => delete formState[k]);
  Object.assign(formState, SAMPLES[d.id] || {});
  for (const f of d.fields) if (f.key && !(f.key in formState)) {
    if (f.type === "checks") formState[f.key] = f.options ? [f.options[0].v] : ["yes"];
    else if (f.type === "select" && f.options) formState[f.key] = f.options[0].v;
    else if (f.type === "date") formState[f.key] = "2026-09-14";
  }
  for (const l of d.langs) {
    const fn = d.render[l] || d.render[d.langs[0]];
    const html = fn();
    const titleM = html.match(/doc-title[^>]*>([^<]+)/);
    let nativeTitle = titleM ? titleM[1].replace(/\\s+/g," ").trim() : d.name;
    // 자간용 단자 공백 병합: "고 소 장" → "고소장" (단자 토큰 연속 런 병합)
    {
      const toks = nativeTitle.split(" ");
      let res = "", run = "";
      for (const tk of toks) {
        if (tk.length === 1) run += tk;
        else { res += (run ? run + " " : "") + tk + " "; run = ""; }
      }
      nativeTitle = (res + run).trim();
    }
    const text = html.replace(/<br\\s*\\/?>/g, "\\n").replace(/<\\/(p|tr|h[12]|li|div)>/g, "\\n").replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/[ \\t]+/g, " ").replace(/\\n\\s+/g, "\\n").replace(/\\n{3,}/g, "\\n\\n").trim();
    const fieldLabels = d.fields.filter(f => f.key).map(f => f.label.replace(/\\s*\\*\\s*$/, "").replace(/\\s*\\(.*$/, ""));
    __OUT.pages.push({ id: d.id, cat: d.cat, koName: d.name, lang: l, nativeTitle, text: text.slice(0, 3500), fieldLabels, usage: d.usageNote || "", price: docPrice(d), free: (STUDIO.freeDocs || []).includes(d.id) });
  }
}
console.log("collected", __OUT.pages.length);
`;
eval(js + '\n' + run);

const pages = global.__OUT.pages;
const css = `
  body { font-family: 'Pretendard', -apple-system, sans-serif; margin: 0; background: #0B0E17; color: #E8EAF0; line-height: 1.7; }
  main { max-width: 760px; margin: 0 auto; padding: 32px 20px 80px; }
  nav.crumbs { font-size: 0.8rem; color: #8A90A6; margin-bottom: 24px; }
  nav.crumbs a { color: #6BB8D6; text-decoration: none; }
  h1 { font-size: 1.9rem; font-weight: 800; margin: 0 0 6px; }
  .langtag { color: #8A90A6; font-size: 0.9rem; margin-bottom: 20px; }
  .lead { color: #B8BDD0; margin-bottom: 28px; }
  h2 { font-size: 1.15rem; font-weight: 700; margin: 34px 0 12px; color: #E8EAF0; }
  .preview { background: #fff; color: #222; border-radius: 10px; padding: 28px 30px; font-family: 'Nanum Myeongjo', Georgia, serif; font-size: 0.86rem; white-space: pre-wrap; line-height: 1.85; max-height: 480px; overflow: hidden; position: relative; }
  .preview::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 90px; background: linear-gradient(transparent, #fff); }
  .fields { display: flex; flex-wrap: wrap; gap: 8px; }
  .fields span { background: #161B2B; border: 1px solid #262C42; border-radius: 6px; padding: 4px 10px; font-size: 0.82rem; color: #B8BDD0; }
  .cta { margin: 36px 0; text-align: center; }
  .cta a { display: inline-block; background: #9F2F2D; color: #fff; font-weight: 700; padding: 14px 34px; border-radius: 10px; text-decoration: none; font-size: 1.02rem; }
  .price { color: #8A90A6; font-size: 0.85rem; margin-top: 10px; }
  .rel a { display: inline-block; margin: 3px 6px 3px 0; color: #6BB8D6; font-size: 0.88rem; text-decoration: none; border: 1px solid #262C42; border-radius: 6px; padding: 5px 12px; }
  .disc { margin-top: 40px; padding: 14px 18px; background: #161B2B; border-radius: 8px; font-size: 0.8rem; color: #8A90A6; }
  ol.how li { margin-bottom: 6px; color: #B8BDD0; font-size: 0.95rem; }
  footer { margin-top: 50px; font-size: 0.75rem; color: #5A6078; }
  html[dir="rtl"] main { direction: rtl; }
`;

/* 카테고리 기본 EN 가이드 (전용 가이드 없는 영문 페이지용) */
const CAT_GUIDE_EN = {
  contract: { when: ["When parties need to fix rights and obligations in writing"], tips: ["Make key terms (amount, deadline, scope) measurable", "Review all clauses with the counterparty before signing"], caution: "Changes after signing require mutual consent — review thoroughly at drafting." },
  notice: { when: ["When you need a documented formal demand or notice"], tips: ["Send by a method that preserves proof of delivery", "State demands and deadlines specifically"], caution: "Notice documents become key evidence in later disputes — keep statements factual." },
  litigation: { when: ["When you need documents for official proceedings"], tips: ["Confirm the competent authority before filing", "State facts chronologically and objectively"], caution: "False statements in official filings can have consequences — consider professional review for significant matters." },
  realestate: { when: ["When fixing rights in a property transaction or lease"], tips: ["Check the title register before signing", "Be explicit about amounts, payment dates and handover date"], caution: "For high-value deals, use the official standard contract and get professional review." },
  labor: { when: ["When you need written documents in an employment relationship"], tips: ["Don't omit statutorily required items", "Each party keeps a signed counterpart"], caution: "Mandatory labor law overrides contract terms that fall below legal minimums." },
  family: { when: ["When recording personal rights and obligations in writing"], tips: ["Record party details and dates accurately", "Keep signed originals safe"], caution: "For sensitive family or inheritance matters, professional advice is recommended." },
  business: { when: ["When issuing business, accounting or trade documents"], tips: ["Double-check amounts and quantities", "Record issue date and party details correctly"], caution: "Documents used for tax or accounting must meet statutory requirements." }
};

let count = 0;
const urls = [];
for (const p of pages) {
  const t = T[p.lang] || T.en;
  const dir = p.lang === "ar" ? ' dir="rtl"' : "";
  const title = p.lang === "ko" ? `${p.nativeTitle} 양식 — 무료 미리보기·자동 작성 | OmniLegal`
    : p.lang === "en" ? `${p.nativeTitle} Template — Free Preview & Auto-Fill | OmniLegal`
    : `${p.nativeTitle} — OmniLegal Document Studio`;
  const desc = (p.lang === "ko" && p.usage ? p.usage : t.need).slice(0, 155);
  const studioUrl = `${BASE}/studio.html?doc=${p.id}&lang=${p.lang}`;
  const pageUrl = `${BASE}/docs/${p.lang}/${p.id}.html`;
  const rel = pages.filter(q => q.cat === p.cat && q.lang === p.lang && q.id !== p.id).slice(0, 8);
  const alternates = pages.filter(q => q.id === p.id).map(q =>
    `<link rel="alternate" hreflang="${q.lang}" href="${BASE}/docs/${q.lang}/${q.id}.html"/>`).join("\n  ");
  /* 편집 가이드 — 전용 가이드 > 카테고리 가이드 (ko/en만) */
  const g = (GUIDES[p.id] && (GUIDES[p.id][p.lang] || (p.lang !== "ko" && p.lang !== "en" ? null : GUIDES[p.id].en)))
    || (p.lang === "ko" ? CAT_GUIDE[p.cat] : p.lang === "en" ? CAT_GUIDE_EN[p.cat] : null);
  const guideHtml = g ? `
  <h2>${t.what}</h2>
  <ul>${(g.when || []).map(w => `<li>${escHtml(w)}</li>`).join("")}</ul>
  ${(g.tips || []).length ? `<h2>${p.lang === "ko" ? "작성 포인트" : "Drafting tips"}</h2><ul>${g.tips.map(w => `<li>${escHtml(w)}</li>`).join("")}</ul>` : ""}
  ${g.caution ? `<div class="disc" style="margin-top:18px">⚠️ ${escHtml(g.caution)}</div>` : ""}
  ${g.law ? `<p style="font-size:0.85rem;color:#8A90A6">📚 ${escHtml(g.law)}</p>` : ""}` : "";
  const faq = g && g.faq ? g.faq : [];
  const faqHtml = faq.length ? `<h2>${p.lang === "ko" ? "자주 묻는 질문" : "FAQ"}</h2>${faq.map(([q, a]) => `<h3 style="font-size:0.98rem;margin:16px 0 4px">${escHtml(q)}</h3><p style="color:#B8BDD0;margin:0 0 8px;font-size:0.92rem">${escHtml(a)}</p>`).join("")}` : "";
  const faqLd = faq.length ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faq.map(([q, a]) => `{"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a)}}}`).join(",")}]}]}</script>` : "";
  const html = `<!DOCTYPE html>
<html lang="${p.lang}"${dir}>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${desc.replace(/"/g, "&quot;")}"/>
<link rel="canonical" href="${pageUrl}"/>
${alternates}
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;800&family=Nanum+Myeongjo:wght@400;700&display=swap" rel="stylesheet"/>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"HowTo","name":"${p.nativeTitle}","step":[
{"@type":"HowToStep","text":"${t.how1}"},{"@type":"HowToStep","text":"${t.how2}"},{"@type":"HowToStep","text":"${t.how3}"}]}
</script>
${faqLd}
<style>${css}</style>
</head>
<body>
<main>
  <nav class="crumbs"><a href="${BASE}/">${t.home}</a> · <a href="${BASE}/lang-${p.lang}.html">${t.studio}</a> · ${p.nativeTitle}</nav>
  <h1>${p.nativeTitle}</h1>
  <div class="langtag">${p.koName} · ${p.lang.toUpperCase()}</div>
  <p class="lead">${p.lang === "ko" && p.usage ? escHtml(p.usage) : t.need}</p>
  <div class="cta"><a href="${studioUrl}">${t.cta} →</a><div class="price">${p.free ? (p.lang === "ko" ? "무료 — 잠금 없이 바로 다운로드" : "Free — no unlock needed") : `${t.unlock} · ₩${p.price.toLocaleString("en-US")} ≈ $${Math.ceil(p.price / 1300)}`}</div></div>
  <h2>${t.preview}</h2>
  <div class="preview">${escHtml(p.text)}</div>
  ${guideHtml}
  <h2>${t.how}</h2>
  <ol class="how"><li>${t.how1}</li><li>${t.how2}</li><li>${t.how3}</li></ol>
  ${p.fieldLabels.length && (p.lang === "ko" || p.lang === "en") ? `<h2>${t.fields}</h2><div class="fields">${p.fieldLabels.map(f => `<span>${escHtml(f)}</span>`).join("")}</div>` : ""}
  ${rel.length ? `<h2>${t.rel}</h2><div class="rel">${rel.map(q => `<a href="${BASE}/docs/${p.lang}/${q.id}.html">${q.nativeTitle}</a>`).join("")}</div>` : ""}
  ${faqHtml}
  <div class="disc">${t.disc}</div>
  <footer>© OmniLegal Document Studio — <a href="${BASE}/legal.html" style="color:#5A6078">Legal</a></footer>
</main>
</body>
</html>`;
  const outDir = PATH.join("docs", p.lang);
  FS.mkdirSync(outDir, { recursive: true });
  FS.writeFileSync(PATH.join(outDir, p.id + ".html"), html);
  urls.push(pageUrl);
  count++;
}

function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* sitemap 갱신 — 기존 urlset 끝에 docs URL 추가 */
const sm = FS.readFileSync("sitemap.xml", "utf8");
const clean = sm.replace(/\s*<!-- DOC_PAGES -->[\s\S]*?(?=<\/urlset>)/, "");
const block = "  <!-- DOC_PAGES -->\n" + urls.map(u =>
  `  <url><loc>${u}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("\n") + "\n";
FS.writeFileSync("sitemap.xml", clean.replace("</urlset>", block + "</urlset>"));
console.log(`generated ${count} doc pages, sitemap updated (${urls.length} urls)`);
