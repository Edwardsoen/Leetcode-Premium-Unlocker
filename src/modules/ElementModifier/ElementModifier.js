// element modifier (swipper modifier, problem table modifier, top questions modifier)
// have modifyelemnet(), injectaction()

import {CompanyButtonInfo} from "../Objects";


function CompanySwipperElementModifier() { 
    this.onCompanyButtonClick = []
    this.injectFunctionToElement = function(func) { 
        this.onCompanyButtonClick.push(func)
    }

    this.modifyElement= function () { 
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

class ProblemTableElementModifier{ 
    constructor(data) { 
        this.data = data
        this.observer = new MutationObserver(() => {
            this.modifyActiveProblemElement(this.data)
        });
        this.modifyActiveProblemElement(this.data)
        this.addObserverToProblemTable()
    }

    modifyActiveProblemElement = () => {     
        this.disconnectObserverToProblemTable()
        let table = document.querySelector('[role="rowgroup"]')
        let problemsets = table.querySelectorAll('[role="row"]')
        for(let i =0; i <= problemsets.length -1 ; i ++) { 
            let cells = problemsets[i].querySelectorAll('[role="cell"]')
            let problemName = cells[1].textContent
            let problemFrequencyProgressbar = cells[cells.length -1]
            let id = problemName.split(".")[0]
            let width = this.data[id] 
            if(width == undefined) width = 0
            width *= 100
            this.removeProgressbarUnlockButton(problemFrequencyProgressbar)
            this.insertInnerProgressbar(problemFrequencyProgressbar, width)
        }
        this.addObserverToProblemTable()
    }

    insertInnerProgressbar(progressBar, width) { 
        let innerProgressbarClassName = "inner-progressbar"
        let innerProgressbar = progressBar.getElementsByClassName(innerProgressbarClassName)
        let outerProgressbar = progressBar.getElementsByClassName('rounded-l-lg')[0]
        if(innerProgressbar.length > 0) { innerProgressbar[0].remove()}
        outerProgressbar.setAttribute("title", `${Math.round(width)}%`)
        let progress = document.createElement('div')
        progress.style = `
        background-color: red;
        width: ${width}%;
        height: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        `
        progress.classList.add(innerProgressbarClassName)
        outerProgressbar.appendChild(progress)
    }

    disconnectObserverToProblemTable() { 
        this.observer.disconnect()
    }

    addObserverToProblemTable() { 
        let table = document.querySelector('[role="table"]')
        var config = {childList: true, subtree: true};
        this.observer.observe(table,config);
    }

    removeProgressbarUnlockButton(progressbar) {
        let lockLogo = progressbar.getElementsByTagName("svg")[0]
        let leftBar = progressbar.getElementsByClassName('rounded-r-lg')[0]
        let rightBar = progressbar.getElementsByClassName('rounded-l-lg')[0]
        if (lockLogo!= undefined) lockLogo.remove(); 
        if (leftBar!= undefined) leftBar.remove()
        if (rightBar != undefined){
            rightBar.style = `
            border-bottom-right-radius: 0.5rem;
            overflow: hidden; 
            border-top-right-radius: 0.5rem
            `
        }
    }
}



class ElementModifier{ 
    constructor(modifier) { 
        this.modifier = modifier
    }

    modifyElement(){ 
        this.modifier.modify()
    }

    injectFeature(func) {
        this.modifier.injectFunctionToElement(func)
    }
}


export {CompanySwipperElementModifier, ProblemTableElementModifier, ElementModifier}