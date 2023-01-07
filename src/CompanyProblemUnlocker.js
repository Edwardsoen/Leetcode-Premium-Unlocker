
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher";
import {CompanyButtonInfo, ProblemInfo, CompanyProblemInfo, CompanyProblemInfoList} from "./modules/Objects";
import { TableContentManager } from "./modules/ContentManager";
import { ModalManager } from "./modules/ContainerManager";
import { ProblemTableManager } from "./ProblemFrequencyUnlocker";

function CompanySwipperManager() { 
    //detect changes in swipper & react accordingly 
    this.onCompanyButtonClick = []

    this.addOnCompanyButtonClickEvent = function(func) { 
        this.onCompanyButtonClick.push(func)
    }

    this.initialize= function () { 
        registerClickEventListenerToCompanyButton(this.onCompanyButtonClick)
        addObserverToCompaniesSection(this.onCompanyButtonClick)
    }

    function getActiveCompaniesTags() { 
        let data = []  // Company objects // obj.companyName & obj.button
        let swipers = document.getElementsByClassName('swiper-slide-active')
        let swiper = swipers[swipers.length-1]
        let links = swiper.getElementsByTagName('a')
        for(let ii = 0; ii <= links.length-1; ii ++) {
            let companyName = links[ii].firstChild.firstChild.textContent.toLowerCase()
            let companyObject = new CompanyButtonInfo(companyName, links[ii])
            links[ii].href = "javascript:void(0)"
            data.push(companyObject)
        }
        return data
    }

    function extractCompanyNameFromHref(href) { 
        let url = href.split("/") 
        return url[url.length-1]
    } 


    function addObserverToCompaniesSection(onCompanyButtonClick) {
        var swipper =  document.getElementsByClassName("mt-0")[0]
        const observer = new MutationObserver(() => {
            registerClickEventListenerToCompanyButton(onCompanyButtonClick)
        });
    
        if(!swipper) {
            window.setTimeout(() => {addObserverToCompaniesSection()} ,500);
            return;
        }
        var config = {childList: true, subtree: true,  attributes: true, attributeFilter: ['class']};
        observer.observe(swipper,config);
    }

    function registerClickEventListenerToCompanyButton(onCompanyButtonClick) { 
        let companyList = getActiveCompaniesTags()
        for(let i =0; i <= companyList.length -1; i ++) { 
            let companyName = companyList[i].name 
            if (companyList[i].button.getAttribute("listener-registered") != true) { 
                companyList[i].button.setAttribute("listener-registered", "true")
                companyList[i].button.setAttribute("company-name", companyName)
                for(let funcCount = 0; funcCount <= onCompanyButtonClick.length -1; funcCount ++) { 
                    companyList[i].button.addEventListener("click", onCompanyButtonClick[funcCount]);
                }
            }
        }
    }
    


}


var modalManager = new ModalManager()
var companySwipperManager = new CompanySwipperManager(); 
var dataFetcher = new GoogleSheetsDataFetcher()


companySwipperManager.addOnCompanyButtonClickEvent((event) => {
    let companyName = event.currentTarget.getAttribute("company-name")
    let data = dataFetcher.getCompanyProblemData(companyName)
    let tableManagerObject = new TableContentManager(data, modalManager.getModalContentBox())
    tableManagerObject.test()
    modalManager.openModal()
})
companySwipperManager.initialize()

let problemData = dataFetcher.fetchProblemData()
let tableManager = new ProblemTableManager(problemData)