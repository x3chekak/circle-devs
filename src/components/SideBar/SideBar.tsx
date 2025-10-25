import { useEffect, useState } from 'react';
import './style.css';

import { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation } from '/src/redux';
import { Item } from '../Item/Item';

export const SideBar: React.FC = ({ onSelectCategory, onUpdateCategoriesCount, setSelectedCategoryId }) => {

    const [newCategory, setNewCategory] = useState('')
    const { data = [] } = useGetCategoryQuery();
    const [addCategory, { isError }] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleAddCategory = async () => {
        if (newCategory) {
            await addCategory({ title: newCategory }).unwrap();
            setNewCategory('');
        }
    }

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id).unwrap();
        setSelectedCategoryId('')
    }

    useEffect(() => {
        onUpdateCategoriesCount(data.length);
    }, [data, onUpdateCategoriesCount]);


    return (
        <aside className="sidebar">
            <h2>Категории</h2>
            
                <div>
                    <input
                        type='text'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>add itme</button>
                </div>
                <ul>
                    {data.map(item => (
                        <li key={item.id} onClick={() => onSelectCategory(item.id)}>
                            <Item item={item} handleDelete={handleDeleteCategory}/>
                        </li>
                    ))}
                </ul>
            
        </aside>
    );
}