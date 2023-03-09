export const readall = async () => {

    return await fetch('/.netlify/functions/readall')
        .then((response) => {
            return response.json();
        });
};

export const create = async (data) => {
    return await fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};


export const erase = async (id) => {
    return await fetch('/.netlify/functions/erase', {
        method: 'DELETE',
        body: JSON.stringify(id),
    }).then((response) => {
        return response.json();
    });
};

export const edit = async (id, data) => {
    //need to add id to end of the url so the backend can get it
    return await fetch(`/.netlify/functions/edit/${ id }`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    });
};