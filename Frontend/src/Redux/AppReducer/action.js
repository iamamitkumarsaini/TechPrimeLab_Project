import axios from "axios";
import * as types from "./actionTypes";

const getProjectDataRequest = () => {

    return {
        type : types.GET_PROJECT_DATA_REQUEST
    }
}



const getProjectDataSuccess = (payload,totalCount) => {

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


const postProjectDataRequest = () => {

    return {
        type : types.POST_PROJECT_DATA_REQUEST
    }
}



const postProjectDataSuccess = (payload,totalCount) => {

    return {
        type : types.POST_PROJECT_DATA_SUCCESS,
        payload
    }
}



const postProjectDataFailure = () => {

    return {
        type : types.POST_PROJECT_DATA_FAILURE
    }
}

const getTotalCountSuccess = (payload) => {
    return{
        type : types.GET_TOTAL_COUNT,
        payload
    }
}



const patchProjectDataRequest = () => {

    return {
        type : types.PATCH_PROJECT_DATA_REQUEST
    }
}

const patchProjectDataSuccess = (payload,totalCount) => {

    return {
        type : types.PATCH_PROJECT_DATA_SUCCESS,
        payload
    }
}

const patchProjectDataFailure = () => {

    return {
        type : types.PATCH_PROJECT_DATA_FAILURE
    }
}



const getProjectStatsRequest = () => {

    return {
        type : types.GET_PROJECT_STATS_REQUEST
    }
}

const getProjectStatsSuccess = (payload,totalCount) => {

    return {
        type : types.GET_PROJECT_STATS_SUCCESS,
        payload
    }
}

const getProjectStatsFailure = () => {

    return {
        type : types.GET_PROJECT_STATS_FAILURE
    }
}



const getDepartmentStatsRequest = () => {

    return {
        type : types.GET_DEPARTMENT_STATS_REQUEST
    }
}

const getDepartmentStatsSuccess = (payload,totalCount) => {

    return {
        type : types.GET_DEPARTMENT_STATS_SUCCESS,
        payload
    }
}

const getDepartmentStatsFailure = () => {

    return {
        type : types.GET_DEPARTMENT_STATS_FAILURE
    }
}





function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options).replace(' ', '-');
}


const postProjectData = (payload) => (dispatch) => {

    dispatch(postProjectDataRequest());

    return axios.post(`https://successful-ruby-shoulder-pads.cyclic.app/add/project`,payload,{
        headers: {
          'Content-Type': 'application/json',
          authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
        
    })
    .then((res) => {
        console.log("Project Added",res.data);
        return dispatch(postProjectDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(postProjectDataFailure());
    })
}



const getProjectsData = (page,search,sort) => (dispatch) => {

    dispatch(getProjectDataRequest());

    return axios.get(`https://successful-ruby-shoulder-pads.cyclic.app/projects?page=${page}&sort=${sort}&search=${search}`,{
        headers: {
          'Content-Type': 'application/json',
          authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
        
    })
    .then((res) => {
        console.log("Get Projects", res.data);

        const formattedData = res.data.projects.map((elem) => {
            return {
                ...elem,
                start_date: formatDate(elem.start_date),
                end_date: formatDate(elem.end_date)
            }
        })

        dispatch(getProjectDataSuccess(formattedData));
        dispatch(getTotalCountSuccess(res.data.totalCount));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getProjectDataFailure())
    })

}


const updateProjectsData = (id,payload) => (dispatch) => {

    dispatch(patchProjectDataRequest());

    return axios.patch(`https://successful-ruby-shoulder-pads.cyclic.app/project/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((res) => {
        console.log("StatusUpdated", res.data);
        return dispatch(patchProjectDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(patchProjectDataFailure());
    })
}



const getProjectStats = () => (dispatch) => {

    dispatch(getProjectStatsRequest());

    return axios.get(`https://successful-ruby-shoulder-pads.cyclic.app/projects/stats`, {
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((res) => {
        console.log("Projects Stats",res.data);
        return dispatch(getProjectStatsSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getProjectStatsFailure())
    })
}


const getDepartmentStats = () => (dispatch) => {

    dispatch(getDepartmentStatsRequest());

    return axios.get(`https://successful-ruby-shoulder-pads.cyclic.app/projects/departments`, {
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then((res) => {
        console.log("Department Stats",res.data);
        return dispatch(getDepartmentStatsSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getDepartmentStatsFailure())
    })
}



export { postProjectData, getProjectsData, updateProjectsData, getProjectStats, getDepartmentStats }