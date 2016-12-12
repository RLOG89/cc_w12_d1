var Bank = require('../bank/bank.js');
var sampleAccounts = require('../../sample.json');
var Account = require('../bank/account.js');

var BankView = function(bank) {
  this.bank = bank;
};

BankView.prototype = {
  createItemForAccount: function(account) {
    var accountListItem = document.createElement('li');
    accountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
    return accountListItem;
  },
  populateAccountList: function(listElement, accounts) {
      while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
    for(account of accounts) {
      listElement.appendChild(this.createItemForAccount(account));
    }
  },
  render: function() {
    var bank = this.bank
    var totalDisplay = document.getElementById('total');
    var businessTotalDisplay = document.getElementById('business-total');
    var personalTotalDisplay = document.getElementById('personal-total');

    totalDisplay.innerText = "Total: £" + bank.totalCash().toFixed(2);
    businessTotalDisplay.innerText = "Total Business: £" + bank.totalCash('business').toFixed(2);
    personalTotalDisplay.innerText = "Total Personal: £" + bank.totalCash('personal').toFixed(2);

    var businessAccountList = document.getElementById('business-accounts');
    var personalAccountList = document.getElementById('personal-accounts');
    
    this.populateAccountList(businessAccountList, bank.filteredAccounts('business'));
    this.populateAccountList(personalAccountList, bank.filteredAccounts('personal'));

    this.addInterest();
  },
  addInterest: function() {
    var addInterest = document.getElementById('add-interest');
    addInterest.onclick = function() {
      this.bank.payInterest(10);
      this.render();
    }.bind(this);
  }

};

module.exports = BankView;