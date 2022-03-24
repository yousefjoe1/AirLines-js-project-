let airLineSection = document.getElementById('airLines');
let allData;
let originalData;
let showAirLines = (data)=>{
originalData = data;
allData = data;
    data.forEach(element => {
        let singleAirLine = document.createElement('div');
        singleAirLine.className = 'single-airline';

        let airLineImage = document.createElement('img');
        airLineImage.src = 'https://www.kayak.com'+ element.logoURL;

        let singleAriLineInfoDiv = document.createElement('div');
        singleAriLineInfoDiv.className = 'single-ariLin-InfoDiv';
        singleAriLineInfoDiv.id = 'single-ariLin-InfoDiv-id';

        let airLineName = document.createElement('p');
        airLineName.textContent = element.name;
        airLineName.className = 'airline-name'
        
        let airLineAllianceName = document.createElement('p');
        airLineAllianceName.className = 'airLine-AllianceName'
        if(element.alliance === 'SA'){
            airLineAllianceName.textContent = 'Star Alliance';
        }else if(element.alliance === 'OW') {
            airLineAllianceName.textContent = 'One World';
        }else {
            airLineAllianceName.textContent = 'Sky Team';
        }

        
        let airLineSite = document.createElement('p');
        airLineSite.textContent = element.site;
        airLineSite.className = 'airLine-siteName';
        
        singleAriLineInfoDiv.appendChild(airLineName)
        singleAriLineInfoDiv.appendChild(airLineAllianceName)
        if(element.phone.length){
        let airLinePhonNumber = document.createElement('p');
        airLinePhonNumber.textContent = element.phone;
        airLinePhonNumber.className = 'airLine-phon';
        singleAriLineInfoDiv.appendChild(airLinePhonNumber)
        }

        singleAriLineInfoDiv.appendChild(airLineSite)
        singleAirLine.appendChild(airLineImage)
        singleAirLine.appendChild(singleAriLineInfoDiv)
        airLineSection.appendChild(singleAirLine)
    });
}

$.ajax({
url: "https://www.kayak.com/h/mobileapis/directory/airlines/homework?jsonp=callback&callback=callback",
dataType: "jsonp",
jsonp: "callback",
});

// callback
let callback = (jsonp)=>{
    console.log(jsonp);
    if(jsonp.length > 0){
        showAirLines(jsonp)
    }
}
    
let inputsCheckbox = document.querySelectorAll('input');
let checkedValues = []
inputsCheckbox.forEach(input=>{
    input.addEventListener('click',(e)=>{
        let secondArray = []
        // check if all inputs not checked to show all data
        if(e.target.checked){
            // airLineSection.innerText = '';
            checkedValues.push(e.target.value)
        }else if(!e.target.checked) {
            for( var i = 0; i < checkedValues.length; i++){
                if ( checkedValues[i] === e.target.value) { 
                    checkedValues.splice(i, 1); 
                }
            }
        }
        let theOriginData = allData;
        let filteredArray =  theOriginData.filter(airLine=>{
            return checkedValues.includes(airLine.alliance)
        })
        filteredArray.map(el=>{
            secondArray.push(el)
        })
        checkAllFunc(secondArray)
    })
})


let checkAllFunc = (arr)=>{
    if(!checkedValues.length){
        airLineSection.innerText = '';
        setTimeout(() => {
            showAirLines(allData)
        }, 300);
    }else {
        showAirLinesRelyOnFilterdArr(arr)
    }
}

let showAirLinesRelyOnFilterdArr = (data)=>{
    airLineSection.innerText = '';
    setTimeout(() => {
        data.forEach(element => {
            let singleAirLine = document.createElement('div');
        singleAirLine.className = 'single-airline';

        let airLineImage = document.createElement('img');
        airLineImage.src = 'https://www.kayak.com'+ element.logoURL;

        let singleAriLineInfoDiv = document.createElement('div');
        singleAriLineInfoDiv.className = 'single-ariLin-InfoDiv';
        singleAriLineInfoDiv.id = 'single-ariLin-InfoDiv-id';

        let airLineName = document.createElement('p');
        airLineName.textContent = element.name;
        airLineName.className = 'airline-name'
        
        let airLineAllianceName = document.createElement('p');
        airLineAllianceName.className = 'airLine-AllianceName'
        if(element.alliance === 'SA'){
            airLineAllianceName.textContent = 'Star Alliance';
        }else if(element.alliance === 'OW') {
            airLineAllianceName.textContent = 'One World';
        }else {
            airLineAllianceName.textContent = 'Sky Team';
        }

        
        let airLineSite = document.createElement('p');
        airLineSite.textContent = element.site;
        airLineSite.className = 'airLine-siteName';
        
        singleAriLineInfoDiv.appendChild(airLineName)
        singleAriLineInfoDiv.appendChild(airLineAllianceName)
        if(element.phone.length){
        let airLinePhonNumber = document.createElement('p');
        airLinePhonNumber.textContent = element.phone;
        airLinePhonNumber.className = 'airLine-phon';
        singleAriLineInfoDiv.appendChild(airLinePhonNumber)
        }
        
        singleAriLineInfoDiv.appendChild(airLineSite)
        singleAirLine.appendChild(airLineImage)
        singleAirLine.appendChild(singleAriLineInfoDiv)
        airLineSection.appendChild(singleAirLine)
            });
    }, 300);
}