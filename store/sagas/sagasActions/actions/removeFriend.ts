import { REMOVE_FRIEND } from '~/store/sagas/sagasActions/type';

export interface removeFriendPayloadType {
    email: string;
}

export const removeFriendAction = (payload: removeFriendPayloadType) => ({
    type: REMOVE_FRIEND,
    payload,
});

export type RemoveFriend = {
    type: typeof REMOVE_FRIEND;
    payload: removeFriendPayloadType;
};
