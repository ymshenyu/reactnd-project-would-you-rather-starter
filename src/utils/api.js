import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA'

const getInitialData = () => {
    return Promise.all([_getQuestions(), _getUsers()])
        .then(([questions, users]) => ({
            users,
            questions
        }))
}

export default getInitialData