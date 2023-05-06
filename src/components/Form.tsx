import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { addDealAction } from '~/store/sagas/sagasActions/actions/addDeal';
import { Input } from '~/components/Input';

export interface FormProps {
    item: string;
    setItem: (value: string) => void;
}
export const Form: FC<FormProps> = ({ item, setItem }) => {
    const onChangeItemPress = (e: any) => {
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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Input placeholder={'enter new item'} value={item} onChange={onChangeItemPress} />
            <div>
                <button onClick={addDealPress}>add</button>
            </div>
        </div>
    );
};
