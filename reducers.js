import * as types from './actionstypes';

const initialState = {
  reclamaciones: [],
  catalogo: [],
};

export const Reclamaciones = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if(action.type == types.GET_SOLICITUD_RECLAMACION){
    return Object.assign({}, state, {
      reclamaciones: action.payload
    });
  } else if(action.type == types.GET_OBTENER_CATALOGOS){
    return Object.assign({}, state, {
      catalogo: action.payload
    });
  }  else {
    return state;
  }
};

