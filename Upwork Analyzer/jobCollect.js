var categoryArray = {
    "531770282584862721" : "Accounting & Consulting",
    "531770282580668416" : "Admin Support",
    "531770282580668417" : "Customer Service",
    "531770282580668420" : "Data Science & Analytics",
    "531770282580668421" : "Design & Creative",
    "531770282584862722" : "Engineering & Architecture",
    "531770282580668419" : "IT & Networking",
    "531770282584862723" : "Legal",
    "531770282580668422" : "Sales & Marketing",
    "531770282584862720" : "Translation",
    "531770282580668418" : "Web, Mobile & Software Dev",
    "531770282580668423" : "Writing"
}
var subCategoryArray = {
   531770282601639943 :   "Accounting & Bookkeeping" ,
   531770282601639945 : "Financial Planning" ,
   531770282601639944 : "Management Consulting & Analysis" ,
   531770282601639947 : "Other - Accounting & Consulting" ,
   1534904461833879552 : "Personal & Professional Coaching" ,
   531770282601639946 : "Recruiting & Human Resources" ,
   531770282584862724 : "Data Entry & Transcription Services" ,
   531770282584862726 : "Market Research & Product Reviews" ,
   531770282584862728 : "Project Management" ,
   531770282584862725 : "Virtual Assistance" ,
   1484275072572772352 : "Community Management & Tagging" ,
   531770282584862730 : "Customer Service & Tech Support" ,
   531770282593251329 : "AI & Machine Learning" ,
   531770282593251330 : "Data Analysis & Testing" ,
   531770282589057039 : "Data Design & Visualization" ,
   531770282593251331 : "Data Extraction/ETL" ,
   531770282589057038 : "Data Mining & Management" ,
   531770282593251335 : "Art & Illustration" ,
   531770282593251341 : "Audio & Music Production" ,
   1044578476142100480 : "Branding & Logo Design" ,
   531770282593251334 : "Graphic, Editorial & Presentation Design" ,
   1356688560628174848 : "NFT, AR/VR & Game Art" ,
   1356688565288046592 : "Performing Arts" ,
   531770282593251340 : "Photography" ,
   531770282601639953 : "Product Design" ,
   1356688570056970240 : "Video & Animation" ,
   531770282601639948 : "3D Modeling & CAD" ,
   531770282601639949 : "Building & Landscape Architecture" ,
   531770282605834240 : "Chemical Engineering" ,
   531770282601639950 : "Civil & Structural Engineering" ,
   531770282605834241 : "Contract Manufacturing" ,
   531770282601639951 : "Electrical & Electronic Engineering" ,
   531770282601639952 : "Energy & Mechanical Engineering" ,
   531770282605834242 : "Interior & Trade Show Design" ,
   1301900647896092672 : "Physical Sciences" ,
   531770282589057033 : "Database Management & Ad" ,
   531770282589057037 : "DevOps & Solution Architecture" ,
   531770282589057034 : "ERP/CRM Software" ,
   531770282589057036 : "Information Security & Compliance" ,
   531770282589057035 : "Network & System Administration" ,
   531770282605834246 : "Corporate & Contract Law" ,
   531770283696353280 : "Finance & Tax Law" ,
   1484275156546932736 : "International & Immigration Law" ,
   1484275408410693632 : "Public Law" ,
   531770282597445636 : "Digital Marketing" ,
   531770282597445634 : "Lead Generation & Telemarketing" ,
   531770282593251343 : "Marketing, PR & Brand Strategy" ,
   1534904461842268160 : "Language Tutoring & Interpretation" ,
   531770282601639939 : "Translation & Localization Services" ,
   1517518458442309632 : "Blockchain, NFT & Cryptocurrency" ,
   531770282589057025 : "Desktop Application Development" ,
   531770282589057026 : "Ecommerce Development" ,
   531770282589057027 : "Game Design & Development" ,
   531770282589057024 : "Mobile Development" ,
   531770282589057032 : "Other - Software Development" ,
   531770282589057030 : "Product Management" ,
   531770282589057031 : "QA Testing" ,
   531770282589057028 : "Scripts & Utilities" ,
   531770282589057029 : "Web & Mobile Designselected" ,
   531770282584862733 : "Web Development" ,
   1301900640421842944 : "Writing" ,
   531770282597445644 : "Content Writing" ,
   531770282597445646 : "Editing & Proofreading Services" ,
   1534904462131675136 : "Professional & Business Writing" 
}
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var categoryParam = urlParams.get('category2_uid');
var subParam = urlParams.get('subcategory2_uid');
var searchParam = urlParams.get('q');
var category = "All Categories";
var subCategory = "All SubCategories";
if(categoryParam){
    category = categoryArray[categoryParam];
}
if(subParam){
    subCategory = subCategoryArray[subParam];
}

function runAG() {
    chrome.storage.local.get(["jobc"]).then((result) => {
        if(result.jobc){
            console.log("Numbers Exist On Storage");
            var numbers = JSON.parse(result.jobc);
        }else{
            var numbers = [];
        }
        var newNumber = { search: searchParam , category : category , subcategory : subCategory};

        var count = document.querySelectorAll('[data-test="jobs-count"]')[0].childNodes[0];
       
        count = parseInt(count.innerText.replace(",",""));
        let newCount = {project : count};
        Object.assign(newNumber, newCount);
        numbers.push(newNumber);
        numbers = JSON.stringify(numbers);
        chrome.storage.local.set({ jobc: numbers }).then(() => {
            alert("Collected");
        }); 
    });
}
runAG();