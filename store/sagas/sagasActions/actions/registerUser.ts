import { REGISTER_USER } from '~/store/sagas/sagasActions/type';

export interface RegisterUserPayloadType {
    email: string;
    name: string;
    password: string;
    toast: any;
}

export const registerAction = (payload: RegisterUserPayloadType) => ({
    type: REGISTER_USER,
    payload,
});

export type RegisterUser = {
    type: typeof REGISTER_USER;
    payload: RegisterUserPayloadType;
};
