export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
};

export  const funcSortbyKey = (data = [], keySort, type) => {
    let arrTemp = [];
    switch (type) {
        case 'up':
            return arrTemp = data.sort((a, b)=> parseFloat(b?.[keySort]) - parseFloat(a?.[keySort]));

        case 'down':
            return arrTemp = data.sort((a, b)=> parseFloat(a?.[keySort]) - parseFloat(b?.[keySort]));
        default:
            return data;
    }
  };