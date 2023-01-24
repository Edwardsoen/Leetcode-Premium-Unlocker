
import { GoogleSheetsProblemTagsDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"
import { ProblemTagsElementModifier } from "../ElementModifier/ProblemTagsElementModifier"
import { TagsContentBuilder } from "../ContentBuilder/TagsContentBuilder"
import { modalManager } from "../ContainerManager"

class ProblemTagsUnlocker{ 
    constructor() { 
        this.elementModifier = new ProblemTagsElementModifier()
        this.dataFetcher = new GoogleSheetsProblemTagsDataFetcher()
        this.containerManager = modalManager
    }

    onTagButtonClicked = () => { 
        let problemName = document.URL.split('/')[4]
        this.dataFetcher.fetchData(problemName)
        .then(data => this.onFetchSucces(data))
        .catch( e => {console.log(this, e)})
    }



    unlock() { 
        this.elementModifier.modifyElement()
        this.elementModifier.addTagButtonOnClickListener(this.onTagButtonClicked)
    }

    onFetchSucces = (data) =>  { 
        let keys = data.getKeys()
        let builder = new TagsContentBuilder()
        for(let i =0; i<= keys.length -1; i ++) {
            builder.buildHeader(keys[i])
            builder.buildTagsBox(data.getList(keys[i]))
        }
        let targetParent = this.containerManager.getModalContentBox()
        this.containerManager.clearModalContent()
        targetParent.appendChild(builder.getResult())
        this.containerManager.openModal()
    }


}


export {ProblemTagsUnlocker}