import { PremiumProblemElementModifier } from "../ElementModifier/PremiumProblemElementModifier"




class PremiumProblemUnlocker { 
    constructor() { 
        this.elementModifier =  new PremiumProblemElementModifier()
    }

    unlock() { 
        this.elementModifier.modifyElement()
    }

}

export {PremiumProblemUnlocker}