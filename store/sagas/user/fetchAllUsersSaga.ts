import { put, select } from '@redux-saga/core/effects';
import { setAllUsers, setAppStatus } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { getCurrentUserEmail } from '~/store/selectors/userSelector';
import { IUser } from '~/store/reducers/authReducer';

export function* fetchAllUsersWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));

        const currentUserEmail: string = yield select(getCurrentUserEmail);

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // @ts-ignore
        const data = yield res.json();

        const normalizeData: IUser[] = data.map((el: any) => ({
            id: el._id,
            name: el.name,
            email: el.email,
            deals: el.deals,
            friends: el.friends,
        }));

        yield put(setAllUsers({ allUsers: normalizeData.filter((user) => user.email !== currentUserEmail) }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        console.log(data);
    } catch (error: any) {
        console.warn(error);
        yield put(setAllUsers({ allUsers: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
