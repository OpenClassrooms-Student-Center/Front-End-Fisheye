const fetchPhotographers = async () => {
    try {
        const response = await fetch('../../data/photographers.json');

        if(!response.ok) { 
            throw new Error('Un problème est survenu lors de la récupération des données');
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error(error)
    }
}

