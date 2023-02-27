
import { ProblemTableElementModifier } from "./ProblemTableElementModifier";


class PremiumProblemElementModifier extends ProblemTableElementModifier { 
    constructor() { 
        super()
    }   

    modifyActiveElement = () => { 
        this.disconnectObserverToProblemTable()
        let table = document.querySelector('[role="rowgroup"]')
        let problemsets = table.querySelectorAll('[role="row"]')
        for(let i =0; i <= problemsets.length -1 ; i ++) { 
            let cells = problemsets[i].querySelectorAll('[role="cell"]')
            let isPremium =  problemsets[i].getElementsByTagName("rect").length > 0
            
            if(isPremium) { 
                console.log(problemsets[i].getElementsByTagName("rect"))
                
                let premiumText = cells[1].getElementsByTagName("svg")[0] 
                let lockLogo = cells[0].getElementsByTagName("svg")[0]
                cells[1].style.color = "green"
                console.log( cells[1].textContent)
            }
        }
        this.addObserverToProblemTable()
    } 

    
}


export {PremiumProblemElementModifier}