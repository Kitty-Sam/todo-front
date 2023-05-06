//app

import {
    SetAllUsersPayload,
    SetAppErrorPayload,
    SetAppStatusPayload,
    SetCurrentUserPayload,
    SetDealsPayload,
    SetFriendsPayload,
    SetIsLoggedPayload,
    SetOpenedFriendPayload,
} from '../reducers/types';
import { AppActions, AuthActions, UserActions } from './actionsTypes';

export const setAppStatus = (payload: SetAppStatusPayload) => ({
    type: AppActions.APP_SET_STATUS,
    payload,
});

export const setAppErrorStatus = (payload: SetAppErrorPayload) => ({
    type: AppActions.APP_SET_ERROR,
    payload,
});

//auth
export const setIsLogged = (payload: SetIsLoggedPayload) => ({
    type: AuthActions.IS_LOGGED,
    payload,
});

export const setCurrentUser = (payload: SetCurrentUserPayload) => ({
    type: AuthActions.SET_CURRENT_USER,
    payload,
});

//users

export const setAllUsers = (payload: SetAllUsersPayload) => ({
    type: UserActions.FETCH_ALL_USERS,
    payload,
});

export const setFriends = (payload: SetFriendsPayload) => ({
    type: UserActions.FETCH_FRIENDS,
    payload,
});

export const setDeals = (payload: SetDealsPayload) => ({
    type: UserActions.FETCH_DEALS,
    payload,
});

export const setOpenedFriend = (payload: SetOpenedFriendPayload) => ({
    type: UserActions.FETCH_OPENED_FRIEND,
    payload,
});
