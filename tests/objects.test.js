
var assert = require('assert');
const { ProblemInfoList, CompanyProblemInfoList, InfoList } = require('../src/modules/Objects');

describe("Objects", function() { 
    describe("InfoList", function(){
        describe("#getList()", function(){
            let infoList = new InfoList()
            it("return empty list when not found", function() {
                assert.strictEqual(Array.isArray(infoList.getList("Testing")), true)
            })
            
            it("raise error when key not defined", function() { 
                assert.throws(function(){
                    infoList.getList()
                })
            })

        })
        describe("#getKeys()", function() {
            let infoList = new InfoList()
            it("return array", function() { 
                assert.strictEqual(Array.isArray(infoList.getKeys()), true)
            })
        })
    })

    describe("ProblemInfoList", function() { 
        describe("#push()", function() { 
            let problemInfoList = new ProblemInfoList()
            it("raise error when key undefined", function() { 
                assert.throws(function(){
                    problemInfoList.push(undefined, "test")
                })
            })

            it("raise error when value undefined", function() { 
                assert.throws(function(){
                    problemInfoList.push("test", undefined)
                })
            })

            it("raise error when key and value undefined", function() { 
                assert.throws(function(){
                    problemInfoList.push(undefined, undefined)
                })
            })
            
            it("raise error when key and value undefined", function() { 
                assert.throws(function(){
                    problemInfoList.push(undefined, undefined)
                })
            })

            it("raise error when key not in duration list", function() {
                //TODO: this 
                assert.equal(true, true)
            })
        })

        describe("#getList()", function() { 
            let problemInfoList = new ProblemInfoList()
            it("return array", function() {
                assert.equal(Array.isArray(problemInfoList.getList("Testing")), true)
            })

            it("return correct array size 1 when pushed once", function() {
                let problemInfoList = new ProblemInfoList()
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getList(key).length, 1)
            })

            it("return array size 2 when pushed twice with same key", function() {
                let problemInfoList = new ProblemInfoList()
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getList(key).length, 2)
            })

            it("return containing passed data after push", function() {
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getList(key).includes(data),true)
            })
        })

        describe("#getKey()", function() { 
            let problemInfoList = new ProblemInfoList()
            it("return array", function() {
                assert.equal(Array.isArray(problemInfoList.getKeys()), true)
            })

            it("return correct array size 1 when pushed once", function() {
                let problemInfoList = new ProblemInfoList()
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getKeys().length, 1)
            })

            it("return array size 1 when pushed twice with same key", function() {
                let problemInfoList = new ProblemInfoList()
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getKeys().length, 1)
            })

            it("return array size 2 when pushed twice with different key", function() {
                let problemInfoList = new ProblemInfoList()
                let data = "hello"
                let key = "key"
                let key2 = "key2"
                problemInfoList.push(key, data)
                problemInfoList.push(key2, data)
                assert.equal(problemInfoList.getKeys().length, 2)
            })

            it("return containing passed data after push", function() {
                let data = "hello"
                let key = "key"
                problemInfoList.push(key, data)
                assert.equal(problemInfoList.getKeys().includes(key),true)
            })
        })

    })
})


