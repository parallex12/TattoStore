import {
  COLOR_SCHEME,
  CREATE_AGENDA_POPUP,
  SELECTED_APPIONTMENT_DATE,
  GET_All_APPIONTMENT,
  EDIT_AGENDA_POPUP,
  GET_ALL_CLIENTS,
  GET_USER_DETAILS,
  GET_ALL_WORKERS,
  GET_ALL_PRODUCTS,
} from "../types/types";
const initialState = {
  color_scheme: null,
  create_agenda_popup: false,
  selected_appiontment_date: null,
  get_all_appiontments: null,
  edit_agenda_popup: null,
  get_all_clients: null,
  get_all_workers: null,
  get_all_products: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR_SCHEME:
      return {
        ...state,
        color_scheme: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        get_all_products: action.payload,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        get_all_clients: action.payload,
      };
    case GET_ALL_WORKERS:
      return {
        ...state,
        get_all_workers: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        get_user_details: action.payload,
      };
    case SELECTED_APPIONTMENT_DATE:
      return {
        ...state,
        selected_appiontment_date: action.payload,
      };
    case GET_All_APPIONTMENT:
      return {
        ...state,
        get_all_appiontments: action.payload,
      };
    case CREATE_AGENDA_POPUP:
      return {
        ...state,
        create_agenda_popup: action.payload,
      };
    case EDIT_AGENDA_POPUP:
      return {
        ...state,
        edit_agenda_popup: action.payload,
      };

    default:
      return state;
  }
};
export default mainReducer;
