const extractJobTitle = (jobURL) => {
    // extract the job title from the job URL

    const myRegexp = /open-positions\/(.*)/;
    let match = myRegexp.exec(jobURL);
    return match[1];

}


const outputToScreen = (data) => {
    //const form = document.querySelector('.select-me');

    const list = document.querySelector('#resultsList');

    //list.innerHTML="";
    //console.log(data);
    data.forEach((data) => {
        // grad the URL to make a link
        let result = data["id"];
        // remove extra metadata before https:
        let jobURL = result.substr(result.indexOf("com") + 4); 
        jobURL = jobURL.substring(0, jobURL.length-1);
        // grab the job title for output
        jobTitle = extractJobTitle(jobURL);

        list.insertAdjacentHTML('beforeend', `
            <div class="notification">
            <img src='https://www.trzcacak.rs/myfile/full/29-294946_mindbreeze-inspire-circle.png' class="avatar" />
            <div class="notification-content">
            <p><small>${jobTitle}</small></p>
            <a href="${jobURL}" target="_blank">${jobURL}</a>
            </div>`
        );
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
const apiCall2 = () => {
    
    fetch("https://demo.mindbreeze.com/public/api/v2/search", {
        method: "POST",
        body: JSON.stringify({                                                

            "query": {                                    
              "quoted_term": "We’re looking forward to receiving your application!"                    
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
const apiCall3 = () => {
    
    fetch("https://demo.mindbreeze.com/public/api/v2/search", {
        method: "POST",
        body: JSON.stringify({                                                

            "query": {                                    
              "quoted_term": "Your area of responsibility:"                    
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

const searchJobs = () => {
    apiCall();
    apiCall2();
    apiCall3();
    //apiCall4();
}


button_trigger.addEventListener('click', searchJobs);



//apiCall();