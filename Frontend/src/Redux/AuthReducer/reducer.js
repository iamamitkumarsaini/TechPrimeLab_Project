import * as types from "./actionTypes";

const initState = {
    isLoading : false,
    isError : false,
    userData : []
};

export const reducer = (oldState = initState, action) => {

    const { type, payload } = action;

    switch(type){
        case types.USER_lOGIN_REQUEST:
            return {
                ...oldState,
                isLoading:true
            };

        case types.USER_lOGIN_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                userData:payload
            };
        
        case types.USER_lOGIN_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };
         
        default: 
            return oldState
    }
}