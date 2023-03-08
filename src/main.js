
import { CompaniesProblemUnlocker } from "./modules/Unlocker/CompaniesProblemUnlocker";
import { ProblemTableUnlocker } from "./modules/Unlocker/ProblemTableUnlocker";
import { TopProblemUnlocker } from "./modules/Unlocker/TopProblemUnlocker";
import { ProblemTagsUnlocker } from "./modules/Unlocker/ProblemTagsUnlocker";;

function evaluate(dataObj) { 
    for(const url in dataObj) { 
        if (window.location.href.includes(url)) { 
            let unlockers = dataObj[url]
            for(let i =0; i <= unlockers.length -1; i ++) { 
                try { 
                    let unlocker = new unlockers[i]()
                    unlocker.unlock()
                }
                catch (e) { 
                    console.log(unlockers[i].constructor.name + " Error " + e)
                }
            }
            break; 
        }
    }
}

function main() {
    let urls = {
        "https://leetcode.com/problemset": [ProblemTableUnlocker, CompaniesProblemUnlocker, TopProblemUnlocker], 
        "https://leetcode.com/problem-list": [ProblemTableUnlocker], 
        "https://leetcode.com/problems":[ProblemTagsUnlocker]
    }
    evaluate(urls)
}

main()