var BankView = require('./views/bank_view.js')
var Bank = require('./bank/bank.js');
var Account = require('./bank/account.js');
var sampleAccounts = require('../sample.json');


window.onload = function() {
  var bank = new Bank();
  var bankView = new BankView(bank);
  for(account of sampleAccounts) {
    bank.addAccount(new Account(account));
  }
  bankView.render();
};
