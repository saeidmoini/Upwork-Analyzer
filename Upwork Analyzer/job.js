function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function runAG() {
    chrome.storage.local.get(["job"]).then((result) => {
        if(result.job){
            console.log("Skills Exist On Storage");
            var skills = JSON.parse(result.job);
        }else{
            var skills = [];
        }
        let section = document.querySelectorAll('[data-test="JobTile"]');
        for (element of section) { 
            let badgets = element.querySelectorAll('.up-skill-badge');
            for (badget of badgets) { 
                badget = badget.innerText;
                const duplicate = skills.some(skill => skill.skill === badget);
                if(duplicate){
                    let index = skills.findIndex(item => item.skill == badget);
                    skills[index].count +=  1;
                }else{
                    var newBadget = { skill: badget , count: 1 };
                    skills.push(newBadget);
                } 
            }   
        }
        var next =  document.querySelectorAll('[class="pagination-link"]');
        async function checkNext(){
            if(next[0]){
                next = next[2].childNodes[0];
                if(next.hasAttribute('disabled')){ 
                    await Async();   
                    alert("Job Skills Finder Ended AND Ready For Download");       
                }else{
                    await Async();
                    next.click();
                    console.log("Next page");
                    setTimeout("runAG()", 5000);  
                }   
            }else{
                await Async();   
                alert("Job Skills Finder Ended AND Ready For Download");   
            }
        }
        function Async(){
            return new Promise((res)=>{
                skills = JSON.stringify(skills);
                chrome.storage.local.set({ job: skills }).then(() => {
                    console.log("New Skills Added");
                    res();
                }); 
            });
        }
        
        checkNext();
    });
}
console.log("End Of job.js");
setTimeout("runAG()", 5000);