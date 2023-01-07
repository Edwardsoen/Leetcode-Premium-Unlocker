import { ProblemTableElementModifier } from "../ElementModifier/ProblemTableElementModifier";



class ProblemFrequncyUnlocker{ 
    constructor(dataFetcher) { 
        // this.elementModifier = ProblemTableElementModifier
        this.dataFetcher = dataFetcher
    }
    
    unlock() { 
        let problemData = this.dataFetcher.getProblemData()
        new ProblemTableElementModifier(problemData)
        
    }
}


export {ProblemFrequncyUnlocker}