


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
        let shownData = this.tableData.getList("All time")
        let table = this.elementGenerator.getTableContentElement(shownData)
        table.id = this.tableId
        return table
    }

    clearTable() {
        document.getElementById(this.tableId).remove() 
    }
}

class ContentManager{
    constructor() { 



    }
}



export {TableContentManager}