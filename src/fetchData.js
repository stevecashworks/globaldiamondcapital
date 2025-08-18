const fetchData =  (
  url,
  onSuccess,
  onFail,
  method = "GET",
  body,
  token
) => {
  const reqObj = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    reqObj.headers.token = token;
  }
  if (method !== "GET") {
    reqObj.body = JSON.stringify(body || {});
  }
  
    fetch(url,reqObj)
    .then(res=>res.json())
    .then(data=>{
      console.log({data})
    if (data.success) {
      onSuccess(data);
    } else {
      onFail(data.result);
    }
    }).catch (err=>{
      console.log(err.message);
      onFail(err.message);
    
    }) 
    
};

export default fetchData;
