import * as types from "./actionTypes";
import axios from "axios";

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


const postLoginUser = (payload) => (dispatch) => {

    dispatch(getUserDataRequest());

    return axios.post(`https://successful-ruby-shoulder-pads.cyclic.app/login`,payload)
    .then((res) => {
        console.log("userLogin",res.data);
        localStorage.setItem("token",JSON.stringify(res.data.token))
        return dispatch(getUserDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getUserDataFailure());
    })
    
}



export { postLoginUser }