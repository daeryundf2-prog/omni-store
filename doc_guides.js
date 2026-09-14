/* 문서별 편집 가이드 — build_doc_pages.js에서 읽어 SEO 페이지 본문에 삽입.
 * 각 항목: when(상황), tips(작성 포인트), caution(주의), law(근거·관행), faq
 * 없는 문서는 CAT_GUIDE 카테고리 기본 가이드로 대체된다. */
module.exports = {
  "defamation-complaint": {
    ko: {
      when: ["온라인 게시물·댓글·단체채팅에서 허위 사실이나 모욕적 표현으로 명예가 훼손된 경우", "상대방의 실명을 모르더라도 닉네임·ID만으로 고소가 가능합니다"],
      tips: ["피고소인 정보는 아는 범위만 기재 — 닉네임·아이디·게시 플랫폼만으로도 수사기관이 특정할 수 있습니다", "범죄사실은 '언제·어디서·무엇을·어떻게' 순서로 객관적으로 작성하세요. 감정 표현보다 사실 나열이 접수에 유리합니다", "게시물 URL과 캡처본은 삭제 전에 확보하세요 — 캡처 시 주소창 URL과 날짜가 함께 보이게 찍는 것이 좋습니다"],
      caution: "고소는 취소(고소취하)하면 재고소가 제한될 수 있으므로 신중히 제출하세요. 반대로 허위 고소는 무고죄가 될 수 있어, 기재 내용이 사실에 부합하는지 확인이 필요합니다.",
      law: "정보통신망법 제70조(사이버 명예훼손), 형법 제307조(명예훼손), 제311조(모욕죄). 접수는 관할 경찰서 또는 경찰민원포털 온라인.",
      faq: [["상대방 실명을 몰라도 고소할 수 있나요?", "가능합니다. 닉네임·ID·게시물 주소를 기재하고 '성명 불상'으로 제출하면 수사기관이 플랫폼에 정보를 요청해 특정합니다."], ["고소장 접수 비용이 있나요?", "없습니다. 경찰서 방문 또는 경찰민원포털에서 무료로 접수됩니다."], ["합의하면 어떻게 되나요?", "모욕죄·사이버 명예훼손은 반의사불벌죄라 합의 후 고소를 취하하면 처벌되지 않습니다. 합의서는 별도 작성을 권합니다."]]
    },
    en: {
      when: ["When your reputation is harmed by false statements or insults in online posts, comments or group chats", "You can file even without the offender's real name — a username or account ID is enough for police to identify them"],
      tips: ["Fill in only what you know about the accused — platform, username and post URL are enough for investigators", "State facts chronologically and objectively; factual narrative works better than emotional language at intake", "Capture posts before they are deleted — screenshot with the URL bar and date visible"],
      caution: "In Korea, withdrawing a criminal complaint may bar refiling. False accusation can itself constitute a crime (false charges), so verify the facts stated are accurate.",
      law: "ICT Network Act Art. 70, Criminal Act Arts. 307 & 311. File at a police station or via the e-people police portal.",
      faq: [["Can I file without knowing the offender's name?", "Yes — provide the username, platform and post URL, mark the accused as 'unknown', and investigators will subpoena the platform."], ["Is there a filing fee?", "No, filing a criminal complaint is free of charge."]]
    }
  },
  "payment-order": {
    ko: {
      when: ["금전·대여금·용역대금 등 확정된 금전 채권을 소송 없이 빠르게 회수하고 싶을 때", "채무자가 다투지 않을 것으로 예상되는 경우 — 이의신청 시 일반 소송으로 이행됩니다"],
      tips: ["청구 금액은 원금과 지연이자를 분리해 기재하세요", "독촉절차는 법원 서류만으로 진행되며 채무자 주소지 관할 법원에 신청합니다", "피고가 이의를 제기하면 민사소송으로 자동 전환 — 소송 준비가 된 상태로 신청하는 것이 좋습니다"],
      caution: "지급명령은 채무자에게 송달돼야 효력이 발생합니다. 주소 불명으로 송달이 안 되면 각하될 수 있으니 정확한 주민등록 주소지를 확인하세요.",
      law: "독촉절차에 관한 법률. 신청 수수료는 소액(인지대)이며 변호사 없이 신청 가능합니다.",
      faq: [["지급명령과 소액사건 소송의 차이는?", "지급명령은 심문 없이 서류만으로 결정해 빠르지만 채무자가 이의하면 소송으로 넘어갑니다. 다툼이 예상되면 처음부터 소액사건 소장이 나을 수 있습니다."], ["확정되면 강제집행이 가능한가요?", "네, 지급명령이 확정되면 판결문과 같은 집행력이 생겨 가압류·압류 등 강제집행이 가능합니다."]]
    }
  },
  "small-claims": {
    ko: {
      when: ["3,000만원 이하의 금전 청구를 변호사 없이 본인 소송으로 해결할 때", "지급명령에 이의가 제기됐거나 처음부터 다툼이 예상되는 경우"],
      tips: ["청구취지는 '피고는 원고에게 금 O원 및 이에 대한 지연손해금을 지급하라' 형식으로 구체적으로 씁니다", "청구원인은 채권 발생 경위를 시간 순서로 — 차용·매매·임대차 등 원인 관계가 명확해야 합니다", "입증방법에는 차용증·이체 내역·문자메시지 등 객관적 자료를 나열하세요"],
      caution: "소장이 접수되면 소송이 개시되므로, 제출 전에 내용증명이나 지급명령으로 해결 가능한지 먼저 검토하는 것이 비용·시간 면에서 유리합니다.",
      law: "소액사건심판법 — 3,000만원 이하 청구는 이행권고·조정 등 간이 절차가 적용됩니다.",
      faq: [["변호사 없이 혼자 할 수 있나요?", "네, 소액사건은 본인 소송이 일반적이며 법원에 표준 서식과 안내가 있습니다."], ["승소 후에도 안 갚으면?", "확정 판결로 채무자 재산에 강제집행(예금·급여 압류)을 신청할 수 있습니다."]]
    }
  },
  "demand-notice": {
    ko: {
      when: ["계약 위반·미지급금·손해에 대해 상대방에게 최후 통첩을 보낼 때", "소송 전 분쟁 해결을 시도하면서 발송 기록을 남기고 싶을 때"],
      tips: ["내용증명 우편으로 보내면 발송일·내용·수신 사실이 우체국에 보존되어 증거가 됩니다", "요구 사항은 측정 가능하게 — '금 4,200달러를 14일 이내 지급'처럼 구체적으로", "상대방이 해외에 있으면 상대 국가 언어로 발송하는 것이 실효성이 있습니다"],
      caution: "내용증명 자체는 법적 강제력이 없습니다. 그러나 지연이자 기산일·최고(催告) 사실의 입증, 소송 전 '성실한 해결 시도'의 증거로서 실무 효과가 큽니다.",
      law: "민법 제387조(최고와 지연이자) — 서면 도달 시 채무 불이행이 확정됩니다.",
      faq: [["내용증명 보내면 법적 효력이 있나요?", "내용 자체는 강제력이 없지만, 도달 사실·시기·요구 내용을 증명하는 강력한 서증이 됩니다."], ["이메일로 보내도 되나요?", "됩니다. 다만 수신 증거를 위해 읽음 확인이나 내용증명 우편 병행을 권합니다."]]
    },
    en: {
      when: ["Sending a final formal demand before litigation — unpaid invoices, contract breaches, damages", "When you need a documented paper trail that you attempted resolution first"],
      tips: ["Send by certified mail or a method that preserves proof of delivery and content", "Make demands measurable — 'pay USD 4,200 within 14 days of receipt' not 'pay promptly'", "For cross-border counterparties, send in the recipient's language for practical effect"],
      caution: "A demand letter has no binding force by itself — its power is evidentiary: it fixes the default date, proves notice, and shows good-faith resolution attempts before suit.",
      faq: [["Is a demand letter legally binding?", "Not by itself, but it creates strong evidence of notice and can start statutory interest running."], ["Should I threaten litigation?", "State consequences factually ('we will pursue legal remedies') rather than emotionally — it's more credible and safer."]]
    }
  },
  "nda": {
    ko: {
      when: ["사업 협의·투자 유치·외주 개발 전에 상대방에게 비즈니스 정보를 공개해야 할 때", "해외 거래처와의 정보 교환 — 14개 언어로 상대 국가 언어 버전 제공 가능"],
      tips: ["비밀정보의 범위를 구체적으로 — '기술·영업·재무 정보 일체'보다 목적에 맞게 한정하는 것이 실무적", "비밀유지 기간은 통상 2~5년 — 영업비밀은 계약 종료 후에도 보호되도록 명시", "상대방이 서명을 거부할 경우를 대비해 공개 전 교부 이력을 남기세요"],
      caution: "NDA는 위반 '이후' 손해배상 청구의 근거일 뿐 유출 자체를 막지 못합니다. 핵심 영업비밀은 필요 최소한만 공개하는 것이 실질적 보호입니다.",
      law: "부정경쟁방지법상 영업비밀 보호 요건(비공지성·비밀관리성·경제적 유용성) — 계약서 자체가 비밀관리성의 증거가 됩니다.",
      faq: [["상대방이 안 서명하면?", "서명 없는 NDA는 효력이 없으므로, 중요 정보는 서명 확인 후 공개하세요."], ["일방형 vs 쌍방형?", "정보를 주는 쪽만 있으면 일방형, 서로 교환하면 쌍방형(이 양식)이 적합합니다."]]
    },
    en: {
      when: ["Before disclosing business information in negotiations, fundraising, or outsourced development", "Cross-border deals — generate the NDA in the counterparty's language (14 languages supported)"],
      tips: ["Scope 'Confidential Information' to the actual purpose rather than 'everything'", "Typical survival period is 2–5 years; trade secrets should be protected beyond termination", "Get signatures before disclosing — an unsigned NDA protects nothing"],
      caution: "An NDA gives you grounds to sue after a breach — it doesn't prevent the leak itself. Limit disclosure to what's strictly necessary.",
      faq: [["One-way or mutual NDA?", "Use one-way if only you disclose; mutual (this form) when both sides exchange information."], ["Is an NDA enforceable internationally?", "Generally yes, but enforcement depends on governing law and jurisdiction clauses — choose them deliberately."]]
    }
  },
  "lease": {
    ko: {
      when: ["주택·상가 임대차 계약을 직접 체결할 때 — 중개 없이 당사자 간 작성해도 효력은 동일"],
      tips: ["계약금·중도금·잔금 지급 일정을 빠짐없이 기재 — 잔금은 보증금에서 계약금·중도금을 뺀 금액으로 자동 계산됩니다", "등기부등본으로 선순위 저당권·가압류를 반드시 확인하고 '선순위 권리 없음' 조항을 체크하세요", "입주일과 전입신고·확정일자는 대항력 확보의 핵심 — 계약서에 입주일을 명시하세요"],
      caution: "이 양식은 일반 구조의 계약서입니다. 국토교통부 표준임대차계약서가 무료로 제공되며, 고액 계약이나 특수 조건(권리금·주택임대차보호법 쟁점)은 전문가 검토를 권합니다.",
      law: "주택임대차보호법 — 전입신고+확정일자로 우선변제권, 실거주+점유로 대항력이 발생합니다.",
      faq: [["확정일자는 어디서 받나요?", "계약서에 주민센터·등기소 또는 인터넷등기소에서 날인받습니다. 전입신고와 함께 처리하면 됩니다."], ["보증금 반환 걱정이 되면?", "선순위 권리 확인 + 특약에 '잔금 전 담보권 설정 금지' 조항을 넣으세요. 이 양식에 포함되어 있습니다."]]
    }
  },
  "employment": {
    ko: {
      when: ["정규직·계약직 근로자 채용 시 — 근로계약서 교부는 법정 의무입니다"],
      tips: ["근로기준법 제17조 필수 기재사항: 임금, 근로시간, 휴일, 연차휴가, 장소, 업무내용 — 빠진 항목이 없도록 하세요", "수습기간이 있으면 기간과 수습 중 임금 조건을 명시 (수습 중 최저임금 90% 적용 가능 조건 확인)", "계약서는 2부 작성해 근로자에게 반드시 교부 — 미교부 시 500만원 이하 벌금"],
      caution: "근로계약은 강행법규가 우선합니다. 양식 문구가 근로기준법·최저임금법에 미달하면 그 부분은 무효이고 법이 적용됩니다.",
      law: "근로기준법 제17조(기재사항), 제17조의2(교부 의무).",
      faq: [["전자근로계약서도 유효한가요?", "네, 전자서명된 계약서도 동일한 효력이 있습니다."], ["시급제로 바꿀 수 있나요?", "임금 형태를 시급제로 선택하고 시급 금액을 기재하면 됩니다."]]
    }
  },
  "freelance-contract": {
    ko: {
      when: ["프리랜서·외주 개발·디자인·컨설팅 용역을 발주하거나 수주할 때"],
      tips: ["용역 범위는 '몇 페이지' '몇 차 수정'처럼 측정 가능하게 한정 — 범위 분쟁이 가장 흔한 분쟁입니다", "지식재산권 귀속을 반드시 정하세요 — 무규정이면 창작자에게 귀속되어 의뢰인이 못 씁니다", "원천징수 3.3%는 '을이 사업자 미등록 개인'일 때 적용 — 사업자면 세금계산서 방식으로"],
      caution: "용역계약과 근로계약은 법적 성격이 다릅니다. 지휘·감독·근무시간 지정이 있으면 실질이 근로관계로 인정되어 퇴직금·4대보험 문제가 생길 수 있습니다.",
      law: "민법 도급 규정. 원천징수는 소득세법 제127조·129조.",
      faq: [["중간에 해지하면 정산은?", "해지 통보 기간(예: 14일)을 정하고 기완성 용역은 별도 정산 — 이 양식에 조항이 있습니다."], ["IP 귀속을 갑에게 하면?", "대금 완납 시 이전 조건을 권합니다 — 을의 저작권 보호와 갑의 사용권 확보의 균형점입니다."]]
    },
    en: {
      when: ["Hiring or working as a freelancer for development, design, consulting or other services"],
      tips: ["Define scope measurably — 'X deliverables, Y revision rounds' prevents the most common disputes", "Always settle IP assignment — without a clause, work product stays with the creator", "Use milestone or partial payments to align incentives"],
      caution: "If the working relationship involves fixed hours and direct supervision, it may legally be employment regardless of the contract title.",
      faq: [["Who owns the work product?", "Only what the contract says — add an explicit IP clause (this form has three modes)."]]
    }
  },
  "loan-agreement": {
    ko: {
      when: ["개인 간 금전 대여 시 — 구두 약속은 변제 분쟁 시 입증이 어렵습니다"],
      tips: ["금액은 숫자와 한글 병기(금오백만원정)로 변조·착오를 방지하세요", "이자는 최고이자율(연 20%) 이내로 — 초과분은 무효입니다", "상환 방법과 계좌를 명시해 입금 증빙이 남게 하세요"],
      caution: "차용증이 있어도 실제 입금 사실이 증명돼야 소송에서 이깁니다. 현금 전달보다 계좌이체를 권하고, 이체 메모에 '대여금'으로 기재하세요.",
      law: "이자제한법 제2조 — 연 20% 초과 이자 무효.",
      faq: [["공증해야 하나요?", "필수는 아닙니다. 다만 대여 사실 입증이 핵심이므로 이체 기록과 함께 보관하세요."], ["무이자로 쓸 수 있나요?", "이자를 0으로 기재하면 무이자 차용증이 됩니다."]]
    }
  },
  "settlement": {
    ko: {
      when: ["분쟁을 소송 없이 금전·조건으로 마무리할 때 — 합의서는 종국적 해결의 증거입니다"],
      tips: ["합의금 지급 방향과 기한을 명확히 — 지급 계좌를 특정하면 다툼이 줄어듭니다", "'일체의 청구 포기' 조항이 핵심 — 이후 같은 사건으로 민·형사 청구를 막습니다", "개인정보·비밀 유지 조항이 필요하면 특약에 추가하세요"],
      caution: "합의 후엔 같은 사안으로 다시 청구하기 어렵습니다. 금액·조건이 충분한지 서명 전에 검토하세요. 강요된 합의는 취소 사유가 될 수 있습니다.",
      faq: [["합의서 쓰면 고소는?", "반의사불벌죄는 합의 후 고소취하로 종결 가능 — 별도 고소취하장이 필요할 수 있습니다."], ["합의금 안 주면?", "합의서는 채무명의가 되어 소송 없이는 강제집행이 안 되므로, 공정증서화를 고려하세요."]]
    }
  },
  "kuendigung-de": {
    ko: {
      when: ["독일에서 고용·임대차·구독 계약을 해지할 때 — 독일은 서면 해지(Schriftform)를 요구하는 경우가 많습니다"],
      tips: ["'zum 날짜' 또는 'zum nächstmöglichen Zeitpunkt'로 해지 시점을 명확히 — 독일 Kündigung의 표준 표현입니다", "ordentlich(정상 해지)와 fristlos(즉시 해지)를 구분 — fristlos는 중대 사유가 필요합니다", "접수 증명을 위해 등기우편(Einschreiben) 또는 수신 확인을 받으세요"],
      caution: "독일 근로계약 해지는 Kündigungsschutzgesetz 적용이 있어 사용자의 해지가 제한됩니다. 근로자가 스스로 해지하는 이 양식 사용은 문제없습니다.",
      law: "BGB §623 — 근로관계 해지는 반드시 서면(Schriftform)이어야 하며 이메일·FAX는 무효입니다.",
      faq: [["이메일로 해지해도 되나요?", "근로·임대 관계는 BGB §623상 서면 필수 — 인쇄해 서명한 서신이 필요합니다."]]
    }
  },
  "mahnung-de": {
    ko: {
      when: ["독일 거래처의 미지급 대금을 독촉할 때 — Mahnung은 독일 실무에서 지연이자·소송 전 필수 단계입니다"],
      tips: ["청구 금액·인보이스 번호·기존 지급기한을 명시하세요", "지연이자는 BGB §288에 따라 기본이자율+5%(B2B는 +9%)로 청구 가능합니다", "마지막 독촉(letzte Mahnung)에는 소송 예고 문구를 넣는 것이 관행입니다"],
      caution: "Mahnbescheid(지급명령)은 법원 온라인 독촉절차로 별도 신청 — 이 양식은 그 전 단계의 사전 독촉장입니다.",
      law: "BGB §286(채무자 지체), §288(지연이자).",
      faq: [["몇 번 보내야 하나요?", "관행상 1~3차 독촉 후 Mahnverfahren 또는 소송으로 넘어갑니다."]]
    }
  },
  "taishoku-ja": {
    ko: {
      when: ["일본 회사에 사직 의사를 전달할 때 — 退職願은 철회 가능한 '신청'이고 退職届는 확정 통지입니다"],
      tips: ["일본 관행상 퇴직 1~2개월 전 상사와 먼저 협의한 후 서류를 제출합니다", "회사 지정 양식이 있으면 그것을 우선 사용 — 이 양식은 지정 양식이 없을 때", "민법상 퇴직은 2주 전 예고로 가능하지만 사내 규정(통상 1개월)을 확인하세요"],
      caution: "退職願은 승낙 전 철회가 가능하다는 해석이 일반적입니다. 의사가 확정이면 退職届로 제출하는 편이 분쟁이 없습니다.",
      law: "日本民法 第627条 — 期間の定めのない雇用は2週間前の予告で解約可能.",
      faq: [["願(ねがい)と届(とどけ)의 차이는?", "願는 '부탁' 형식으로 철회 여지가 있고, 届는 일방 통지로 확정적입니다."]]
    }
  },
  "ihtarname-tr": {
    ko: {
      when: ["튀르키예에서 대금 청구·계약 위반을 공식 통고할 때 — 소송 전 법정 절차로 자주 요구됩니다"],
      tips: ["İhtarname은 공증인(noter) 경유 발송이 표준 — 수신 증거가 완벽해집니다", "이행 기한을 명시하고 기한 경과 시 법적 조치를 예고하는 문구를 넣으세요", "TC kimlik/vergi numarası 기재는 관행입니다"],
      caution: "공증 비용은 별도 발생하며, 공증인 경유 발송이 사실상 표준 절차입니다.",
      law: "Türk Borçlar Kanunu — ihtar süreci dava öncesi temerrüt oluşturur.",
      faq: [["공증 없이 보내도 되나요?", "가능하지만 증거력이 약해 — noter aracılığıyla gönderim 권장."]]
    }
  },
  "promissory-note-en": {
    en: {
      when: ["Documenting a loan between private parties in the US — friends, family, or business counterparties", "When a simple IOU isn't enough and you need enforceable repayment terms"],
      tips: ["State principal, interest rate, and repayment schedule explicitly — ambiguity is the top cause of disputes", "Choose secured vs. unsecured deliberately — secured needs a collateral description", "Set governing law to the borrower's state or where the loan is made"],
      caution: "Usury limits vary by state — a rate above the state cap can void the interest or the note itself. This template is a general form, not a substitute for state-specific review.",
      faq: [["Does it need notarization?", "Not required in most states, but notarization strengthens enforceability and deters forgery claims."], ["Secured vs. unsecured?", "Secured notes let you claim collateral on default; unsecured rely on the borrower's credit."]]
    }
  },
  "letter-before-action-en": {
    en: {
      when: ["The required pre-litigation step in England & Wales — courts expect a Letter Before Action under the Pre-Action Protocol before you sue"],
      tips: ["Set out the basis of the claim, the amount, and a reasonable response deadline (usually 14–30 days)", "Attach or reference key evidence (invoices, contracts) — it shows your claim is serious", "Send by a method with proof of delivery"],
      caution: "Skipping this step can cost you: courts may penalize a claimant on costs if proceedings were issued without a proper pre-action letter.",
      law: "Practice Direction — Pre-Action Conduct and Protocols (England & Wales).",
      faq: [["Is it mandatory?", "For most civil claims in England & Wales, yes — the court expects protocol compliance and can sanction parties who ignore it."]]
    }
  },
  "llc-operating": {
    en: {
      when: ["Forming or organizing a US LLC — most states don't require one but banks, partners and courts expect it", "Multi-member LLCs where ownership %, voting and distributions need to be written down"],
      tips: ["Match ownership % and capital contributions exactly to your formation filings", "Member-managed is typical for small LLCs; manager-managed suits passive investors", "The transfer-restriction clause is what actually prevents unwanted co-owners"],
      caution: "State LLC statutes differ — this is a general-purpose agreement. States like California, New York and Delaware have specific default rules this agreement modifies.",
      faq: [["Is an operating agreement legally required?", "Only a few states mandate it, but operating without one means state default rules govern — often not what you want."], ["Single-member LLC needs one?", "Strongly recommended — it reinforces the corporate veil separating you from the LLC."]]
    }
  },
  "residential-lease-en": {
    en: {
      when: ["Renting out residential property in the US — landlord and tenant sign before move-in"],
      tips: ["Security deposit limits and return deadlines are state-specific — check your state's cap before filling", "Late fees must be 'reasonable' — punitive amounts are unenforceable in most states", "Pet clauses need a clear deposit/fee amount and description"],
      caution: "Many states mandate specific disclosures (lead paint, mold, flood zone) that a generic lease won't include. Add your state's required addenda.",
      law: "State landlord-tenant statutes govern; this template covers the common core clauses.",
      faq: [["Month-to-month or fixed term?", "Fixed term gives stability; month-to-month gives flexibility — this template supports both via the term fields."]]
    }
  },
  "privacy-policy": {
    ko: {
      when: ["웹사이트·앱·온라인 쇼핑몰을 운영하면서 이메일·주소 등 개인정보를 수집할 때 — 게시가 법정 의무입니다"],
      tips: ["수집 항목·목적·보유기간을 실제 수집하는 정보와 정확히 일치시키세요 — 과다 기재도 과소 기재도 문제", "제3자 제공·위탁이 있으면 수탁자를 구체적으로 기재해야 합니다", "개인정보 보호책임자 연락처는 실제 응대 가능한 것으로"],
      caution: "방침과 실제 처리가 다르면 오히려 위반 근거가 됩니다. 결제대행사·배송사 등 위탁이 있으면 해당 업체명을 반드시 반영하세요.",
      law: "개인정보 보호법 제30조 — 처리방침 공개 의무. 위반 시 과태료 대상.",
      faq: [["해외 서비스도 필요한가요?", "한국 이용자를 대상으로 수집하면 국내법 적용 — GDPR 대상이면 별도 조항이 필요합니다."]]
    }
  },

  "traffic-settlement": {
    ko: {
      when: ["경미한 물적 피해 사고를 보험 처리 없이 당사자끼리 마무리할 때", "보험사 합의 전 개인 간 특별 합의가 필요한 경우"],
      tips: ["사고 일시·장소·차량 번호를 정확히 기록 — 이후 보험사·수사기관 조회의 기초", "합의금 외 치료비·수리비 별도 정산이 필요하면 조항에 명시하세요", "'일체의 청구 포기' 조항이 향후 추가 청구를 막는 핵심입니다"],
      caution: "인명피해가 있거나 후유증 우려가 있으면 현장 합의는 위험합니다 — 진단 후 합의하세요. 음주·무면허·뺑소니는 형사 사안으로 합의만으로 종결되지 않습니다.",
      law: "합의서는 사해행위가 아닌 한 민법상 화해계약으로 유효. 보험사 보상에는 별도 합의 절차가 필요할 수 있습니다.",
      faq: [["합의 후 아픈 곳이 생기면?", "합의 당시 예측 불가했던 후유증은 별도 청구가 가능한 경우가 있으나 입증이 어렵습니다 — 진단 후 서명을 권합니다."], ["합의서만으로 보험 처리가 되나요?", "보험 접수는 별도로 필요하며, 합의서는 당사자 간 정산 근거입니다."]]
    }
  },
  "parental-leave": {
    ko: {
      when: ["만 8세 이하(초등 2학년 이하) 자녀를 양육하기 위해 휴직할 때", "임신 중인 여성 근로자의 모성 보호 목적 휴직"],
      tips: ["휴직 개시 30일 전까지 신청하는 것이 원칙 — 회사 규정을 확인하세요", "휴직 기간은 1년 이내에서 정하고, 분할 사용도 가능합니다", "배우자도 같은 자녀에 대해 육아휴직 사용 가능 — 동시 사용 시 '아빠육아휴직보너스제' 검토"],
      caution: "육아휴직은 법정 권리라 회사가 거부할 수 없습니다(정당 사유 없는 불허 시 과태료). 다만 급여는 별도 고용보험 급여로 지급되므로 회사와 급여 지급 여부를 혼동하지 마세요.",
      law: "남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조 — 육아휴직 1년, 불허 시 500만원 이하 과태료.",
      faq: [["회사가 거절하면?", "법정 요건 충족 시 거부 불가 — 고용노동부에 진정할 수 있습니다."], ["급여는 어떻게 받나요?", "육아휴직 급여는 고용보험에서 지급됩니다(통상임금의 일정 비율)."]]
    }
  },
  "lease-renewal": {
    ko: {
      when: ["임대차 만료 전 계약갱신요구권을 행사할 때(임차인)", "임대인이 법정 사유로 갱신을 거절할 때"],
      tips: ["갱신요구는 만료 6개월~2개월 전까지 — 시기를 놓치면 묵시적 갱신으로 넘어갑니다", "차임 증액은 5% 이내로 제한 — 그 이상 요구는 거절 가능", "내용증명으로 보내 통지 도달 시기를 입증 가능하게 하세요"],
      caution: "임대인의 갱신거절은 실거주·재건축 등 법정 사유가 있어야 합니다. 거절 사유가 거짓이면 임차인에게 손해배상 책임이 생길 수 있습니다.",
      law: "주택임대차보호법 제6조(계약갱신요구권), 제6조의3(차임 증액 상한 5%).",
      faq: [["묵시적 갱신과 갱신요구의 차이는?", "묵시적 갱신은 종전과 동일 조건으로 자동 연장, 갱신요구는 임차인이 조건 조정을 요구할 수 있는 적극적 권리입니다."], ["통지 후 임대인이 무응답이면?", "갱신요구를 받은 임대인이 2개월 내 거절 통지를 안 하면 갱신된 것으로 봅니다."]]
    }
  },
  "separation-cert": {
    ko: {
      when: ["사업주가 퇴직 근로자의 실업급여 수급을 위해 이직 사실을 확인할 때"],
      tips: ["이직 사유 코드는 수급 자격에 직결 — 계약만료·권고사직(비자발)은 수급 가능, 자발 퇴사는 원칙적으로 제한", "실제 제출은 고용보험 전산(EDI)으로 — 이 서면은 근로자 확인·기록용", "평균임금·피보험기간은 급여 산정 기초이므로 정확히 기재"],
      caution: "이직 사유를 사실과 다르게 기재하면 사업주·근로자 모두 부정수급 문제가 될 수 있습니다.",
      law: "고용보험법 — 이직확인서는 사업주가 이직일 다음 달 15일까지 신고 의무.",
      faq: [["자발 퇴사면 실업급여가 안 되나요?", "원칙적으로 제한되나, 임금체불·건강 등 '정당한 이유'가 있으면 가능합니다."]]
    }
  },
  "parttime-employment": {
    ko: {
      when: ["주 40시간 미만 단시간 근로자(아르바이트·파트타임) 채용 시"],
      tips: ["주 15시간이 분기점 — 이상이면 주휴수당·연차·퇴직금(1년 이상) 대상", "근무 요일·시간을 구체적으로 — '협의하여 결정'만 쓰면 분쟁 소지", "시급이 최저임금 이상인지 반드시 확인"],
      caution: "단시간 근로자도 근로기준법이 동일하게 적용됩니다. 초과근무·휴일근로 가산수당 규정은 통상근로자와 같습니다.",
      law: "근로기준법 제17조, 제18조(단시간근로자 비례보호).",
      faq: [["주 14시간이면 주휴수당은?", "주 15시간 미만이면 주휴수당 대상이 아닙니다(4주 평균 기준)."]]
    }
  },
  "inspection-cert": {
    ko: {
      when: ["납품·용역 완료 후 대금 지급 조건과 연동되는 검수를 확정할 때"],
      tips: ["'검수 합격' 확인서는 지급 의무 발생의 방아쇠 — 발주자는 신중히, 납품자는 서둘러 받으세요", "조건부 합격이면 보완 사항과 기한을 반드시 기재", "불합격 사유는 구체적으로 — '품질 미달'보다 측정 가능한 하자를"],
      caution: "합격 확인서에 서명하면 하자보수 청구가 제한될 수 있어 검수는 신중하게.",
      faq: [["검수 기간을 안 정하면?", "상사법상 상당 기간 내 검수 의무가 있습니다 — 계약서에 검수 기간을 정하는 게 좋습니다."]]
    }
  },
  "business-transfer": {
    ko: {
      when: ["점포·온라인 사업체를 통째로 양도하거나 인수할 때"],
      tips: ["양수도 대상을 '영업권·시설·재고·상호·고객데이터' 등 구체적으로 열거", "인도일 이전 채무의 승계 여부는 분쟁 최다발 조항 — 반드시 명시", "경업금지 기간·지역을 합리적으로 — 과도한 제한은 무효 판단 사례가 있습니다"],
      caution: "임차 점포는 임대인의 승낙 없이 양도되면 임대차 해지 사유가 될 수 있습니다 — 임대인 동의를 먼저 받으세요.",
      faq: [["권리금은 과세 대상인가요?", "영업권 양도 대가는 소득세 과세 대상이 될 수 있습니다 — 세무사 상담 권장."]]
    }
  },
  "copyright-assignment": {
    ko: {
      when: ["일러스트·사진·글·음악·영상 등 저작물의 재산권을 완전히 이전할 때"],
      tips: ["양도 권리 범위를 정하세요 — '일체'면 2차 저작물 작성권까지 넘어갑니다", "저작인격권(성명표시·동일성유지)은 법상 양도 불가 — '행사하지 않는다' 약정으로 처리하는 것이 실무", "사용 허락(라이선스)과 양도는 다릅니다 — 단순 사용 허락이면 저작권 사용허락 계약서를 쓰세요"],
      caution: "양도 후에는 원저작자도 복제·수정이 제한됩니다. 포트폴리오 공개권 등 예외 조항이 필요하면 특약에 넣으세요.",
      law: "저작권법 제45조(저작재산권 양도), 제14조(저작인격권 양도 불가).",
      faq: [["양도와 사용허락의 차이는?", "양도는 권리 자체가 이전(되돌리기 어려움), 사용허락은 권리는 유지하고 이용만 허가합니다."]]
    }
  },
  "pet-care": {
    ko: {
      when: ["펫시터·지인에게 반려동물을 맡기거나 돌봄 서비스를 제공할 때"],
      tips: ["건강·알레르기·복용약은 상세히 — 사고 대부분이 정보 누락에서 발생합니다", "응급 시 연락 불가한 경우의 수의사 진료 한도를 정해두면 갈등이 줄어듭니다", "위탁 비용·돌봄 내용을 구체적으로 기재"],
      caution: "반려동물 사고·분실 시 배상 책임은 위탁 관리 의무 위반 여부로 판단됩니다 — 돌봄 내용을 문서로 남기는 것이 핵심입니다.",
      faq: [["돌봄 중 사고가 나면?", "수탁인의 고의·과실이 있으면 배상 책임 — 계약서에 관리 의무 조항이 있어야 판단 가능합니다."]]
    }
  },
  "board-minutes": {
    ko: {
      when: ["이사회·주주총회의 안건 결의를 공식 기록할 때 — 등기·세무·내부 근거 문서"],
      tips: ["안건명과 결의 내용을 한 줄씩 구분 기재 — 표로 자동 정리됩니다", "출석자를 명단으로 기록 — 정족수 충족 여부의 근거", "주주총회 의사록은 의장이 서명, 이사회 의사록은 출석 이사 서명이 관행"],
      caution: "의사록은 등기 신청 등 공적 절차의 첨부 문서로도 쓰이므로 결의 문구를 정관·상법 요건에 맞게 정확히 기재하세요.",
      faq: [["의사록 없이 결의하면?", "결의 자체가 무효가 되진 않지만 등기·감사 시 입증이 안 됩니다."]]
    }
  }

};

