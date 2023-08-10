const formatDate = function(date){
    const theDate = new Date(date)
    return `${theDate.getMonth() + 1}/${theDate.getDate()}/${theDate.getFullYear()}`
}

module.exports = {formatDate}