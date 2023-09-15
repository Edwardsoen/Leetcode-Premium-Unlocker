<h1> App Architechture </h1>
The front-end app is written with vanilla javascript and build with webpack, while the backend and database is served and stored in Google sheets and fetched with <a href = "https://developers.google.com/sheets/api/guides/concepts">Google Sheets API </a> 


<h1> Instructions to Build Locally </h1> 
<h2> What you need: </h2>
<li> webpack and webpack CLI </li>
<li> Google Sheets containing the data (you can duplicate <a href = "https://docs.google.com/spreadsheets/d/1ilv8yYAIcggzTkehjuB_dsRI4LUxjkTPZz4hsBKJvwo/edit#gid=1906589039"> this </a>sheet) </li>
<li> Google sheets API key (follow the instruction <a href = "https://support.google.com/googleapi/answer/6158862?hl=en"> here</a></li>


<h2> Instructions </h2>
1.  Duplicate the Sheets <br>
2. Get your own API Key <br>
3. Insert your API Key <a href = "https://github.com/Edwardsoen/Leetcode-Premium-Unlocker/blob/12b341719c1461f15bd0a07dfd7ae5e0c844de77/src/modules/DataFetcher/GoogleSheetsDataFetcher.js#L4C17-L4C17"> here </a> and Sheets ID<a href = "https://github.com/Edwardsoen/Leetcode-Premium-Unlocker/blob/12b341719c1461f15bd0a07dfd7ae5e0c844de77/src/modules/DataFetcher/GoogleSheetsDataFetcher.js#L5"> here </a>  <br>
4. run "npm run build" in terminal <br>
5. load the extension to your browser <br>


