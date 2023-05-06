import React, { ChangeEvent, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getDeals } from '~/store/selectors/userSelector';
import { removeDealAction } from '~/store/sagas/sagasActions/actions/removeDeal';
import { toast } from 'react-toastify';
import { updateDealAction } from '~/store/sagas/sagasActions/actions/updateDeal';
import styles from 'src/styles/UserDeals.module.scss';

const UserDeals = () => {
    const [editedDeal, setEditedDeal] = useState('');
    const [editMode, setEditMode] = useState('');
    const deals = useSelector(getDeals, shallowEqual);

    const dispatch = useDispatch();
    const removeDealPress = (id: string) => async () => {
        dispatch(removeDealAction({ id }));
        toast('Item is successfully removed!');
    };

    const updateDealPress = (newTitle: string, id: string, oldTitle: string) => async () => {
        dispatch(updateDealAction({ newTitle, id }));
        setEditMode('');
        oldTitle !== newTitle && toast('Item is successfully updated!');
    };

    const changeDealTitlePress = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditedDeal(e.target.value);
    };

    const editDealTitlePress = (value: string) => () => {
        setEditMode(value);
        setEditedDeal(value);
    };

    return (
        <ol>
            {!deals.length ? (
                <p>Please,create new deal</p>
            ) : (
                deals.map((el) => (
                    <div key={el.id} onDoubleClick={editDealTitlePress(el.title)}>
                        <li className={styles.dealItemContainer}>
                            {editMode === el.title ? (
                                <textarea value={editedDeal} onChange={changeDealTitlePress} />
                            ) : (
                                <p>{el.title}</p>
                            )}

                            <button
                                onClick={
                                    editMode === el.title
                                        ? updateDealPress(editedDeal, el.id, el.title)
                                        : removeDealPress(el.id)
                                }
                            >
                                {editMode === el.title ? 'save' : 'x'}
                            </button>
                        </li>
                    </div>
                ))
            )}
        </ol>
    );
};

export default UserDeals;
