const extractJobTitle = (jobURL) => {
    // extract the job title from the job URL

    const myRegexp = /open-positions\/(.*)/;
    let match = myRegexp.exec(jobURL);
    return match[1];

}


const outputToScreen = (data) => {
    //const form = document.querySelector('.select-me');

    const list = document.querySelector('#resultsList');

    list.innerHTML="";
    //console.log(data);
    data.forEach((data) => {
        // grad the URL to make a link
        let result = data["id"];
        // remove extra metadata before https:
        let jobURL = result.substr(result.indexOf("com") + 4); 
        jobURL = jobURL.substring(0, jobURL.length-1);
        // grab the job title for output
        jobTitle = extractJobTitle(jobURL);

        list.insertAdjacentHTML('beforeend', `<li><a href="${jobURL}" target="_blank">${jobTitle}</a></li>`);
    })


}

const apiCall = () => {
    
    fetch("https://demo.mindbreeze.com/public/api/v2/search", {
        method: "POST",
        body: JSON.stringify({                                                

            "query": {                                    
              "quoted_term": "For this position we offer"                    
            },                                            
          "count": 15
          })                                       
    })
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        
        outputToScreen(data["resultset"]["results"]);
    })
    .catch(error => console.log(error));
}

const button_trigger = document.querySelector(".button-trigger");

button_trigger.addEventListener('click', apiCall);



//apiCall();