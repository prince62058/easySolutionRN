import {  GET_CHAT_MSG, } from '../types';

const initialState = {
    getMsgData: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
   
                    case GET_CHAT_MSG:
                        return {
                            ...state,
                            getMsgData: action.payload,
                        };
    

        default:
            return state;
    }
};
