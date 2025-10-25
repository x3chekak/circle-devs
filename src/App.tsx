import { useEffect, useState } from 'react';
import './App.css';

import { useGetItemsQuery, useAddItemMutation, useDeleteItemMutation, useGetCategoryQuery } from './redux';
import { Header } from './components/Header/Header';
import { SideBar } from './components/SideBar/SideBar';
import { Footer } from './components/Footer/Footer';
import { Item } from './components/Item/Item';
import Modal from './components/Modal/Modal';

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newItem, setNewItem] = useState('')
  const { data = [], isLoading } = useGetItemsQuery({ categoryId: selectedCategoryId });
  const [addItem, { isError }] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [categoriesCount, setCategoriesCount] = useState();

  const handleAddItem = async () => {
    if (newItem) {
      await addItem({ title: newItem, categoryId: selectedCategoryId } ).unwrap();
      setNewItem('');
    }
  }
  const handleDeleteItem = async (id) => {
    await deleteItem(id).unwrap();
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  const handleCategoriesCount = (count) => {
    console.log('Категорий:', count);
    setCategoriesCount(count);
  }

      useEffect(() => {
        if (categoriesCount === 0){
          setSelectedCategoryId('')
        }
      },[categoriesCount]);
  
  console.log(data)
  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className='layout'>
      <Header />
      <div className='main'>
        <SideBar onSelectCategory={handleSelectCategory} onUpdateCategoriesCount={handleCategoriesCount} setSelectedCategoryId={setSelectedCategoryId}/>
        <div className='main_content'>
          <h2>Списки</h2>
          <div>
            <input
              type='text'
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button disabled={selectedCategoryId === '' || categoriesCount === 0} onClick={handleAddItem}>add itme</button>
          </div>
          <ul>
            {data.map(item => (
              <li key={item.id} >
                <Item item={item} handleDelete={handleDeleteItem}/>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
