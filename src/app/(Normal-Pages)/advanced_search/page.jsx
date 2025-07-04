"use client";
import { Container, Stack, Typography, Box, Tabs, Tab } from "@mui/material";
import Navigation from "../../components/Navigation";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import Image from "next/image";

// Words and verbs data directly in the component
const wordsData = [
  {
    "text": "هوية",
    "Kind": "اسم",
    "origin": "هـ و",
    "morphFormula": "مصدر صناعي",
    "Semantics": [
      {
        "meaning": "إِحْساسُ الفَرْدِ بِذاتِهِ وفَرْدِيَّتِهِ"
      }
    ]
  },
  {
    "text": "هدف",
    "Kind": "اسم",
    "origin": "هـ د ف",
    "morphFormula": "مصدر صناعي",
    "Semantics": [
      {
        "meaning": "المَطْلَبُ والغَرَضُ الذي يُوجَّهُ إِلَيْهِ القَصْدُ."
      },
      {
        "meaning": "إستراتيجيَّةٌ تُوَظَّفُ لِتَحْقيقِ غايَةٍ ما ..."
      },
      {
        "meaning": "ما يُسَجِّلُهُ اللّاعِبُ في مَرْمى الخَصْمِ الآخَرِ."
      },
      {
        "meaning": "ما تَسْعى الدُّوَلُ والمُؤَسَّساتُ إلى تَحْقيقِهِ ..."
      },
      {
        "meaning": "الغَرَضُ والمَطْلَبُ النَّبيلُ الذي يُمَثِّلُ قِمَّةَ الطُّموحاتِ ..."
      }
    ]
  },
  // --- Added from wordModel.json ---
  {
    "text": "قلم",
    "Kind": "اسم",
    "origin": "ق ل م",
    "wordJourney": "كَانَ القَلَمُ وَسِيلَةً لِلكِتابَةِ مُنْذُ القِدَمِ ...",
    "morphFormula": "اسم ذات",
    "Semantics": [
      {
        "label": "قَلَم",
        "meaning": "أداة يُكْتَبُ بِها.",
        "examples": [
          "قال ابن خلدون: \"القلم أحد أعمدة الحضارة\""
        ],
        "references": [
          "ابن خلدون، المقدمة، دار الفكر، ص: 122."
        ],
        "translate": "Pen"
      }
    ]
  },
  {
    "text": "شمس",
    "Kind": "اسم",
    "origin": "ش م س",
    "wordJourney": "تُعْتَبَرُ (الشَّمْسُ) مَصْدَرًا لِلضَّوْءِ وَالحَيَاةِ ...",
    "morphFormula": "اسم ذات",
    "Semantics": [
      {
        "label": "شَمْس",
        "meaning": "الجِرْمُ المُنِيرُ في السَّمَاءِ.",
        "examples": [
          "قال المتنبي: \"وإذا غَضِبَتْ الشَّمْسُ أظْلَمَ نُورُهَا\""
        ],
        "references": [
          "ديوان المتنبي، شرح أبو البقاء العكبري، ج: 1، ص: 89."
        ],
        "translate": "Sun"
      }
    ]
  }
];

