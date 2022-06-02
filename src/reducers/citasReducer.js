import { types } from "../types/types";

const initialState = {
    
    distrito_id: 0,
    distrito: '',
    oficina_id: 0,
    oficina: '',
    servicio_id: 0,
    servicio: '',
    expedientes: []

}

export const citasReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.SET_PASO_0:
            return {
                ...state,
                ...action.payload
            }          
        default:
            return state;
    }
    
}


    
    