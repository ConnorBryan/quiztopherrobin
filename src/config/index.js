export default {
  APP_TITLE: "Quiztopher Robin",
  QUESTION_COUNT: 10,
  QUESTION_DIFFICULTY: "hard",
  QUESTION_URL: (amount = 10, difficulty = "hard") => `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`
};
