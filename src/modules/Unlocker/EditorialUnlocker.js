import { LocalStorageEditorialDataFetcher } from "../DataFetcher/LocalStorageDataFetcher"
import { EditorialPageElementModifier } from "../ElementModifier/EditorialPageElementModifier"

EditorialPageElementModifier

class EditorialUnlocker{
    constructor() {
        this.elementModifier = new EditorialPageElementModifier()
        this.dataFetcher = new LocalStorageEditorialDataFetcher()
    }

    unlock(){
        this.elementModifier.injectFunctionToTargetElement(this.onEditorialTabClicked)
        this.elementModifier.modifyElement()
    }


    onEditorialTabClicked = (button) => { 
        let problemId = button.getAttribute("problem-id")
        if (problemId == undefined) return; 
        this.dataFetcher.fetchData(problemId)
        .then(data => this.elementModifier.insertEditorialInnerHtml(data))
    }

}


export {EditorialUnlocker}