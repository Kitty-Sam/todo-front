import { ChangeEvent, FC } from 'react';
import styles from '~/styles/Form.module.scss';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { addDealAction } from '~/store/sagas/sagasActions/actions/addDeal';
import { Input } from '~/components/Input';
import { IFormProps } from '~/components/interfaces';

export const Form: FC<IFormProps> = ({ item, setItem }) => {
    const onChangeItemPress = (e: ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value);
    };

    const dispatch = useDispatch();

    const addDealPress = () => {
        if (item.trim() === '') {
            toast('Please, enter any deal');
            return;
        }

        dispatch(addDealAction({ title: item.trim() }));
        setItem('');
    };

    return (
        <div className={styles.inputContainer}>
            <Input placeholder={'enter new item'} value={item} onChange={onChangeItemPress} type="text" />
            <div>
                <button onClick={addDealPress} disabled={!item}>
                    add
                </button>
            </div>
        </div>
    );
};
