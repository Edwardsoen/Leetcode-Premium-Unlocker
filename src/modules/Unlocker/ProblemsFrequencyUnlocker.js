import { ProblemTableElementModifier } from "../ElementModifier/ProblemTableElementModifier";
import { generateInnerProgressbar } from "../ElementGenerator";


class ProblemFrequncyUnlocker{ 
    constructor(dataFetcher) { 
        this.elementModifier =  new ProblemTableElementModifier()
        this.dataFetcher = dataFetcher; 
    }

    onFetchFail () {
        console.log("Problem Frequency Fetch Fail")
    }
    
    onFetchSuccess() {
        this.elementModifier.injectFunctionToTargetElement(ProblemFrequncyUnlocker.removeProgressbarUnlockButton)
        this.elementModifier.injectFunctionToTargetElement(this.insertInnerProgressbar)
        this.elementModifier.modifyElement()
    }

    unlock() { 
        this.dataFetcher.getProblemData()
        .then(data => {this.problemData = data})
        .then(this.onFetchSuccess.bind(this))
        .catch(this.onFetchFail)
    }

    insertInnerProgressbar = (progressBar) =>  { 
        let id = progressBar.getAttribute("problem-id")
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

    static removeProgressbarUnlockButton(progressbar) {
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

export {ProblemFrequncyUnlocker}