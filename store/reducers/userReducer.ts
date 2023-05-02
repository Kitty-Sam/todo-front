import { ActionsType } from './types';
import { UserActions } from '../actions/actionsTypes';

export interface IUser {
    id: string;
    name: string;
    email: string;
    deals: string[];
    friends: string[];
}

export interface IUserInitState {
    allUsers: IUser[];
    deals: string[];
    friends: string[];
}

const initialState: IUserInitState = {
    allUsers: [],
    deals: [],
    friends: [],
};

export const userReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case UserActions.FETCH_ALL_USERS: {
            return { ...state, allUsers: action.payload.allUsers };
        }
        case UserActions.FETCH_FRIENDS: {
            return { ...state, friends: action.payload.friends };
        }
        case UserActions.FETCH_DEALS: {
            return { ...state, deals: action.payload.deals };
        }
        default:
            return state;
    }
};
