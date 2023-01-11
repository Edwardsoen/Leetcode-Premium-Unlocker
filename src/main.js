
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher/GoogleSheetsDataFetcher";
import { CompaniesProblemUnlocker } from "./modules/Unlocker/CompaniesProblemUnlocker";
import { ProblemFrequncyUnlocker } from "./modules/Unlocker/ProblemsFrequencyUnlocker";


function isAccountPremium() { 
    return false
    // return document.querySelector('a[href*="/subscribe/?ref=lp_pl&source=nav-premium"]') == null; 
}

function main() {
    if(!isAccountPremium()) { 
        var dataFetcher = new GoogleSheetsDataFetcher()
        let problemFrequncyUnlocker = new ProblemFrequncyUnlocker(dataFetcher)
        problemFrequncyUnlocker.unlock()
        let companiesProblemUnlocker = new CompaniesProblemUnlocker(dataFetcher)
        companiesProblemUnlocker.unlock()
    }
}

function evaluator(dataObj, fetcher) { 
    for(const regexExpression in dataObbj) { 
        if (window.location.href.match(regexExpression).length >= 1) { 
            let unlockers = dataObj[regexExpression]
            for(let i =0; i <= unlockers.length -1; i ++) { 
                try { 
                    let unlocker = new unlockers[i](fetcher)
                    unlock.unlock()
                }
                catch (e) { 
                    console.log(unlockers[i].constructor.name + " Error " + e)
                }
                
                
            }
        }
    }
}

let dataObj = {
    "https://leetcode.com/problemset*": [ProblemFrequncyUnlocker, CompaniesProblemUnlocker], 
    "https://leetcode.com/problem-list*": [ProblemFrequncyUnlocker]
}

main()