const fetchData = async (url) => {
    if(url){
       try {
        const response = await fetch(url);
        return await response.json();
        } catch (error) {
            return console.error('Error fetching data:', error);
        } 
    }
    
  };

  export {fetchData}