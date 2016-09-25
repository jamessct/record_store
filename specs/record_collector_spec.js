var RecordStore = require('../record_store');
var Record = require('../records');
var RecordCollector = require('../record_collector');
var assert = require('assert');

describe("RecordCollector", function() {
  it("should have a name and balance", function() {
    var jimmy = new RecordCollector("Jimmy", 300);
    assert.equal("Jimmy", jimmy.name);
    assert.equal(300, jimmy.cashmoney)
  })
  it("should lose cahsmoney when buying a record", function() {
    var jimmy = new RecordCollector("Jimmy", 300);
    var harveysHouseOfSoundtracks = new RecordStore("Harvey's House of Soundtracks", "Dunfermline", 0);
    var jamesBondSoundtrack = new Record("Various Artists", "James Bond Soundtrack", 10);
    jimmy.buy("James Bond Soundtrack", jamesBondSoundtrack, harveysHouseOfSoundtracks);
    assert.equal(290, jimmy.cashmoney)
  })
  it("should add to collection when buying record", function() {
    var jimmy = new RecordCollector("Jimmy", 300);
    var harveysHouseOfSoundtracks = new RecordStore("Harvey's House of Soundtracks", "Dunfermline", 0);
    var jamesBondSoundtrack = new Record("Various Artists", "James Bond Soundtrack", 10);
    jimmy.buy("James Bond Soundtrack", jamesBondSoundtrack, harveysHouseOfSoundtracks);
    assert.deepEqual([{ "artist": "Various Artists", "price": 10, "title": "James Bond Soundtrack" }], jimmy.collection)
  })
  it("should add cashmoney to store balance when buying", function() {
    var jimmy = new RecordCollector("Jimmy", 300);
    var harveysHouseOfSoundtracks = new RecordStore("Harvey's House of Soundtracks", "Dunfermline", 0);
    var jamesBondSoundtrack = new Record("Various Artists", "James Bond Soundtrack", 10);
    harveysHouseOfSoundtracks.addRecord(jamesBondSoundtrack);
    jimmy.buy("James Bond Soundtrack", jamesBondSoundtrack, harveysHouseOfSoundtracks);
    assert.equal(10, harveysHouseOfSoundtracks.balance)
  })
  it("should remove record from store inventory when buying", function() {
    var jimmy = new RecordCollector("Jimmy", 300);
    var harveysHouseOfSoundtracks = new RecordStore("Harvey's House of Soundtracks", "Dunfermline", 0);
    var jamesBondSoundtrack = new Record("Various Artists", "James Bond Soundtrack", 10);
    harveysHouseOfSoundtracks.addRecord(jamesBondSoundtrack);
    jimmy.buy("James Bond Soundtrack", jamesBondSoundtrack, harveysHouseOfSoundtracks);
    assert.deepEqual([], harveysHouseOfSoundtracks.inventory)
  })
})