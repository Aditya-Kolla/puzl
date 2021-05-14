export const doesSameQuestionExists = (newQuestion, questions) =>
  questions.find((question) => question.question === newQuestion) !== undefined;

export const isQuestionValid = (newQuestion) => newQuestion.trim() !== "";

export const isOptionValid = (option) => option.trim() !== "";

export const doesSameOptionExists = (newOption, options) =>
  options.find((option) => option === newOption) !== undefined;

export const doesCorrectOptionExists = (correctOption, options) =>
  options.find((option) => option === correctOption) !== undefined;
