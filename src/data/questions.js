const questions = [
    {
      question: { en: "Do you vape?", ar: "هل تقوم بالتدخين الإلكتروني؟" },
      options: [
        { value: "Yes", en: "Yes", ar: "نعم" },
        { value: "No", en: "No", ar: "لا" },
      ],
      name: "vape",
      renderCondition: () => true,
      required: true,
    },
    {
      question: { en: "Why did you start vaping?", ar: "لماذا بدأت التدخين الإلكتروني؟" },
      options: [
        { value: "Curiosity", en: "Curiosity", ar: "الفضول" },
        { value: "Stress Relief", en: "Stress Relief", ar: "تخفيف التوتر" },
        { value: "Quitting Smoking", en: "Quitting Smoking", ar: "الإقلاع عن التدخين" },
        { value: "Peer Pressure", en: "Peer Pressure", ar: "ضغط الأقران" },
        { value: "Availability", en: "Availability", ar: "سهولة التوفر" },
        { value: "Other", en: "Other", ar: "أخرى" },
      ],
      name: "whyVape",
      renderCondition: (formData) => formData.vape === "Yes",
      isCheckbox: true,
    },
    {
      question: {
        en: "What emotions do you associate with vaping?",
        ar: "ما هي المشاعر التي تربطها بالتدخين الإلكتروني؟",
      },
      options: [
        { value: "Relaxation", en: "Relaxation", ar: "الاسترخاء" },
        { value: "Stress", en: "Stress", ar: "الضغط" },
        { value: "Excitement", en: "Excitement", ar: "الإثارة" },
        { value: "Sadness", en: "Sadness", ar: "الحزن" },
        { value: "Neutral", en: "Neutral", ar: "محايد" },
      ],
      name: "emotionsVaping",
      renderCondition: (formData) => formData.vape === "Yes",
      isCheckbox: true,
    },
    {
      question: {
        en: "How often do you vape daily?",
        ar: "كم مرة تدخن إلكترونيًا يوميًا؟",
      },
      options: [
        { value: "Less than 5 times", en: "Less than 5 times", ar: "أقل من 5 مرات" },
        { value: "5–10 times", en: "5–10 times", ar: "من 5 إلى 10 مرات" },
        { value: "11–20 times", en: "11–20 times", ar: "من 11 إلى 20 مرة" },
        { value: "More than 20 times", en: "More than 20 times", ar: "أكثر من 20 مرة" },
      ],
      name: "vapeFrequency",
      renderCondition: (formData) => formData.vape === "Yes",
    },
    {
      question: {
        en: "Do you believe vaping has improved your quality of life?",
        ar: "هل تعتقد أن التدخين الإلكتروني قد حسن جودة حياتك؟",
      },
      options: [
        { value: "Yes", en: "Yes", ar: "نعم" },
        { value: "No", en: "No", ar: "لا" },
        { value: "Not Sure", en: "Not Sure", ar: "لست متأكدًا" },
      ],
      name: "vapingImprovedLife",
      renderCondition: (formData) => formData.vape === "Yes",
    },
    {
      question: {
        en: "What social settings do you usually vape in?",
        ar: "في أي الأماكن الاجتماعية تدخن إلكترونيًا عادةً؟",
      },
      options: [
        { value: "Parties", en: "Parties", ar: "الحفلات" },
        { value: "With Friends", en: "With Friends", ar: "مع الأصدقاء" },
        { value: "Alone", en: "Alone", ar: "وحدي" },
        { value: "At Work/School", en: "At Work/School", ar: "في العمل/المدرسة" },
        { value: "Public Spaces", en: "Public Spaces", ar: "الأماكن العامة" },
        { value: "Other", en: "Other", ar: "أخرى" },
      ],
      name: "vapeSocialSettings",
      renderCondition: (formData) => formData.vape === "Yes",
      isCheckbox: true,
    },
    {
      question: {
        en: "What are the primary reasons you continue to vape?",
        ar: "ما هي الأسباب الرئيسية التي تجعلك تستمر في التدخين الإلكتروني؟",
      },
      options: [
        { value: "Habit", en: "Habit", ar: "العادة" },
        { value: "Stress Relief", en: "Stress Relief", ar: "تخفيف التوتر" },
        { value: "Enjoyment", en: "Enjoyment", ar: "الاستمتاع" },
        { value: "Social Influence", en: "Social Influence", ar: "التأثير الاجتماعي" },
        { value: "Other", en: "Other", ar: "أخرى" },
      ],
      name: "reasonsContinueVaping",
      renderCondition: (formData) => formData.vape === "Yes",
      isCheckbox: true,
    },
    {
      question: {
        en: "Have you experienced any negative effects from vaping?",
        ar: "هل واجهت أي آثار سلبية من التدخين الإلكتروني؟",
      },
      options: [
        { value: "Coughing", en: "Coughing", ar: "السعال" },
        { value: "Breathing Issues", en: "Breathing Issues", ar: "مشاكل التنفس" },
        { value: "Increased Stress", en: "Increased Stress", ar: "زيادة التوتر" },
        { value: "Dependency", en: "Dependency", ar: "الإدمان" },
        { value: "None", en: "None", ar: "لا شيء" },
        { value: "Other", en: "Other", ar: "أخرى" },
      ],
      name: "negativeEffectsVaping",
      renderCondition: (formData) => formData.vape === "Yes",
      isCheckbox: true,
    },
    {
      question: {
        en: "Do you think vaping is more harmful than smoking?",
        ar: "هل تعتقد أن التدخين الإلكتروني أكثر ضررًا من التدخين التقليدي؟",
      },
      options: [
        { value: "Yes", en: "Yes", ar: "نعم" },
        { value: "No", en: "No", ar: "لا" },
        { value: "Not Sure", en: "Not Sure", ar: "لست متأكدًا" },
      ],
      name: "moreHarmfulThanSmoking",
      renderCondition: (formData) => formData.vape === "Yes",
    },
    {
      question: {
        en: "Have you ever tried quitting vaping?",
        ar: "هل سبق أن حاولت الإقلاع عن التدخين الإلكتروني؟",
      },
      options: [
        { value: "Yes", en: "Yes", ar: "نعم" },
        { value: "No", en: "No", ar: "لا" },
        { value: "Currently Trying", en: "Currently Trying", ar: "أحاول حاليًا" },
      ],
      name: "triedQuittingVaping",
      renderCondition: (formData) => formData.vape === "Yes",
    },
    {
      question: {
        en: "What is your opinion on vaping?",
        ar: "ما هو رأيك في التدخين الإلكتروني؟",
      },
      options: [
        { value: "Positive", en: "Positive", ar: "إيجابي" },
        { value: "Neutral", en: "Neutral", ar: "محايد" },
        { value: "Negative", en: "Negative", ar: "سلبي" },
      ],
      name: "opinionOnVaping",
      renderCondition: (formData) => formData.vape === "No",
      required: true,
    },
    {
      question: {
        en: "What concerns you the most about vaping?",
        ar: "ما الذي يقلقك أكثر بشأن التدخين الإلكتروني؟",
      },
      options: [
        { value: "Health Risks", en: "Health Risks", ar: "المخاطر الصحية" },
        { value: "Addiction", en: "Addiction", ar: "الإدمان" },
        { value: "Social Influence", en: "Social Influence", ar: "التأثير الاجتماعي" },
        { value: "Accessibility to Youth", en: "Accessibility to Youth", ar: "سهولة الوصول للشباب" },
        { value: "Cost", en: "Cost", ar: "التكلفة" },
        { value: "Environmental Impact", en: "Environmental Impact", ar: "الأثر البيئي" },
        { value: "Other", en: "Other", ar: "أخرى" },
      ],
      name: "vapeConcerns",
      renderCondition: (formData) => formData.vape === "No",
      isCheckbox: true,
    },
    {
        question: { en: "Do you feel peer pressure to start vaping?", ar: "هل تشعر بضغوط الأقران لبدء التدخين الإلكتروني؟" },
        options: [
          { value: "Yes", en: "Yes", ar: "نعم" },
          { value: "No", en: "No", ar: "لا" },
          { value: "Sometimes", en: "Sometimes", ar: "أحيانًا" },
        ],
        name: "peerPressureVaping",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "Have you ever tried vaping out of curiosity?", ar: "هل جربت التدخين الإلكتروني بدافع الفضول؟" },
        options: [
          { value: "Yes", en: "Yes", ar: "نعم" },
          { value: "No", en: "No", ar: "لا" },
        ],
        name: "triedVapingCuriosity",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "What do you think are the main reasons people vape?", ar: "ما هي الأسباب الرئيسية التي تجعلك تعتقد أن الناس يدخنون إلكترونيًا؟" },
        options: [
          { value: "Stress Relief", en: "Stress Relief", ar: "تخفيف التوتر" },
          { value: "Social Influence", en: "Social Influence", ar: "التأثير الاجتماعي" },
          { value: "Quitting Smoking", en: "Quitting Smoking", ar: "الإقلاع عن التدخين" },
          { value: "Curiosity", en: "Curiosity", ar: "الفضول" },
          { value: "Other", en: "Other", ar: "أخرى" },
        ],
        name: "reasonsPeopleVape",
        renderCondition: (formData) => formData.vape === "No",
        isCheckbox: true,
      },
      {
        question: { en: "How strong is the social influence of vaping in your environment?", ar: "إلى أي مدى يكون التأثير الاجتماعي للتدخين الإلكتروني في بيئتك؟" },
        options: [
          { value: "High", en: "High", ar: "عالي" },
          { value: "Moderate", en: "Moderate", ar: "متوسط" },
          { value: "Low", en: "Low", ar: "منخفض" },
          { value: "None", en: "None", ar: "لا شيء" },
        ],
        name: "socialInfluenceVaping",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "Would you ever consider vaping in the future?", ar: "هل ستفكر يومًا في التدخين الإلكتروني في المستقبل؟" },
        options: [
          { value: "Yes", en: "Yes", ar: "نعم" },
          { value: "No", en: "No", ar: "لا" },
          { value: "Not Sure", en: "Not Sure", ar: "لست متأكدًا" },
        ],
        name: "considerVapingFuture",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "Do you think vaping is a safer alternative to smoking?", ar: "هل تعتقد أن التدخين الإلكتروني بديل أكثر أمانًا من التدخين التقليدي؟" },
        options: [
          { value: "Yes", en: "Yes", ar: "نعم" },
          { value: "No", en: "No", ar: "لا" },
          { value: "Not Sure", en: "Not Sure", ar: "لست متأكدًا" },
        ],
        name: "vapingSaferThanSmoking",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "If a friend offered you a vape, would you accept it?", ar: "إذا عرض عليك صديق سيجارة إلكترونية، هل ستقبلها؟" },
        options: [
          { value: "Yes", en: "Yes", ar: "نعم" },
          { value: "No", en: "No", ar: "لا" },
          { value: "Depends on the Situation", en: "Depends on the Situation", ar: "يعتمد على الموقف" },
        ],
        name: "acceptVapeOffer",
        renderCondition: (formData) => formData.vape === "No",
      },
      {
        question: { en: "Any additional comments or thoughts?", ar: "هل لديك أي تعليقات أو أفكار إضافية؟" },
        name: "comments",
        renderCondition: () => true,
        isTextarea: true,
        optional: true,
      },
  ];

export default questions;