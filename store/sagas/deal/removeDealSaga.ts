import { put } from '@redux-saga/core/effects';
import { setAppStatus, setDeals } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RemoveDeal } from '~/store/sagas/sagasActions/actions/removeDeal';

export function* removeDealWorker({ payload }: RemoveDeal) {
    const { id } = payload;
    console.log('payload from remove', id);
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));
        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/remove-deal`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        // @ts-ignore
        const data = yield res.json();

        console.log('data from remove', data);

        yield put(setDeals({ deals: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        console.log(data);
    } catch (error: any) {
        console.warn(error);
        yield put(setDeals({ deals: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
