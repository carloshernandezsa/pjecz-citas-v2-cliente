import { types } from "../types/types";

const initialState = {
    
    distrito_id: 0,
    distrito: '',
    oficina_id: 0,
    oficina: '',
    servicio_id: 0,
    servicio: '',
    expedientes: [],
    fecha_id: 0,
    fecha: '',
    hora_id: 0,
    hora: '',
    nota:'',
    cit_cita_id: 0,

}

export const citasReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.SET_PASO_0:
            return {
                ...state,
                ...action.payload
            }
        case types.SET_PASO_1:
            return {
                ...state,
                ...action.payload
            }   
        case types.SET_PASO_2:
            return{
                ...state,
                ...action.payload
            }    
        case types.SET_PASO_3:
            return {
                ...state,
                ...action.payload
            }
        case types.DELETE_ITEM:
            return{
                ...state,
                initialState : state.initialState.filter(element => element.cit_cita_id !== action.payload.cit_cita_id )
            }
        default:
            return state;
    }
    
}


    
    