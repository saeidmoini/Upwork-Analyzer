function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function runAG() {

   chrome.storage.local.get(["talent"]).then(async (result) => {
        
        if(result.talent){
            console.log("Skills Exist On Storage");
            var skills = JSON.parse(result.talent);
        }else{
            var skills = [];
        }
        
        function skillFinder(badgets){
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
        let section = document.querySelectorAll('[data-test="FreelancerTile"]');
        for (element of section) {
            let earns = element.querySelectorAll('[data-test="earned-amount-formatted"]');
        
            for (earn of earns) {
                var type = earn.innerHTML.search("K");
                
                if (type != -1) {
                    earns = earn.innerHTML.replace("K", "");
                    earns = earns.replace("$", "");
                    earns = earns.replace("+", "");
                    if (parseInt(earns) >= 100) {
                        let badgets = element.querySelectorAll('.up-skill-badge');
                        skillFinder(badgets);
                    }
                }
                var type = earn.innerHTML.search("M");
                
                if (type != -1) {
                    earns = earn.innerHTML.replace("M", "");
                    earns = earns.replace("$", "");
                    earns = earns.replace("+", "");
                
                    let badgets = element.querySelectorAll('.up-skill-badge');
                    skillFinder(badgets);
                    
                }
            }
            let upSkills = element.querySelectorAll('[data-qa="top-rated"]');
            for (upSkill of upSkills) {
                let badgets = element.querySelectorAll('.up-skill-badge');
                skillFinder(badgets);
            }
        }
       
        var next =  document.querySelectorAll('[class="pagination-link"]');
        async function checkNext(){
            if(next[0]){
                next = next[1].childNodes[0];
                if(next.hasAttribute('disabled')){ 
                    await Async();   
                    alert("Talent Skills Finder Ended AND Ready For Download");       
                }else{
                    await Async();
                    next.click();
                    console.log("Next page");
                    setTimeout("runAG()", 5000);  
                }   
            }else{
                await Async();   
                alert("Talent Skills Finder Ended AND Ready For Download");   
            }
        }
        function Async(){
            return new Promise((res)=>{
                skills = JSON.stringify(skills);
                chrome.storage.local.set({ talent: skills }).then(() => {
                    console.log("New Skills Added");
                    res();
                }); 
            });
        }
        
        checkNext();
    });
}
console.log("End Of talent.js");
setTimeout("runAG()", 5000);