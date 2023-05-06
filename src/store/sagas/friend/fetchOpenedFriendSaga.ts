import { put } from '@redux-saga/core/effects';
import { setAppStatus, setOpenedFriend } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { OpenedFriend } from '~/store/sagas/sagasActions/actions/openedFriend';
import axios from 'axios';

export function* fetchOpenedFriendWorker({ payload }: OpenedFriend) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.post(
            'http://localhost:4000/user/get-user-by-id',
            { id: payload.id },
            { withCredentials: true },
        );

        yield put(
            setOpenedFriend({
                openedFriend: data,
            }),
        );

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