const verbsData = [
  {
    "text": "يوسخ",
    "origin": "و س خ",
    "morphFormula": "فَعَّلَ",
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
  },
  // --- Added from verbModel.json ---
  {
    "text": "ينظف",
    "origin": "ن ظ ف",
    "morphFormula": "فَعَّلَ",
    "diacritics": [
      {
        "word_with_diacritics": "نَظَّفَ",
        "phonetic_writing": "نَظْ ظَ فَ",
        "pronounciation": ""
      }
    ],
    "semantic_info": [
      {
        "semantic_fields": [],
        "meaning": {
          "text": "جعل الشيءَ نظيفًا بإزالة الأوساخ منه.",
          "image": {
            "url": "http://example.com/image_cleaning",
            "description": "عملية تنظيف",
            "source": "chat GPT"
          },
          "example": [
            {
              "text": "تقوم الأم بتنظيف الغرفة كل صباح.",
              "source": "الجزيرة"
            }
          ],
          "translation": "to clean"
        },
        "collocates": [
          {
            "collocate_text": "ينظف جيدًا",
            "meaning": "يُزيل الأوساخ بإتقان",
            "example": [
              {
                "text": "ينظف سيارته جيدًا كل أسبوع.",
                "source": "العربية"
              }
            ]
          }
        ],
        "completed": true,
        "index": 1
      }
    ],
    "__v": 0
  },
  {
    "text": "يرسم",
    "origin": "ر س م",
    "morphFormula": "فَعَلَ",
    "diacritics": [
      {
        "word_with_diacritics": "رَسَمَ",
        "phonetic_writing": "رَ سَ مَ",
        "pronounciation": ""
      }
    ],
    "semantic_info": [
      {
        "semantic_fields": [],
        "meaning": {
          "text": "يُنشِئُ صورةً أو شكلاً باستخدام القلم أو الفرشاة.",
          "image": {
            "url": "http://example.com/image_drawing",
            "description": "رسمة فنية",
            "source": "chat GPT"
          },
          "example": [
            {
              "text": "يرسم الطفل مشهدًا طبيعيًا في كراسته.",
              "source": "الشرق"
            }
          ],
          "translation": "to draw"
        },
        "collocates": [
          {
            "collocate_text": "يرسم بدقة",
            "meaning": "ينشئ رسومات بتفصيل واضح",
            "example": [
              {
                "text": "يرسم المهندس مخطط المنزل بدقة.",
                "source": "العربية"
              }
            ]
          }
        ],
        "completed": true,
        "index": 1
      }
    ],
    "__v": 0
  }
];
// Import image
import advancedSearchImg from "../../assets/images/advanced-search-img.jpg";

