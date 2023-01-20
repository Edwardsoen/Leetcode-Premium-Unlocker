
import { modalManager } from "../ContainerManager"
import { GoogleSheetsTopProblemDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"
import { TopProblemFoldoutElementModifier } from "../ElementModifier/TopProblemFoldoutElementModifier"
import { TableContentBuilder } from "../TableContentBuilder"

class TopProblemUnlocker { 
    constructor() {     
        this.elementModifier =  new TopProblemFoldoutElementModifier()
        this.dataFetcher = new GoogleSheetsTopProblemDataFetcher()
        this.containerManager = modalManager
    }

    unlock( ){ 
        this.elementModifier.injectFunctionToTargetElement(this.getFunctionToBeInjected())
        this.elementModifier.modifyElement()
    }

    onTopProblemClicked = (event) => {
        let itemName = event.currentTarget.getAttribute("item")
        this.dataFetcher.fetchData(itemName)
        .then(data => this.onFetchSuccess(data))
        .catch(e => {console.log(this, "Fetch Error" + e)})
    }

    onFetchSuccess(data){
        let tableBulder = new TableContentBuilder()
        tableBulder.setShownData(data)
        tableBulder.buildHeaderRow()
        tableBulder.buildHeaderRow()
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