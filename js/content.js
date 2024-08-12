startExtension();

var followingLeagues = [];
var followingTeams = [];
var followingCompetitions = [];

function startExtension() {
    displayStartMenu();
}

function displayStartMenu() {
    document.getElementById("startMenu").style.display="block";
    createLeagueBoxes();
    //createLeagueBoxesTest();
    document.getElementById("startBtn").addEventListener("click", displayLeagueSelectionMenu);
    
}

function displayLeagueSelectionMenu() {
    document.getElementById("startMenu").style.display="none";
    document.getElementById("leagueSelection").style.display="block";
    document.getElementById("nextBtn").addEventListener("click", displayHomePage);
}

function displayHomePage() {
    createHomePage();
    document.getElementById("leagueSelection").style.display="none";
    document.getElementById("homePage").style.display="block"

}