import { FC } from 'react';
import { Input } from '~/components/Input';
import { useDispatch } from 'react-redux';
import { addDealAction } from '~/store/sagas/sagasActions/actions/addDeal';

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
