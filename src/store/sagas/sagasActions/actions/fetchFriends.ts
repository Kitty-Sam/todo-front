import { FETCH_FRIENDS } from '~/store/sagas/sagasActions/type';

export const fetchFriendsAction = (): FetchFriendsActionType => ({
    type: FETCH_FRIENDS,
});

export type FetchFriendsActionType = {
    type: typeof FETCH_FRIENDS;
};
