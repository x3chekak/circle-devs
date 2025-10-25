import './style.css'

export const Item: React.FC = ({ handleDelete, item }) => {
    return (
        <div className='item'>
            {item.title}
            <button onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id)}}>delete</button>
        </div>
    );
}