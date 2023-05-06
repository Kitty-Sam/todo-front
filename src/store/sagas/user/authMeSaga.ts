import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import axios from 'axios';

export function* authMeWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.get('http://localhost:4000/auth/me', { withCredentials: true });

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

        yield put(setIsLogged({ isLogged: true }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
