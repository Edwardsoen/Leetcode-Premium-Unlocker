
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
            console.log(problem)
        }

        if (expression.includes("problemset")) { 
            let data = getProblemSets()
            let CompanyData = getCompaniesTags()
            console.log(CompanyData)
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

            let isPremiumProblem = cells[1].getElementsByTagName('svg') == undefined

            let problemOject = new Problem(); 
            problemOject.name = problemName; 
            problemOject.isPremium = isPremiumProblem; 
            problemName.slider = slider; 

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






new PageAnalyzer().getPageInfo()
