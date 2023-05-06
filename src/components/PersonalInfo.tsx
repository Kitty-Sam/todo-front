import React, { ChangeEvent, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { getCurrentUser } from '~/store/selectors/userSelector';
import { logOutAction } from '~/store/sagas/sagasActions/actions/logOutUser';
import { logOutAndRemoveAction } from '~/store/sagas/sagasActions/actions/logOutAndRemoveUser';
import { updateUserNameAction } from '~/store/sagas/sagasActions/actions/updateUserName';
import styles from 'src/styles/PersonalInfo.module.scss';

export const PersonalInfo = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [newName, setNewName] = useState('');

    const currentUser = useSelector(getCurrentUser, shallowEqual);

    const dispatch = useDispatch();
    const logOutPress = () => {
        dispatch(logOutAction());
        toast('User is successfully logged out!');
    };

    const logOutAndRemovePress = () => {
        dispatch(logOutAndRemoveAction());
        toast('Profile is successfully removed!');
    };

    const changeNameUserPress = () => {
        setIsEditMode(true);
        setNewName(currentUser.name);
    };

    const saveNewNameUserPress = () => {
        setIsEditMode(false);
        dispatch(updateUserNameAction({ newName }));
        currentUser.name !== newName && toast('User name is successfully updated!');
    };

    const onChangeNamePress = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewName(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <span>Personal info</span>
            {isEditMode ? (
                <div className={styles.editBlock}>
                    <textarea value={newName} onChange={onChangeNamePress} />
                    <button onClick={saveNewNameUserPress}>save</button>
                </div>
            ) : (
                <p onDoubleClick={changeNameUserPress}>user name: {currentUser.name}</p>
            )}
            <p>email: {currentUser.email}</p>
            <div className={styles.buttonBlock}>
                <button onClick={logOutPress}>Log out</button>
                <button onClick={logOutAndRemovePress}>Log out and remove profile</button>
            </div>
        </div>
    );
};
