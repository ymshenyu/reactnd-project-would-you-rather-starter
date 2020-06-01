import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { saveQuestionAnswer } from '../utils/api'

export const handleInitialData = () => {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(null))
            })
    }
}

export const SAVE_ANSWER = 'SAVE_ANSWER'

const saveAnswer = (authedUser, qid, answer) => {
    return ({
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    })
}

export const handleSaveAnswer = (qid, answer) => {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => {
                dispatch(saveAnswer(authedUser, qid, answer))
            })
    }
}