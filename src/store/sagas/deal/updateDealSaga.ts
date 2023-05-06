import { put } from '@redux-saga/core/effects';
import { setAppStatus, setDeals } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { UpdateDeal } from '~/store/sagas/sagasActions/actions/updateDeal';
import axios from 'axios';

export function* updateDealWorker({ payload }: UpdateDeal) {
    const { newTitle, id } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.put(
            'http://localhost:4000/user/update-deal',
            { newTitle, id },
            { withCredentials: true },
        );

        yield put(setDeals({ deals: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
