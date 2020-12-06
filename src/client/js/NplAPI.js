const SERVER_ROOT='http://localhost:3000';

export const evaluateNPL=(url)=>{
    return fetch(`${SERVER_ROOT}/analizeNews`, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({url})
    }).then((resolve)=>{
        return resolve.json();
    }).then((result)=>{
        return result
    }).catch((error)=>{
        console.log(error)
    });
}