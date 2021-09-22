import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest, axiosRequestHeaders } from '../api/axiosRequest';


export const getReclamaciones = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-aclaraciones', 'GET', {},query)
      .then(response => {
        dispatch({
          type: types.GET_SOLICITUD_RECLAMACION,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_SOLICITUD_RECLAMACION,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const getObtenerCatalogos = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-catalogos', 'GET', {},query)
      .then(response => {
        dispatch({
          type: types.GET_OBTENER_CATALOGOS,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_OBTENER_CATALOGOS,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};
