import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { getCurrentUser } from '~/store/selectors/userSelector';
import { logOutAction } from '~/store/sagas/sagasActions/actions/logOutUser';
import { logOutAndRemoveAction } from '~/store/sagas/sagasActions/actions/logOutAndRemoveUser';
import { updateUserNameAction } from '~/store/sagas/sagasActions/actions/updateUserName';

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
        toast('User name is successfully updated!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Personal info</span>
            {isEditMode ? (
                <div style={{ display: 'flex' }}>
                    <textarea value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <button onClick={saveNewNameUserPress}>save</button>
                </div>
            ) : (
                <p onDoubleClick={changeNameUserPress}>user name: {currentUser.name}</p>
            )}

            <button onClick={logOutPress}>Log out</button>
            <button onClick={logOutAndRemovePress}>Log out and remove profile</button>
            <p>email: {currentUser.email}</p>
        </div>
    );
};
