
//#region Objects

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


//#region on Company button clicked

function companyProblemTableManager() { 

    function generate_text_cell(text) { 
        let div = document.createElement('div')
        let h3 = document.createElement('h3')
        h3.textContent = text
        h3.style = `color: black;
        text-align: center;
        `
        div.appendChild(h3)
        return div
    }

    function generate_problem_id_cell(text) { 
       let div = generate_text_cell(text)
       div.style = `
       width: 5%
       `
       return div
    }

    function generate_problem_frequency_cell(percentage){ 
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

    function generate_button(data) {
        let button = document.createElement('button')   
        button.innerText =data
        button.style = ` 

        width:3%
        `
        return button
    }


    function generate_problem_difficulty_cell(text) {
        let div = generate_text_cell(text)
        div.style = `
        width: 12%
        `
        return div
    }

    function generate_problem_acceptance_cell(text) { 
        let div = generate_text_cell(text)
        div.style = `
        width: 10%
        `
        return div
    }

    function generate_row_div(){ 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        border-top: solid 1px black;
        `
        return row
    }

    function generate_buttons(data) { 
        
    }

    
    
    function generate_header_row() { 
        let row = generate_row_div()
        row.appendChild(generate_problem_id_cell("#"))
        row.appendChild(generate_problem_name_cell("Title", "#"))
        row.appendChild(generate_problem_acceptance_cell("Acceptance"))
        row.appendChild(generate_problem_difficulty_cell("Difficulty"))
        row.appendChild(generate_problem_acceptance_cell("Frequency"))
        row.appendChild(generate_button("test"))
        row.appendChild(generate_button("test2"))
        row.appendChild(generate_button("test3"))
        return row
    }
    

    this.create_problem_table = function(data) { 
        let parentDiv = document.createElement('div')
        parentDiv.appendChild(generate_header_row())
        

        for(let i = 0; i <= data.length-1; i ++) {        
            let row = generate_row_div()
            
            let frequency = data[i]["occurance"]
            let id = "0"
            let difficulty = "hard"
            let problemUrl = data[i]["url"]
            let problemName = data[i]["problem"]
            let acceptance = "100%"


            
            row.appendChild(generate_problem_id_cell(id))
            row.appendChild(generate_problem_name_cell(problemName, problemUrl))
            row.appendChild(generate_problem_acceptance_cell(acceptance))
            row.appendChild(generate_problem_difficulty_cell(difficulty))
            row.appendChild(generate_problem_frequency_cell(frequency))

            parentDiv.append(row)
        }
        return parentDiv
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
    modalManager.openAndAddContentToModal(new companyProblemTableManager().create_problem_table(data))
})
companySwipperManager.initialize()