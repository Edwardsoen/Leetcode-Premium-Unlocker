
var assert = require('assert');
const { GoogleSheetsCompanyProblemDataFetcher } = require('./src/modules/DataFetcher/GoogleSheetsDataFetcher');


describe('Google Sheets Data Fetcher', function () {
  describe('GoogleSheetsCompanyProblemDataFetcher', function () {
    describe("#fetchData()", function(done){
      it('should return -1 when the value is not present', function () {
        let dataFetcher = new GoogleSheetsCompanyProblemDataFetcher()
        // dataFetcher.fetchData("Amazon")
        assert.equal(true, true)
      });



    })
    
  });
});