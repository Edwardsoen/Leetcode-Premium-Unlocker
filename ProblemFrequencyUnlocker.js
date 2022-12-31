

function Problem() { 
    this.name
    this.isPremium
    this.slider 
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

