export const handleChangeFile = (e,setImg, setFileState,oldState) => {
  let file = e.target.files[0];
  console.log(e.target.files)
  // create object can read file
  let reader = new FileReader();
  // run code to change to base64 style
  reader.readAsDataURL(file);
  // run to active load
    reader.onload = (e) => {
      // set picture to show to <img>
      setImg(e.target.result);
      // create formData in order to send to backend
      let formData = new FormData();
      formData.append("logo", file);
// use console.log(formData.get('logo')) ==> check the file 
      setFileState(() => {
        return { ...oldState, file: formData };
      });
    };
};