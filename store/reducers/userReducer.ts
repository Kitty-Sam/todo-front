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
    openedFriend: IUser;
}

const initialState: IUserInitState = {
    allUsers: [],
    deals: [],
    friends: [],
    openedFriend: {} as IUser,
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
        case UserActions.FETCH_OPENED_FRIEND: {
            return { ...state, openedFriend: action.payload.openedFriend };
        }
        default:
            return state;
    }
};
