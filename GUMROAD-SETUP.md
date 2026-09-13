# Gumroad 연결 절차 — 문서 스튜디오 자동 결제

스튜디오의 라이선스 자동 검증 코드는 이미 구현되어 있습니다.
Gumroad에 상품을 만들고 2개 값만 `settlement_config.js`에 넣으면
결제 → 키 발급 → 스튜디오 잠금 해제가 전부 자동으로 동작합니다.

---

## 1단계: Gumroad 상품 만들기

1. https://gumroad.com 에서 계정 생성 → Products → New product
2. 유형: **Digital product** 선택
3. 아래 상품 정보를 복사해서 붙여넣기

### 상품 1 — 단건 문서 해제

```
Name:        Document Studio — Clean Original Unlock (Single Document)
Price:       $9 USD  (≈ ₩9,900 상당; Gumroad는 USD 기준)
```

Description (붙여넣기용):

```
Unlock the clean, watermark-free original of one document generated
at OmniLegal Document Studio (https://daeryundf2-prog.github.io/omni-store/studio.html).

What you get
- Clean, printable output of one document type, in any supported language
  (17 output languages — Korean, English, Japanese, Chinese, German,
  French, Spanish, Vietnamese, Thai, Portuguese, Indonesian, Russian,
  Arabic, Italian, Turkish, Polish, Dutch)
- Document integrity hash (SHA-256) embedded in the output
- Your license key is delivered instantly by email after purchase

How to use
1. Fill in the form on the Studio page (free preview is always available)
2. Click "원본 출력" (Unlock Original) and paste the license key
   you receive by email
3. Print or download the watermark-free document

Note: This tool generates standard-format documents automatically.
It is not legal advice or attorney drafting. For consequential matters,
have the document reviewed by a qualified professional in your jurisdiction.
```

### 상품 2 — 무제한 패스 (권장, 객단가 ↑)

```
Name:        Document Studio — All-Access Pass (Unlimited Documents)
Price:       $23 USD  (≈ ₩29,900 상당)
```

Description:

```
Unlock ALL 78 document types at OmniLegal Document Studio —
including every future document added to the catalog.

- Unlimited clean originals of every document type
- All 17 output languages
- Country-specific forms (Germany, France, Japan, Spain, Brazil,
  Indonesia, Russia, China, Türkiye, Poland, Netherlands, Thailand,
  Vietnam, and more)
- Electronic signature embedding and SHA-256 document hashes
- Instant license key delivery by email

Not legal advice. Standard-template automation only — obtain local
professional review for consequential matters.
```

## 2단계: 라이선스 키 켜기 (필수)

각 상품 편집 화면에서:

1. **Content** 탭 → "Generate a unique license key per sale" 체크
   - 또는 상품 설정의 **License keys** 토글 ON
2. 이렇게 해야 결제 시 고객 이메일로 키가 자동 발급되고,
   스튜디오가 Gumroad API로 그 키를 검증할 수 있습니다.

두 상품을 따로 만들었다면 **둘 다** 라이선스 키를 켜야 합니다.
(패스 키로 해제하면 모든 문서가 열리는 현재 로직상,
단건 상품과 패스 상품을 product_id 하나로 묶으려면
패스 상품만 연결하고 단건은 "수량 1"로 운영하는 방법도 있습니다.
가장 단순한 운영: **패스 상품 1개만 만들어서 연결** → 모든 결제가 패스.
단건 판매를 유지하려면 `studio.html`의 `verifyGumroadLicense`가
호출되는 `gumroadProductId`를 단건 상품 것으로 넣으세요.)

## 3단계: 설정 파일에 값 넣기

`settlement_config.js` → `studio` 블록:

```js
studio: {
  // ...
  gumroadProductId: "여기에 product_id",   // 상품 URL의 /l/xxxxx 부분
  gumroadUrl: "https://xxxxx.gumroad.com/l/xxxxx",
}
```

- `product_id` 확인법: Gumroad 대시보드 → 상품 → 링크 복사하면
  `https://계정.gumroad.com/l/XXXXX` 형태 — `XXXXX`가 product_id입니다.

## 4단계: 검증

```bash
git add settlement_config.js && git commit -m "Connect Gumroad" && git push
```

배포 후 스튜디오 페이지 → 콘솔에서 `OmniStudio.checkConfig()` 실행:

```
자동결제: ✅ Gumroad 연결됨
```

실제 키 검증: Gumroad에서 테스트 구매(또는 본인 카드 $0 테스트) →
이메일로 온 라이선스 키를 스튜디오 "해제 코드" 칸에 입력 → 해제되면 완료.

---

## 운영 참고

- **수동 채널 병존**: 이메일 주문 + 수동 코드 발급은 그대로 동작합니다.
  Gumroad 연결해도 기존 `unlockDigests` 코드는 계속 유효합니다.
- **새 수동 코드 발급**: 스튜디오 콘솔에서
  `OmniStudio.mintCode("주문번호-이메일")` → 반환된 `digest`를
  `unlockDigests`에 추가·배포 → `code`를 고객에게 전달.
- **통계**: 콘솔에서 `OmniStudio.stats()` — 문서 선택·미리보기·
  주문 클릭·해제 성공/실패 횟수가 브라우저별로 집계됩니다
  (방문자 브라우저 로컬이라 서버 통계는 아닙니다).
- Gumroad 수수료: 판매액의 10% + 결제 수수료 (2026년 기준 공식 요율 확인).
