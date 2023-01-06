const path = require('path');

module.exports = {
    // mode: 'development',
  entry: './src/CompanyProblemUnlocker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};