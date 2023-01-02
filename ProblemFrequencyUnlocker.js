
function fetchData() { 
    let url = "https://www.npoint.io/documents/d318594e0f0c84ac0e25"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText)["contents"]
}


function ProblemTableManager() { 
    this.data = []
    
    this.observer = new MutationObserver(() => {
        getProblemSets(this.data)
    });

    
    function initialize() { 
        getProblemSets(this.data)
        addObserverToProblemTable()
    }

    function getProblemSets(data) {     
        disconnectObserverToProblemTable()
        let table = document.querySelector('[role="rowgroup"]')
        let problemsets = table.querySelectorAll('[role="row"]')
        let problems = []
        
        for(let i =0; i <= problemsets.length -1 ; i ++) { 
            let cells = problemsets[i].querySelectorAll('[role="cell"]')
            let problemName = cells[1].textContent
            let frequency = this.data[problemName] == undefined? "0%" : this.data[problemName][6]
            let width = frequency == undefined? 0:frequency.replace("%", "")          
            let problemFrequencyProgressbar = cells[cells.length -1]
            removeProgressbarUnlockButton(problemFrequencyProgressbar)
            insertInnerProgressbar(problemFrequencyProgressbar, width)
        }
        addObserverToProblemTable()
        return problems
    }

    function insertInnerProgressbar(progressBar, width) { 
        let innerProgressbarClassName = "inner-progresbar"
        let innerProgressbar = progressBar.getElementsByClassName(innerProgressbarClassName)

        if(innerProgressbar.length > 0) { 
            // modify current bar instead of adding new progressbar 
            innerProgressbar.style = `
            width: ${width}%;
            `
            return 
        }
        let outerProgressbar = progressBar.getElementsByClassName('rounded-l-lg')[0]
        let progress = document.createElement('div')
        progress.style = `
        background-color: red;
        width: ${width}%;
        height: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        `
        progress.classList.add(innerProgressbarClassName)
        outerProgressbar.appendChild(progress)
    }

    function disconnectObserverToProblemTable() { 
        this.observer.disconnect()
    }

    function addObserverToProblemTable() { 
        let table = document.querySelector('[role="table"]')
        var config = {childList: true, subtree: true};
        this.observer.observe(table,config);
    }

    function removeProgressbarUnlockButton(progressbar) {
        let lockLogo = progressbar.getElementsByTagName("svg")[0]
        let leftBar = progressbar.getElementsByClassName('rounded-r-lg')[0]
        let rightBar = progressbar.getElementsByClassName('rounded-l-lg')[0]
        if (lockLogo!= undefined) lockLogo.remove(); 
        if (leftBar!= undefined) leftBar.remove()
        if (rightBar != undefined){
            rightBar.style = `
            border-bottom-right-radius: 0.5rem;
            border-top-right-radius: 0.5rem
            `
        }

    }
    initialize()
}




ProblemTableManager()