import { put } from '@redux-saga/core/effects';
import { setAppStatus, setOpenedFriend } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { OpenedFriend } from '~/store/sagas/sagasActions/actions/openedFriend';

export function* fetchOpenedFriendWorker({ payload }: OpenedFriend) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        // @ts-ignore
        const result = yield fetch(`http://localhost:4000/user/get-user-by-id`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: payload.id }),
        });

        // @ts-ignore
        const openedFriend = yield result.json();

        yield put(
            setOpenedFriend({
                openedFriend: openedFriend,
            }),
        );

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
