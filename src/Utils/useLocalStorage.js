import React from "react";

function useLocalStorage(itemName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
        try {
          const localStorageItem = localStorage.getItem(itemName);
  
          let parsedItem;
          
          if(!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            console.log(itemName);
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
          setItem(parsedItem);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
    }, []);
  
    const addItem = (newItem) => {
      try {
        const localStorageParsedItem = JSON.parse(localStorage.getItem(itemName));
        const newLocalStorageItem = [...localStorageParsedItem];
        const containsItem = newLocalStorageItem.some(obj => obj.id === newItem.id);
        if(!containsItem){
          newLocalStorageItem.push(newItem);
          const stringifiedNewItem = JSON.stringify(newLocalStorageItem);
          localStorage.setItem(itemName, stringifiedNewItem);
          setItem(newLocalStorageItem);
        } else {
          const objectIndex = newLocalStorageItem.findIndex(obj => obj.id == newItem.id);
          newLocalStorageItem.splice(objectIndex,1);
          const stringifiedNewItem = JSON.stringify(newLocalStorageItem);
          localStorage.setItem(itemName, stringifiedNewItem);
          setItem(newLocalStorageItem);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      };
    };
  
    return {
      item,
      addItem,
      loading,
      error
    };
  }

  export { useLocalStorage };