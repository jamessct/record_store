var _ = require('lodash');

var RecordStore = function(name, city, balance) {
  this.name = name;
  this.city = city;
  this.balance = balance;
  this.inventory = [];
}

RecordStore.prototype = {
  addRecord: function(record) {
    this.inventory.push(record);
  },
  sellRecord: function(recordTitle) {
    return _.find(this.inventory, function(record) {
      if(record.title === recordTitle) {
        this.balance += record.price;
        this.inventory.pop(record)
      }
    }.bind(this))
  },
  listInventory: function() {
    var inventoryList = _.map(this.inventory, function(record) {
    return record.artist
    // ("Artist: " + record.artist + ", Title: " + record.title + ", Price: " + record.price)
    })
  },
  totalInventoryValue: function() {
    var inventoryValue = _.map(this.inventory, function(record) {
      return record.price;
    })
    return _.sum(inventoryValue)
  },
  totalNetValue: function() {
    return this.balance + this.totalInventoryValue();
  },
  financialAnalysis: function() {
    return ("Total inventory value: " + this.totalInventoryValue() + ", Balance: " + this.balance + ", Total net value: " + this.totalNetValue())
  }
}

module.exports = RecordStore;