'use strict';

// Put your view code here (e.g., the graph renderering code)

var dict = {},
    activityType,
    duration;
var totalTime = [0, 0, 0, 0, 0];
var totalEnergy = [0, 0, 0, 0, 0];
var totalStress = [0, 0, 0, 0, 0];
var totalHappiness = [0, 0, 0, 0, 0];
var lastDate = "0";

var DataCollect = function(model){
    var self = this;
    this.model = model;

    document.getElementById('submitBtn').addEventListener('click', function(){
        self.addPoint();
    });    

    this.addPoint = function(){
        if(formcheck()) {
            model.addActivityDataPoint(new ActivityData(activityType, dict, duration));
        }  
        if(activityType == "coding"){
            totalTime[0] += duration;
            totalEnergy[0] += dict["energy"];
            totalStress[0] += dict["stress"];
            totalHappiness[0] += dict["happiness"];
        }
        else if(activityType == "running"){
            totalTime[1] += duration;
            totalEnergy[1] += dict["energy"];
            totalStress[1] += dict["stress"];
            totalHappiness[1] += dict["happiness"];
        }
        else if (activityType == "tv"){
            totalTime[2] += duration;
            totalEnergy[2] += dict["energy"];
            totalStress[2] += dict["stress"];
            totalHappiness[2] += dict["happiness"];
        }
        else if(activityType == "badminton"){
            totalTime[3] += duration;
            totalEnergy[3] += dict["energy"];
            totalStress[3] += dict["stress"];
            totalHappiness[3] += dict["happiness"];
        }
        else if(activityType == "swimming"){
            totalTime[4] += duration;
            totalEnergy[4] += dict["energy"];
            totalStress[4] += dict["stress"];
            totalHappiness[4] += dict["happiness"];
        }
        document.getElementById('codingtime').innerHTML = totalTime[0];
        document.getElementById('runningtime').innerHTML = totalTime[1];
        document.getElementById('tvtime').innerHTML = totalTime[2];
        document.getElementById('badmintontime').innerHTML = totalTime[3];
        document.getElementById('swimmingtime').innerHTML = totalTime[4];

        document.getElementById('wcenergy').innerHTML = totalEnergy[0];
        document.getElementById('ruenergy').innerHTML = totalEnergy[1];
        document.getElementById('tvenergy').innerHTML = totalEnergy[2];
        document.getElementById('baenergy').innerHTML = totalEnergy[3];
        document.getElementById('swenergy').innerHTML = totalEnergy[4];

        document.getElementById('wcstress').innerHTML = totalStress[0];
        document.getElementById('rustress').innerHTML = totalStress[1];
        document.getElementById('tvstress').innerHTML = totalStress[2];
        document.getElementById('bastress').innerHTML = totalStress[3];
        document.getElementById('swstress').innerHTML = totalStress[4];

        document.getElementById('wchappiness').innerHTML = totalHappiness[0];
        document.getElementById('ruhappiness').innerHTML = totalHappiness[1];
        document.getElementById('tvhappiness').innerHTML = totalHappiness[2];
        document.getElementById('bahappiness').innerHTML = totalHappiness[3];
        document.getElementById('swhappiness').innerHTML = totalHappiness[4];
        
    }
};
function formcheck(){
    var activity = document.getElementById('select').value,
        energy = parseInt(document.getElementById('selectEnergy').value),
        stress = parseInt(document.getElementById('selectStress').value),
        happiness = parseInt(document.getElementById('selectHappiness').value),
        time = parseInt(document.getElementById('timespent').value);

    var date = new Date(),
        monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear(),
        month = monthNames[monthIndex],
        hour = date.getHours(),
        minute = date.getMinutes(),
        apm = "AM";

    if (hour >= 12){
        hour = hour-12;
        apm = "PM";
    }
    if (hour == 0){
        hour = 12;
    }
    if(minute < 10){
        minute = "0"+minute;
    }

    document.getElementById('dategoeshere').innerHTML = month+ " " +day+", "+year+" "+hour+":"+minute+" "+apm;
    lastDate = month+ " " +day+", "+year+" "+hour+":"+minute+" "+apm;

    duration = time;
    activityType = activity; 
    dict["energy"] = energy;
    dict["stress"] = stress;
    dict["happiness"] = happiness;
    
    return true;
}

