document.getElementById("category").addEventListener("change", (event) => {
    catSelect(event.target.value,"category"); 
  });
function catSelect(state, loc) {
  
    if (loc == "category") {
      var category = document.getElementById("loaderType");
    }
    category.options.length = 0;
  
    if (state == "") {
      category.options[0] = new Option("Select Category", "");
      category.setAttribute('disabled', '');
    }
    if (state == '531770282584862721') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Accounting & Bookkeeping", "531770282601639943");
      category.options[2] = new Option("Financial Planning", "531770282601639945");
      category.options[3] = new Option("Management Consulting & Analysis", "531770282601639944");
      category.options[4] = new Option("Other - Accounting & Consulting", "531770282601639947");
      category.options[5] = new Option("Personal & Professional Coaching", "1534904461833879552");
      category.options[6] = new Option("Recruiting & Human Resources", "531770282601639946");
    }
    if (state == '531770282580668416') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Data Entry & Transcription Services", "531770282584862724");
      category.options[2] = new Option("Market Research & Product Reviews", "531770282584862726");
      category.options[3] = new Option("Project Management", "531770282584862728");
      category.options[4] = new Option("Virtual Assistance", "531770282584862725");
    }
    if (state == '531770282580668417') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Community Management & Tagging", "1484275072572772352");
      category.options[2] = new Option("Customer Service & Tech Support", "531770282584862730");
    }
    if (state == '531770282580668420') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("AI & Machine Learning", "531770282593251329");
      category.options[2] = new Option("Data Analysis & Testing", "531770282593251330");
      category.options[3] = new Option("Data Design & Visualization", "531770282589057039");
      category.options[4] = new Option("Data Extraction/ETL", "531770282593251331");
      category.options[5] = new Option("Data Mining & Management", "531770282589057038");
    }
    if (state == '531770282580668421') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Art & Illustration", "531770282593251335");
      category.options[2] = new Option("Audio & Music Production", "531770282593251341");
      category.options[3] = new Option("Branding & Logo Design", "1044578476142100480");
      category.options[4] = new Option("Graphic, Editorial & Presentation Design", "531770282593251334");
      category.options[5] = new Option("NFT, AR/VR & Game Art", "1356688560628174848");
      category.options[6] = new Option("Performing Arts", "1356688565288046592");
      category.options[7] = new Option("Photography", "531770282593251340");
      category.options[8] = new Option("Product Design", "531770282601639953");
      category.options[9] = new Option("Video & Animation", "1356688570056970240");
    }
    if (state == '531770282584862722') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("3D Modeling & CAD", "531770282601639948");
      category.options[2] = new Option("Building & Landscape Architecture", "531770282601639949");
      category.options[3] = new Option("Chemical Engineering", "531770282605834240");
      category.options[4] = new Option("Civil & Structural Engineering", "531770282601639950");
      category.options[5] = new Option("Contract Manufacturing", "531770282605834241");
      category.options[6] = new Option("Electrical & Electronic Engineering", "531770282601639951");
      category.options[7] = new Option("Energy & Mechanical Engineering", "531770282601639952");
      category.options[8] = new Option("Interior & Trade Show Design", "531770282605834242");
      category.options[9] = new Option("Physical Sciences", "1301900647896092672");
    }
    if (state == '531770282580668419') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Database Management & Ad", "531770282589057033");
      category.options[2] = new Option("DevOps & Solution Architecture", "531770282589057037");
      category.options[3] = new Option("ERP/CRM Software", "531770282589057034");
      category.options[4] = new Option("Information Security & Compliance", "531770282589057036");
      category.options[5] = new Option("Network & System Administration", "531770282589057035");
    }
    if (state == '531770282584862723') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Corporate & Contract Law", "531770282605834246");
      category.options[2] = new Option("Finance & Tax Law", "531770283696353280");
      category.options[3] = new Option("International & Immigration Law", "1484275156546932736");
      category.options[4] = new Option("Public Law", "1484275408410693632");
    }
    if (state == '531770282580668422') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Digital Marketing", "531770282597445636");
      category.options[2] = new Option("Lead Generation & Telemarketing", "531770282597445634");
      category.options[3] = new Option("Marketing, PR & Brand Strategy", "531770282593251343");
    }
    if (state == '531770282584862720') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Language Tutoring & Interpretation", "1534904461842268160");
      category.options[2] = new Option("Translation & Localization Services", "531770282601639939");
    }
    if (state == '531770282580668418') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Blockchain, NFT & Cryptocurrency", "1517518458442309632");
      category.options[2] = new Option("Desktop Application Development", "531770282589057025");
      category.options[3] = new Option("Ecommerce Development", "531770282589057026");
      category.options[4] = new Option("Game Design & Development", "531770282589057027");
      category.options[5] = new Option("Mobile Development", "531770282589057024");
      category.options[6] = new Option("Other - Software Development", "531770282589057032");
      category.options[7] = new Option("Product Management", "531770282589057030");
      category.options[8] = new Option("QA Testing", "531770282589057031");
      category.options[9] = new Option("Scripts & Utilities", "531770282589057028");
      category.options[10] = new Option("Web & Mobile Designselected", );
      category.options[11] = new Option("Web Development", "531770282589057029");
      category.options[12] = new Option("Writing", "531770282584862733");
    }
    if (state == '531770282580668423') {
      category.options[0] = new Option("All Sub Categories", "");
      category.options[1] = new Option("Content Writing", "1301900640421842944");
      category.options[2] = new Option("Editing & Proofreading Services", "531770282597445644");
      category.options[3] = new Option("Professional & Business Writing", "531770282597445646");
      category.options[4] = new Option("Sales & Marketing Cop", "1534904462131675136");
    }
}
  