import { FETCH_DEALS } from '~/store/sagas/sagasActions/type';

export const fetchDealsAction = (): FetchDealsActionType => ({
    type: FETCH_DEALS,
});

export type FetchDealsActionType = {
    type: typeof FETCH_DEALS;
};
