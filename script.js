document.addEventListener( "DOMContentLoaded" , function () {
    // Get a hook to the Search button
    const searchBtn = document.getElementById("search-btn");
    
    if(searchBtn){
        searchBtn.addEventListener("click", function () {
               // Get values from input and dropdowns
    const searchQuery = document.getElementById("search-input").value;
    const location = document.getElementById("location").value;
    const industry = document.getElementById("industry").value;
    const experience = document.getElementById("experience").value;
    const jobType = document.getElementById("job-type").value;
    const workPreference = document.getElementById("remote-onsite").value;
    const datePosted = document.getElementById("date-posted").value;
    const minSalary = document.getElementById("min-salary").value;
    const companyName = document.getElementById("company-name").value;
    const skills = document.getElementById("skills").value;

    // Store values as URL parameters
    const QueryParams = new URLSearchParams({
        search: searchQuery,
        location: location,
        industry: industry,
        experience: experience,
        jobType: jobType,
        workPreference: workPreference,
        datePosted: datePosted,
        minSalary: minSalary,
        companyName: companyName,
        skills: skills
    });

    // Redirect to search.html with parameters
    window.location.href = `search.html?${queryParams.toString()}`;
        });
    }

    // Pre-Fill Search Fields on `search.html`
      const urlParams = new URLSearchParams(window.location.search);

      function prefillField(id, paramName) {
          const field = document.getElementById(id);
          if (field && urlParams.has(paramName)) {
              field.value = urlParams.get(paramName);
          }
      }
  
    // Pre-fill all form fields with values from URL
      prefillField("search-input", "search");
      prefillField("location", "location");
      prefillField("category", "category");
      prefillField("industry", "industry");
      prefillField("experience", "experience");
      prefillField("job-type", "jobType");
      prefillField("remote-onsite", "workPreference");
      prefillField("date-posted", "datePosted");
      prefillField("min-salary", "minSalary");
      prefillField("company-name", "companyName");
      prefillField("skills", "skills");
  
 

});