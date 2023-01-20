
import { GoogleSheetsTopProblemDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"
import { TopProblemFoldoutElementModifier } from "../ElementModifier/TopProblemFoldoutElementModifier"

class TopProblemUnlocker { 
    constructor() {     
        this.elementModifier =  new TopProblemFoldoutElementModifier()
        this.dataFetcher = new GoogleSheetsTopProblemDataFetcher()

    }

    unlock( ){ 
        this.elementModifier.injectFunctionToTargetElement(this.getFunctionToBeInjected())
        this.elementModifier.modifyElement()
    }

    onTopProblemClicked = (event) => {
        let itemName = event.currentTarget.getAttribute("item")
        this.dataFetcher.fetchData(itemName)
    }

    getFunctionToBeInjected() { 
        return (element) => {
            element.addEventListener("click", this.onTopProblemClicked);
        }
    }
    
}

export{ TopProblemUnlocker}