import {CompanyProblemInfo, CompanyProblemInfoList} from "../Objects"


//Problem Data fetcher need to implement getProblemData(), 
//Company problem DataFetcher need to implement getCompanyProblemData()


class GoogleSheetsAPIManager{   
    static API_KEY =  "AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs"
    static SHEETS_ID =  "1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE"

    static  getUrl (range) {
        return `https://sheets.googleapis.com/v4/spreadsheets/${GoogleSheetsAPIManager.SHEETS_ID}/values/${range}?key=${GoogleSheetsAPIManager.API_KEY}`
    }
}













class GoogleSheetsDataFetcher{ 
    //TODO: change to asnyc
    constructor() { 
        this.sheetsId = "1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE"
        this.apiKey = "AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs"
        this.companyPageTableData = {}
    }

    getProblemData() { 
        return this.fetchProblemData()
    }

    async fetchProblemData() { 
        let range =  "Problem!A:B"
        let url = this.getUrl(range)
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

    getUrl (range) {
        return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetsId}/values/${range}?key=${this.apiKey}`
    }

    

    async fetchCompanyPageTable() { 
        let range = "CompaniesProblem_Map!A:C"
        let url = this.getUrl(range)    
        let response = await fetch(url)
        let data = await response.json();
        return this.parseCompanyPageTableData(data["values"])
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

    haveData(companyName) { 
        return companyName in this.companyPageTableData
    }

    getCompanyProblemData(companyName) { 
        return this.fetchCompanyPageTable()
        .then(mapData => this.fetchCompanyProblemData(companyName))
    }

    async fetchCompanyProblemData(companyName){ 
        if(!this.haveData(companyName)) return []
        let startRow =  this.companyPageTableData[companyName][0]
        let endRow =  this.companyPageTableData[companyName][1]
        let companyDataSheetName = "CompaniesProblem"
        let range = `${companyDataSheetName}!A${startRow}:I${endRow}` 
        let url = this.getUrl(range)    
        let response = await fetch(url)
        let data = await response.json();
        return this.parseCompanyProblemData(data["values"]) 
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

export {GoogleSheetsDataFetcher}

