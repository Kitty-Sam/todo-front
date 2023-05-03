//App
import { RequestStatus } from './appReducer';
import { AppActions, AuthActions, UserActions } from '../actions/actionsTypes';
import { IUser } from '~/store/reducers/authReducer';

export interface IApp {
    error: boolean;
    status: RequestStatus;
}

export interface SetAppStatusPayload {
    status: RequestStatus;
}

export interface SetAppErrorPayload {
    error: boolean;
}

export type SetAppStatus = {
    type: typeof AppActions.APP_SET_STATUS;
    payload: SetAppStatusPayload;
};

export type SetAppError = {
    type: typeof AppActions.APP_SET_ERROR;
    payload: SetAppErrorPayload;
};

//Auth
export interface SetIsLoggedPayload {
    isLogged: boolean;
}

export interface SetCurrentUserPayload {
    currentUser: IUser;
}

export type SetIsLogged = {
    type: typeof AuthActions.IS_LOGGED;
    payload: SetIsLoggedPayload;
};

export type SetCurrentUser = {
    type: typeof AuthActions.SET_CURRENT_USER;
    payload: SetCurrentUserPayload;
};

//Users
export interface SetAllUsersPayload {
    allUsers: IUser[];
}

export interface SetFriendsPayload {
    friends: string[];
}

export interface SetDealsPayload {
    deals: string[];
}

export interface SetOpenedFriendPayload {
    openedFriend: IUser;
}

export type SetAllUsers = {
    type: typeof UserActions.FETCH_ALL_USERS;
    payload: SetAllUsersPayload;
};

export type SetFriends = {
    type: typeof UserActions.FETCH_FRIENDS;
    payload: SetFriendsPayload;
};

export type SetDeals = {
    type: typeof UserActions.FETCH_DEALS;
    payload: SetDealsPayload;
};

export type SetOpenedFriend = {
    type: typeof UserActions.FETCH_OPENED_FRIEND;
    payload: SetOpenedFriendPayload;
};

export type ActionsType =
    | SetOpenedFriend
    | SetAppError
    | SetAppStatus
    | SetIsLogged
    | SetCurrentUser
    | SetAllUsers
    | SetFriends
    | SetDeals;
