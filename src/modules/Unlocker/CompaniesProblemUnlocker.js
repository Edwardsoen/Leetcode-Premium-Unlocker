
import { CompanySwipperElementModifier } from "../ElementModifier/CompanySwipperElementModifier"
import {TableContentManager} from "../ContentManager"
import {ModalManager} from "../ContainerManager"
import { GoogleSheetsCompanyProblemDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"


class CompaniesProblemUnlocker {
    constructor() { 
        this.elementModifier = new CompanySwipperElementModifier()
        this.dataFetcher = new GoogleSheetsCompanyProblemDataFetcher()
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
        this.dataFetcher.fetchData(companyName)
        .then(data => this.onFetchSuccess(data))
    }


    onFetchSuccess(data) { 
        let tableManagerObject = new TableContentManager(data, this.containerManager.getModalContentBox())
        tableManagerObject.appendToContainer()
        this.containerManager.openModal()
    }
}


export { 
    CompaniesProblemUnlocker
}