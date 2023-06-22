

export const isEmpty = (value) =>{
    return( value === undefined || value===null || (typeof value === 'object' && Object.keys (value).length===0) 
    || (typeof value === 'string' && value.trim().length===0) 
    );
};
export const timestampParser = (num) =>{
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        month:"long",
        day:"numeric",
    };
    let date = new Date(num).toLocaleDateString("fr-FR",options)
    return date.toString();
}