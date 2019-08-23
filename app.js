const peelJobTitle = (jobURL) => {
    
    let myRegexp = /open-positions\/(.*)/;
    let match = myRegexp.exec(jobURL);
    return match[1];

}


const outputToScreen = (data) => {
    const form = document.querySelector('.select-me');

    const list = document.querySelector('#resultsList');

    resultsList.innerHTML="";
    console.log(data);
    data.forEach((data) => {
        let result = data["id"];
        let jobURL = result.substr(result.indexOf("com") + 4); 
        jobURL = jobURL.substring(0, jobURL.length-1);
        jobTitle = peelJobTitle(jobURL);

        resultsList.insertAdjacentHTML('beforeend', `<li><a href="${jobURL}" target="_blank">${jobTitle}</a></li>`);
    })


}

const apiCall = () => {
    
    fetch("https://demo.mindbreeze.com/public/api/v2/search", {
        method: "POST",
        body: JSON.stringify({                                                

            "query": {                                    
          
              "quoted_term": "We’re looking forward to receiving your application!"                    
          
            },                                            
          
          "count": 5
          })                                       

    })
    .then(response => response.json())
    .then((data)=> {
        console.log(data);
        
        outputToScreen(data["resultset"]["results"]);
  }).catch(error => console.log(error));
}



apiCall();