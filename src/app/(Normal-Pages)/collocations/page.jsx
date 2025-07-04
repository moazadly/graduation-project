"use client";
import { Container, Stack, Typography, Box, Tabs, Tab, Grid, Card, CardContent } from "@mui/material";

import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import Image from "next/image";



  const wordsData = [
  {
    "_id": { "$oid": "684ad78379a2682a3f213f00" },
    "text": "هوية",
    "Kind": "اسم",
    "origin": "هـ و",
    "wordJourney": "تَتَمَثَّلُ الرِّحْلَةُ الدِّلالِيَّةُ لِكَلِمَةِ (الهُوِيَّة) ...",
    "morphFormula": "مصدر صناعي",
    "Semantics": [
      {
        "label": "الهُوِيَّةُ",
        "meaning": "إِحْساسُ الفَرْدِ بِذاتِهِ وفَرْدِيَّتِهِ ...",
        "examples": [
          "قال مصطفى لطفي المنفلوطي: ...",
          "قال فؤاد أندراوس: ...",
          "ورد في مجلة الرسالة: ...",
          "قال د. لطيف زيتوني: ..."
        ],
        "references": [
          "المنفلوطي، النظرات، دار ومكتبة الهلال، ج: 2، ص: 14.",
          "ول ديورانت، قصة الحضارة، ترجمة: فؤاد أندراوس ومراجعة علي أدهم، ج: 35، ص: 229.",
          "مجلة الرسالة، العدد: 194، تاريخ الإصدار: 22 مارس 1937م، ص: 479.",
          "إيمانويل فريس، وبرنار موراليس، آفاق جديدة في نظرية الأدب، ترجمة د. لطيف زيتوني، عالم المعرفة، فبراير، 2004م، ص: 27."
        ],
        "translate": "Identity"
      }
    ],
    "collocates": [
      { "text": "ثقافية", "meaning": "الهوية المرتبطة بالثقافة والعادات والتقاليد", "examples": [ "الحفاظ على الهوية الثقافية ضروري في زمن العولمة.", "اللغة جزء أساسي من الهوية الثقافية." ], "position": "تصاحب بعدي" },
      { "text": "وطنية", "meaning": "الانتماء إلى الوطن والمجتمع الوطني", "examples": [ "الهوية الوطنية تتجلى في الرموز والتاريخ المشترك.", "الاحتفال باليوم الوطني يعزز الهوية الوطنية." ], "position": "تصاحب بعدي" },
      { "text": "دينية", "meaning": "الانتماء إلى دين أو معتقد معين", "examples": [ "الهوية الدينية تؤثر في السلوك والقيم.", "يجب احترام الهويات الدينية المتنوعة." ], "position": "تصاحب بعدي" },
      { "text": "شخصية", "meaning": "تعكس السمات الفردية والذاتية للإنسان", "examples": [ "لكل إنسان هوية شخصية تميّزه.", "الخبرات والتجارب تشكّل الهوية الشخصية." ], "position": "تصاحب بعدي" },
      { "text": "رقمية", "meaning": "الهوية الإلكترونية للفرد في الفضاء الرقمي", "examples": [ "الهوية الرقمية بحاجة إلى حماية أمنية مشددة.", "معاملات اليوم تعتمد على الهوية الرقمية." ], "position": "تصاحب بعدي" },
      { "text": "بصرية", "meaning": "الشكل المرئي المرتبط بعلامة أو مؤسسة", "examples": [ "الهوية البصرية تعكس صورة المؤسسة.", "يجب توحيد الهوية البصرية للعلامة التجارية." ], "position": "تصاحب بعدي" },
      { "text": "قومية", "meaning": "الهوية التي ترتبط بالانتماء القومي أو العرقي", "examples": [ "اللغة من أبرز مكونات الهوية القومية.", "الهوية القومية تتجلى في التراث والتقاليد." ], "position": "تصاحب بعدي" },
      { "text": "إثنية", "meaning": "هوية مستندة إلى الأصل العرقي أو الإثني", "examples": [ "الهوية الإثنية تلعب دورًا في تشكيل الجماعات.", "التمييز بناءً على الهوية الإثنية مرفوض." ], "position": "تصاحب بعدي" },
      { "text": "مزيفة", "meaning": "هوية غير حقيقية تُستخدم للتمويه أو الاحتيال", "examples": [ "استخدم المشتبه به هوية مزيفة.", "الهوية المزيفة تُعد جريمة في كثير من الدول." ], "position": "تصاحب بعدي" },
      { "text": "جماعية", "meaning": "هوية يشترك فيها مجموعة من الأفراد", "examples": [ "الهوية الجماعية تمنح الأفراد شعورًا بالانتماء.", "تشكيل هوية جماعية يساهم في تماسك المجتمع." ], "position": "تصاحب بعدي" }
    ]
  },
  {
    "_id": { "$oid": "684ad78379a2682a3f213eff" },
    "text": "هدف",
    "Kind": "اسم",
    "origin": "هـ د ف",
    "wordJourney": "تَتَمَثَّلُ الرِّحْلَةُ الدِّلالِيَّةُ العامَّةُ لِكَلِمَةِ (الهَدَف) ...",
    "morphFormula": "مصدر صناعي",
    "Semantics": [
      {
        "label": "الهَدَفُ",
        "meaning": "المَطْلَبُ والغَرَضُ الذي يُوجَّهُ إِلَيْهِ القَصْدُ.",
        "examples": [ "قال العقاد: \"هَدَفُ العَقيدَةِ في اللهِ وفي النُّبُوَّةِ وفي الضَّميرِ الإِنْسانِيِّ هِيَ غايَةُ التَّقَدُّمِ الذي ارْتَقى إِلَيْهِ النّاسُ\"" ],
        "references": [ "موسوعة العقاد الإسلامية، المجلد الخامس، دار الكتاب العربي، بيروت- لبنان، ص: 323." ],
        "translate": "Purpose"
      }
    ],
    "collocates": [
      { "text": "تحقيق", "meaning": "الوصول إلى الهدف وإنجازه", "examples": [ "يجب العمل بجد من أجل تحقيق الهدف.", "تحقيق الهدف يتطلب تخطيطاً جيداً." ], "position": "تصاحب قبلي" },
      { "text": "يسعى إلى", "meaning": "يبذل الجهد من أجل بلوغ الهدف", "examples": [ "يسعى الطالب إلى تحقيق هدفه الأكاديمي.", "يسعى الفريق إلى هدف الفوز بالبطولة." ], "position": "تصاحب قبلي" },
      { "text": "وضع", "meaning": "تحديد أو تخطيط الهدف", "examples": [ "وضع المدير هدفًا واضحًا للفريق.", "يجب وضع أهداف قصيرة وطويلة المدى." ], "position": "تصاحب قبلي" },
      { "text": "سجل", "meaning": "أحرز الهدف (خاصة في الرياضة)", "examples": [ "سجل اللاعب الهدف في الدقيقة الأخيرة.", "تمكن الفريق من تسجيل ثلاثة أهداف." ], "position": "تصاحب قبلي" },
      { "text": "بلوغ", "meaning": "الوصول إلى الهدف بعد السعي", "examples": [ "يحتاج بلوغ الهدف إلى صبر وإصرار.", "وضع خطة مناسبة يساعد على بلوغ الهدف." ], "position": "تصاحب قبلي" },
      { "text": "ركز على", "meaning": "توجيه الجهد نحو الهدف", "examples": [ "ركز الطالب على هدف النجاح.", "علينا أن نركز على هدف المشروع الأساسي." ], "position": "تصاحب قبلي" },
      { "text": "يخدم", "meaning": "يدعم أو يساهم في تحقيق الهدف", "examples": [ "هذا القرار يخدم هدف الاستدامة البيئية.", "تعاون الفريق يخدم الهدف المشترك." ], "position": "تصاحب قبلي" },
      { "text": "حدد", "meaning": "عرف الهدف بدقة", "examples": [ "حدد المعلم هدف الدرس بوضوح.", "تحديد الهدف يسهل الوصول إليه." ], "position": "تصاحب قبلي" },
      { "text": "يتعارض مع", "meaning": "لا يتوافق مع الهدف", "examples": [ "هذا السلوك يتعارض مع هدف المؤسسة.", "إهمال التفاصيل قد يتعارض مع تحقيق الهدف." ], "position": "تصاحب قبلي" },
      { "text": "أهداف استراتيجية", "meaning": "أهداف طويلة الأجل ومهمة", "examples": [ "تسعى الشركة لتحقيق أهداف استراتيجية في السوق.", "يجب مواءمة العمل مع الأهداف الاستراتيجية." ], "position": "تصاحب بعدي" }
    ]
  },
  {
    "_id": { "$oid": "685ea001a7fa53f5bdcf733a" },
    "text": "قلم",
    "Kind": "اسم",
    "origin": "ق ل م",
    "wordJourney": "كَانَ القَلَمُ وَسِيلَةً لِلكِتابَةِ مُنْذُ القِدَمِ ...",
    "morphFormula": "اسم ذات",
    "Semantics": [
      {
        "label": "قَلَم",
        "meaning": "أداة يُكْتَبُ بِها.",
        "examples": [ "قال ابن خلدون: \"القلم أحد أعمدة الحضارة\"" ],
        "references": [ "ابن خلدون، المقدمة، دار الفكر، ص: 122." ],
        "translate": "Pen"
      }
    ],
    "collocates": [
      { "text": "رصاص", "meaning": "أداة كتابة تعتمد على مادة الرصاص بدلاً من الحبر", "examples": [ "استخدم الطفل قلم رصاص في التلوين.", "قلم الرصاص مناسب للرسومات الدقيقة." ], "position": "تصاحب بعدي" },
      { "text": "حبر", "meaning": "قلم يحتوي على حبر سائل أو جاف للكتابة", "examples": [ "يفضل المعلم استخدام قلم حبر في تصحيح الأوراق.", "انسكب الحبر من القلم على الطاولة." ], "position": "تصاحب بعدي" },
      { "text": "أحمر", "meaning": "قلم يستخدم للتمييز أو التصحيح باللون الأحمر", "examples": [ "استخدم المعلم قلمًا أحمر لتصحيح الأخطاء.", "القلم الأحمر يلفت الانتباه إلى النقاط المهمة." ], "position": "تصاحب بعدي" },
      { "text": "جاف", "meaning": "قلم يعتمد على الحبر الجاف ويُستخدم للكتابة اليومية", "examples": [ "اشتريت قلمًا جافًا بلون أزرق.", "أقلام الحبر الجاف تدوم لفترة أطول." ], "position": "تصاحب بعدي" },
      { "text": "ألوان", "meaning": "أقلام متعددة الألوان تُستخدم في الرسم أو التلوين", "examples": [ "أحضرت الطفلة مجموعة من أقلام الألوان.", "تستخدم أقلام الألوان في الحصص الفنية." ], "position": "تصاحب بعدي" },
      { "text": "ذكي", "meaning": "قلم إلكتروني يستخدم التقنيات الحديثة للكتابة أو الرسم", "examples": [ "القلم الذكي يسجل الكتابة على الأجهزة الرقمية.", "يمكنك الرسم مباشرة باستخدام القلم الذكي على التابلت." ], "position": "تصاحب بعدي" },
      { "text": "ليزر", "meaning": "قلم يستخدم شعاع الليزر للإشارة في العروض التقديمية", "examples": [ "استخدم المحاضر قلم ليزر أثناء الشرح.", "قلم الليزر مفيد في الاجتماعات والعروض." ], "position": "تصاحب بعدي" },
      { "text": "رسم", "meaning": "قلم مخصص لإنشاء الرسوم واللوحات", "examples": [ "يستخدم الفنان قلم رسم بخط دقيق.", "قلم الرسم يختلف عن قلم الكتابة العادي." ], "position": "تصاحب بعدي" },
      { "text": "ممحاة", "meaning": "ترتبط بمفهوم أقلام الرصاص القابلة للمحو", "examples": [ "يحتوي هذا القلم على ممحاة في نهايته.", "أخطأ الطالب فمحا كتابته باستخدام ممحاة القلم." ], "position": "تصاحب بعدي" },
      { "text": "فاخر", "meaning": "قلم متميز في التصميم والجودة، وغالبًا ما يكون غالي الثمن", "examples": [ "أهداه والده قلمًا فاخرًا من ماركة عالمية.", "يُعد القلم الفاخر رمزًا للمكانة الرفيعة." ], "position": "تصاحب بعدي" },
      { "text": "تخطيط", "meaning": "قلم يستخدم في الخطوط التقنية أو الرسومات الهندسية", "examples": [ "يستخدم المهندس قلم تخطيط لرسم التصميمات.", "قلم التخطيط يُعطي خطوطًا دقيقة ومتساوية." ], "position": "تصاحب بعدي" },
      { "text": "مائل", "meaning": "قلم ذو رأس مائل يستخدم غالبًا في فن الخط", "examples": [ "قلم الخط المائل يُستخدم في كتابة الحروف بزوايا.", "تعلم الخطاط الكتابة بقلم مائل لتحقيق التوازن الجمالي." ], "position": "تصاحب بعدي" }
    ]
  },
  {
    "_id": { "$oid": "685ea001a7fa53f5bdcf733b" },
    "text": "شمس",
    "Kind": "اسم",
    "origin": "ش م س",
    "wordJourney": "تُعْتَبَرُ (الشَّمْسُ) مَصْدَرًا لِلضَّوْءِ وَالحَيَاةِ ...",
    "morphFormula": "اسم ذات",
    "Semantics": [
      {
        "label": "شَمْس",
        "meaning": "الجِرْمُ المُنِيرُ في السَّمَاءِ.",
        "examples": [ "قال المتنبي: \"وإذا غَضِبَتْ الشَّمْسُ أظْلَمَ نُورُهَا\"" ],
        "references": [ "ديوان المتنبي، شرح أبو البقاء العكبري، ج: 1، ص: 89." ],
        "translate": "Sun"
      }
    ],
    "collocates": [
      { "text": "مشرقة", "meaning": "تصف الشمس عند سطوعها القوي وإضاءتها الكبيرة", "examples": [ "كانت الشمس مشرقة في صباح هذا اليوم.", "يحب الناس الأيام ذات الشمس المشرقة." ], "position": "تصاحب بعدي" },
      { "text": "ساطعة", "meaning": "تشير إلى قوة ضوء الشمس وسطوعها في السماء", "examples": [ "أشعة الشمس الساطعة أزعجت السائق.", "الشمس الساطعة تبهج النفوس." ], "position": "تصاحب بعدي" },
      { "text": "حارقة", "meaning": "تشير إلى الحرارة الشديدة الناتجة من الشمس", "examples": [ "في الظهيرة، أصبحت الشمس حارقة جدًا.", "تجنّب الخروج في وقت الشمس الحارقة." ], "position": "تصاحب بعدي" },
      { "text": "غروب", "meaning": "يدل على الوقت الذي تختفي فيه الشمس خلف الأفق", "examples": [ "مشهد غروب الشمس رائع على البحر.", "انتهت النزهة عند غروب الشمس." ], "position": "تصاحب قبلي" },
      { "text": "شروق", "meaning": "بداية طلوع الشمس من الأفق الشرقي", "examples": [ "بدأت الرحلة مع شروق الشمس.", "شروق الشمس منظر يستحق التأمل." ], "position": "تصاحب قبلي" },
      { "text": "أشعة", "meaning": "الضوء المنبعث من الشمس", "examples": [ "أشعة الشمس تدخل من النافذة.", "يُنصح باستخدام واقي الشمس لحماية البشرة من الأشعة." ], "position": "تصاحب قبلي" },
      { "text": "حامية", "meaning": "تُشير إلى شدة حرارة الشمس في فترة الظهيرة", "examples": [ "الشمس كانت حامية في شهر يوليو.", "جلسنا تحت الشجرة هربًا من الشمس الحامية." ], "position": "تصاحب بعدي" },
      { "text": "صيفية", "meaning": "مرتبطة بالشمس في فصل الصيف", "examples": [ "في العطلة الصيفية، كانت الشمس صيفية قوية.", "القبعة تحمي من أشعة الشمس الصيفية." ], "position": "تصاحب بعدي" },
      { "text": "عمودية", "meaning": "عندما تكون الشمس في أعلى نقطة في السماء وتسلط الضوء بشكل مباشر", "examples": [ "كانت الشمس عمودية في منتصف النهار.", "في المناطق الاستوائية، تسطع الشمس عموديًا." ], "position": "تصاحب بعدي" },
      { "text": "ذهبية", "meaning": "تشير إلى لون الشمس عند الغروب أو الشروق", "examples": [ "انعكست الشمس الذهبية على سطح البحر.", "أحب منظر الشمس الذهبية في المساء." ], "position": "تصاحب بعدي" }
    ]
  }
];


