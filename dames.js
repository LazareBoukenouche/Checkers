var body = document.querySelector("body");
var joueur1 = true;
var selection = false;
var allWhiteMen = document.querySelectorAll('.pionBlanc');
var allBlackMen = document.querySelectorAll('.pionNoir');
var allCases = document.querySelectorAll('.row');
var allColumns = ["col10", "col9", "col8", "col7", "col6", "col5", "col4", "col3", "col2", "col1"];
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
    var col = document.querySelector(column);
    var emptyCase1Check = col.querySelector("div"+case1).classList.contains('pionBlanc');
    var emptyCase2Check = col.querySelector("div"+case2).classList.contains('pionBlanc');
    var emptyCase1 = col.querySelector("div"+case1);
    var emptyCase2 = col.querySelector("div"+case2);
    checkNextCasesEmpty(emptyCase1Check,emptyCase1,emptyCase2Check,emptyCase2);
    if (case2 == ".rowb") {
        caseTwo.style.backgroundColor="blue";
    }
        
    if (case1 == ".rowi") {
        caseOne.style.backgroundColor="blue";
    }
    
    return [col.querySelector("div"+case1),col.querySelector("div"+case2)];
    }

function moveMen(case1,case2,column) {
    colorAvailableMove(case1,case2,column)[0].classList.add("available");
    colorAvailableMove(case1,case2,column)[1].classList.add("available2");
    document.querySelector(".available").setAttribute("onclick","deplaceMen(this)");
    document.querySelector(".available2").setAttribute("onclick","deplaceMen(this)");
}

function deplaceMen(elem) {
    /* Cette fonction est utilisee lorsque l'on clique sur une des deux cases bleutees.
    Un pion apparait sur la case cliquee, et la case precedente perd son pion. La couleur de fond des deux cases bleutees est supprimee. Esnuite elle appelle la fonction removeMen */
    elem.classList.add("pionBlanc");
    
    if (document.querySelector(".pionBlanc").getAttribute('onclick') === "deplaceMen(this)") {
        document.querySelector(".available").removeAttribute("style");
        document.querySelector(".available2").removeAttribute("style");
    }
    
    removeMen(document.querySelector(".available"));
        
    }
    
function removeMen(elem) {
    let column = elem.parentNode.classList[1];
    
    for (let j= 0;j<allColumns.length;j++) {
        
        if (allColumns[j] === column) {
            var previousCol = allColumns[j+1];
        }
    }
    
    for (let i= 0;i<allRow.length;i++) {
        
        if (elem.classList[1] === allRow[i]) {
            let previousCase = document.querySelector("."+previousCol+" ."+allRow[i+1]);
            previousCase.classList.remove('pionBlanc');
            previousCase.removeAttribute('style');
        }
    }
    document.querySelector('.available').classList.remove('available');
    elem.setAttribute('onclick','selectMen(this)');
    document.querySelector('.available2').removeAttribute('onclick');
    document.querySelector('.available2').classList.remove('available2');
    selection = false;
    alert(selection);
}

function checkNextCasesEmpty(Case1Empty,caseOne,Case2Empty,caseTwo) {
    if (Case1Empty === true && Case2Empty === false)  {
        caseOne.style.border = null;
            caseTwo.style.backgroundColor="blue";
        }
        else if (Case1Empty === false && Case2Empty === true) {
            caseOne.style.backgroundColor="blue";
            caseTwo.style.border = null;
        }
        else if (Case1Empty === true && Case2Empty === true) {
            caseOne.style.backgroundColor=null;
            caseTwo.style.backgroundColor=null;
            caseOne.style.border = null;
            caseOne.style.border = null;
            
        }
        else if (Case1Empty === false && Case2Empty === false) {
            caseOne.style.backgroundColor="blue";
            caseTwo.style.backgroundColor="blue";  
        } 
}

function changePlayer() {}

function eatMen() {}

function becomeKing() {}



addSelectFunctionToWhiteMen();
addSelectFunctionToBlackMen();

