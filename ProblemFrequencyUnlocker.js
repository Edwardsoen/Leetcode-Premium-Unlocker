





function ProblemTableManager() { 

    this.observer = new MutationObserver(() => {
        console.log("Testing")
        getProblemSets()
    });


    function initialize() { 
        getProblemSets()
        addObserverToProblemTable()
    }

    function getProblemSets() {     
        disconnectObserverToProblemTable()
        let table = document.querySelector('[role="rowgroup"]')
        let problemsets = table.querySelectorAll('[role="row"]')
        let problems = []
        
        for(let i =0; i <= problemsets.length -1 ; i ++) { 
            let cells = problemsets[i].querySelectorAll('[role="cell"]')
            let problemName = cells[1].textContent
            let problemUrl = cells[1].getElementsByTagName('a')[0].href 
            let problemFrequencyProgressbar = cells[cells.length -1]
            removeProgressbarUnlockButton(problemFrequencyProgressbar)
            insertInnerProgressbar(problemFrequencyProgressbar)
        }
        addObserverToProblemTable()
        return problems
    }

    function insertInnerProgressbar(progressBar, width) { 
        let innerProgressbarClassName = "inner-progresbar"
        let innerProgressbar = progressBar.getElementsByClassName(innerProgressbarClassName)

        if(innerProgressbar.length > 0) { 
            // modify current bar instead of adding new progressbar 
            return 
        }
        let outerProgressbar = progressBar.getElementsByClassName('rounded-l-lg')[0]
        let progress = document.createElement('div')
        progress.style = `
        background-color: red;
        width: 20%;
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