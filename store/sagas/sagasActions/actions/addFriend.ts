import { ADD_FRIEND } from '~/store/sagas/sagasActions/type';

export interface addFriendPayloadType {
    email: string;
}

export const addFriendAction = (payload: addFriendPayloadType) => ({
    type: ADD_FRIEND,
    payload,
});

export type AddFriend = {
    type: typeof ADD_FRIEND;
    payload: addFriendPayloadType;
};
