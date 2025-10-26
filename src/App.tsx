import { useEffect, useState } from 'react';
import styles from './App.module.scss'
import {useDeleteItemMutation } from './redux/itemsApi';
import { Header } from './components/Header/Header';
import { SideBar } from './components/SideBar/SideBar';
import { Footer } from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import { Main } from './components/Main/Main';

function App() {

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('');
  const [deleteItem] = useDeleteItemMutation();
  const [categoriesCount, setCategoriesCount] = useState<number | null>(null);
  //////////////////////////////
  const [showModal, setShowModal] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState<string | null>(null);
  ///////////////////////////

  const handleDeleteItem = async (id: string) => {
    setCurrentItemToDelete(id);
    setShowModal(true);
  }

  const confirmDeletion = async () => {
      await deleteItem(currentItemToDelete).unwrap();
      setShowModal(false);
  };

  const cancelDeletion = () => {
    setShowModal(false);
  };

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId)
  }

  const handleCategoriesCount = (count: number) => {
    setCategoriesCount(count);
  }

  useEffect(() => {
    if (categoriesCount === 0) {
      setSelectedCategoryId('')
    }
  }, [categoriesCount]);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <SideBar
          onSelectCategory={handleSelectCategory}
          onUpdateCategoriesCount={handleCategoriesCount}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
        />
        <Main
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleSelectCategory}
          categoriesCount={categoriesCount}
          onUpdateCategoriesCount={handleCategoriesCount}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
      {showModal && (
        <Modal
          initialTime={5}
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
