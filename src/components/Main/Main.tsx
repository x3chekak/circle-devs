import styles from './Main.module.scss'
import React, { useState } from "react"
import { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation } from '/src/redux';
import { Item } from "../Item/Item";

interface Item {
    id: string;
    title: string;
    categoryId: string;
}

interface MainProps {
    selectedCategoryId: string | null;
    onSelectCategory: (categoryId: string) => void;
    categoriesCount: number | null;
    onUpdateCategoriesCount: (count: number) => void;
    handleDeleteItem: (id: string) => Promise<void>;
}

export const Main: React.FC<MainProps> = ({
    selectedCategoryId,
    categoriesCount,
    handleDeleteItem
}) => {

    const [newItem, setNewItem] = useState<string>('');
    
    const [addItem] = useAddItemMutation();
    const { data = [], isLoading } = useGetItemsQuery({ categoryId: selectedCategoryId });
    const [updateItem] = useUpdateItemMutation();

    const handleEditItemName = async (id: string, newTitle: string ) => {
        await updateItem({ id, title: newTitle, categoryId: selectedCategoryId });
    };

    const handleAddItem = async () => {
        if (newItem) {
            await addItem({ title: newItem, categoryId: selectedCategoryId }).unwrap();
            setNewItem('');
        }
    }

    if (isLoading) return <h1>Loading...</h1>;
    return (
        <div className={styles.main_content}>
            <h2>Задачи</h2>
            <div className={styles.main_content_input}>
                <input
                    type='text'
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button 
                title="Выберите категорию" 
                disabled={selectedCategoryId === '' || categoriesCount === 0} 
                onClick={handleAddItem}
                >
                    add item
                </button>
            </div>
            <ul>
                {data.map((item:Item) => (
                    <li key={item.id} >
                        <Item item={item} handleDelete={handleDeleteItem} handleEdit={handleEditItemName} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


