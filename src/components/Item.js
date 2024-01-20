import React from "react";

//When X event occurs (a user clicks the Add to Cart button)
//Make Y fetch request (PATCH /items)
//Update Z state (update the isInCart status for the item)

//When X event occurs (a user clicks the DELETE button)
//Make Y fetch request (DELETE /items)
//Update Z state (remove the item from the li

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isInCart: !item.isInCart,
        }),
    })
    .then((r)=>r.json())
    .then((updatedItem)=>onUpdateItem(updatedItem));
  }
  function handleDeleteClick(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "DELETE",
    })
    .then((r)=>r.json())
    .then(()=> onDeleteItem(item))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
