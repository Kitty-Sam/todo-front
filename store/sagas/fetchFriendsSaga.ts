import { put } from '@redux-saga/core/effects';
import { setAppStatus, setFriends } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';

export function* fetchFriendsWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/friends`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // @ts-ignore
        const data = yield res.json();

        yield put(setFriends({ friends: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        console.log(data);
    } catch (error: any) {
        console.warn(error);
        yield put(setFriends({ friends: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
