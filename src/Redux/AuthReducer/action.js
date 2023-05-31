import * as types from "./actionTypes";

const getUserDataRequest = () => {

    return {
        type : types.USER_lOGIN_REQUEST
    }
}



const getUserDataSuccess = (payload) => {

    return {
        type : types.USER_lOGIN_SUCCESS,
        payload
    }
}



const getUserDataFailure = () => {

    return {
        type : types.USER_lOGIN_FAILURE
    }
}

export { getUserDataRequest, getUserDataSuccess, getUserDataFailure }