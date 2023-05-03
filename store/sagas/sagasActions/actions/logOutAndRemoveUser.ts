import { LOGOUT_AND_REMOVE_USER } from '~/store/sagas/sagasActions/type';

export const logOutAndRemoveAction = () => ({
    type: LOGOUT_AND_REMOVE_USER,
});

export type LogOutAndRemoveUser = {
    type: typeof LOGOUT_AND_REMOVE_USER;
};
