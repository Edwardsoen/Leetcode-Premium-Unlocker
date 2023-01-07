
import { CompanyProblemDurations } from "./Objects"

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
        progressBar.setAttribute("title", String(Math.round(percentage*100)) + "%")
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
        width:${percentage*100}%; 
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

    function generateProblemAcceptanceCell(percentage) { 
        let div = generateTextCell(Math.round(percentage * 100) + "%")
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

    this.getTableHeaderElement = function() { 
        let row = generateRowDiv()
        let idHeaderCell = generateProblemIdCell("#")
        let titleHeaderCell = generateProblemNameCell("Title", "#")
        let acceptanceHeaderCell= generateProblemDifficultyCell("Acceptance")
        let difficultyHeaderCell= generateProblemDifficultyCell("Difficulty")
        let frequencyHeaderCell= generateProblemDifficultyCell("Frequency")

        idHeaderCell.setAttribute("role", "modal-header")
        titleHeaderCell.setAttribute("role", "modal-header")
        acceptanceHeaderCell.setAttribute("role", "modal-header")
        difficultyHeaderCell.setAttribute("role", "modal-header")
        frequencyHeaderCell.setAttribute("role", "modal-header")

        row.appendChild(idHeaderCell)
        row.appendChild(titleHeaderCell)
        row.appendChild(acceptanceHeaderCell)
        row.appendChild(difficultyHeaderCell)
        row.appendChild(frequencyHeaderCell)

        return row
    }

    this.getTableContentElement = function(data, ...headers) { 
        let parentDiv = document.createElement('div')
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
        parentDiv.id = "table-content"
        return parentDiv
    }
}

class TableContentManager{ 
    constructor(data, parentElement) {
        this.parentElement = parentElement 
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
        button.addEventListener('click', this.onDurationButtonClicked)
        return button
    }

    generateRowDiv(){ 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        border-top: solid 1px black;
        `
        return row
    }

    generateDurationButtons() { 
        let row =  this.generateRowDiv()
        row.appendChild(this.generateDurationButton(CompanyProblemDurations.SIXMONTHS))
        row.appendChild(this.generateDurationButton(CompanyProblemDurations.ONEYEAR))
        row.appendChild(this.generateDurationButton(CompanyProblemDurations.TWOYEARS))
        row.appendChild(this.generateDurationButton(CompanyProblemDurations.ALLTIME))
        return row
    }

    test() { 
        this.parentElement.appendChild(this.getContentElement())
    }

    getContentElement() {  
        let parentDiv = document.createElement('div')
        let shownData = this.tableData.getList(CompanyProblemDurations.ALLTIME)
        let header = this.elementGenerator.getTableHeaderElement()
        let table = this.elementGenerator.getTableContentElement(shownData)
        parentDiv.appendChild(this.generateDurationButtons())
        parentDiv.appendChild(header)
        parentDiv.appendChild(table)
        return parentDiv
    }

    onDurationButtonClicked = (event) => {
        this.swapTable(event.currentTarget.getAttribute("duration"))
    }

    swapTable = (duration) => {
        if(document.getElementById(this.tableId) != undefined) document.getElementById(this.tableId).remove() 
        let shownData = this.tableData.getList(duration)
        let table = this.elementGenerator.getTableContentElement(shownData)
        this.parentElement.appendChild(table)
    }
}

class ContentManager{
    constructor() { 



    }
}



export {TableContentManager}