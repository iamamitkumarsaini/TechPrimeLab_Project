import * as types from "./actionTypes";

const initState = {
    isLoading : false,
    isError : false,
    projects : [],
    postProject: [],
    totalCount: 0,
    updatedProject:[],
    projectStats: [],
    departmentStats: []
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
                projects:payload,
            };
        
        case types.GET_PROJECT_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };


        case types.POST_PROJECT_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true
            };

        case types.POST_PROJECT_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                postProject:payload
            };
        
        case types.POST_PROJECT_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };

        case types.GET_TOTAL_COUNT :
            return {
                ...oldState,
                totalCount:payload
            }
            
        case types.PATCH_PROJECT_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.PATCH_PROJECT_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                updatedProject:payload
        };

        case types.PATCH_PROJECT_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };


        case types.GET_PROJECT_STATS_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.GET_PROJECT_STATS_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                projectStats:payload
        };

        case types.GET_PROJECT_STATS_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };

        case types.GET_DEPARTMENT_STATS_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.GET_DEPARTMENT_STATS_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                departmentStats:payload
        };

        case types.GET_DEPARTMENT_STATS_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };
         
        default: 
            return oldState
    }
}