import { GoogleSheetsAPIManager, GoogleSheetsProblemTableDataFetcher } from "../DataFetcher/GoogleSheetsDataFetcher";


class GoogleSheetBufferManager { 
    constructor() { 
        this.cachedData = {}
        this.isFirefox = typeof InstallTrigger !== 'undefined';
    }

    refreshTableData() { 
        let savedData = {"FetchDate": Date.now()}
        let dataFetcher = new GoogleSheetsProblemTableDataFetcher(); 
        return dataFetcher.fetchData()
        .then(data=> savedData["data"] = data)
        .then(data => this.onDataFetched(savedData))
    }

    onDataFetched(savedData) { 
        if(!this.isFirefox) { 
            chrome.storage.local.set({"TableFrequencyData":savedData})
        }else { 
            browser.storage.local.set({"TableFrequencyData":savedData})
        }   
    }

    getBufferedData(key) {
        if(!this.isFirefox) { 
            return chrome.storage.local.get(key)
        }else { 
            return browser.storage.local.get(key)
        }   
    }
}

export { GoogleSheetBufferManager}