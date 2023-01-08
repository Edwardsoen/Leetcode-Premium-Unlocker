
import { CompanySwipperElementModifier } from "../ElementModifier/CompanySwipperElementModifier"
import {TableContentManager} from "../ContentManager"
import {ModalManager} from "../ContainerManager"

class CompaniesProblemUnlocker {
    constructor(dataFetcher) { 
        this.elementModifier = new CompanySwipperElementModifier()
        this.dataFetcher = dataFetcher
        this.containerManager = new ModalManager()
    }

    unlock() { 
        this.elementModifier.injectFunctionToTargetElement(this.getFunctionToBeInjected())
        this.elementModifier.modifyElement()
    }

    getFunctionToBeInjected() { 
        return (element) => {
            element.addEventListener("click", this.onCompanyButtonClick);
        }
    }

    onCompanyButtonClick = (event) => {
        let companyName = event.currentTarget.getAttribute("company-name")
        let data = this.dataFetcher.getCompanyProblemData(companyName)
        let tableManagerObject = new TableContentManager(data, this.containerManager.getModalContentBox())
        tableManagerObject.appendToContainer()
        this.containerManager.openModal()
    }
}


export { 
    CompaniesProblemUnlocker
}