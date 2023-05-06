import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getDeals } from '~/store/selectors/userSelector';
import { removeDealAction } from '~/store/sagas/sagasActions/actions/removeDeal';
import { toast } from 'react-toastify';
import { updateDealAction } from '~/store/sagas/sagasActions/actions/updateDeal';

const UserDeals = () => {
    const [editedDeal, setEditedDeal] = useState('');
    const [editMode, setEditMode] = useState('');
    const deals = useSelector(getDeals, shallowEqual);

    const dispatch = useDispatch();
    const removeDealPress = (id: string) => async () => {
        dispatch(removeDealAction({ id }));
        toast('Item is successfully removed!');
    };

    const updateDealPress = (newTitle: string, id: string) => async () => {
        dispatch(updateDealAction({ newTitle, id }));
        setEditMode('');
        toast('Title is successfully updated!');
    };

    return (
        <ol>
            {!deals.length ? (
                <p>Please,create new deal</p>
            ) : (
                deals.map((el, index) => (
                    <div
                        key={el.id}
                        onDoubleClick={() => {
                            setEditMode(el.title);
                            setEditedDeal(el.title);
                        }}
                    >
                        <li
                            style={{
                                paddingTop: '10px',
                                display: 'flex',
                                flexDirection: 'row',
                                // width: '200px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {editMode === el.title ? (
                                <textarea value={editedDeal} onChange={(e) => setEditedDeal(e.target.value)} />
                            ) : (
                                <p>
                                    {index + 1} {'. '}
                                    {el.title}
                                </p>
                            )}

                            <button
                                onClick={
                                    editMode === el.title ? updateDealPress(editedDeal, el.id) : removeDealPress(el.id)
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
