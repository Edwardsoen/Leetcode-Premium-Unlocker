const path = require('path');

module.exports = {
  entry: './src/CompanyProblemUnlocker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};