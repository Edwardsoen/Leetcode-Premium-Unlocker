
import { CompanySwipperElementModifier } from "../ElementModifier/CompanySwipperElementModifier"
import { TableContentBuilder } from "../ContentBuilder/TableContentBuilder"
import {modalManager} from "../ContainerManager"
import { GoogleSheetsCompanyProblemDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher"


class CompaniesProblemUnlocker {
    constructor() { 
        this.elementModifier = new CompanySwipperElementModifier()
        this.dataFetcher = new GoogleSheetsCompanyProblemDataFetcher()
        this.containerManager = modalManager
        this.isFetching = false
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
        if(this.isFetching) return;
        this.isFetching = true
        let companyName = event.currentTarget.getAttribute("company-name")
        let title = event.currentTarget.getElementsByClassName("text-label-2")[0].textContent
        this.containerManager.clearModalContent()
        this.containerManager.openModal()
        this.containerManager.showLoadingIcon()
        this.dataFetcher.fetchData(companyName)
        .then(data => this.onFetchSuccess(data, title)).then(data => {this.isFetching = false})
        .catch(e =>{this.isFetching=false} )
    }

    onFetchSuccess(data, companyName) { 
        let targetParent = this.containerManager.getModalContentBox()
        let tableBuilder = new TableContentBuilder(data)
        let durations = data.getKeys()
        for(let i =0; i <= durations.length -1; i ++) { 
            tableBuilder.addDurationData(durations[i], data.getList(durations[i]))
        }
        tableBuilder.buildTitleRow(companyName)
        tableBuilder.buildDurationsRow()
        tableBuilder.setShownData(data.getList(durations[0]))
        tableBuilder.buildHeaderRow()
        tableBuilder.buildTable()
        this.containerManager.clearModalContent()
        targetParent.appendChild(tableBuilder.getResult())
        
    }
}


export { 
    CompaniesProblemUnlocker
}