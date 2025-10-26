import { useState } from 'react';
import styles from './Item.module.scss'

interface ItemProps {
    handleDelete: (id: string) => void;
    handleEdit: (id: string, title: string) => void;
    item: { id: string; title: string }; 
}

export const Item: React.FC<ItemProps> = ({ handleDelete, item, handleEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(item.title);

    const saveEdit = () => {
        handleEdit(item.id, editTitle);
        setIsEditing(false);
    };

    return (
        <div className={styles.item}>
            {isEditing ? (
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={saveEdit}
                />
            ) : (
                    <span onDoubleClick={() => setIsEditing(true)}><p>{item.title}</p></span>
            )}
            
            <button onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id)}}>delete</button>
        </div>
    );
}