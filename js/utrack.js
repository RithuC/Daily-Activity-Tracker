'use strict';

/*
Put any interaction code here
 */

window.addEventListener('load', function() {
  // You should wire up all of your event handling code here, as well as any
  // code that initiates calls to manipulate the DOM (as opposed to responding
  // to events)
  // Instantiate a TabView and a TabModel, then bind them together.
  var tabView = new TabView(new TabModel());

  var ACModel = new ActivityCollectionModel();

  var dataView = new DataCollect(ACModel);

  var graphView = new GraphView(new GraphModel());

  if(lastDate != "0"){
  	document.getElementById('dategoeshere').innerHTML = lastDate;
  }
});

