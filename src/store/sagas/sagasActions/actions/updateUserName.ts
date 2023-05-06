import { UPDATE_USER } from '~/store/sagas/sagasActions/type';

export interface updateUserNamePayloadType {
    newName: string;
}

export const updateUserNameAction = (payload: updateUserNamePayloadType) => ({
    type: UPDATE_USER,
    payload,
});

export type UpdateUserName = {
    type: typeof UPDATE_USER;
    payload: updateUserNamePayloadType;
};
