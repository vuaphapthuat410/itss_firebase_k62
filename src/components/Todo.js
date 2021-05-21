import React, { useState } from 'react';


import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';


//import useStorage from '../hooks/storage';
import useFbStorage from '../hooks/fbStorage';

import {getKey} from "../lib/util";

function Todo() {
  const [items, addItem, updateItem, clearItems] = useFbStorage();
  
  const [filter, setFilter] = React.useState('ALL');

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = evt => {
    updateItem(evt);
  };
  
  const handleAdd = newText => {
    addItem({ newText, done: false });
  };
  
  const handleFilterChange = value => setFilter(value);

  return (
    <article class="panel">
      <div className="panel-heading">
          <span> ITSS Todoアプリ</span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem 
          key={item.id}
          item={item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;