import { CHECK_TOKEN } from '~/store/sagas/sagasActions/type';

export const checkTokenAction = () => ({
    type: CHECK_TOKEN,
});

export type CheckToken = {
    type: typeof CHECK_TOKEN;
};
