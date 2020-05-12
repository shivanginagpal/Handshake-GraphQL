export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export var isFieldEmpty = (prop)=>{
    if(prop === "" || prop === null || typeof prop === "undefined"){
        return true;
    } else{
        return false;
    }
};