function getPayees(){
    return fetch("http://localhost:8000/api/v1/banking/payees?_delay=2500").then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            // What do we do with status >= 400
            return Promise.reject({
                message :'Bad Status',
                status : response.status
            });
        }
    }).catch(handleError)
}

function handleError(error : any){

    
        if(error.message){
            return Promise.reject(error);
        }
        else{
            return Promise.reject({
                message: 'Unknown DAO Error'
            });
        }

}

const dao = {
    getPayees // As per ES6 if key and value is same, we can just write it once
};

export {dao};