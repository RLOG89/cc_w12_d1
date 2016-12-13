var BankView = require('./views/bank_view.js')
var Bank = require('./bank/bank.js');
var Account = require('./bank/account.js');
var sampleAccounts = require('../sample.json');


window.onload = function() {
  var bank = new Bank();
  var bankView = new BankView(bank);
  var accounts = getBankAccounts(); 

  for(account of accounts) {
    bank.addAccount(new Account(account));
  }
  bankView.render();
};

var getBankAccounts = function() {
  if (localStorage.savedAccts) {
    return JSON.parse(localStorage.savedAccts);
  }
  return sampleAccounts;
};
