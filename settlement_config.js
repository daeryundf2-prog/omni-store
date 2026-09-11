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

  // 2. 국내 전자결제 (토스페이먼츠)
  toss: {
    clientKey: "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq",
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
  }
};
