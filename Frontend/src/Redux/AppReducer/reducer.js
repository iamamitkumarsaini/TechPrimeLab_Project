import * as types from "./actionTypes";

const initState = {
    isLoading : false,
    isError : false,
    projects : []
};

export const reducer = (oldState = initState, action) => {

    const { type, payload } = action;

    switch(type){
        case types.GET_PROJECT_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true
            };

        case types.GET_PROJECT_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                userData:payload
            };
        
        case types.GET_PROJECT_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };
         
        default: 
            return oldState
    }
}