
//#region Objects

function Problem() { 
    this.name
    this.isPremium
    this.slider 
}

function Company() { 
    this.name 
    this.button
}

//#endregion

function grabData() { 
    let url = "https://www.npoint.io/documents/b37ca078aab84f3e1a80"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText)["contents"]
}



function getProblemSets() {     
    let problemsets = document.querySelectorAll('[role="row"]')
    let problems = []

    for(let i =1; i <= problemsets.length -1 ; i ++) { 
        let cells = problemsets[i].querySelectorAll('[role="cell"]')
        let href = problemsets[i].getElementsByTagName('a')[0].href

        let problemName = getProblem(href)
        let slider = cells[cells.length-1]

        let isPremiumProblem = cells[1].getElementsByTagName('svg').length >= 1

        let problemOject = new Problem(); 
        problemOject.name = problemName; 
        problemOject.isPremium = isPremiumProblem; 
        problemOject.slider = slider; 

        problems.push(problemOject)
    
    }
    return problems
}


function getProblem(url) {
    data = url.split("/") 
    return data[data.length-2]
}





//#region on Company button clicked

function createCompanyDataDiv(data) {
    let parentDiv = document.createElement('div')
    for(let i = 0; i <= data.length-1; i ++) {        
        let row = document.createElement('div')
        row.style = `
        display:flex;
        justify-content:space-around; 
        border-bottom: solid 1px black;
        border-top: solid 1px black;
        `

        
        let occuranceCell = createCell(data[i]["occurance"])
        let difficultyCell = createCell("Hard")
        let problemCell = document.createElement('div')
        let a = document.createElement('a')
        a.href = data[i]["url"]
        a.textContent = data[i]["problem"]
        a.style = `
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        color: inherit; 
        `
        problemCell.appendChild(a)
        row.appendChild(occuranceCell)
        row.appendChild(problemCell)
        row.appendChild(difficultyCell)
        parentDiv.append(row)
    }
    return parentDiv
}


function createCell(text) { 
    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    h3.textContent = text
    div.appendChild(h3)
    return div
}








function CompanySwipperManager() { 
    this.onCompanyButtonClick = []

    this.addOnCompanyButtonClickEvent = function(func) { 
        this.onCompanyButtonClick.push(func)
    }

    this.initialize= function () { 
        registerClickEventListenerToCompanyButton(this.onCompanyButtonClick)
        addObserverToCompaniesSection()
    }
    

    function getActiveCompaniesTags() { 
        data = []  // Company objects // obj.companyName & obj.button
        let swipers = document.getElementsByClassName('swiper-slide-active')
        let swiper = swipers[swipers.length-1]
        let links = swiper.getElementsByTagName('a')
        for(let ii = 0; ii <= links.length-1; ii ++) {
            let link    = links[ii].href.split("/") 
            links[ii].href = "#"
            let companyName = links[ii].firstChild.firstChild.textContent
            let companyObject = new Company()
            companyObject.name = companyName; 
            companyObject.button = links[ii]
            data.push(companyObject)
        }
        return data
    }

    function addObserverToCompaniesSection(data) {
        var composeBox =  document.getElementsByClassName('mt-0')[0]
        const observer = new MutationObserver(() => {
            registerClickEventListenerToCompanyButton(this.onCompanyButtonClick)
        });
    
        if(!composeBox) {
            window.setTimeout(() => {addObserverToCompaniesSection(data)} ,500);
            return;
        }
    
        var config = {childList: true, subtree: true};
        observer.observe(composeBox,config);
    }

    function registerClickEventListenerToCompanyButton(onCompanyButtonClick) { 
        let companyList = getActiveCompaniesTags()
        for(let i =0; i <= companyList.length -1; i ++) { 
            let companyName = companyList[i].name 
            if (companyList[i].button.getAttribute("listener-registered") != true) { 
                companyList[i].button.setAttribute("listener-registered", "true")
                companyList[i].button.setAttribute("company-name", companyName)
                for(let funcCount = 0; funcCount <= onCompanyButtonClick.length -1; funcCount ++) { 
                    companyList[i].button.addEventListener("click", onCompanyButtonClick[funcCount]);
                }
            }
        }
    }
    


}

function ModalManager (){ 
    function initializeModal() { 
        let modal = document.createElement('div')

        modal.style = ` 
        display: none; 
        position: fixed; 
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4); 
        `

        let closeButton = document.createElement('span')
        closeButton.style = ` 
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        `

        closeButton.innerText = "x"
        closeButton.addEventListener('click', closeAndClearModal)
        
        window.onclick = function(event) {
            if (event.target == modal) {
                closeAndClearModal()
            }
        }

        let modalContentBox = document.createElement('div')
        modalContentBox.style = `
        background-color: #fefefe;
        margin: 15% auto; 
        padding: 20px;
        border: 1px solid #888; 
        width: 80%;
        mid-height: 15%
        `

        modalContentBox.appendChild(closeButton)
        modal.appendChild(modalContentBox)
        document.body.appendChild(modal)
        modal.id = "CompanyModal"
    }

    this.openAndAddContentToModal = function(content) { 
        let modal = document.getElementById("CompanyModal")
        content.id = "CompanyModal-content"
        modal.firstChild.appendChild(content)
        modal.style.display = ""
    }

    function closeAndClearModal() {  
        let modal = document.getElementById("CompanyModal")
        let modalContent = document.getElementById("CompanyModal-content")
        modal.style.display = "none"
        if (modalContent != undefined) {
            modal.firstChild.removeChild(modalContent)
        } 
    }

    initializeModal()
}






var vipData = grabData()
var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperManager(); 
companySwipperManager.addOnCompanyButtonClickEvent((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    modalManager.openAndAddContentToModal(createCompanyDataDiv(vipData[companyName]))
})
companySwipperManager.initialize()