import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { IUser } from '~/store/reducers/authReducer';

export function* logOutAndRemoveUserWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        yield localStorage.clear();

        yield put(
            setCurrentUser({
                currentUser: {} as IUser,
            }),
        );

        yield put(setIsLogged({ isLogged: false }));

        yield fetch(`http://localhost:4000/user/remove-user`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
