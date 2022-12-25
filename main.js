
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

function PageData() { 
    this.problemData = []
    this.companiesData = []
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

function getActiveCompaniesTags() { 
    data = []
    let swipers = document.getElementsByClassName('swiper-slide-active')
    let swiper = swipers[swipers.length-1]
    let links = swiper.getElementsByTagName('a')
    for(let ii = 0; ii <= links.length-1; ii ++) {
        let link = links[ii].href.split("/") 
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
        console.log("testing"); 
        addClickListenerToCompanyButton(getActiveCompaniesTags(), data)
    });

    if(!composeBox) {
        window.setTimeout(() => {addObserverToCompaniesSection(data)} ,500);
        return;
    }
    
    var config = {childList: true, subtree: true};
    observer.observe(composeBox,config);
}

function PageAnalyzer () { 
    this.getPageInfo = function () { 
        this.url = window.location.href 
        let expression = this.url.split("/")

        if(expression.includes("problems")) { 
            let problem = getProblem(this.url)
            let pageData = new PageData(); 
            pageData.problemData = data
            return pageData
        }

        if (expression.includes("problemset")) { 
            let data = getProblemSets()
            let CompanyData = getActiveCompaniesTags()
            let pageData = new PageData(); 
            pageData.problemData = data
            pageData.companiesData = CompanyData
            return pageData
        }
    }


}




//#region on Company button clicked

function setCompanyData(data) {
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


function openPopupWindow(divContent) {
    popupWindow = window.open("",'_blank','height=500,width=1000,left=100,top=100');
    popupWindow.document.body.appendChild(divContent); 
}

function createOnClickFunction(data) { 
    return () => {
        openPopupWindow(setCompanyData(data))
    }
}

//#endregion












function addClickListenerToCompanyButton(companyList, premiumData) { 
    for(let i =0; i <= companyList.length -1; i ++) { 
        let companyName = companyList[i].name 
        companyList[i].button.addEventListener("click", createOnClickFunction(premiumData[companyName]));
    }
}







var vipData = grabData()
addClickListenerToCompanyButton(getActiveCompaniesTags(), vipData)
addObserverToCompaniesSection(vipData)