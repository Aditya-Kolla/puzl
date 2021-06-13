export interface QuestionSet {
  name: string,
  questions: Question[]
};

export interface Question {
  text: string,
  options: Option[],
  correctOption: Option
};

export interface Option {
  id: string,
  value: string
};