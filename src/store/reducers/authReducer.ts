import { ActionsType } from './types';
import { AuthActions } from '../actions/actionsTypes';
import { IUser } from '~/store/reducers/userReducer';

export interface IAuthInitState {
    isLogged: boolean;
    currentUser: IUser;
}

const initialState: IAuthInitState = {
    isLogged: false,
    currentUser: {} as IUser,
};

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case AuthActions.IS_LOGGED: {
            return { ...state, isLogged: action.payload.isLogged };
        }
        case AuthActions.SET_CURRENT_USER: {
            return { ...state, currentUser: action.payload.currentUser };
        }
        default:
            return state;
    }
};
