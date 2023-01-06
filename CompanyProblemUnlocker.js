

//#region structs 
class CompanyButtonInfo { 
    constructor(companyName, companyButtonElement) { 
        this.name = companyName
        this.button = companyButtonElement
    }
}


class ProblemInfo{ 
    constructor(frequency, id, difficulty, problemUrl, problemName, acceptance) { 
        this.frequency = frequency 
        this.id = id
        this.difficulty = difficulty
        this.problemUrl = problemUrl 
        this.problemName = problemName
        this.acceptance = acceptance
    }
}

class CompanyProblemInfo extends ProblemInfo { 
    constructor(frequency, id, difficulty, problemUrl, problemName, acceptance, companyName, duration) { 
        super(frequency, id, difficulty, problemUrl, problemName, acceptance) 
        this.companyName = companyName
        this.duration = duration
    }
}

//#endregion 



//#region testing functions 
function grabData() { 
    let url = "https://www.npoint.io/documents/b37ca078aab84f3e1a80"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText)["contents"]
}

class GoogleSheetsDataFetcher{ 
    //TODO: change to asnyc
    constructor() { 
        this.sheetsId = "1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE"
        this.api_key = "AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs"
        this.companyPageTableData = {}
        let pageTable = this.fetchPageTable() //cache company data location to avoid 2 round trip when company button is clicked
        this.setCompanyPageTableData(pageTable)
    }

