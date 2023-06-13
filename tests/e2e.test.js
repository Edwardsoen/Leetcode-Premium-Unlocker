const {Builder, By, Key, until} = require('selenium-webdriver');
import {Options} from "selenium-webdriver/chrome.js";
var assert = require('assert');


describe("End to end testing", function () {
    it("shoud load the extension correctly ", async function() { 
        try { 
            let options = new Options()
            options.addArguments("--load-extension=" + process.cwd())
            var driver = await new Builder().forBrowser("chrome")
            .setChromeOptions(options)
            .build();
            assert(true)
        } catch (e){ 
            console.log(e)
            assert.fail()
        } finally { 
            driver.quit();
        }
    })

    describe("Basic premium unlocking", function() { 
        let options = new Options()
        options.addArguments("--load-extension=" + process.cwd())
        var driver = new Builder().forBrowser("chrome")
        .setChromeOptions(options)
        .build();

        it("Should  Unlock Front page frequency data", async function() { 
            await driver.get("https://leetcode.com/problemset/all/")
            await driver.sleep(3000) //wait until extension finish modifying page
            try { 
                let table = await driver.findElement(By.css('div[role="rowgroup"]'))
                var progressBar = await table.findElement(By.className("inner-progressbar"))
            } catch { 
                assert.fail()
            }
            assert.notEqual(progressBar, undefined)
        })

        it("Should Unlock Front page Company Button", async function() {
            let swipper = await driver.findElements(By.className("swiper-wrapper"))
            let companyName = await swipper[1].findElement(By.css("a")).getAttribute("company-name")
            assert(companyName != null)
        })

        it("Should Unlock Company tag button", async function() { 
            await driver.get("https://leetcode.com/problems/two-sum/")
            await driver.sleep(3000)
            try { 
                var lockLogo = await driver.findElement(By.className("pt-3")).findElement(By.css("svg"))
            }catch(e) { 
                if(e.name == "NoSuchElementError") lockLogo = undefined
            }
            assert(lockLogo == undefined)
        })

        it("Should unlock premium Problem", async function() { 
            await driver.get("https://leetcode.com/problemset/database/?premium=true&page=1")
            await driver.sleep(5000)
            try { 
                var modifiedElement =  await driver.findElement(By.css("div[is-premium='true']"))   
            }catch(e) { 
                modifiedElement = undefined
            }
            assert(modifiedElement != undefined)
        })

        this.afterAll(function() {
            driver.quit()
        })
    })
})


