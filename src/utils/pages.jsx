export const getPageCount = (totalCount, limit) =>{
    return Math.ceil(totalCount/limit)
}

export const getPagesArray = (totalPages) => {
    let results = [];
    for (let index = 0; index < totalPages; index++) {
        results.push(index + 1)  
    }
    return results
}