    getUrl (range) {
        return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetsId}/values/${range}?key=${this.api_key}`
    }

    fetchPageTable() { 
        let range = "Map!A:C"
        let url = this.getUrl(range)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); 
        xmlHttp.send();
        return JSON.parse(xmlHttp.responseText)
    }

    setCompanyPageTableData(responseData) { 
        let companyList = responseData["values"]
        for(let i =1; i <= companyList.length-1; i ++) { 
            let companyName = companyList[i][0]
            let starRow = companyList[i][1]
            let endRow = companyList[i][2]
            this.companyPageTableData[companyName] = [starRow, endRow]
        }
    }

    haveData(companyName) { 
        return companyName in this.companyPageTableData
    }

    getCompanyProblemData(companyName) { 
        let response = this.fetchCompanyProblemData(companyName)
        return this.parseData(response)
    }

    fetchCompanyProblemData(companyName){ 
        if(!this.haveData(companyName)) return []
        let startRow =  this.companyPageTableData[companyName][0]
        let endRow =  this.companyPageTableData[companyName][1]
        let companyDataSheetName = "CompanyData"
        let range = `${companyDataSheetName}!A${startRow}:I${endRow}` 
        let url = this.getUrl(range)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); 
        xmlHttp.send(); //do error handling
        let response = JSON.parse(xmlHttp.responseText)
        return response["values"]
    }

    parseData(data) { 
        let targetCompanyData = []
        for(let i =0; i <= data.length - 1; i ++ ){ 
            let frequency =  data[i][4]
            let id = data[i][0]
            let difficulty = data[i][3]
            let problemUrl =  data[i][5]
            let problemName = data[i][1]
            let acceptance = data[i][2]
            let companyName = data[i][6]
            let duration = data[i][7]
            let problemInfo = new CompanyProblemInfo(frequency,id,difficulty,problemUrl,problemName,acceptance,companyName,duration)
            targetCompanyData.push(problemInfo)
        }
        return targetCompanyData
    }
}

class DataFetcher { 
    constructor(fetcher){ 
        this.fetcher = new fetcher()
    }
}

function parseCompanyProblemData(data) { 
    // parse incoming data 
    let allTimeData = []
    let returnData = {"All Time": allTimeData} // {duration:[rows]}
    for(let i = 0; i <= data.length-1; i ++) {  
        let frequency = data[i]["occurance"]
        let id = "0"
        let difficulty = "hard"
        let problemUrl = data[i]["url"]
        let problemName = data[i]["problem"]
        let acceptance = "100%"
        let problemObject = new ProblemInfo (frequency, id, difficulty, problemUrl, problemName, acceptance)
        allTimeData.push(problemObject)
    }
    return returnData
}

//#endregion

function TableElementGenerator() { 
    //create table content from data passed

    function generateTextCell(text) { 
        let div = document.createElement('div')
        let h3 = document.createElement('h3')
        h3.textContent = text
        h3.style = `color: black;
        text-align: center;
        `
        div.appendChild(h3)
        return div
    }

    function generateProblemIdCell(text) { 
       let div = generateTextCell(text)
       div.style = `
       width: 5%
       `
       return div
    }

    function generateProblemFrequencyCell(percentage){ 
        let progressBar = document.createElement('div')
        progressBar.style = `
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color: #e9ecef;
        border-radius: 0.25rem;
        margin-top: auto;
        margin-bottom: auto;
        width:10%; 
        `

        let progress = document.createElement('div')
        progress.style = `
        height:100%; 
        width:20%; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        color: #fff;
        background-color: #0d6efd;
        `
        progressBar.appendChild(progress)
        return progressBar
    }

    function generateProblemNameCell(problem_name, problem_url) { 
        let problemCell = document.createElement('div')
        let a = document.createElement('a')
        a.href = problem_url
        a.textContent = problem_name
        problemCell.appendChild(a)
        problemCell.style = `
        width: 50%
        `
        return problemCell
    }

    function generateProblemDifficultyCell(text) {
        let div = generateTextCell(text)
        div.style = `
        width: 12%
        `
        return div
    }

    function generateProblemAcceptanceCell(text) { 
        let div = generateTextCell(text)
        div.style = `
        width: 10%
        `
        return div
    }

    function generateRowDiv(){ 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        border-top: solid 1px black;
        `
        return row
    }

    function generateHeaderRow() { 
        let row = generateRowDiv()
        row.appendChild(generateProblemIdCell("#"))
        row.appendChild(generateProblemNameCell("Title", "#"))
        row.appendChild(generateProblemAcceptanceCell("Acceptance"))
        row.appendChild(generateProblemDifficultyCell("Difficulty"))
        row.appendChild(generateProblemAcceptanceCell("Frequency"))
        return row
    }

    this.getTableContentElement = function(data) { 
        // data = [problemObject1, problemObject2....]
        let parentDiv = document.createElement('div')
        parentDiv.appendChild(generateHeaderRow())
        for(let i = 0; i <= data.length-1; i ++) {        
            let row = generateRowDiv()        

            let frequency = data[i].frequency
            let id = data[i].id
            let difficulty = data[i].difficulty
            let problemUrl = data[i].problemUrl
            let problemName = data[i].problemName
            let acceptance = data[i].acceptance

            row.appendChild(generateProblemIdCell(id))
            row.appendChild(generateProblemNameCell(problemName, problemUrl))
            row.appendChild(generateProblemAcceptanceCell(acceptance))
            row.appendChild(generateProblemDifficultyCell(difficulty))
            row.appendChild(generateProblemFrequencyCell(frequency))

            parentDiv.append(row)
        }
        return parentDiv
    }
}

class TableContentManager{ 
    constructor(data) { 
        this.tableId = "table-content"
        this.tableData = data
        this.elementGenerator = new TableElementGenerator(); 
    } 

    generateDurationButton(data) {
        let button = document.createElement('button')   
        button.innerText =data
        button.style = ` 
        width:5%
        `
        button.setAttribute("duration", data)
        button.addEventListener('click', onDurationButtonClicked.bind(this))
        return button
    }

    onDurationButtonClicked(event) { 
        while (this.parentDiv.firstChild) {
            this.parentDiv.removeChild(myNode.lastChild);
          }
    }

    generateDurationButtons() { 
        let row = generateRowDiv()
        row.appendChild(generateDurationButton("6 months"))
        row.appendChild(generateDurationButton("1 year"))
        row.appendChild(generateDurationButton("2 years"))
        row.appendChild(generateDurationButton("All time"))
        return row
    }

    getContentElement() {  
        let shownData = this.tableData["All Time"]
        let table = this.elementGenerator.getTableContentElement(shownData)
        table.id = this.tableId
        return table
    }

