var body = document.querySelector("body");
var joueur1 = true;
var selection = false;
var allWhiteMen = document.querySelectorAll('.pionBlanc');
var allBlackMen = document.querySelectorAll('.pionNoir');
var allCases = document.querySelectorAll('.row');
var allRow = ['rowa', 'rowb', 'rowc', 'rowd', 'rowe', 'rowf', 'rowg', 'rowh', 'rowi', 'rowj'];

function selectMen(elem) {
    // Check if the function was raised once
    if (selection === false) {
        selection = true; 
        // Get the column, the case and the number of the case
        let colonne = elem.parentNode;
        let casesList = [];
        casesList.push(elem);
        let menSelected = casesList[0];
        let menSelectedNumber = casesList[0].classList[3];
        var menSelectedRowLetter = casesList[0].classList[1];
        var previousRow = colonne.previousElementSibling;
        
        let availableCase1 = "."+ showAvailableMove(menSelectedRowLetter, previousRow)[0];
        let availableCase2 ="."+ showAvailableMove(menSelectedRowLetter, previousRow)[1];
        let availableColumn ="."+ showAvailableMove(menSelectedRowLetter, previousRow)[2].classList[1];
        glowSelectedMen(menSelected);
        getNextCasesCoord(menSelectedRowLetter, previousRow);

        colorAvailableMove(availableCase1,availableCase2,availableColumn);
        selection = false;
        moveMen(availableCase1,availableCase2,availableColumn);
        selection = true;
        
        
        
    }
}

function addSelectFunctionToWhiteMen() {
    allWhiteMen.forEach(function(elem){
        elem.setAttribute("onclick","selectMen(this)");  
    });
}

function addSelectFunctionToBlackMen() {
    allBlackMen.forEach(function(elem){
        elem.setAttribute("onclick","selectMen(this)");  
    });
}

function glowSelectedMen(elem) {
    // Make the selected men glow white
    elem.style.borderColor = "white";
}

function getNextCasesCoord(letterCase, previousCol) {
    /* Check the letter of the current case and return the letters of the previous and next case on the next column */
    for (let i = 0;i< allRow.length;++i) {
        if (letterCase == allRow[i]) {
            let nextRow = allRow[i+1];
            let precedentRow = allRow[i-1];
            let coordNextCase = [precedentRow,nextRow, previousCol];
            return coordNextCase;
        }
    }
    
}

function showAvailableMove(letterCase,previousRow) {
    return [getNextCasesCoord(letterCase, previousRow)[0],getNextCasesCoord(letterCase, previousRow)[1],getNextCasesCoord(letterCase, previousRow)[2]];
}

function colorAvailableMove(case1,case2,column) {
    let col = document.querySelector(column);
    if (case2 != ".rowb" && case1 != "rowi") {
        col.querySelector("div"+case1).style.backgroundColor="blue";
        col.querySelector("div"+case2).style.backgroundColor="blue";
    }
    if (case2 == ".rowb") {
        col.querySelector("div"+case2).style.backgroundColor="blue";
    }
    if (case1 == ".rowi") {
        col.querySelector("div"+case1).style.backgroundColor="blue";
    }
    return [col.querySelector("div"+case1),col.querySelector("div"+case2)]
}

function moveMen(case1,case2,column) {
    colorAvailableMove(case1,case2,column)[0].classList.add("available");
    colorAvailableMove(case1,case2,column)[1].classList.add("available2");
    document.querySelector(".available").setAttribute("onclick","deplaceMen(this)");
    document.querySelector(".available2").setAttribute("onclick","deplaceMen(this)");
}

function deplaceMen(elem) {
    /* Cette fonction est utilisee lorsque l'on clique sur une des deux cases bleutees.
    Un pion apparait sur la case cliquee, et la case precedente perd son pion. La couleur de fond des deux cases bleutees est supprimee */
    elem.classList.add("pionBlanc");
    if (document.querySelector(".pionBlanc").getAttribute('onclick') === "deplaceMen(this)") {
        document.querySelector(".pionBlanc").removeAttribute("style");
    }
}

function changePlayer() {}

function eatMen() {}

function becomeKing() {}

function checkNextCasesEmpty(nextCase1,nextCase2) {}

addSelectFunctionToWhiteMen();
addSelectFunctionToBlackMen();

