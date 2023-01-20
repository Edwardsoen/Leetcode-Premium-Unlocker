
class ProblemInfo{ 
    constructor(frequency, id, difficulty, problemUrl, problemName, acceptance) { 
        this.frequency = frequency 
        this.id = id
        this.difficulty = difficulty
        this.problemUrl = problemUrl 
        this.problemName = problemName
        this.acceptance = acceptance
    }
}

class CompanyProblemInfo extends ProblemInfo { 
    constructor(frequency, id, difficulty, problemUrl, problemName, acceptance, companyName, duration) { 
        super(frequency, id, difficulty, problemUrl, problemName, acceptance) 
        this.companyName = companyName
        this.duration = duration
    }
}

class CompanyProblemInfoList{ 
    constructor() { 
        this.data = {}

    }

    getKeys() { 
        return Object.keys(this.data)
    }

    getList(key) { 
        if (key in this.data) return this.data[key]
        return []
    }

    push(key, value) { 
        if (key in this.data) { 
            this.data[key].push(value)
            return; 
        }
        let arr = new ProblemArray()
        arr.push(value)
        this.data[key] = arr
    }
}

class CompanyProblemDurations {
    static SIXMONTHS = "6 months" 
    static TWOYEARS  = "2 years"
    static  ALLTIME = "All time"
    static  ONEYEAR = "1 year"

    static DURATION_LIST = [
        CompanyProblemDurations.SIXMONTHS, 
        CompanyProblemDurations.ONEYEAR, 
        CompanyProblemDurations.TWOYEARS, 
        CompanyProblemDurations.ALLTIME, 
    ]
}

class ProblemArray extends Array { 
    sort(by, reverse = false) {  
        let sorter = new by()
        sorter.sort(this, reverse)
    }
}


class CSSStyler { 
    static COLOR_ACCENT = "#62C555"

}

export {ProblemInfo
    , CompanyProblemInfo
    , CompanyProblemInfoList
    , CompanyProblemDurations
    , ProblemArray
    ,  CSSStyler}