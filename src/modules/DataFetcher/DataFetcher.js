

class CompanyProblemsDataFetcher { 
    constructor(fetcher){ 
        this.fetcher = new fetcher()
    }

    getCompanyProblemData(company) { 
        return this.fetcher.getCompanyProblemData(company)
    }
}

class ProblemsDataFetcher { 
    constructor(fetcher){ 
        this.fetcher = new fetcher()
    }

    getProblemData() { 
        return this.fetcher.getProblemData()
    }
}

export {CompanyProblemsDataFetcher, ProblemsDataFetcher}