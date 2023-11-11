const getSetStateCorrectValue = (setInputValues : any, functionConst : any, value : any) => {
  setInputValues((prev: any) => ({
    ...prev,
    [functionConst]: value,
  }));
};
export default getSetStateCorrectValue;
