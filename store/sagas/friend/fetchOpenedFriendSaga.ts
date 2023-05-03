import { call, put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged, setOpenedFriend } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { LoginUser } from '~/store/sagas/sagasActions/actions/loginUser';
import Router from 'next/router';
import { Routes } from '~/pages';
import { OpenedFriend } from '~/store/sagas/sagasActions/actions/openedFriend';

export function* fetchOpenedFriendWorker({ payload }: OpenedFriend) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        // @ts-ignore
        const result = yield fetch(`http://localhost:4000/user/get-user-by-email`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: payload.email }),
        });

        // @ts-ignore
        const openedFriend = yield result.json();

        yield put(
            setOpenedFriend({
                openedFriend: openedFriend,
            }),
        );

        yield call(Router.push, Routes.FRIEND_PROFILE);

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
