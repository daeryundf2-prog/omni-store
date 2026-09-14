/**
 * OmniLegal Digital Storefront — Dynamic Settlement & Liquidation Configuration
 * 한 번에 수익 실현(Lump-Sum Liquidation)을 위한 중앙 정산 설정 파일
 *
 * [QUALITY HARDENING NOTICE]
 * 현재 전수 퀄리티 완성도 100% 달성 및 가격 인하 조정을 위한 검수 진행 중입니다.
 * 아직 완성된 패키지가 아니므로 정식 판매를 전면 보류(salesEnabled: false)합니다.
 */
window.OMNI_SETTLEMENT = {
  salesEnabled: false,
  status: "PAUSED_FOR_QUALITY_ENHANCEMENT",
  notice: "[품질 고도화 및 법무 감수 진행 중] 완성도 100% 달성을 위해 정식 판매를 일시 보류 중입니다. (자료 미리보기 및 샘플 열람만 가능)",

  // 1. 국내 무통장 / 계좌이체 정산 계좌
  bank: {
    name: "카카오뱅크",
    accountNumber: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    holder: "신유학 (OmniLegal 정산)",
    status: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    salesEnabled: false
  },

  // 2. 국내 전자결제 (토스페이먼츠) — clientKey는 배포 시 환경별로 주입
  toss: {
    clientKey: "",
    mode: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    status: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    salesEnabled: false
  },

  // 3. 글로벌 해외 결제 (PayPal)
  paypal: {
    receiverEmail: "daeryundf2@gmail.com",
    currency: "USD",
    mode: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    status: "PAUSED_FOR_QUALITY_ENHANCEMENT",
    salesEnabled: false
  },

  // 4. 일괄 수익 실현 (Batch Liquidation) 정책
  liquidationPolicy: {
    batchLiquidationEnabled: false,
    minOrderThresholdKrw: 89000,
    vaultSyncEnabled: false,
    lastAuditTimestamp: "2026-09-12T06:55:00+09:00"
  },

  /* ============================================================
   * 문서 스튜디오 (studio.html) — 신규 수익 요소
   * 킷 패키지와 별개로 운영되는 문서 자동작성 유료 다운로드.
   * 결제는 이메일 주문 + PayPal로 접수하고, 확인 후 해제 코드를 발급한다.
   * 신규 코드 발급 절차 (스튜디오 페이지 콘솔):
   *   OmniStudio.mintCode("주문번호-구매자이메일")  → {code, digest}
   *   → 반환된 digest를 아래 unlockDigests에 추가·배포한 뒤 code를 고객에게 발급
   *   (digest 미등록 코드는 검증 실패한다)
   * ============================================================ */
  studio: {
    salesEnabled: true,
    priceKrw: 9900,        // 기본 문서 단건 가격
    passPriceKrw: 29900,   // 전 문서 무제한 패스 (주문 모달에 표시)
    /* 문서별 가격 오버라이드 (미지정 시 priceKrw 적용):
     *   prices: { "freelance-contract": 14900, "settlement": 12900 } */
    prices: {},
    contactEmail: "daeryundf2@gmail.com",
    unlockSalt: "omnistudio-v1",
    // 검증: djb2("OMNI-XXXX").toString(36) ∈ unlockDigests
    // 아래 8개는 launch-batch-01 예비 코드 (각 1회 발급용):
    //   OMNI-LNAR7T, OMNI-12350IY, OMNI-1IIZ9U3, OMNI-1YYTJ58,
    //   OMNI-GDJQH9, OMNI-WTDZSE, OMNI-1D9893J, OMNI-1TP2IEO
    unlockDigests: [
      // 전 문서 패스 코드 (OmniStudio.mintCode("주문-이메일")로 발급)
      "s907ct", "1h1c9aa", "1wdkqwz", "80g21f",
      "otmwjw", "zhm412", "1st1syp", "4kv1yh",
      /* pass-batch-02 사전발급 40개 — 순서대로 발급 후 사용 표시:
       * OMNI-1TB5Z2H OMNI-17CL8GA OMNI-LE0HU3 OMNI-1YGJT70 OMNI-1CHZ2KT
       * OMNI-QJEBYM OMNI-4KTLCF OMNI-1HNCWPC OMNI-VOS635 OMNI-9Q7FGY
       * OMNI-KU9Y8Q OMNI-1XWT9LN OMNI-1BY8IZG OMNI-PZNSD9 OMNI-4131R2
       * OMNI-1H3MD3Z OMNI-V51MHS OMNI-96GVVL OMNI-1M9078I OMNI-10AFGMB
       * OMNI-6GE3NF OMNI-1JIXF0C OMNI-XKCOE5 OMNI-BLRXRY OMNI-1OOB94V
       * OMNI-12PQIIO OMNI-GR5RWH OMNI-1TTP39E OMNI-17V4CN7 OMNI-LWJM10
       * OMNI-1R3MB18 OMNI-1551KF1 OMNI-J6GTSU OMNI-1W9055R OMNI-1AAFEJK
       * OMNI-OBUNXD OMNI-2D9XB6 OMNI-1FFT8O3 OMNI-TH8I1W OMNI-7INRFP */
      "4b1w2d","1klmw0s","s2a4qe","7nj22j","1sh2bd8",
      "verar1","co32rx","1vtc0hl","yr2wij","g075e4",
      "rqhbsw","7bq164","1s51z9v","v2yhzh","c505rm",
      "1vagyen","y80dzd","fhhk6r","1ymkv50","1g104ub",
      "dvivzi","1x0uaii","zyj46s","lqyjqg","1bzjdl",
      "1hmfjii","p32mck","4obba7","1kyjm4f","sfjs3k",
      "2qcxar","1j0l29f","qhl8i0","62gu1e","1r13t5k",
      "tyuxud","b7z0kk","1udff68","xaz07e","ekg6l7"
    ],
    /* 문서별 단건 코드 — 특정 문서만 해제.
     * 발급: OmniStudio.mintCode("주문-이메일", "lease") → digest를 아래 해당 문서 키에 추가
     *   docDigests: { "lease": ["digest1", "digest2"], "nda": ["..."] } */
    docDigests: {},
    /* Gumroad 자동 발급 (선택):
     * Gumroad에 "문서 스튜디오 원본 해제" 상품을 만들고 License key를 켜면
     * 결제 즉시 키가 발급되고 스튜디오에서 무인 검증된다 (수동 코드 발급 불필요).
     *   gumroadUrl        — 상품 구매 링크 (주문 모달에 표시)
     *   gumroadProductId  — 상품의 product_id (라이선스 검증 API용) */
    gumroadProductId: "",   // 무제한 패스 상품 → 해제 시 전 문서 적용
    gumroadUrl: "",
    /* 문서별 Gumroad 상품 (선택): 해당 문서만 해제
     *   gumroadDocProductIds: { "lease": "prod_id_lease", "nda": "prod_id_nda" } */
    gumroadDocProductIds: {},
    /* 무료 공개 문서 — 워터마크·잠금 없이 바로 다운로드 (리드마그넷/링크 유인용)
     *   freeDocs: ["written-pledge", "apology-letter"] */
    freeDocs: ["written-pledge"]
  }
};
