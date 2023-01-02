



function Company() { 
    this.name 
    this.button
}



function grabData() { 
    let url = "https://www.npoint.io/documents/b37ca078aab84f3e1a80"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText)["contents"]
}


function tableContentManager() { 

    this.getTableContent = function(data) { 


    }
}



function tableManager() { 
    this.parentDiv = document.createElement('div')

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

    function generate_problem_name_cell(problem_name, problem_url) { 
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

    function generateDurationButton(data) {
        let button = document.createElement('button')   
        button.innerText =data
        button.style = ` 
        width:5%
        `
        button.setAttribute("duration", data)
        button.addEventListener('click', onDurationButtonClicked.bind(this))
        return button
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

    function onDurationButtonClicked(event) { 
        console.log(this.parentDiv)
        while (this.parentDiv.firstChild) {
            this.parentDiv.removeChild(myNode.lastChild);
          }
    }

    function generateDurationButtons() { 
        let row = generateRowDiv()
        row.appendChild(generateDurationButton("6 months"))
        row.appendChild(generateDurationButton("1 year"))
        row.appendChild(generateDurationButton("2 years"))
        row.appendChild(generateDurationButton("All time"))
        return row
    }

    function generate_header_row() { 
        let row = generateRowDiv()
        row.appendChild(generateProblemIdCell("#"))
        row.appendChild(generate_problem_name_cell("Title", "#"))
        row.appendChild(generateProblemAcceptanceCell("Acceptance"))
        row.appendChild(generateProblemDifficultyCell("Difficulty"))
        row.appendChild(generateProblemAcceptanceCell("Frequency"))
        return row
    }
    

    this.create_problem_table = function(data) { 
        this.parentDiv.appendChild(generateDurationButtons())
        this.parentDiv.appendChild(generate_header_row())
        

        for(let i = 0; i <= data.length-1; i ++) {        
            let row = generateRowDiv()
            
            let frequency = data[i]["occurance"]
            let id = "0"
            let difficulty = "hard"
            let problemUrl = data[i]["url"]
            let problemName = data[i]["problem"]
            let acceptance = "100%"


            row.appendChild(generateProblemIdCell(id))
            row.appendChild(generate_problem_name_cell(problemName, problemUrl))
            row.appendChild(generateProblemAcceptanceCell(acceptance))
            row.appendChild(generateProblemDifficultyCell(difficulty))
            row.appendChild(generateProblemFrequencyCell(frequency))

            this.parentDiv.append(row)
        }
        return this.parentDiv
    }

    
}

function CompanySwipperManager() { 
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
            let link    = links[ii].href.split("/") 
            links[ii].href = "javascript:void(0)"
            let companyName = links[ii].firstChild.firstChild.textContent
            let companyObject = new Company()
            companyObject.name = companyName; 
            companyObject.button = links[ii]
            data.push(companyObject)
        }
        return data
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

function ModalManager (){ 
    function initializeModal() { 
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

        let closeButton = document.createElement('span')
        closeButton.style = ` 
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
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
        margin-top:1%; 
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 80%;
        mid-height: 15%
        `

        // modalContentBox.appendChild(closeButton)
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
    let data = vipData[companyName] || []
    let tableDiv = new tableManager().create_problem_table(data)
    modalManager.openAndAddContentToModal(tableDiv)
})
companySwipperManager.initialize()