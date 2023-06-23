import { GoogleSheetsAPIManager, GoogleSheetsProblemTableDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher";


class GoogleSheetBufferManager { 
    constructor() { 
        this.cachedData = {}
    }

    refreshTableData() { 
        let savedData = {"FetchDate": Date.now()}
        let dataFetcher = new GoogleSheetsProblemTableDataFetcher(); 
        return dataFetcher.fetchData()
        .then(data=> savedData["data"] = data)
        .then(data => this.onDataFetched(data))
    }

    onDataFetched(savedData) { 
        let isFirefox = typeof InstallTrigger !== 'undefined';
        if(!isFirefox) { //isChrome 
            chrome.storage.local.set({"TableFrequencyData":savedData})
            return;  
        }
    }
}

export { GoogleSheetBufferManager}