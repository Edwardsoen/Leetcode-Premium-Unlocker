
import { CompanyProblemDurations } from "./Objects"
import { AcceptanceSorter,DifficultySorter , NameSorter, IDSorter} from "./ProblemSorter"

class TableElementGenerator{ 
    //create table content from data passed

    static generateTextCell(text) { 
        let div = document.createElement('div')
        let h3 = document.createElement('h3')
        h3.textContent = text
        h3.style = `color: black;
        text-align: center;
        `
        div.appendChild(h3)
        return div
    }

    static generateProblemIdCell(text) { 
       let div = TableElementGenerator.generateTextCell(text)
       div.style = `
       width: 5%
       `
       return div
    }

    static generateProblemFrequencyCell(percentage){ 
        let progressBar = document.createElement('div')
        progressBar.setAttribute("title", String(Math.round(percentage*100)) + "%")
        progressBar.style = `
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color: #e9ecef;
        border-radius: 0.5rem;
        margin-top: auto;
        margin-bottom: auto;
        width:10%; 
        `

        let progress = document.createElement('div')
        progress.style = `
        border-radius: 0.5rem;
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

    static generateProblemNameCell(problem_name, problem_url) { 
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

    static generateProblemDifficultyCell(text) {
        let div = TableElementGenerator.generateTextCell(text)
        div.style = `
        width: 12%
        `
        return div
    }

    static generateProblemAcceptanceCell(percentage) { 
        let div = TableElementGenerator.generateTextCell(Math.round(percentage * 100) + "%")
        div.style = `
        width: 10%
        `
        return div
    }

    static generateRowDiv(){ 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        border-top: solid 1px black;
        `
        return row
    }

    static getTableContentElement(data) { 
        let parentDiv = document.createElement('div')
        for(let i = 0; i <= data.length-1; i ++) {        
            let row = TableElementGenerator.generateRowDiv()        

            let frequency = data[i].frequency
            let id = data[i].id
            let difficulty = data[i].difficulty
            let problemUrl = data[i].problemUrl
            let problemName = data[i].problemName
            let acceptance = data[i].acceptance

            row.appendChild(TableElementGenerator.generateProblemIdCell(id))
            row.appendChild(TableElementGenerator.generateProblemNameCell(problemName, problemUrl))
            row.appendChild(TableElementGenerator.generateProblemAcceptanceCell(acceptance))
            row.appendChild(TableElementGenerator.generateProblemDifficultyCell(difficulty))
            row.appendChild(TableElementGenerator.generateProblemFrequencyCell(frequency))

            parentDiv.append(row)
        }
        parentDiv.id = "table-content"
        return parentDiv
    }

    static generateDurationButton(data) {
        let button = document.createElement('button')   
        button.innerText =data
        button.style = ` 
        width:5%
        `
        button.setAttribute("duration", data)
        return button
    }

}

class TableContentManager{ 
    constructor(data, parentElement) {
        this.parentElement = parentElement 
        this.tableId = "table-content"
        this.tableData = data
    } 


    generateDurationButtons() { 
        let row =  TableElementGenerator.generateRowDiv()
        for(let i =0; i <= CompanyProblemDurations.DURATION_LIST.length -1; i ++) { 
            let duration = CompanyProblemDurations.DURATION_LIST[i]
            let element = TableElementGenerator.generateDurationButton(duration)
            element.addEventListener('click', this.onDurationButtonClicked)
            row.appendChild(element)
        }    
      return row
    }

    generateHeader() { 
        let row = TableElementGenerator.generateRowDiv()
        let idHeaderCell = TableElementGenerator.generateProblemIdCell("#")
        let titleHeaderCell = TableElementGenerator.generateProblemNameCell("Title", "#")
        let acceptanceHeaderCell= TableElementGenerator.generateProblemDifficultyCell("Acceptance")
        let difficultyHeaderCell= TableElementGenerator.generateProblemDifficultyCell("Difficulty")
        let frequencyHeaderCell= TableElementGenerator.generateProblemDifficultyCell("Frequency")

        row.appendChild(idHeaderCell)
        row.appendChild(titleHeaderCell)
        row.appendChild(acceptanceHeaderCell)
        row.appendChild(difficultyHeaderCell)
        row.appendChild(frequencyHeaderCell)
        return row
    }


    appendToParent() { 
        this.parentElement.appendChild(this.getContentElement())
    }

    getContentElement() {  
        let parentDiv = document.createElement('div')
        let shownData = this.tableData.getList(CompanyProblemDurations.ALLTIME)

        let header = this.generateHeader()
        let table = TableElementGenerator.getTableContentElement(shownData)
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
        let table = TableElementGenerator.getTableContentElement(shownData)
        this.parentElement.appendChild(table)
    }
}

class ContentManager{
    constructor() { 



    }
}



export {TableContentManager}