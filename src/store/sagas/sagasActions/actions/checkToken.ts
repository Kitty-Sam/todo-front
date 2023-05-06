import { AUTH_ME } from '~/store/sagas/sagasActions/type';

export const checkTokenAction = () => ({
    type: AUTH_ME,
});

export type CheckToken = {
    type: typeof AUTH_ME;
};
