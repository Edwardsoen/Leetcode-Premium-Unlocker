import { GoogleSheetsAPIManager, GoogleSheetsProblemTableDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher";


class GoogleSheetBufferManager { 
    constructor() { 
        this.cachedData = {}
        this.browser = browser;
        if(this.browser == undefined) { 
            this.browser = chrome; 
        }
    }

    refreshTableData() { 
        let savedData = {"FetchDate": Date.now()}
        let dataFetcher = new GoogleSheetsProblemTableDataFetcher(); 
        return dataFetcher.fetchData()
        .then(data=> savedData["data"] = data)
        .then(data => this.onDataFetched(savedData))
    }

    onDataFetched(savedData) { 
        this.browser.storage.local.set({"TableFrequencyData":savedData})
    }

    getBufferedData(key) {
        return this.browser.storage.local.get(key)
    }
}

export { GoogleSheetBufferManager}