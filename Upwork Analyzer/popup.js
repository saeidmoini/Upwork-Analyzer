document.addEventListener('DOMContentLoaded', function(){
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const dl = document.getElementById("download");
    const clearB = document.getElementById("clear");
    const clearFinder = document.getElementById("clearFinder");
    const collectB = document.getElementById("collect");
    const downloadB = document.getElementById("downloadC");
    var loaderType = document.getElementById("loaderType");
    var category = document.getElementById("category");
    var search = document.getElementById("search");
    start.addEventListener("click", startCollect);
    stop.addEventListener("click", stopCollect);
    dl.addEventListener("click", downloadSkills);
    clearB.addEventListener("click", clearNumbers);
    clearFinder.addEventListener("click", clearFinderF);
    collectB.addEventListener("click", collectNumbers);
    downloadB.addEventListener("click", downloadNumbers);
        
    function collectNumbers() {
        var jobUrl = "https://www.upwork.com/nx/jobs/search/?q="+search.value+"&category2_uid="+category.value+"&subcategory2_uid="+loaderType.value;
        var talentUrl = "https://www.upwork.com/search/profiles/?q="+search.value+"&category_uid="+category.value+"&subcategory_uid="+loaderType.value;
        if(search.value){
            chrome.runtime.sendMessage({
                joburl : jobUrl,
                talenturl : talentUrl,
                status: 'collect'
            });
            alert("Wait until the pages are fully loaded");
        }else{
            alert("Search Field Can't Be Empty");
        }
        
    };    
    function clearNumbers() {
        chrome.storage.local.remove(["jobc"]);
        chrome.storage.local.remove(["talentc"]);
        alert("Cleared");
    };    
    function clearFinderF() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0].url.includes('jobs')){
                chrome.storage.local.remove(["job"]);
                alert("Cleared");
            }else if(tabs[0].url.includes('profiles')){
                chrome.storage.local.remove(["talent"]);
                alert("Cleared");
            }else{
                alert("PLS Try On The Upwork Tabs");
                return;
            }
        });      
    };    
    function downloadNumbers() {
        
        var getName = ['jobc','talentc'];
        var i=-1;
        var objects = [];
        for(getname of getName){
            let gettingItem = new Promise((resolve) =>
                chrome.storage.local.get([getname], resolve),
            );
        
            gettingItem.then(onGot,onError);
        }

        function onGot(result) {
            i++;
            var data = Object.fromEntries(Object.entries(result).filter(([key]) => key.includes(getName[i])));
            if(Object.values(data)[0]){
                objects[i] = JSON.parse(Object.values(data)[0]); 
            }else if(i != 1){
                return;
            }else if(i === 1){
                alert('There Is No Data For Nichs');
                return;
            }
            if(i === 1){
                
                for(let x = 0; x < objects[0].length; x++){
                    let talentcount = {freelancer : objects[1][x].talentcount , rate : objects[0][x].project/objects[1][x].talentcount};
                    Object.assign(objects[0][x], talentcount);
                }
                var collects = JSON.parse(JSON.stringify(objects[0]));
                var byCount = collects.slice(0);
                byCount.sort(function(a,b) {
                    return b.count - a.count;
                });
                const jsonKeys = [];
                for (const key in byCount[0]) {
                    jsonKeys.push(key);
                }
                var json2CSV = jsonKeys.join(',') + '\n';
                for (var y = 0; y < byCount.length; y++) {
                    var row = '';
                    for (const key of jsonKeys) {
                        if (row !== '') {
                        row += ',';
                        }
                        let z = String(byCount[y][key]).replace(',', "");
                        row += z;
                    }
                    json2CSV += row + '\n';
                }
                download(json2CSV,'Nich-Finder-Results');
            }
        }
            
        function onError(error) {
            alert('There Is No Data For Nichs');
        } 
    };   
    function startCollect() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0].url.includes('jobs')){
                chrome.storage.local.remove(["job"]);
            }else if(tabs[0].url.includes('profiles')){
                chrome.storage.local.remove(["talent"]);
            }else{
                alert("PLS Try On The Upwork Tabs");
                return;
            }

            chrome.runtime.sendMessage({
                tabID : tabs[0].id,
                status: 'start'
            });
            alert("PLS Don't Close The Tab, Unless End Of Progress Or Clicking On Stop ");
        });           
    };
    function stopCollect() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0].url.includes('jobs')){
                var getName = 'job';
            }else if(tabs[0].url.includes('profiles')){
                var getName = "talent";
            }else{
                alert("PLS Try On The Upwork Tabs");
                return;
            }
            chrome.storage.local.get([getName]).then((result) => {
                var data = Object.fromEntries(Object.entries(result).filter(([key]) => key.includes(getName)));
                if(Object.values(data)[0]){
                    function onReloaded() {
                        alert(`Skill Finder Stopped AND You Can Download The Result`);
                    }
                    
                    function onError(error) {
                        console.log(`Error: ${error}`);
                    }
                    
                    let reloading = chrome.tabs.reload(tabs[0].id, { bypassCache: true });
                    reloading.then(onReloaded, onError);
                }else{
                    alert(`Skill Finder Doesn't Start Yet`);
                }
            })
        });           
    };
    function downloadSkills() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0].url.includes('jobs')){
                var getName = 'job';
                var csvName = 'Job-Skills';
            }
            if(tabs[0].url.includes('profiles')){
                var getName = "talent";
                var csvName = 'Talent-Skills';
            }

            function onGot(result) {
                var data = Object.fromEntries(Object.entries(result).filter(([key]) => key.includes(getName)));
                if(Object.values(data)[0]){
                    var parsedData = JSON.parse(Object.values(data)[0]); 
                    var byCount = parsedData.slice(0);
                    byCount.sort(function(a,b) {
                        return b.count - a.count;
                    });
                    const jsonKeys = [];
                    for (const key in byCount[0]) {
                        jsonKeys.push(key);
                    }
                    var json2CSV = jsonKeys.join(',') + '\n';
                    for (var i = 0; i < byCount.length; i++) {
                        var row = '';
                        for (const key of jsonKeys) {
                            if (row !== '') {
                            row += ',';
                            }
                            row += byCount[i][key];
                        }
                        json2CSV += row + '\n';
                    }
                    
                    download(json2CSV,csvName);
                }else{
                    alert('There Is No Data On This Page');
                }
            }
              
            function onError(error) {
                alert('There Is No Data On This Page');
            }
            let gettingItem = new Promise((resolve) =>
                chrome.storage.local.get([getName], resolve),
            );
            
            gettingItem.then(onGot,onError);
           
        });           
    };
    function download(data,name) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a') 
        a.setAttribute('href', url)
        a.setAttribute('download', name+'.csv');
        a.click()
    }
}, false);
