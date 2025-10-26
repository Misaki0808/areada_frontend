// Mock quiz data for each chapter
// Her chapter için quiz'ler - her sayfa sonrasında bir quiz
export const QUIZ_DATA = {
  // Chapter 1: "Avoiding Bad Data in Customer Conversations" - 3 sayfa, 3 quiz
  1: [
    {
      id: 'ch1_q1',
      triggerAfterPage: 0, // İlk sayfadan sonra
      question: "What is the primary cause of inaccurate customer conversation outcomes?",
      type: 'input',
      pageRange: "1",
      feedback: "Partially Correct. You mentioned the risk of false positives, but missed the key point about bad data giving false negatives and the importance of avoiding it."
    },
    {
      id: 'ch1_q2',
      triggerAfterPage: 1, // İkinci sayfadan sonra
      question: "What are the three types of bad data that can occur in conversations?",
      type: 'input',
      pageRange: "2",
      feedback: "Partially Correct. The student's answer identifies specific types of bad data, but they do not match the types mentioned in the Ground Truth Text (compliments, fluff, and ideas).",
      hasLookup: true, // Bu soru için lookup seçeneği var
      lookupText: "Compliments, fluff (generics, hypotheticals, and the future), and ideas. Sometimes we invite the bad data ourselves by asking the wrong questions."
    },
    {
      id: 'ch1_q3',
      triggerAfterPage: 2, // Üçüncü sayfadan sonra
      question: "How can you effectively turn a generic claim into a specific, actionable conversation?",
      type: 'input',
      pageRange: "3",
      feedback: "Totally correct. Your answer effectively highlights the importance of anchoring the conversation to specifics in the customer's past by directly stating the strategy of asking concrete questions to gather real data."
    }
  ],

  // Diğer chapter'lar şimdilik boş
  0: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
};

// Helper function to get quiz for a specific page in a chapter
export const getQuizForPage = (chapterIndex, pageIndex) => {
  const chapterQuizzes = QUIZ_DATA[chapterIndex] || [];
  return chapterQuizzes.find(quiz => quiz.triggerAfterPage === pageIndex);
};
