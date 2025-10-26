import { useEffect, useState } from 'react';
import styles from './SideBar.module.scss'
import { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '/src/redux/itemsApi';
import { Item } from '../Item/Item';

interface Category {
    id: string;
    title: string;
}

interface SideBarProps {
    onSelectCategory: (categoryId: string) => void;
    onUpdateCategoriesCount: (count: number) => void;
    setSelectedCategoryId: (categoryId: string) => void;
    selectedCategoryId: string | null; 
}

export const SideBar: React.FC<SideBarProps> = ({ 
    onSelectCategory, 
    onUpdateCategoriesCount, 
    setSelectedCategoryId, 
    selectedCategoryId 
}) => {

    const [newCategory, setNewCategory] = useState<string>('')

    const { data = [] } = useGetCategoryQuery();
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const handleEditCategoryName = async (id: string, newTitle: string) => {
        await updateCategory({ id, body: { title: newTitle } });
    };

    const handleAddCategory = async () => {
        if (newCategory) {
            await addCategory({ title: newCategory }).unwrap();
            setNewCategory('');
        }
    }

    const handleDeleteCategory = async (id: string) => {
        await deleteCategory(id).unwrap();
        setSelectedCategoryId('')
    }

    useEffect(() => {
        onUpdateCategoriesCount(data.length);
    }, [data, onUpdateCategoriesCount]);

    return (
        <aside className={styles.sidebar}>
            <h2>Категории</h2>
            <div className={styles.sidebar_input}>
                    <input
                        type='text'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>add</button>
                </div>
                <ul>
                {data.map((item: Category) => (
                        <li key={item.id} onClick={() => onSelectCategory(item.id)} 
                            className={item.id === selectedCategoryId ? styles.selected : ''}>
                            <Item item={item} handleDelete={handleDeleteCategory} handleEdit={handleEditCategoryName} />
                        </li>
                    ))}
                </ul>
        </aside>
    );
}