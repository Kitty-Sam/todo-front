import { put } from '@redux-saga/core/effects';
import { setAppStatus, setDeals } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { AddDeal } from '~/store/sagas/sagasActions/actions/addDeal';
import axios from 'axios';

export function* addDealWorker({ payload }: AddDeal) {
    const { title } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.post(
            'http://localhost:4000/user/create-deal',
            { title },
            { withCredentials: true },
        );

        yield put(setDeals({ deals: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setDeals({ deals: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
