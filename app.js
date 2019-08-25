// add any more job search terms to array searchArray
const searchArray = ["For this position we offer", "We’re looking forward to receiving your application!"];

const button_trigger = document.querySelector(".button-trigger");

const list = document.querySelector('#resultsList');

const extractJobTitle = (jobURL) => {
    // extract the job title from the job URL

    const myRegexp = /open-positions\/(.*)/;
    let match = myRegexp.exec(jobURL);
    return match[1];

}


const outputToScreen = (data) => {
    //const form = document.querySelector('.select-me');

    if (data) {
        // guard clause for empty results or bad response from api call
        data.forEach((data) => {
            // grab the URL to make a link
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
    } else {
        // bad results output
        list.innerHTML = "<h1>Sorry, something went wrong, please reload page.</h1>";
    }
}

const buildQuery = (searchInput) => {
    return {
        "query": {
            "quoted_term": `"${searchInput}"`
        },
      "count": 25
      };
}

const apiCall = (searchTerm) => {

    fetch("https://demo.mindbreeze.com/public/api/v2/search", {
        method: "POST",
        body: JSON.stringify(buildQuery(searchTerm))
    })
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);

        outputToScreen(data["resultset"]["results"]);
    })
    .catch(error => console.log(error));
}

const searchJobs = () => {
    // erase previous search
    list.innerHTML = "";

    // search from array of terms

    searchArray.forEach (apiCall);

    // flip button text
    button_trigger.innerHTML="Jobs listed below!";

}

button_trigger.addEventListener('click', searchJobs);


