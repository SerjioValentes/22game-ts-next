export const getNumberWithSpaces = () => {
  // console.log(number);
  // return number.toString().replaceAll(' ', '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getNormalNumber = (value: string | number) => {
  if (value) {
    return Number(value.toString().replaceAll(' ', ''));
  }
  const result = 0;
  return result;
};
