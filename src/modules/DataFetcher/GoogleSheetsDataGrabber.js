import { GoogleSheetsAPIManager } from "./GoogleSheetsDataFetcher";




class ProblemDataGrabber {
    fetchData() { 
        return this.fetchTableData()
    }

    async fetchTableData() { 
        let range =  "Problem!A:L"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        return data["values"]
    }
}

class CompanyProblemDataGrabber {   
    fetchData() { 
        return this.fetchCompanyProblemData()
    }

    async fetchCompanyProblemData() { 
        let range =  "CompaniesProblem!A:H"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        return data["values"]
    }
}

class TopProblemDataGrabber { 





}

class ProblemCompanyTagsDataGrabber { 
    fetchData() { 
        return this.fetchCompanyProblemData()
    }

    async fetchCompanyProblemData() { 
        let range =  "CompaniesProblem!A:H"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        return data["values"]
    }
}

class ProblemCompaniesTagsDataGrabber { 
    fetchData() { 
        return this.fetchProblemCompaniesTagData()
    }

    async fetchProblemCompaniesTagData() { 
        let range =  "ProblemCompaniesTags!A:C"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        return data["values"]
    }
}





export { 
    ProblemDataGrabber, 
    CompanyProblemDataGrabber

}