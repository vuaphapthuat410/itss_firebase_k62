import { useState, useEffect } from 'react';
import { addFbItem, updateFbItem, getFbItems, clearFbItem} from "../lib/firebase";

function useFbStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);
    
    // async with real time
  const getItems = async () => {
    const _items = await getFbItems();
    setItems(_items);
  };

  const addItem = async item => { 
    const newItem = { text: item.text, done: item.done };
    await addFbItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const changes = { done: !checked.done };
    await updateFbItem(changes, checked.id);
    const newItems = items.map((item) => { //get new array for display
      if (item.id === checked.id) {
        item = { ...item, changes}
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.map(item => { // call clear for each item
      clearFbItem(item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useFbStorage; 
