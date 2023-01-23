
import { GoogleSheetsProblemTagsDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"
import { ProblemTagsElementModifier } from "../ElementModifier/ProblemTagsElementModifier"



class ProblemTagsUnlocker{ 
    constructor() { 
        this.elementModifier = new ProblemTagsElementModifier()
        this.dataFetcher = new GoogleSheetsProblemTagsDataFetcher()
    }

    unlock() { 
        this.elementModifier.modifyElement()
        let url = document.URL
        this.dataFetcher.fetchData(url).then(data => console.log(data))
    }

}


export {ProblemTagsUnlocker}