// Mock quiz data for each chapter
// Her chapter için quiz'ler - her 4-6 sayfa aralığında bir quiz
export const QUIZ_DATA = {
  // Chapter 0: Introduction to Statistics (25 pages)
  0: [
    {
      id: 'ch0_q1',
      triggerAfterPage: 4, // 5. sayfadan sonra göster (0-indexed)
      question: "İstatistiğin temel amacı nedir?",
      answers: [
        "Sadece sayıları toplamak ve çıkarmak",
        "Veriyi analiz ederek anlamlı bilgi çıkarmak",
        "Matematiksel formüller oluşturmak",
        "Grafik çizmek"
      ],
      correctAnswer: 1,
      referencePageIndex: 2, // Yanlış cevaplarda 3. sayfaya yönlendir
      pageRange: "1-5",
      explanation: "İstatistik, veriyi analiz ederek anlamlı bilgi çıkarmayı amaçlar. Detaylar için ilgili sayfayı inceleyin."
    },
    {
      id: 'ch0_q2',
      triggerAfterPage: 10,
      question: "Olasılık teorisi (Probability Theory) neyle ilgilenir?",
      answers: [
        "Kesin sonuçları hesaplamak",
        "Belirsizliği ölçmek ve modellemek",
        "Sadece zar atmak",
        "Geçmiş verileri kaydetmek"
      ],
      correctAnswer: 1,
      referencePageIndex: 8,
      pageRange: "6-11",
      explanation: "Olasılık teorisi belirsizliği matematiksel olarak modeller. Daha fazla bilgi için sayfayı kontrol edin."
    },
    {
      id: 'ch0_q3',
      triggerAfterPage: 16,
      question: "İstatistiksel düşünmenin ilk adımı nedir?",
      answers: [
        "Sonuçları tahmin etmek",
        "Veri toplamak ve gözlemlemek",
        "Grafik çizmek",
        "Rapor yazmak"
      ],
      correctAnswer: 1,
      referencePageIndex: 14,
      pageRange: "12-17",
      explanation: "İstatistiksel düşünme veri toplama ve gözlemle başlar."
    },
    {
      id: 'ch0_q4',
      triggerAfterPage: 22,
      question: "Veri analizi sürecinde hangi adım en önemlidir?",
      answers: [
        "En güzel grafiği çizmek",
        "Doğru soruyu sormak",
        "En karmaşık formülü kullanmak",
        "Hızlı sonuç almak"
      ],
      correctAnswer: 1,
      referencePageIndex: 20,
      pageRange: "18-23",
      explanation: "Doğru soruyu sormak, etkili veri analizi için kritiktir."
    }
  ],

  // Chapter 1: Descriptive Statistics (32 pages)
  1: [
    {
      id: 'ch1_q1',
      triggerAfterPage: 5,
      question: "Ortalama (mean) nasıl hesaplanır?",
      answers: [
        "En büyük ve en küçük değerin toplamı",
        "Tüm değerlerin toplamının eleman sayısına bölümü",
        "En sık görülen değer",
        "Ortadaki değer"
      ],
      correctAnswer: 1,
      referencePageIndex: 3,
      pageRange: "1-6",
      explanation: "Ortalama, tüm değerlerin toplamının eleman sayısına bölünmesiyle bulunur."
    },
    {
      id: 'ch1_q2',
      triggerAfterPage: 11,
      question: "Medyan (median) nedir?",
      answers: [
        "En büyük değer",
        "Sıralanmış verideki ortadaki değer",
        "En sık tekrar eden değer",
        "Değerlerin ortalaması"
      ],
      correctAnswer: 1,
      referencePageIndex: 9,
      pageRange: "7-12",
      explanation: "Medyan, sıralanmış bir veri setinin tam ortasındaki değerdir."
    },
    {
      id: 'ch1_q3',
      triggerAfterPage: 18,
      question: "Standart sapma (standard deviation) neyi ölçer?",
      answers: [
        "Verilerin ortalamadan ne kadar uzaklaştığını",
        "En büyük değeri",
        "Veri sayısını",
        "Ortalamanın karesini"
      ],
      correctAnswer: 0,
      referencePageIndex: 16,
      pageRange: "13-19",
      explanation: "Standart sapma, verilerin ortalamadan ne kadar yayıldığını gösterir."
    },
    {
      id: 'ch1_q4',
      triggerAfterPage: 25,
      question: "Varyans (variance) ile standart sapma arasındaki ilişki nedir?",
      answers: [
        "Aynı şeylerdir",
        "Standart sapma, varyansın kareköküdür",
        "Varyans, standart sapmanın iki katıdır",
        "İlişkileri yoktur"
      ],
      correctAnswer: 1,
      referencePageIndex: 23,
      pageRange: "20-26",
      explanation: "Standart sapma, varyansın karekökü alınarak bulunur."
    }
  ],

  // Chapter 2: Probability Theory (28 pages)
  2: [
    {
      id: 'ch2_q1',
      triggerAfterPage: 4,
      question: "Bir olayın olasılığı hangi aralıkta olabilir?",
      answers: [
        "-1 ile 1 arası",
        "0 ile 1 arası",
        "0 ile 100 arası",
        "Herhangi bir sayı"
      ],
      correctAnswer: 1,
      referencePageIndex: 2,
      pageRange: "1-5",
      explanation: "Olasılık değeri her zaman 0 ile 1 arasında olmalıdır."
    },
    {
      id: 'ch2_q2',
      triggerAfterPage: 10,
      question: "Bağımsız olaylar ne demektir?",
      answers: [
        "Hiçbir zaman gerçekleşmeyen olaylar",
        "Birinin sonucu diğerini etkilemeyen olaylar",
        "Aynı anda gerçekleşen olaylar",
        "Kesin sonucu olan olaylar"
      ],
      correctAnswer: 1,
      referencePageIndex: 8,
      pageRange: "6-11",
      explanation: "Bağımsız olaylarda bir olayın sonucu diğer olayı etkilemez."
    },
    {
      id: 'ch2_q3',
      triggerAfterPage: 17,
      question: "Koşullu olasılık (conditional probability) nedir?",
      answers: [
        "Rastgele bir olasılık",
        "Bir olay gerçekleştiğinde diğer olayın olasılığı",
        "İki olasılığın toplamı",
        "İmkansız bir durum"
      ],
      correctAnswer: 1,
      referencePageIndex: 15,
      pageRange: "12-18",
      explanation: "Koşullu olasılık, bir olay gerçekleştiğinde başka bir olayın gerçekleşme olasılığıdır."
    },
    {
      id: 'ch2_q4',
      triggerAfterPage: 24,
      question: "Bayes Teoremi neye yarar?",
      answers: [
        "Sadece zar problemlerini çözmek",
        "Ters olasılık hesaplamak",
        "Grafik çizmek",
        "Ortalama hesaplamak"
      ],
      correctAnswer: 1,
      referencePageIndex: 22,
      pageRange: "19-25",
      explanation: "Bayes Teoremi, ters olasılık hesaplamalarında kullanılır."
    }
  ],

  // Chapter 3: Random Variables (35 pages) - 5 quiz
  3: [
    {
      id: 'ch3_q1',
      triggerAfterPage: 5,
      question: "Rastgele değişken (random variable) nedir?",
      answers: [
        "Değişmeyen bir sayı",
        "Olası sonuçlara sayısal değer atayan fonksiyon",
        "Sadece tam sayılar",
        "Grafik üzerindeki bir nokta"
      ],
      correctAnswer: 1,
      referencePageIndex: 3,
      pageRange: "1-6",
      explanation: "Rastgele değişken, olası sonuçlara sayısal değerler atayan bir fonksiyondur."
    },
    {
      id: 'ch3_q2',
      triggerAfterPage: 11,
      question: "Kesikli (discrete) rastgele değişken örneği hangisidir?",
      answers: [
        "Sıcaklık ölçümü",
        "Zar atışı sonucu",
        "Boy uzunluğu",
        "Ağırlık"
      ],
      correctAnswer: 1,
      referencePageIndex: 9,
      pageRange: "7-12",
      explanation: "Zar atışı sayılabilir sonuçlar verdiği için kesikli değişkendir."
    },
    {
      id: 'ch3_q3',
      triggerAfterPage: 18,
      question: "Sürekli (continuous) rastgele değişken hangi değerleri alabilir?",
      answers: [
        "Sadece tam sayılar",
        "Belirli bir aralıktaki tüm reel sayılar",
        "Sadece pozitif sayılar",
        "Sadece 0 ve 1"
      ],
      correctAnswer: 1,
      referencePageIndex: 16,
      pageRange: "13-19",
      explanation: "Sürekli değişkenler bir aralıktaki tüm reel sayıları alabilir."
    },
    {
      id: 'ch3_q4',
      triggerAfterPage: 25,
      question: "Olasılık dağılımı (probability distribution) ne gösterir?",
      answers: [
        "Sadece ortalamaları",
        "Rastgele değişkenin alabileceği değerler ve olasılıkları",
        "En büyük değeri",
        "Veri sayısını"
      ],
      correctAnswer: 1,
      referencePageIndex: 23,
      pageRange: "20-26",
      explanation: "Olasılık dağılımı, değerlerin ve bu değerlerin olasılıklarının gösterimidir."
    },
    {
      id: 'ch3_q5',
      triggerAfterPage: 31,
      question: "Beklenen değer (expected value) nasıl yorumlanır?",
      answers: [
        "En sık çıkan değer",
        "Uzun vadeli ortalama",
        "En büyük olası değer",
        "Minimum değer"
      ],
      correctAnswer: 1,
      referencePageIndex: 29,
      pageRange: "27-32",
      explanation: "Beklenen değer, uzun vadeli ortalama olarak yorumlanır."
    }
  ],

  // Diğer chapter'lar için de benzer şekilde quiz'ler ekleyebilirsin
  // Şimdilik ilk 4 chapter'ı örnek olarak ekledim
  
  4: [], // Statistical Inference
  5: [], // Hypothesis Testing
  6: [], // Confidence Intervals
  7: [], // Regression Analysis
  8: [], // ANOVA and Chi-Square
  9: [], // Advanced Topics
};

// Helper function to get quiz for a specific page in a chapter
export const getQuizForPage = (chapterIndex, pageIndex) => {
  const chapterQuizzes = QUIZ_DATA[chapterIndex] || [];
  return chapterQuizzes.find(quiz => quiz.triggerAfterPage === pageIndex);
};
