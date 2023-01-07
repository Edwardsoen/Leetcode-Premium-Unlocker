
import { GoogleSheetsDataFetcher } from "./modules/DataFetcher/GoogleSheetsDataFetcher";
import { CompaniesProblemUnlocker } from "./modules/Unlocker/CompaniesProblemUnlocker";
import { ProblemFrequncyUnlocker } from "./modules/Unlocker/ProblemsFrequencyUnlocker";



var dataFetcher = new GoogleSheetsDataFetcher()


let problemFrequncyUnlocker = new ProblemFrequncyUnlocker(dataFetcher)
problemFrequncyUnlocker.unlock()

let companiesProblemUnlocker = new CompaniesProblemUnlocker(dataFetcher)
companiesProblemUnlocker.unlock()