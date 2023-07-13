
document.querySelector("html").style.background = "Gainsboro";


let today = new Date();
let currentDate = new Date(today.setDate(today.getDate()));
let previousDay = new Date(today.setDate(today.getDate()-1));
let nextDay = new Date(today.setDate(today.getDate()+1));

// On load page
document.addEventListener('DOMContentLoaded', (e) => {
    console.log("Today's Date pressed");
    var dateSelected = displayDate(currentDate);
    sendApiRequest(dateSelected);  
    document.getElementById('nextDaysPic').style.display= 'none';
});

// Get Today's pic
// todaysPic.addEventListener('click', (e) => {
//     console.log("Today's Date pressed");
//     var dateSelected = displayDate(currentDate);
//     sendApiRequest(dateSelected);

   
// });

// Get Previous day's pic
previousDaysPic.addEventListener('click', (e) => {
    console.log("Previous pressed");
    var dateSelected = displayDate(previousDay);
    sendApiRequest(dateSelected);  
    document.getElementById('nextDaysPic').style.display= '';
});

// Get Next day's pic
nextDaysPic.addEventListener('click', (e) => {
    console.log("Next button pressed");
    dateSelected = displayDate(nextDay);
    sendApiRequest(dateSelected);  
    document.getElementById('nextDaysPic').style.display= ''; 
});

// Toggle description
function toggleDescriptionView() {
    var b = document.getElementById('Description');
    if(b.innerHTML === "Show Description")
    {
        b.innerHTML = "Hide Description";
        document.getElementById('content').style.display = 'block';
    }
    else if(b.innerHTML === "Hide Description")
    {
        b.innerHTML = "Show Description"
        document.getElementById('content').style.display = 'none';
    }
  }


// An Async function to fetch dat from the API
async function sendApiRequest(selectedDate){
    let API_KEY = "14jJHtSm5itokFDPHeXEsOPtjQdRsmV6VBaqd57u";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`);
    console.log(response);

    let data = await response.json();  // If you don't put the await, you might see the word 'Promise' in the console. Means you didn't wait
    console.log(data);

    if(response.status == 200)
    {     
        useApiData(data, selectedDate);
    }
    else 
    {
        document.querySelector("#displayDate").innerHTML = selectedDate;
        document.querySelector("#content").innerHTML = "No data for this date";
        document.querySelector("#title").innerHTML = null;
        document.querySelector("#pic").innerHTML = null;
    }
    
};

// function that does something with the data received from the API.
function useApiData(data, selectedDate){
    document.querySelector("#displayDate").innerHTML = "Picture Date: " + selectedDate;
    document.querySelector("#title").innerHTML = data.title;
    document.querySelector("#content").innerHTML = data.explanation;
    if(data.media_type == 'image')
    {
        document.querySelector("#pic").innerHTML = `<img src="${data.url}">`;
        
    }
    else if(data.media_type == 'video')
    {       
        document.querySelector('#pic').innerHTML = `<iframe width="853" height="505"  class="videowrapper" src="${data.url}">
        </iframe>`;
    }
    else
    {
        document.querySelector('#pic').innerHTML = "There has been an error processing your request."
    }
    
};

// Display the date
function displayDate(selectedDate){

    if(selectedDate == previousDay)
        {              
            newPreviousDay = new Date(today.setDate(today.getDate()-1));
            let day = calculateDay(newPreviousDay);  
            console.log(day);
            return day;
        }
        else if(selectedDate == nextDay)
        {  
            // add a stop if its past today's date
            newNextDay = new Date(today.setDate(today.getDate()+1));
            let day1 = calculateDay(newNextDay);
            let day2 = calculateDay(currentDate);
            if(day1 >= day2)
            {
                location.reload();
            }
            else
            {
                return day1;
            }
               
        }
        else if(selectedDate == currentDate)
        {
            let day = calculateDay(currentDate);  
            console.log(day);
            return day;
        }  
         
    }

// Calculate (format the date)
function calculateDay(requestedDay){
 
    let dd = requestedDay.getDate();
    let mm = requestedDay.getMonth() + 1;
    let yyyy = requestedDay.getFullYear();
    
    if (dd < 10) {
        dd = '0' + dd;
    };
    if (mm < 10) {
        mm = '0' + mm;
    };

    day = yyyy + '-' + mm + '-' + dd;
    
    return day;
}