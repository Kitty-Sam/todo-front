import { FETCH_ALL_USERS } from '~/store/sagas/sagasActions/type';

export const fetchAllUsersAction = (): FetchAllUsersActionType => ({
    type: FETCH_ALL_USERS,
});

export type FetchAllUsersActionType = {
    type: typeof FETCH_ALL_USERS;
};
