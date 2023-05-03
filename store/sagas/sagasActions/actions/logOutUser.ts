import { LOGOUT_USER } from '~/store/sagas/sagasActions/type';

export const logOutAction = () => ({
    type: LOGOUT_USER,
});

export type LogOutUser = {
    type: typeof LOGOUT_USER;
};
