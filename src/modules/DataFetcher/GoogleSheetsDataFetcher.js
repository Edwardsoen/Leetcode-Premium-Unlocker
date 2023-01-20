import {CompanyProblemInfo, CompanyProblemInfoList} from "../Objects"

class GoogleSheetsAPIManager{   
    static API_KEY =  "AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs"
    static SHEETS_ID =  "1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE"
    static TESTING_SHEETS_ID = "1TJUhILyqBYsXWaPSUGwN1EvzBFeRNg1MgXH_SVqjQJo"

    static  getUrl (range) {
        return `https://sheets.googleapis.com/v4/spreadsheets/${GoogleSheetsAPIManager.SHEETS_ID}/values/${range}?key=${GoogleSheetsAPIManager.API_KEY}`
    }
}

class GoogleSheetsProblemFrequencyDataFetcher { 
    fetchData() { 
        return this.fetchProblemData()
    }

    async fetchProblemData() { 
        let range =  "Problem!A:B"
        let url = GoogleSheetsAPIManager.getUrl(range)
        let response = await fetch(url)
        let data = await response.json();
        return this.parseProblemData(data["values"])
    }

    parseProblemData(data) { 
        let returnData = {}
        for(let i =0; i<=data.length -1; i ++) { 
            let id = data[i][0]
            let frequency = data[i][1]
            returnData[id] = frequency
        }
        return returnData
    }
}

class GoogleSheetsCompanyProblemDataFetcher { 
    constructor() { 
        this.companyPageTableData = {}
        this.tableDataFetched = false
        this.fetchCompanyPageTable() //cache company map data
    }

    fetchData(companyName) { 
        if(this.tableDataFetched == false) { 
            return this.fetchCompanyPageTable()
            .then(data => this.fetchCompanyProblemData(companyName))
        }
        return this.fetchCompanyProblemData(companyName)
    }

    fetchCompanyPageTable() { 
        let range = "CompaniesProblem_Map!A:C"
        let url = GoogleSheetsAPIManager.getUrl(range)    
        return fetch(url)
        .then(data => data.json())
        .then(data => {this.parseCompanyPageTableData(data["values"])})
        .then(this.tableDataFetched = true)
    }

    fetchCompanyProblemData(companyName){ 
        if(companyName in this.companyPageTableData == false) { return new Promise((resolve, reject) => resolve(new CompanyProblemInfoList()))}
        let startRow =  this.companyPageTableData[companyName][0]
        let endRow =  this.companyPageTableData[companyName][1]
        let companyDataSheetName = "CompaniesProblem"
        let range = `${companyDataSheetName}!A${startRow}:I${endRow}` 
        let url = GoogleSheetsAPIManager.getUrl(range)    
        return fetch(url)
        .then(data => data.json())
        .then(data =>this.parseCompanyProblemData(data["values"]))
    }

    parseCompanyPageTableData(data) {
        for(let i =1; i <= data.length-1; i ++) { 
            let companyName = data[i][0]
            let starRow = data[i][1]
            let endRow = data[i][2]
            this.companyPageTableData[companyName] = [starRow, endRow]
        }
        return this.companyPageTableData
    }

    parseCompanyProblemData(data) { 
        let companyProblemInfoList = new CompanyProblemInfoList()
        for(let i =0; i <= data.length - 1; i ++ ){ 
            let frequency =  data[i][2]
            let id = data[i][1]
            let difficulty = data[i][7]
            let problemUrl =  data[i][6]
            let problemName = data[i][4]
            let acceptance = data[i][5]
            let companyName = data[i][0]
            let duration = data[i][3]
            let problemInfo = new CompanyProblemInfo(frequency,id,difficulty,problemUrl,problemName,acceptance,companyName,duration)
            companyProblemInfoList.push(duration, problemInfo)
        }
        return companyProblemInfoList
    }
}

class GoogleSheetsTopProblemDataFetcher { 
    constructor() { 

    }
    fetchData() { 

    }
}

export { 
    GoogleSheetsAPIManager, 
    GoogleSheetsProblemFrequencyDataFetcher, 
    GoogleSheetsCompanyProblemDataFetcher, 
    GoogleSheetsTopProblemDataFetcher
}

