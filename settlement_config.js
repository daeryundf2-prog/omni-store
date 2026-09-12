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
      "s907ct", "1h1c9aa", "1wdkqwz", "80g21f",
      "otmwjw", "zhm412", "1st1syp", "4kv1yh"
    ],
    /* Gumroad 자동 발급 (선택):
     * Gumroad에 "문서 스튜디오 원본 해제" 상품을 만들고 License key를 켜면
     * 결제 즉시 키가 발급되고 스튜디오에서 무인 검증된다 (수동 코드 발급 불필요).
     *   gumroadUrl        — 상품 구매 링크 (주문 모달에 표시)
     *   gumroadProductId  — 상품의 product_id (라이선스 검증 API용) */
    gumroadProductId: "",
    gumroadUrl: ""
  }
};
