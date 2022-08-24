export const formatDate = (stringDate) => {
    const date = new Date(stringDate);
    return [('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2), date.getFullYear()].join('/');
};