
class CompanySwipperElementModifier { 

    constructor() {
        this.elementModifier = []
    }
  
    injectFunctionToTargetElement(func) { 
        this.elementModifier.push(func)
    }

    modifyElement() { 
        this.modifyActiveElement()
        this.addObserverToCompaniesSection()
    }

    modifyActiveElement() { 
        let swipers = document.getElementsByClassName('swiper-slide-active')
        let swiper = swipers[swipers.length-1]
        let links = swiper.getElementsByTagName('a')
        for(let ii = 0; ii <= links.length-1; ii ++) {
            let companyName = links[ii].firstChild.firstChild.textContent.toLowerCase()
            let companyButton = links[ii]
            companyButton.setAttribute("company-name", companyName)
            companyButton.href = "javascript:void(0)"
            for(let iii = 0; iii <= this.elementModifier.length -1; iii++) { 
                this.elementModifier[iii](companyButton)
            }
        }
    }

    addObserverToCompaniesSection() {
        var swipper =  document.getElementsByClassName("mt-0")[0]
        const observer = new MutationObserver(() => {
            this.modifyActiveElement()
        });
    
        if(!swipper) {
            window.setTimeout(() => {addObserverToCompaniesSection()} ,500);
            return;
        }
        var config = {childList: true, subtree: true,  attributes: true, attributeFilter: ['class']};
        observer.observe(swipper,config);
    }
}

export {CompanySwipperElementModifier}