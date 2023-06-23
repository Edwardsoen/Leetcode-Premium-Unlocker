import { ProblemTableElementModifier } from "../ElementModifier/ProblemTableElementModifier";
import { generateInnerProgressbar } from "../ElementGenerator/ElementHelperClass";
import { GoogleSheetsProblemTableDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher";
import { CSSStyler } from "../Objects";
import { modalManager } from "../ContainerManager";
import * as DOMPurify from 'dompurify';
import { LocalStorageFrequencyDataFetcher } from "../DataFetcher/LocalStorageDataFetcher";

class ProblemTableUnlocker{ 
    constructor() { 
        this.elementModifier =  new ProblemTableElementModifier()
        this.localFetcher = new LocalStorageFrequencyDataFetcher()
        this.dataFetcher = new GoogleSheetsProblemTableDataFetcher()
        this.containerManager = modalManager
        this.isFetching = false; 
    }

    onFetchSuccess() {
        this.elementModifier.injectFunctionToTargetElement(ProblemTableUnlocker.removeProgressbarUnlockButton)
        this.elementModifier.injectFunctionToTargetElement(this.insertInnerProgressbar)
        this.elementModifier.injectFunctionToTargetElement(this.modifyPremiumProblemHref)
        this.elementModifier.modifyElement()
    }

    modifyPremiumProblemHref = (row) => {
        let isPremium = row.getAttribute("is-premium") == "true"
        if(isPremium){
            this.removePremiumIcons(row)
            let problemId = row.getAttribute("problem-id")
            let problemUrl = row.getElementsByTagName("a")[0] 
            problemUrl.href = "javascript:void(0)"
            problemUrl.style.color = CSSStyler.COLOR_ACCENT; 
            problemUrl.addEventListener('click', () => {
                this.onPremiumProblemClicked(problemId)
            }
            )
        }
    }

    unlock() { 
        this.localFetcher.fetchData()
        .then(data => {this.problemData = data})
        .then(this.onFetchSuccess.bind(this))
        .catch(e => (console.log(this, e)))
    }

    onPremiumProblemClicked = (problemId) => { 
        if(this.isFetching) return 
        this.isFetching = true; 
        this.containerManager.clearModalContent()
        this.containerManager.openModal()
        this.containerManager.showLoadingIcon()
        this.dataFetcher.fetchPremiumProblem(parseInt(problemId))
        .then(data => this.onProblemFetchSuccess(data))
        .then(this.isFetching = false)
    }

    onProblemFetchSuccess(data){ 
        let targetParent = this.containerManager.getModalContentBox()
        this.containerManager.clearModalContent()
        let htmlString = String(data).replaceAll("<strong>", "<br><strong>")
        targetParent.innerHTML= DOMPurify.sanitize(htmlString);
        let pres = targetParent.getElementsByTagName("pre")
        for(let i =0; i <= pres.length-1; i ++) { 
            pres[i].style = `
            border-radius: 0.5rem;
            font-family: Menlo,sans-serif;
            font-size: .875rem;
            line-height: 1.25rem;
            margin-bottom: 1rem;
            margin-top: 1rem;
            padding: 1rem;
    `
        }
    }

    removePremiumIcons(row) { 
        let cells = row.querySelectorAll('[role="cell"]')
        let lockLogo = cells[0].getElementsByTagName("svg")[0]
        let premiumLogo = cells[1].getElementsByTagName("svg")[0]
        if(lockLogo != undefined) lockLogo.style.opacity = 0; 
        if(premiumLogo != undefined) premiumLogo.style.opacity = 0; 
    }

    insertInnerProgressbar = (row) =>  { 
        let cells = row.querySelectorAll('[role="cell"]')
        let progressBar = cells[cells.length -1]

        let id = row.getAttribute("problem-id")
        let width = this.problemData[id] 
        if(width == undefined) width = 0
        width *= 100

        let innerProgressbarClassName = "inner-progressbar"
        let innerProgressbar = progressBar.getElementsByClassName(innerProgressbarClassName)
        let outerProgressbar = progressBar.getElementsByClassName('rounded-l-lg')[0]
        if(innerProgressbar.length > 0) { innerProgressbar[0].remove()}
        outerProgressbar.setAttribute("title", `${Math.round(width)}%`)
        let progress = generateInnerProgressbar(width)
        progress.classList.add(innerProgressbarClassName)
        outerProgressbar.appendChild(progress)
    }

    static removeProgressbarUnlockButton(row) {
        let cells = row.querySelectorAll('[role="cell"]')
        let progressbar = cells[cells.length -1]

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

export {ProblemTableUnlocker}