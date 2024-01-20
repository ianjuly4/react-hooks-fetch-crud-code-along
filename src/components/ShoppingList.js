import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

//When X event occurs
//Use the useEffect hook to trigger a side-effect in the ShoppingList component after the component first renders
//Make Y fetch request
//Make a GET request to /items to retrieve a list of items
//Update Z state
//Replace our current list of items with the new list

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
      .then((r)=>r.json())
      .then((items)=>setItems(items))
  }, [])

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item)=>{
      if(item.id === updatedItem.id){
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItems)
  }
  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=>item.id !==deletedItem.id)
    setItems(updatedItems)
  }
  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
