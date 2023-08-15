chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        if(request.status == 'start'){
            chrome.tabs.get(request.tabID, current =>{
                if(current.url.includes('jobs')){
                    chrome.scripting.executeScript({
                        target: {tabId: request.tabID, allFrames: false},
                        files: ['job.js'],
                    });                   
                }else if(current.url.includes('profiles')){
                    chrome.scripting.executeScript({
                        target: {tabId: request.tabID, allFrames: false},
                        files: ['talent.js'],
                    });   
                }
            })
        }  
        if(request.status == 'collect'){
            chrome.tabs.query({ url: "*://*.upwork.com/*" }).then(logTabs);
            var jobStatus = false;
            var talentStatus = false;
            function logTabs(tabs) {
                for (const tab of tabs) {
                  if (tab.url.includes('jobs') && jobStatus === false){
                    jobStatus = true;
                    let updating = chrome.tabs.update(tab.id,{ url: request.joburl });
                    updating.then(onCreated, onError);
                  }else if (tab.url.includes('profiles') && talentStatus === false){
                    talentStatus = true;
                    let updating = chrome.tabs.update(tab.id,{ url: request.talenturl });
                    updating.then(onCreated, onError);
                  }
                }
                console.log(talentStatus,jobStatus);
                if (talentStatus === false){
                    let url = request.talenturl;
                    creatNew(url);
                }
                if(jobStatus === false){
                    let url = request.joburl;
                    creatNew(url);
                }
            }
    
            function creatNew(url){
                let creating = chrome.tabs.create({
                    url: url,
                    active:false
                });
                creating.then(onCreated, onError);
            }
            function onCreated(tab){
                sleep(5000); 
                chrome.tabs.get(tab.id, current =>{
                    if(current.url.includes('jobs')){
                        chrome.scripting.executeScript({
                            target: {tabId: tab.id, allFrames: false},
                            files: ['jobCollect.js'],
                        }); 
                    }else if(current.url.includes('profiles')){
                        chrome.scripting.executeScript({
                            target: {tabId: tab.id, allFrames: false},
                            files: ['talentCollect.js'],
                        })
                    }
                })
            }

            function onError(error) {
                console.log(`Error: ${error}`);
            }
            function sleep(num) {
                let now = new Date();
                let stop = now.getTime() + num;
                while(true) {
                    now = new Date();
                    if(now.getTime() > stop) return;
                }
            }
        }  
    }   
);
