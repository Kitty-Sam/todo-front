import { put } from '@redux-saga/core/effects';
import { setAppStatus, setFriends } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { AddFriend } from '~/store/sagas/sagasActions/actions/addFriend';
import axios from 'axios';

export function* addFriendWorker({ payload }: AddFriend) {
    const { email, id } = payload;
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const { data } = yield axios.post(
            'http://localhost:4000/user/add-friend',
            { email, id },
            { withCredentials: true },
        );

        yield put(setFriends({ friends: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setFriends({ friends: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
