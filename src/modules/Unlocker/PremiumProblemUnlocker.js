import { PremiumProblemElementModifier } from "../ElementModifier/PremiumProblemElementModifier"

import { ProblemTableElementModifier } from "../ElementModifier/ProblemTableElementModifier"


class PremiumProblemUnlocker { 
    constructor() { 
        this.elementModifier =  new ProblemTableElementModifier()
    }

    unlock() { 
        this.elementModifier.injectFunctionToTargetElement(this.removePremiumIconsIfPremiumProblem)
        this.elementModifier.modifyElement()
    }

    removePremiumIconsIfPremiumProblem = (row) => {
        let premiums = document.querySelectorAll('[is-premium="true"]')
        console.log(premiums)
    }

}

export {PremiumProblemUnlocker}