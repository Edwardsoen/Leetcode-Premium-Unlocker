
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher/GoogleSheetsDataFetcher";
import { TableContentManager } from "./modules/ContentManager";
import { ModalManager } from "./modules/ContainerManager";
import { CompanySwipperElementModifier,  ProblemTableElementModifier} from "./modules/ElementModifier/ElementModifier";
import { CompanyProblemsDataFetcher, ProblemsDataFetcher } from "./modules/DataFetcher/DataFetcher";

var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperElementModifier(); 

var companyProblemsDataFetcher = new CompanyProblemsDataFetcher(GoogleSheetsDataFetcher)
var problemsDataFetcher = new ProblemsDataFetcher(GoogleSheetsDataFetcher)

companySwipperManager.injectFunctionToElement((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    let data = companyProblemsDataFetcher.getCompanyProblemData(companyName)
    let tableManagerObject = new TableContentManager(data, modalManager.getModalContentBox())
    tableManagerObject.test()
    modalManager.openModal()
})
companySwipperManager.modifyElement()

let problemData = problemsDataFetcher.getProblemData()
let tableManager = new ProblemTableElementModifier(problemData)