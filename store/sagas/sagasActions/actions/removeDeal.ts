import { REMOVE_DEAL } from '~/store/sagas/sagasActions/type';

export interface removeDealPayloadType {
    title: string;
}

export const removeDealAction = (payload: removeDealPayloadType) => ({
    type: REMOVE_DEAL,
    payload,
});

export type RemoveDeal = {
    type: typeof REMOVE_DEAL;
    payload: removeDealPayloadType;
};
