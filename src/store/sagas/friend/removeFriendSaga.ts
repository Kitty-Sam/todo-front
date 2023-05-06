import { put } from '@redux-saga/core/effects';
import { setAppStatus, setFriends } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RemoveFriend } from '~/store/sagas/sagasActions/actions/removeFriend';
import axios from 'axios';

export function* removeFriendWorker({ payload }: RemoveFriend) {
    const { id } = payload;

    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.delete('http://localhost:4000/user/remove-friend', {
            data: { id },
            withCredentials: true,
        });

        yield put(setFriends({ friends: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