function Page() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWordsRows, setFilteredWordsRows] = useState([]);
  const [filteredVerbsRows, setFilteredVerbsRows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle search
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setHasSearched(true);
    
    // Filter words data
    const matchedWords = wordsData.filter(word => 
      word.text.includes(searchValue)
    );
    
    // Filter verbs data
    const matchedVerbs = verbsData.filter(verb => 
      verb.text.includes(searchValue)
    );
    
    // Prepare data for words table
    setFilteredWordsRows(matchedWords.map((word, index) => ({
      id: index + 1,
      text: word.text,
      kind: word.Kind,
      origin: word.origin,
      morphFormula: word.morphFormula,
      meaning: word.Semantics[0]?.meaning || "",
    })));
    
    // Prepare data for verbs table
    setFilteredVerbsRows(matchedVerbs.map((verb, index) => ({
      id: index + 1,
      text: verb.text,
      kind: verb.Kind || "فعل",
      origin: verb.origin || "",
      morphFormula: verb.morphFormula || "",
      tense: verb.tense || "",
      meaning: verb.Semantics?.[0]?.meaning || verb.semantic_info?.[0]?.meaning?.text || "",
    })));
    
    // Switch to appropriate tab based on results
    if (matchedWords.length > 0 && matchedVerbs.length === 0) {
      setTabValue(0); // Switch to words tab
    } else if (matchedWords.length === 0 && matchedVerbs.length > 0) {
      setTabValue(1); // Switch to verbs tab
    }
  };


  // Define columns for words table
  const wordsColumns = [
    { field: "text", headerName: "الكلمة", flex: 1,
      renderCell: (params) => (
        <div style={{ color: "#004f3f", fontWeight: "bold" }}>
          {params.value}
        </div>
      ),
    },
    { field: "kind", headerName: "النوع", flex: 1 },
    { field: "origin", headerName: "الجذر", flex: 1 },
    { field: "morphFormula", headerName: "الصيغة الصرفية", flex: 1 },
    { field: "meaning", headerName: "المعنى", flex: 2 },
  ];

  // Define columns for verbs table
  const verbsColumns = [
    { field: "text", headerName: "الفعل", flex: 1,
      renderCell: (params) => (
        <div style={{ color: "#004f3f", fontWeight: "bold" }}>
          {params.value}
        </div>
      ),
    },
    { field: "kind", headerName: "النوع", flex: 1 },
    { field: "origin", headerName: "الجذر", flex: 1 },
    { field: "morphFormula", headerName: "الصيغة الصرفية", flex: 1 },
    { field: "meaning", headerName: "المعنى", flex: 2 },
  ];

  // Initial state for tables
  const initialState = {
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
    density: 'standard',
    sorting: {
      sortModel: [{ field: 'text', sort: 'asc' }],
    },
  };

  return (
    <div>
      <Container fixed sx={{ mt: 3, mb: 10 }} component={"main"} maxWidth="xl">
        <Navigation pageTitle="البحث المتقدم" />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={13}
          mb={8}
          width="90%"
        >
          <Stack spacing={10}>
            <p className="text-3xl font-bold mb-12">
              تتيح هذه الأداة البحث عن الجذور اللغوية وخصائص الكلمات، مما يساعد في
              تحليل البنية الصرفية والدلالية للكلمات العربية
            </p>
            <Typography variant="h5">
              تتيح أداة البحث المتقدم للمستخدم استكشاف الجذور والمعاني والخصائص النحوية للكلمات العربية بسهولة ودقة. تدعم الأداة الباحثين والمهتمين باللغة في إجراء تحليلات لغوية معمقة والوصول إلى معلومات صرفية ودلالية متقدمة.
            </Typography>
            <SearchBar onSearch={handleSearch} placeholder="ابحث عن كلمة أو فعل..." />
          </Stack>

          <Box sx={{ width: { lg: '80%', xs: '100%' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src={advancedSearchImg} 
              alt="Advanced Search" 
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', maxWidth: 400 }} 
              priority
            />
          </Box>
        </Stack>

        {/* Table Section */}
        {hasSearched && (
          <Box sx={{ width: '100%', mb: 10 }}>
            <Typography variant="h4" fontWeight="700" color="#004F3F" textAlign="center" mb={4}>
              نتائج البحث {searchTerm && <span>لـ "{searchTerm}"</span>}
            </Typography>
            
            {filteredWordsRows.length === 0 && filteredVerbsRows.length === 0 ? (
              <Typography variant="h5" textAlign="center" color="#666">
                لا توجد نتائج مطابقة لبحثك. يرجى المحاولة بكلمات أخرى.
              </Typography>
            ) : (
              <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label={`الأسماء (${filteredWordsRows.length})`} disabled={filteredWordsRows.length === 0} />
                    <Tab label={`الأفعال (${filteredVerbsRows.length})`} disabled={filteredVerbsRows.length === 0} />
                  </Tabs>
                </Box>
                
                {tabValue === 0 && filteredWordsRows.length > 0 && (
                  <Box sx={{ p: 2, mt: 2, bgcolor: '#ffffff', borderRadius: '8px' }}>
                    <DataTable 
                      rows={filteredWordsRows} 
                      columns={wordsColumns} 
                      initialState={initialState}
                      style={{
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        border: 0,
                        borderRadius: "8px",
                        fontSize: "20px",
                        textAlign: "center",
                        "& .MuiDataGrid-cell": {
                          justifyContent: "start",
                          alignItems: "center",
                        },
                        "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitleContainerContent .MuiDataGrid-columnHeaderTitle": {
                          fontWeight: "500",
                          fontSize: "24px",
                        },
                      }}
                    />
                  </Box>
                )}
                
                {tabValue === 1 && filteredVerbsRows.length > 0 && (
                  <Box sx={{ p: 2, mt: 2, bgcolor: '#ffffff', borderRadius: '8px' }}>
                    <DataTable 
                      rows={filteredVerbsRows} 
                      columns={verbsColumns} 
                      initialState={initialState}
                      style={{
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        border: 0,
                        borderRadius: "8px",
                        fontSize: "20px",
                        textAlign: "center",
                        "& .MuiDataGrid-cell": {
                          justifyContent: "start",
                          alignItems: "center",
                        },
                        "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitleContainerContent .MuiDataGrid-columnHeaderTitle": {
                          fontWeight: "500",
                          fontSize: "24px",
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Page;


