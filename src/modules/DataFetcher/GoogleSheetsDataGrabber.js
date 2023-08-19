import { GoogleSheetsAPIManager } from "./GoogleSheetsDataFetcher";




class ProblemDataGrabber {
    fetchData() { 
        return this.fetchTableData
    }

    async fetchTableData() { 
        let range =  "Problem!A:L"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        let parsedData =  this.parseProblemFrequencyData(data["values"])
        return parsedData
    }

    parseProblemFrequencyData(data) {   
        console.log(data)


    }
}



class CompanyProblemDataGrabber { 



}

class TopProblemDataGrabber { 





}

class ProblemCompanyTagsDataGrabber { 




}




