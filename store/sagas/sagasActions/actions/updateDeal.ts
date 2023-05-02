import { UPDATE_DEAL } from '~/store/sagas/sagasActions/type';

export interface updateDealPayloadType {
    newTitle: string;
    oldTitle: string;
}

export const updateDealAction = (payload: updateDealPayloadType) => ({
    type: UPDATE_DEAL,
    payload,
});

export type UpdateDeal = {
    type: typeof UPDATE_DEAL;
    payload: updateDealPayloadType;
};
