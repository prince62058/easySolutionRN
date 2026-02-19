import { DEFAULT_ADDRESS } from "../types";


export const DefaultAddress = (address) => dispatch => {
    dispatch({
      type: DEFAULT_ADDRESS,
      payload: address,
    });
  };