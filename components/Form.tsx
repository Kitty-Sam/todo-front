import { FC } from 'react';
import { Input } from '~/components/Input';

export interface FormProps {
    item: string;
    setItem: (value: string) => void;
}
export const Form: FC<FormProps> = ({ item, setItem }) => {
    const onChangeItemPress = (e: any) => {
        setItem(e.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Input placeholder={'enter new item'} value={item} onChange={onChangeItemPress} />
            <div>
                <button onClick={() => console.log('add')}>add</button>
            </div>
        </div>
    );
};
