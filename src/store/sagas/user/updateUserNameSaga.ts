import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { UpdateUserName } from '~/store/sagas/sagasActions/actions/updateUserName';
import axios from 'axios';

export function* updateUserNameWorker({ payload }: UpdateUserName) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const { data } = yield axios.put('http://localhost:4000/user/update-user', payload, {
            withCredentials: true,
        });

        yield put(
            setCurrentUser({
                currentUser: {
                    name: data.name,
                    email: data.email,
                    friends: data.friends,
                    deals: data.deals,
                    id: data.id,
                },
            }),
        );

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
