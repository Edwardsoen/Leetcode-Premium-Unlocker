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
        let rowOffsetData = this.parseRowOffsetData(savedData["data"]) 
        if(!this.isFirefox) {
            chrome.storage.local.set({"rowOffset":rowOffsetData})
            chrome.storage.local.set({"TableFrequencyData":savedData})
        }else { 
            browser.storage.local.set({"rowOffset":rowOffsetData})
            browser.storage.local.set({"TableFrequencyData":savedData})
        } 
    }

    getRowOffsetData() { 
        if(!this.isFirefox) { 
            return chrome.storage.local.get("rowOffset")
        }else { 
            return browser.storage.local.get("rowOffset")
        }   
    }

    parseRowOffsetData(data) {
        console.log(data)
        let rowOffsetData = {}
        let i = 2
        for(let key in data) { 
            rowOffsetData[key] = i 
            i +=1 
        }
        return rowOffsetData; 
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