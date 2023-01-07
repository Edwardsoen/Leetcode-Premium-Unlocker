
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher";
import { TableContentManager } from "./modules/ContentManager";
import { ModalManager } from "./modules/ContainerManager";
import { CompanySwipperElementModifier,  ProblemTableElementModifier} from "./modules/ElementModifier";

var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperElementModifier(); 
var dataFetcher = new GoogleSheetsDataFetcher()


companySwipperManager.injectFunctionToElement((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    let data = dataFetcher.getCompanyProblemData(companyName)
    let tableManagerObject = new TableContentManager(data, modalManager.getModalContentBox())
    tableManagerObject.test()
    modalManager.openModal()
})
companySwipperManager.modifyElement()

let problemData = dataFetcher.fetchProblemData()
let tableManager = new ProblemTableElementModifier(problemData)