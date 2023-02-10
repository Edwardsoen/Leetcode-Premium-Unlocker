
import { modalManager } from "../ContainerManager"
import { GoogleSheetsTopProblemDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"
import { TopProblemFoldoutElementModifier } from "../ElementModifier/TopProblemFoldoutElementModifier"
import { TableContentBuilder } from "../ContentBuilder/TableContentBuilder"

class TopProblemUnlocker { 
    constructor() {     
        this.elementModifier =  new TopProblemFoldoutElementModifier()
        this.dataFetcher = new GoogleSheetsTopProblemDataFetcher()
        this.containerManager = modalManager
        this.isFetching = false
    }

    unlock( ){ 
        this.elementModifier.injectFunctionToTargetElement(this.getFunctionToBeInjected())
        this.elementModifier.modifyElement()
    }

    onTopProblemClicked = (event) => {
        if(this.isFetching)return
        this.isFetching=true
        let itemName = event.currentTarget.getAttribute("item")
        let title = event.currentTarget.getElementsByClassName("font-medium")[0].textContent
        this.containerManager.clearModalContent()
        this.containerManager.openModal()
        this.containerManager.showLoadingIcon()
        this.dataFetcher.fetchData(itemName)
        .then(data => this.onFetchSuccess(data, title))
        .then(data =>{this.isFetching=false})
        .catch(e => {
            console.log(this, "Fetch Error" + e); 
            this.isFetching=false
        })
    }

    onFetchSuccess(data, itemName){
        let tableBulder = new TableContentBuilder()
        tableBulder.setShownData(data)
        tableBulder.buildTitleRow(itemName)
        tableBulder.buildHeaderRow()
        tableBulder.buildTable()
        let table = tableBulder.getResult()
        this.containerManager.clearModalContent()
        this.containerManager.getModalContentBox().appendChild(table)
    } 

    getFunctionToBeInjected() { 
        return (element) => {
            element.addEventListener("click", this.onTopProblemClicked);
        }
    }
    
}

export{ TopProblemUnlocker}