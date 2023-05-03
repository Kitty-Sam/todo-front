import { OPENED_FRIEND } from '~/store/sagas/sagasActions/type';

export interface openedFriendPayloadType {
    id: string;
}

export const openedFriendAction = (payload: openedFriendPayloadType) => ({
    type: OPENED_FRIEND,
    payload,
});

export type OpenedFriend = {
    type: typeof OPENED_FRIEND;
    payload: openedFriendPayloadType;
};
