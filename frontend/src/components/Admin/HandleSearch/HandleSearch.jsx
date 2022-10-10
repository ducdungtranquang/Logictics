export const handleSearch = (dataToFilter, input, setDataRender) => {
  let tempArr = ["heading", "detail"];
  const filteredData = dataToFilter.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      //  return el["email"].toLowerCase().includes(input) || el["phone"].toLowerCase().includes(input);
      for (let item of tempArr) {
        return el[item].toLowerCase().includes(input);
      }
    }
  });
  // console.log(filteredData);
  setDataRender(filteredData);
};
