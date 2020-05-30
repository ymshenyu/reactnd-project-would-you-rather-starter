import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA'

export const getInitialData = () => {
    return Promise.all([_getQuestions(), _getUsers()])
        .then(([questions, users]) => ({
            users,
            questions
        }))
}

export const saveQuestion = question => {
    return _saveQuestion(question)
}

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
}