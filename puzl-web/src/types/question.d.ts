export interface QuestionSet {
    id: string
    name: string
    questions: Question[]
}

export interface Question {
    id: string
    text: string
    options: Option[]
    correctOption: Option
}

export interface Option {
    id: string
    value: string
}

export interface AddQuestionProps {
    addQuestion: (question: Question) => boolean
}
