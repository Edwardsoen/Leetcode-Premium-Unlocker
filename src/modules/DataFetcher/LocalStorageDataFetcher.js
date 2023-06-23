import { GoogleSheetBufferManager } from "../BufferManager/GoogleSheetsBufferManager"



class LocalStorageFrequencyDataFetcher{ 
    constructor() { 
        this.bufferManager = new GoogleSheetBufferManager()
        this.dataTTL = 604800000; //one week in milliseconds
    }

    fetchData() { 
        return chrome.storage.local.get(["TableFrequencyData"])
        .then(data => this.onDataFetched(data))
    }; 

    onDataFetched(data) { 
        if(Object.keys(data).length ==0){ 
            return this.bufferManager.refreshTableData()
            .then(data => chrome.storage.local.get("TableFrequencyData"))
            .then(data => data["TableFrequencyData"]["data"])
        }
        //refresh data if over ttl duration. The cost refreshing the whole data  is the same as checking if there is new update or not
        if(Date.now() > data["TableFrequencyData"]["FetchDate"] + this.dataTTL) {
            this.bufferManager.refreshTableData()
        }
        return data["TableFrequencyData"]["data"]
    }
}

export {LocalStorageFrequencyDataFetcher}