var GraphView = function(model){
    var self = this;
    this.model = model;

    this.table_view = document.getElementById('TableView');
    this.table_div = document.getElementById('table-div');
    this.bar_view = document.getElementById('BarGraph');
    this.bar_div = document.getElementById('bar-div');
    this.custom_div = document.getElementById('Customize');
    this.xAxisLabel = document.getElementById('xAxisLabel');

    this.totalTime = document.getElementById('totalTimeSpent');
    this.totalE = document.getElementById('totalEnergy');
    this.totalS = document.getElementById('totalStress');
    this.totalH = document.getElementById('totalHappiness');

    var context = document.getElementById('myCanvas').getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.canvas.width = 400;
    context.canvas.height = 200;
    var xAxis = ["Writing Code", "Running", "Watching TV", "Badminton", "Swimming"];

    this.totalTime.addEventListener('click', function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.canvas.width = 400;
        context.canvas.height = 200;
        draw(context, totalTime, 450, 150, xAxis);
    });
    this.totalE.addEventListener('click', function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.canvas.width = 400;
        context.canvas.height = 200;
        draw(context, totalEnergy, 450, 150, xAxis);
    });
    this.totalS.addEventListener('click', function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.canvas.width = 400;
        context.canvas.height = 200;
        draw(context, totalStress, 450, 150, xAxis);
    });
    this.totalH.addEventListener('click', function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.canvas.width = 400;
        context.canvas.height = 200;
        draw(context, totalHappiness, 450, 150, xAxis);
    });

    this.table_view.addEventListener('click', function(){
        model.selectGraph('TableView');
    });
    this.bar_view.addEventListener('click', function(){
        model.selectGraph('BarGraph');
    });

    this.model.addListener(function(eventType, eventTime, eventData){
        if (eventType == GRAPH_SELECTED_EVENT){
            switch(eventData){
                case 'TableView':
                    self.table_view.className = "active";
                    self.bar_view.className = "";
                    self.table_div.className = '';
                    self.bar_div.className = 'hidden';
                    self.table_view.checked = "checked";
                    self.bar_view.checked = "";
                    self.custom_div.className = 'hidden';
                    self.xAxisLabel.className = 'hidden';
                    break;
                case 'BarGraph':
                    self.bar_view.className = "active";
                    self.table_view.className = "";
                    self.bar_div.className = '';
                    self.table_div.className = 'hidden';
                    self.bar_view.checked = "checked";
                    self.table_view.checked = "";
                    self.custom_div.className = '';
                    self.xAxisLabel.className ='';
                    var context = document.getElementById('myCanvas').getContext("2d");
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    context.canvas.width = 400;
                    context.canvas.height = 200;
                    var xAxis = ["Writing Code", "Running", "Watching TV", "Badminton", "Swimming"];
                    draw(context, totalTime, 450, 150, xAxis);
            }
        }
    });
};

function draw(context, array, grwidth, grheight, xAxis){
    var numOfBars = 5;
    var barWidth, barHeight;
    var ratio, maxBarHeight;
    var totalBarWidth = grwidth-40;
    var totalBarHeight = grheight-40;
    var largestVal = 0;

    if (context.canvas.width !== grwidth || context.canvas.height !== grheight) {
        context.canvas.width = grwidth;
        context.canvas.height = grheight;
    }

    barWidth = (totalBarWidth / numOfBars)-10;
    maxBarHeight = totalBarHeight - 10;

    context.strokeType = '#333';
    context.textAlign = "center";
    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(20, context.canvas.height-20);
    context.lineTo(context.canvas.width, context.canvas.height-20);
    context.stroke();

    for(var i = 0; i <5; i++){
        context.fillText(xAxis[i], i*grwidth/numOfBars + 52, context.canvas.height-5);
    }

    for (var i = 0; i < 5; i++) {
        if (array[i] > largestVal) {
            largestVal = array[i];    
        }
    }

    for (var i = 0; i < 5; i++) {
        ratio = array[i] / largestVal;
        barHeight = ratio * maxBarHeight;
        context.fillStyle = '#333';
        context.fillRect(i*grwidth/numOfBars + 21, totalBarHeight-barHeight+21, barWidth-2, barHeight-2);
        context.fillText(parseInt(array[i],10), i*grwidth/numOfBars + 52, totalBarHeight - barHeight);
    }
}

/**
 *  TabView  
 */
var TabView = function(model) {
    // Obtains itself   
    var self = this;

    // Stores the model
    this.model = model;

    // Available tabs and divs
    this.nav_input_tab = document.getElementById('nav-input-tab');
    this.input_div = document.getElementById('input-div');

    this.nav_analysis_tab = document.getElementById('nav-analysis-tab');
    this.analysis_div = document.getElementById('analysis-div');
    
    this.totalTime = document.getElementById('totalTimeSpent');
    this.totalE = document.getElementById('totalEnergy');
    this.totalS = document.getElementById('totalStress');
    this.totalH = document.getElementById('totalHappiness');

    // Binds tab view with model  
    this.nav_input_tab.addEventListener('click', function() {
        model.selectTab('InputTab');
    });

    this.nav_analysis_tab.addEventListener('click', function() {
        model.selectTab('AnalysisTab');
    });

    // Binds model change with view
    this.model.addListener(function(eventType, eventTime, eventData) {
        if (eventType === TAB_SELECTED_EVENT)   {
            switch (eventData) {
                case 'InputTab':
                    self.nav_input_tab.className = "active";
                    self.nav_analysis_tab.className = "";
                    self.input_div.className = '';
                    self.analysis_div.className = 'hidden';
                    break;
                case 'AnalysisTab':
                    self.nav_analysis_tab.className = "active";
                    self.nav_input_tab.className = "";
                    self.input_div.className = 'hidden';
                    self.analysis_div.className = '';

                    var context = document.getElementById('myCanvas').getContext("2d");
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    context.canvas.width = 400;
                    context.canvas.height = 200;
                    var xAxis = ["Writing Code", "Running", "Watching TV", "Badminton", "Swimming"];
                    if(self.totalTime.checked){
                        console.log('in totaltimechecked');
                        console.log('totalTime[0] is '+totalTime[0]);
                        draw(context, totalTime, 450, 150, xAxis);
                    }
                    else if(self.totalE.checked){
                        console.log('in totalenergychecked');
                        console.log('totalEnergy[0] is '+totalEnergy[0]);
                        draw(context, totalEnergy, 450, 150, xAxis);
                    }
                    else if(self.totalS.checked){
                        console.log('in totalschecked');
                        draw(context, totalStress, 450, 150, xAxis);
                    }
                    else {
                        console.log('in totalhchecked');
                        draw(context, totalHappiness, 450, 150, xAxis);
                    }
                    break;
            }
        }
    });
}