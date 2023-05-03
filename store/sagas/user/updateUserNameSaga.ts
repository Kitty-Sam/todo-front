import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { UpdateUserName } from '~/store/sagas/sagasActions/actions/updateUserName';

export function* updateUserNameWorker({ payload }: UpdateUserName) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/update-user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // @ts-ignore
        const currentUser = yield res.json();

        yield put(
            setCurrentUser({
                currentUser: {
                    name: currentUser.name,
                    email: currentUser.email,
                    friends: currentUser.friends,
                    deals: currentUser.deals,
                    id: currentUser.id,
                },
            }),
        );

        yield localStorage.setItem(
            'currentUser',
            JSON.stringify({
                name: currentUser.name,
                email: currentUser.email,
                friends: currentUser.friends,
                deals: currentUser.deals,
                id: currentUser.id,
            }),
        );

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
