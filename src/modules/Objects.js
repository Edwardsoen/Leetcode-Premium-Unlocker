class CompanyButtonInfo { 
    constructor(companyName, companyButtonElement) { 
        this.name = companyName
        this.button = companyButtonElement
    }
}

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

class ProblemFrequencySliderInfo extends ProblemInfo{ 
    constructor(frequency, id, difficulty, problemUrl, problemName, acceptance, frequencySliderElement) { 
        super(frequency, id, difficulty, problemUrl, problemName, acceptance) 
        this.slider = frequencySliderElement; 
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
        self.data = {}
    }

    getData() { 
        return self.data
    }

    getList(key) { 
        if (key in self.data) return self.data[key]
        return []
    }

    appendData(key, value) { 
        if (key in self.data) { 
            self.data[key].push(value)
            return; 
        }
        self.data[key] = [value]
    }
}

class CompanyProblemDurations {
    static SIXMONTHS = "6 months" 
    static TWOYEARS  = "2 years"
    static  ALLTIME = "All time"
    static  ONEYEAR = "1 year"
}

export {CompanyButtonInfo, ProblemInfo, CompanyProblemInfo, CompanyProblemInfoList, CompanyProblemDurations}