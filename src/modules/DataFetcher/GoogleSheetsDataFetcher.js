import {CompanyProblemInfo, CompanyProblemInfoList} from "../Objects"


//Problem Data fetcher need to implement getProblemData(), 
//Company problem DataFetcher need to implement getCompanyProblemData()


class GoogleSheetsDataFetcher{ 
    //TODO: change to asnyc
    constructor() { 
        this.sheetsId = "1hW-bfeFKSkEDzfjaDMjDQmgsupEZz3gysXpG0mrf6QE"
        this.api_key = "AIzaSyDDAE3rf1fjLGKM0FUHQeTcsmS6fCQjtDs"
        this.companyPageTableData = {}
        this.setCompanyPageTableData() //cache company data location to avoid 2 round trip when company button is clicked
    }

    getProblemData() { 
        return this.fetchProblemData()
    }

    fetchProblemData() { 
        let range =  "Problem!A:B"
        let url = this.getUrl(range)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); 
        xmlHttp.send();
        let data =  JSON.parse(xmlHttp.responseText)["values"]
        return this.parseProblemData(data)
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
        return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetsId}/values/${range}?key=${this.api_key}`
    }

    fetchPageTable() { 
        let range = "CompaniesProblem_Map!A:C"
        let url = this.getUrl(range)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); 
        xmlHttp.send();
        return JSON.parse(xmlHttp.responseText)
    }

    setCompanyPageTableData() {
        let responseData = this.fetchPageTable() 
        let companyList = responseData["values"]
        for(let i =1; i <= companyList.length-1; i ++) { 
            let companyName = companyList[i][0]
            let starRow = companyList[i][1]
            let endRow = companyList[i][2]
            this.companyPageTableData[companyName] = [starRow, endRow]
        }
    }

    haveData(companyName) { 
        return companyName in this.companyPageTableData
    }

    getCompanyProblemData(companyName) { 
        let response = this.fetchCompanyProblemData(companyName)
        return this.parseCompanyProblemData(response)
    }

    fetchCompanyProblemData(companyName){ 
        if(!this.haveData(companyName)) return []
        let startRow =  this.companyPageTableData[companyName][0]
        let endRow =  this.companyPageTableData[companyName][1]
        let companyDataSheetName = "CompaniesProblem"
        let range = `${companyDataSheetName}!A${startRow}:I${endRow}` 
        let url = this.getUrl(range)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); 
        xmlHttp.send(); //do error handling
        let response = JSON.parse(xmlHttp.responseText)
        return response["values"]
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
            companyProblemInfoList.appendData(duration, problemInfo)
        }
        return companyProblemInfoList
    }
}

export {GoogleSheetsDataFetcher}

