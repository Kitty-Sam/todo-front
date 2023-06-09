import { AppStoreType } from '~/store/reducers/rootReducer';

export const getCurrentUser = (state: AppStoreType) => state.auth.currentUser;
export const getAllUsers = (state: AppStoreType) => state.user.allUsers;
export const getFriends = (state: AppStoreType) => state.user.friends;
export const getDeals = (state: AppStoreType) => state.user.deals;
export const getIsLogged = (state: AppStoreType) => state.auth.isLogged;