/* 카테고리 기본 가이드 — 전용 가이드가 없는 문서용 */
module.exports.CAT_GUIDE = {
  contract: { ko: { when: ["당사자 간 권리·의무를 문서로 확정할 때"], tips: ["핵심 조건(금액·기한·범위)은 측정 가능하게 기재", "서명·날인 전 상대방과 조항을 확인"], caution: "서명 후 수정은 양측 합의가 필요합니다 — 작성 단계에서 충분히 검토하세요." } },
  notice: { ko: { when: ["상대방에게 공식적 요구·통지를 문서로 남길 때"], tips: ["발송 기록이 남는 방법(내용증명·등기·읽음확인)으로 보내기", "요구 사항과 기한을 구체적으로"], caution: "통지 문서는 이후 분쟁의 핵심 증거가 됩니다 — 사실과 다른 기재는 피하세요." } },
  litigation: { ko: { when: ["수사·행정·사법 절차에 제출하는 문서가 필요할 때"], tips: ["제출처(관할 기관)를 먼저 확인", "사실 관계는 시간 순서로 객관적으로"], caution: "공식 문서는 허위 기재 시 불이익이 있습니다. 중요한 사건은 전문가 상담을 권합니다." } },
  realestate: { ko: { when: ["부동산 거래·임대에서 당사자 간 권리를 확정할 때"], tips: ["등기부등본으로 권리관계를 먼저 확인", "금액·지급일·인도일을 명확히"], caution: "고액 거래는 표준계약서 병행과 전문가 검토를 권합니다." } },
  labor: { ko: { when: ["고용 관계에서 필요한 서면 문서를 작성할 때"], tips: ["법정 기재사항이 빠지지 않도록", "당사자 각 1부씩 보관"], caution: "근로관계는 근로기준법 등 강행규정이 우선 적용됩니다." } },
  family: { ko: { when: ["개인 간 권리·의무를 문서로 남길 때"], tips: ["당사자 정보와 날짜를 정확히", "중요 문서는 서명·날인 후 보관"], caution: "가사·상속 등 민감 사안은 전문가 상담을 권합니다." } },
  business: { ko: { when: ["거래·회계·대외 업무용 문서를 작성할 때"], tips: ["금액·수량 등 숫자는 이중 확인", "발행일과 당사자 정보를 정확히"], caution: "세무·회계 목적 문서는 관련 법령상 요건을 확인하세요." } }
};
