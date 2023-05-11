import { LOGIN_USER } from '~/store/sagas/sagasActions/type';

export interface LoginUserPayloadType {
    email: string;
    password: string;
}

export const loginAction = (payload: LoginUserPayloadType) => ({
    type: LOGIN_USER,
    payload,
});

export type LoginUser = {
    type: typeof LOGIN_USER;
    payload: LoginUserPayloadType;
};