const verbsData = [
  {
    "text": "يوسخ",
    "diacritics": [
      {
        "word_with_diacritics": "نَظِيفٌ",
        "phonetic_writing": "نا ظيف"
      }
    ],
    "semantic_info": [
      {
        "meaning": {
          "text": "يجعل الشيءَ غيرَ نظيف، يُلطِّخه بالقَذارة أو الأوساخ."
        }
      }
    ]
  }
];




import collocations from "../../assets/images/collocations.jpeg"; // adjust path as needed



function Page() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const [filteredVerbsRows, setFilteredVerbsRows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setHasSearched(true);

    const matchedWords = wordsData.filter(word =>
      word.text.includes(searchValue) ||
      (word.origin && word.origin.includes(searchValue)) ||
      (word.morphFormula && word.morphFormula.includes(searchValue)) ||
      (word.Semantics && word.Semantics.some(s => s.meaning && s.meaning.includes(searchValue)))
    );

    const matchedVerbs = verbsData.filter(verb =>
      verb.text.includes(searchValue) ||
      (verb.origin && verb.origin.includes(searchValue)) ||
      (verb.morphFormula && verb.morphFormula.includes(searchValue)) ||
      (verb.Semantics && verb.Semantics.some(s => s.meaning && s.meaning.includes(searchValue))) ||
      (verb.semantic_info && verb.semantic_info.some(s => s.meaning && s.meaning.text && s.meaning.text.includes(searchValue)))
    );

    setFilteredWords(matchedWords);
    setFilteredVerbsRows(matchedVerbs.map((verb, index) => ({
      id: index + 1,
      text: verb.text,
      kind: verb.Kind || "فعل",
      origin: verb.origin || "",
      morphFormula: verb.morphFormula || "",
      tense: verb.tense || "",
      meaning: verb.Semantics?.[0]?.meaning || verb.semantic_info?.[0]?.meaning?.text || "",
      examples: verb.semantic_info?.[0]?.examples?.join(" | ") || ""
    })));

    if (matchedWords.length > 0 && matchedVerbs.length === 0) {
      setTabValue(0);
    } else if (matchedWords.length === 0 && matchedVerbs.length > 0) {
      setTabValue(1);
    }
  };

  return (
    <div>
      <Container fixed sx={{ mt: 3, mb: 10 }} component="main" maxWidth="xl">
        <Navigation pageTitle="المتصاحبات اللفظية" />
        <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems="center" spacing={13} mb={8} width="90%">
          <Stack spacing={10}>
            <p className="text-3xl font-bold mb-12">
              اكتشف المتصاحبات اللفظية للكلمة واستخدمها في سياقات صحيحة!
            </p>
            <Typography variant="h5">
              تعرّف على الكلمات التي ترتبط شائعًا بالكلمة المُدخَلة، مع معانيها وأمثلة حقيقية على استخدامها، لتطوير مهاراتك اللغوية بدقة.
            </Typography>
            <SearchBar onSearch={handleSearch} placeholder="ابحث عن كلمة أو فعل..." />
          </Stack>
          <Box sx={{ width: { lg: '80%', xs: '100%' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={collocations} alt="collocations" width={400} height={300} style={{ width: '100%', height: 'auto', maxWidth: 500 }} priority />
          </Box>
        </Stack>

        {hasSearched && (
          <Box sx={{ width: '100%', mb: 10 }}>
            <Typography variant="h4" fontWeight="700" color="#004F3F" textAlign="center" mb={4}>
              نتائج البحث {searchTerm && <span>لـ "{searchTerm}"</span>}
            </Typography>

            {filteredWords.length === 0 && filteredVerbsRows.length === 0 ? (
              <Typography variant="h5" textAlign="center" color="#666">
                لا توجد نتائج مطابقة لبحثك. يرجى المحاولة بكلمات أخرى.
              </Typography>
            ) : (
              <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label={`الأسماء (${filteredWords.length})`} disabled={filteredWords.length === 0} />
                  </Tabs>
                </Box>

                <Grid container spacing={3}>
                  {tabValue === 0 &&
                    filteredWords.map((word, i) => (
                      <Grid item xs={12} key={i}>
                      <Box
  sx={{
    p: 3,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    fontSize: "18px", // Unified base font size
    lineHeight: 1.9,
  }}
>
  {word.collocates?.length > 0 && (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        color="#004F3F"
        fontWeight="bold"
        fontSize="22px"
        mb={2}
      >
        المتصاحبات اللفظية:
      </Typography>

      {word.collocates.map((col, idx) => (
        <Box
          key={idx}
          sx={{
            mt: 3,
            ml: 2,
            p: 2.5,
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        >
          <Typography fontSize="18px" mb={1}>
            <strong>التصاحب:</strong> {col.text}{" "}
            <span style={{ color: "#666" }}>({col.position})</span>
          </Typography>

          <Typography fontSize="18px" mb={1}>
            <strong>المعنى:</strong> {col.meaning}
          </Typography>

          <Typography fontSize="18px" fontWeight="bold" mb={1}>
            أمثلة:
          </Typography>

          <ul
            style={{
              marginTop: "8px",
              paddingRight: "20px",
              direction: "rtl",
              fontSize: "17px",
              color: "#444",
              lineHeight: "1.8",
            }}
          >
            {col.examples.map((example, exIdx) => (
              <li key={exIdx} style={{ marginBottom: "6px" }}>
                {example}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  )}
</Box>


                      </Grid>
                    ))
                  }

                  {tabValue === 1 &&
                    filteredVerbsRows.map((row, i) => (
                      <Grid item xs={12} key={i}>
                        <Box sx={{ p: 3, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", fontSize: "20px", lineHeight: 1.8 }}>
                          <Typography variant="h6" fontSize="24px" fontWeight="bold" color="#004f3f" mb={1}>
                            {row.text}
                          </Typography>
                          <Typography>
                            <strong>النوع:</strong> {row.kind} &nbsp;•&nbsp;
                            <strong>الجذر:</strong> {row.origin} &nbsp;•&nbsp;
                            <strong>الصيغة الصرفية:</strong> {row.morphFormula}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                            <strong>المعنى:</strong> {row.meaning}
                          </Typography>
                          <Typography sx={{ mt: 1 }} color="text.secondary" fontStyle="italic">
                            <strong>أمثلة:</strong> {row.examples}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  }
                </Grid>
              </>
            )}
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Page;