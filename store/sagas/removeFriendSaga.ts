import { put } from '@redux-saga/core/effects';
import { setAppStatus, setFriends } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RemoveFriend } from '~/store/sagas/sagasActions/actions/removeFriend';

export function* removeFriendWorker({ payload }: RemoveFriend) {
    const { email } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));
        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/remove-friend`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
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
