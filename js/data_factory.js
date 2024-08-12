var selectedLeagues = [];
var selectedTeams = [];


async function createLeagueBoxes() {       
    var leagueBoxes = document.getElementById("leagueBoxes");

    var avalibleLeaguesIdList = [39, 78, 140, 135, 61, 88, 253, 94];
    //var avalibleLeaguesIdList = [39];

    fetch("../startup_data.json")
    .then(response => response.json().then(data =>{

        var leagues = data['response']

        var btnContainer = document.createElement('div')
        btnContainer.setAttribute('class', 'button-row')

        for (let i=0; i<leagues.length; i++) {
            if (avalibleLeaguesIdList.includes(leagues[i]['league']['id'])) {
                const tempButton = document.createElement('button');
                tempButton.setAttribute('class', 'leagueButton');
                tempButton.innerHTML = '<img src='+leagues[i]['league']['logo']+' height="90%" width="auto" padding="0px" alt='+leagues[i]['league']['name'].replace(/ /g, '')+'/>';
                
                var leagueId = leagues[i]['league']['name'];

                tempButton.addEventListener('click', function() {
                    tempButton.classList.toggle('selected');

                    if (!selectedLeagues.includes(leagueId)) {
                        selectedLeagues.push(leagueId)
                    }
                    else {
                        var index = selectedLeagues.indexOf(leagueId);
                        selectedLeagues.splice(index)
                    }
                });

                // Create dropdown div
                const dropdown = document.createElement('div');
                dropdown.className = 'dropdown';

                // Create dropdown content div
                const dropdownContent = document.createElement('div');
                dropdownContent.className = 'dropdown-content';

                // Create grid container
                const gridContainer = document.createElement('div');
                gridContainer.className = 'grid-container';

                var name = leagues[i]['league']['name'].replace(/ /g,"_");

                fetch("../teams/"+name.toLowerCase().replace(/ /g,"_")+".json")
                .then(response => response.json().then(data =>{
        
                    var teams = data['response']
                    
                    for (let j=0; j<teams.length; j++) {
                        const gridItem = document.createElement('button');
                        gridItem.className = 'grid-item';
                        gridItem.innerHTML = '<img src='+teams[j]['team']['logo']+' width=35px height=35px/>'

                        var teamId = teams[j]['team']['name'];

                        gridItem.addEventListener('click', function() { 
                            gridItem.classList.toggle('selected');
                            if (!selectedTeams.includes(teamId)) {
                                selectedTeams.push(teamId)
                            }
                            else {
                                var index = selectedTeams.indexOf(teamId);
                                selectedTeams.splice(index)
                            }
                        });

                        gridContainer.appendChild(gridItem);
                    }

                }))

                var divider = document.createElement('hr');
                divider.setAttribute('class', 'buttonDivider')

                // Append grid container to dropdown content
                dropdownContent.appendChild(gridContainer);

                // Append button and dropdown content to dropdown div
                dropdown.appendChild(dropdownContent);

                var btnGroup = document.createElement('div');
                btnGroup.setAttribute('class', 'button-pair')

                btnGroup.appendChild(tempButton);
                btnGroup.appendChild(divider)
                btnGroup.appendChild(dropdownContent);
    
                btnContainer.appendChild(btnGroup)
            }
        }

        leagueBoxes.appendChild(btnContainer)
        }))
}


async function createLeagueBoxesTest() {
    var leagueBoxes = document.getElementById("leagueBoxes");

    var avalibleLeaguesIdList = [39, 78, 140, 135, 61, 88, 253, 94];
    //var avalibleLeaguesIdList = [39];
        fetch("../startup_data.json", {
            "method": "GET"})
        .then(response => response.json().then(data =>{
    
            var leagues = data['response']
    
            var btnContainer = document.createElement('div')
            btnContainer.setAttribute('class', 'button-row')
    
            for (let i=0; i<leagues.length; i++) {
                if (avalibleLeaguesIdList.includes(leagues[i]['league']['id'])) {
                    var tempButton = document.createElement('button');
                    tempButton.setAttribute('class', 'leagueButton');
                    tempButton.innerHTML = '<img src='+leagues[i]['league']['logo']+' height="90%" width="auto" padding="0px" alt='+leagues[i]['league']['name'].replace(/ /g, '')+'/>';
                    
                    var leagueId = leagues[i]['league']['name'];
    
                    tempButton.addEventListener('click', function() {
                        tempButton.classList.toggle('selected');
    
                        if (!selectedLeagues.includes(leagueId)) {
                            selectedLeagues.push(leagueId)
                        }
                        else {
                            var index = selectedLeagues.indexOf(leagueId);
                            selectedLeagues.splice(index)
                        }
                    });
    
                    // Create dropdown div
                    const dropdown = document.createElement('div');
                    dropdown.className = 'dropdown';
    
                    // Create dropdown content div
                    const dropdownContent = document.createElement('div');
                    dropdownContent.className = 'dropdown-content';
    
                    // Create grid container
                    const gridContainer = document.createElement('div');
                    gridContainer.className = 'grid-container';
    
                        
                    for (let j=0; j<16; j++) {
                        const gridItem = document.createElement('button');
                        gridItem.className = 'grid-item';
                        gridItem.innerHTML = '<img src=https://media.api-sports.io/football/leagues/2.png width=35px height=35px>'
    
                        gridItem.addEventListener('click', function() { 
                            gridItem.classList.toggle('selected');

                            if (!selectedTeams.includes('test'+j)) {
                                selectedTeams.push('test'+j)
                            }
                            else {
                                var index = selectedTeams.indexOf('test'+j);
                                selectedTeams.splice(index)
                            }
                        });
    
                        gridContainer.appendChild(gridItem);
                    }
    
                    var divider = document.createElement('hr');
                    divider.setAttribute('class', 'buttonDivider')
    
                    // Append grid container to dropdown content
                    dropdownContent.appendChild(gridContainer);
    
                    // Append button and dropdown content to dropdown div
                    dropdown.appendChild(dropdownContent);
    
                    var btnGroup = document.createElement('div');
                    btnGroup.setAttribute('class', 'button-pair')
    
                    btnGroup.appendChild(tempButton);
                    btnGroup.appendChild(divider)
                    btnGroup.appendChild(dropdownContent);
        
                    btnContainer.appendChild(btnGroup)
                }
            }
    
            leagueBoxes.appendChild(btnContainer)
            }))
    
}

function select_unselect(){
    if (this.classList.contains('selected')) {
        this.classList.remove('selected'); // Remove outline if it's already there
    } else {
        this.classList.add('selected'); // Add outline if it's not there
    }
    this.classList
}

function createHomePage() {
    createWeek();
}

function createWeek() {

    var dateTime = new Date();

    header = document.getElementById('scheduleHeader')

    for (let j=-3; j<4; j++) {
        const dayButton = document.createElement('button');
        dayButton.className = 'date-btn';
        dayButton.innerText = (dateTime.getDate()+j).toLocaleString("en-GB", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).split(',')[0];

        if (j == 0) {
            dayButton.classList.toggle('date-selected');
        }

        dayButton.addEventListener('click', function() {
            dayButton.classList.toggle('date-selected');
            });
        
        header.appendChild(dayButton);
    }

}