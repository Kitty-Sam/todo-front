import { ADD_DEAL } from '~/store/sagas/sagasActions/type';

export interface addDealPayloadType {
    title: string;
}

export const addDealAction = (payload: addDealPayloadType) => ({
    type: ADD_DEAL,
    payload,
});

export type AddDeal = {
    type: typeof ADD_DEAL;
    payload: addDealPayloadType;
};
