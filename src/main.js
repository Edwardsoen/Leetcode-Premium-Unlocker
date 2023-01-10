
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher/GoogleSheetsDataFetcher";
import { CompaniesProblemUnlocker } from "./modules/Unlocker/CompaniesProblemUnlocker";
import { ProblemFrequncyUnlocker } from "./modules/Unlocker/ProblemsFrequencyUnlocker";


function isAccountPremium() { 
    return false
    return document.querySelector('a[href*="/subscribe/?ref=lp_pl&source=nav-premium"]') == null; 
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


main()