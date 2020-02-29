import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_DATA
} from '../types';
import axios from 'axios';
// import { NotificationManager } from 'react-notifications';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/login', userData)
        .then((res) => {
            if (res.data.error) {
                dispatch({
                    type: SET_ERRORS,
                    payload: res.data
                });
                // NotificationManager.error(res.data.error, 'Successful!', 2000);
            } else {
                setAuthorizationHeader(res.data.token);
                dispatch({type: SET_AUTHENTICATED})
                axios.defaults.headers.common['AUTH-TOKEN'] = localStorage.getItem("AUTH-TOKEN");
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                // NotificationManager.success('Logged In', 'Successful!', 2000);
                window.location.href="/";
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            // NotificationManager.error(err.response.data, 'Successful!', 2000);
        });

};

const setAuthorizationHeader = (token) => {
    localStorage.setItem('AUTH-TOKEN', token);
    axios.defaults.headers.common['Authorization'] = token;
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user/getUser')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};


// add reward Points
export const updateRewardPoint = (pointData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.patch('/user/add/rewardPoints',pointData).then(res => {
        // dispatch({
        //     type: SET_POINTS,
        //     payload: res.data
        // });
        

        dispatch(getUserData());

        console.log(res.data);
    }).catch(err => console.error(err));
};


// add reward Points
export const rechargeCard = (hashData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.post('/payment/addCurrency',hashData).then(res => {
        console.log("console.error(err)ayoi");
        if(res.error){

        }else{
            dispatch(getUserData());
            // 
        }
        
        

        console.log(res.data);
    }).catch(err => {
        console.error(err);
        console.log("kjashkjfakjbkajdbf");
        
    });
};




export const logoutUser = () => (dispatch) => {
    console.log("logout"); 
    localStorage.removeItem('AUTH-TOKEN');
    delete axios.defaults.headers.common['AUTH-TOKEN'];
    dispatch({ type: SET_UNAUTHENTICATED });
};