import * as types from "./actionTypes";

const getProjectDataRequest = () => {

    return {
        type : types.GET_PROJECT_DATA_REQUEST
    }
}



const getProjectDataSuccess = (payload) => {

    return {
        type : types.GET_PROJECT_DATA_SUCCESS,
        payload
    }
}



const getProjectDataFailure = () => {

    return {
        type : types.GET_PROJECT_DATA_FAILURE
    }
}

export { getProjectDataRequest, getProjectDataSuccess, getProjectDataFailure }