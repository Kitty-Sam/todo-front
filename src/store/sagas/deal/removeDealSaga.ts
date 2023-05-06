import { put } from '@redux-saga/core/effects';
import { setAppStatus, setDeals } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RemoveDeal } from '~/store/sagas/sagasActions/actions/removeDeal';
import axios from 'axios';

export function* removeDealWorker({ payload }: RemoveDeal) {
    const { id } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const { data } = yield axios.delete('http://localhost:4000/user/remove-deal', {
            data: { id },
            withCredentials: true,
        });

        yield put(setDeals({ deals: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
