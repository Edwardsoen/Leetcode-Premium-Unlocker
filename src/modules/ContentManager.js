
import { CompanyProblemDurations } from "./Objects"
import {AcceptanceSorter, DifficultySorter, NameSorter, IDSorter, FrequencySorter} from "./ProblemSorter"

class TableElementGenerator{ 

    static generateTextElement(text) { 
        let div = document.createElement('div')
        let h3 = document.createElement('h3')
        h3.textContent = text
        h3.style = `color: black;
        text-align: center;
        `
        div.appendChild(h3)
        return div
    }

    static generateProblemIdElement(text) { 
       let div = TableElementGenerator.generateTextElement(text)
       div.style = `
       width: 5%
       `
       return div
    }

    static generateProblemFrequencyElement(percentage){ 
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

    static generateProblemNameElement(problem_name, problem_url) { 
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

    static generateProblemDifficultyElement(text) {
        let div = TableElementGenerator.generateTextElement(text)
        div.style = `
        width: 12%
        `
        return div
    }

    static generateProblemAcceptanceElement(percentage) { 
        let div = TableElementGenerator.generateTextElement(percentage)
        div.style = `
        width: 10%
        `
        return div
    }

    static generateRowElement(){ 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        border-top: solid 1px black;
        `
        return row
    }

    static generateTableContentElement(data) { 
        let parentDiv = document.createElement('div')
        for(let i = 0; i <= data.length-1; i ++) {        
            let row = TableElementGenerator.generateRowElement()        

            let frequency = data[i].frequency
            let id = data[i].id
            let difficulty = data[i].difficulty
            let problemUrl = data[i].problemUrl
            let problemName = data[i].problemName
            let acceptance = String(Math.round(data[i].acceptance * 100)) + "%"

            row.appendChild(TableElementGenerator.generateProblemIdElement(id))
            row.appendChild(TableElementGenerator.generateProblemNameElement(problemName, problemUrl))
            row.appendChild(TableElementGenerator.generateProblemAcceptanceElement(acceptance))
            row.appendChild(TableElementGenerator.generateProblemDifficultyElement(difficulty))
            row.appendChild(TableElementGenerator.generateProblemFrequencyElement(frequency))

            parentDiv.append(row)
        }
        parentDiv.id = "table-content"
        return parentDiv
    }

    static generateDurationElement(data) {
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
        this.companyData = data
        this.shownData = []
        this.currentlySortedBy = ""
        this.isReverseSorted = false
    } 

    createDurationsRowElement() { 
        let row =  TableElementGenerator.generateRowElement()
        for(let i =0; i <= CompanyProblemDurations.DURATION_LIST.length -1; i ++) { 
            let duration = CompanyProblemDurations.DURATION_LIST[i]
            let element = TableElementGenerator.generateDurationElement(duration)
            element.addEventListener('click', this.onDurationButtonClicked)
            row.appendChild(element)
        }    
      return row
    }

    createHeaderRowElement() { 
        let row = TableElementGenerator.generateRowElement()
        let idHeaderCell = TableElementGenerator.generateProblemIdElement("#")
        let titleHeaderCell = TableElementGenerator.generateProblemNameElement("Title", "javascript:void(0)")
        let acceptanceHeaderCell= TableElementGenerator.generateProblemAcceptanceElement("Acceptance")
        let difficultyHeaderCell= TableElementGenerator.generateProblemDifficultyElement("Difficulty")
        let frequencyHeaderCell= TableElementGenerator.generateProblemAcceptanceElement("Frequency")

        idHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(IDSorter).bind(this))
        titleHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(NameSorter).bind(this))
        acceptanceHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(AcceptanceSorter).bind(this))
        difficultyHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(DifficultySorter).bind(this))
        frequencyHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(FrequencySorter).bind(this))

        row.appendChild(idHeaderCell)
        row.appendChild(titleHeaderCell)
        row.appendChild(acceptanceHeaderCell)
        row.appendChild(difficultyHeaderCell)
        row.appendChild(frequencyHeaderCell)
        return row
    }

    appendToContainer() { 
        this.parentElement.appendChild(this.createTableElement())
    }

    createTableElement() {  
        let parentDiv = document.createElement('div')
        this.shownData = this.companyData.getList(CompanyProblemDurations.ALLTIME)
        this.shownData.sort(IDSorter)
        this.currentlySortedBy = IDSorter.name
        this.isReverseSorted = false
        let header = this.createHeaderRowElement()
        let table = TableElementGenerator.generateTableContentElement(this.shownData)
        parentDiv.appendChild(this.createDurationsRowElement())
        parentDiv.appendChild(header)
        parentDiv.appendChild(table)
        return parentDiv
    }

    onDurationButtonClicked = (event) => {
        this.shownData = this.companyData.getList(event.currentTarget.getAttribute("duration"))
        this.swapContentTableElement(this.shownData)
    }

    getOnHeaderClickedFunction(Sorter) { 
        return () => {  
            if(Sorter.name == this.currentlySortedBy) { 
                this.shownData.sort(Sorter, !this.isReverseSorted)    
                this.isReverseSorted = !this.isReverseSorted
            } else { 
                this.shownData.sort(Sorter)
                this.currentlySortedBy = Sorter.name
                this.isReverseSorted = false
            }
            this.swapContentTableElement(this.shownData)
        }
    }

    swapContentTableElement = (swapTo) => {
        if(document.getElementById(this.tableId) != undefined) document.getElementById(this.tableId).remove() 
        let table = TableElementGenerator.generateTableContentElement(swapTo)
        this.parentElement.appendChild(table)
    }
}

export {TableContentManager}