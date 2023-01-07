
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher/GoogleSheetsDataFetcher";
import { TableContentManager } from "./modules/ContentManager";
import { ModalManager } from "./modules/ContainerManager";
import { ProblemTableElementModifier } from "./modules/ElementModifier/ProblemTableElementModifier";
import { CompanySwipperElementModifier } from "./modules/ElementModifier/CompanySwipperElementModifier";


var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperElementModifier(); 

var dataFetcher = new GoogleSheetsDataFetcher()

companySwipperManager.injectFunctionOnElementVisible((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    let data = dataFetcher.getCompanyProblemData(companyName)
    let tableManagerObject = new TableContentManager(data, modalManager.getModalContentBox())
    tableManagerObject.test()
    modalManager.openModal()
})
companySwipperManager.modifyElement()

let problemData = dataFetcher.getProblemData()
let tableManager = new ProblemTableElementModifier(problemData)