    clearTable() {
        document.getElementById(this.tableId).remove() 
    }
}

//#region 



function CompanySwipperManager() { 
    //detect changes in swipper & react accordingly 
    this.onCompanyButtonClick = []

    this.addOnCompanyButtonClickEvent = function(func) { 
        this.onCompanyButtonClick.push(func)
    }

    this.initialize= function () { 
        registerClickEventListenerToCompanyButton(this.onCompanyButtonClick)
        addObserverToCompaniesSection(this.onCompanyButtonClick)
    }

    function getActiveCompaniesTags() { 
        data = []  // Company objects // obj.companyName & obj.button
        let swipers = document.getElementsByClassName('swiper-slide-active')
        let swiper = swipers[swipers.length-1]
        let links = swiper.getElementsByTagName('a')
        for(let ii = 0; ii <= links.length-1; ii ++) {
            let companyName = extractCompanyNameFromHref(links[ii].href)
            links[ii].href = "javascript:void(0)"
            let companyObject = new CompanyButtonInfo(companyName, links[ii])
            data.push(companyObject)
        }
        return data
    }

    function extractCompanyNameFromHref(href) { 
        let url = href.split("/") 
        return url[url.length-1]
    } 


    function addObserverToCompaniesSection(onCompanyButtonClick) {
        var swipper =  document.getElementsByClassName("mt-0")[0]
        const observer = new MutationObserver(() => {
            registerClickEventListenerToCompanyButton(onCompanyButtonClick)
        });
    
        if(!swipper) {
            window.setTimeout(() => {addObserverToCompaniesSection()} ,500);
            return;
        }
        var config = {childList: true, subtree: true,  attributes: true, attributeFilter: ['class']};
        observer.observe(swipper,config);
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

//#endregion


//#region  

class ModalManager{ 
    constructor() { 
        this.modal = this.createModal()
        this.modalContentBox = this.createModalContentBox()
        this.appendToModal(this.modalContentBox)
        this.appendModal(document.body)
    }

    createModalContentBox() {
        let modalContentBox = document.createElement('div')
        modalContentBox.style = `
        background-color: #fefefe;
        margin-top:1%; 
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 80%;
        mid-height: 15%
        `
        return modalContentBox
    }

    getModalContentBox() { 
        return this.modalContentBox
    }

    appendModal(targetParent) {
        targetParent.appendChild(this.modal)
    }

    appendToModal(targetElement) { 
        this.modal.appendChild(targetElement)
    } 
    
    appendToContainer(targetElement) { 
        this.modalContentBox.appendChild(targetElement)
    }

    createCloseButton() { 
        let closeButton = document.createElement('span')
        closeButton.style = ` 
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        `

        closeButton.innerText = "x"
        closeButton.addEventListener('click', resetModal)
        return closeButton
    }

    createModal() { 
        let modal = document.createElement('div')
        modal.style = ` 
        display: none; 
        position: fixed; 
        z-index: 32;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        `
        window.addEventListener('click', this.onModalClicked)
        modal.id = "CompanyModal"
        return modal
    }

    openModal() { 
        this.modal.style.display = ""
    }

    closeModal() { 
        this.modal.style.display = "none"
    }

    clearModalContent() { 
        while(this.modalContentBox.firstChild != undefined) { 
            this.modalContentBox.firstChild.remove()
        }
    }

    onModalClicked = (event) =>  { 
        if (event.target == this.modal) {
            this.resetModal()
        }
    } 

    resetModal = () => {  
        this.closeModal()
        this.clearModalContent()
    }
}

class ContainerManager{ 

}

//#endregion

var vipData = grabData()
var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperManager(); 

companySwipperManager.addOnCompanyButtonClickEvent((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    let temp = vipData[companyName] || []
    let data = parseCompanyProblemData(temp)
    let tableManagerObject = new TableContentManager(data)
    let table = tableManagerObject.getContentElement()
    modalManager.appendToContainer(table)
    modalManager.openModal()
})
companySwipperManager.initialize()