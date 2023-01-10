
import { CompanyProblemDurations } from "./Objects"
import {AcceptanceSorter, DifficultySorter, NameSorter, IDSorter, FrequencySorter} from "./ProblemSorter"


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