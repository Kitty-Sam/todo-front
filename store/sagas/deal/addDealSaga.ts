import { put } from '@redux-saga/core/effects';
import { setAppStatus, setDeals } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { AddDeal } from '~/store/sagas/sagasActions/actions/addDeal';

export function* addDealWorker({ payload }: AddDeal) {
    const { title } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));
        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/create-deal`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        const data: string[] = yield res.json();
        yield put(setDeals({ deals: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        console.log(data);
    } catch (error: any) {
        console.warn(error);
        yield put(setDeals({ deals: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
