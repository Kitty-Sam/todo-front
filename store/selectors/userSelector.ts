import { AppStoreType } from '~/store/reducers/rootReducer';

export const getCurrentUser = (state: AppStoreType) => state.auth.currentUser.email;
export const getToken = (state: AppStoreType) => state.auth.token;
export const getAllUsers = (state: AppStoreType) => state.user.allUsers;
export const getFriends = (state: AppStoreType) => state.user.friends;
export const getDeals = (state: AppStoreType) => state.user.deals;
