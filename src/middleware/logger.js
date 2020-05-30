export const logger = ({ getState }) => (next) => (action) => {
    console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', getState())
    console.groupEnd()
    return returnValue
}