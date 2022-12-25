
function Problem() { 
    this.name
    this.isPremium
    this.slider 
}

function Company() { 
    this.name 
    this.button
}


function PageAnalyzer () { 
    this.getPageInfo = function () { 
        this.url = window.location.href 
        let expression = this.url.split("/")

        if(expression.includes("problems")) { 
            let problem = getProblem(this.url)
        }

        if (expression.includes("problemset")) { 
            let data = getProblemSets()
            let CompanyData = getCompaniesTags()
        }
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
        console.log(data[data.length-2])
        return data[data.length-2]
    }

    function getCompaniesTags() { 
        data = []
        let swiper = document.getElementsByClassName('swiper-slide')
        for(let i = 0; i <= swiper.length -1; i ++) {
            let links = swiper[i].getElementsByTagName('a')
            for(let ii = 0; ii <= links.length-1; ii ++) {
                let link = links[ii].href.split("/") 
                links[ii].href = "#"
                let companyName = link[link.length-1]
                let companyObject = new Company()
                companyObject.name = companyName; 
                companyObject.button = links[ii]
                
                data.push(companyName)
            }
        } 
        return data
    }
}







function setSliderData() { 

}

function setCompanyData(data) {
    let parentDiv = document.createElement('div')
    
    
    
    
    let row = document.createElement('div')
    row.style = `
    display:flex;
    justify-content:space-around; 
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    `
    let occuranceCell = createCell("122")
    let difficultyCell = createCell("Hard")

    let problemCell = document.createElement('div')
    let a = document.createElement('a')
    a.href = "testing"
    a.textContent = "hello"
    a.style = `
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    `
    problemCell.appendChild(a)
    



    row.appendChild(occuranceCell)
    row.appendChild(problemCell)
    row.appendChild(difficultyCell)



    


    parentDiv.append(row)
    return parentDiv
}


function createCell(text) { 
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.textContent = text
    div.appendChild(h2)
    return div
}


new PageAnalyzer().getPageInfo()







function openPopupWindow(divContent) {
    popupWindow = window.open("",'_blank','height=500,width=500,left=100,top=100');
    popupWindow.document.body.appendChild(divContent); 
}

openPopupWindow(setCompanyData())
