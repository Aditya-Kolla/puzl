export interface QuestionSet {
    name: string
    questions: PuzlQuestion[]
}

export interface PuzlQuestion {
    question: string
    options: Option[]
    correctOption: Option
}

export interface Option {
    id: string
    value: string
}
