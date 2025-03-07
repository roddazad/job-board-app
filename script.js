document.addEventListener("DOMContentLoaded", function () {
    console.log(" JavaScript Loaded!");

    const currentPage = window.location.pathname.split("/").pop();
    console.log(" Current Page:", currentPage);

    //  Toggle Mobile Navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    //  Search Functionality (index.html & search.html)
    if (currentPage === "index.html" || currentPage === "") {
        const searchBtn = document.getElementById("search-btn");

        if (searchBtn) {
            searchBtn.addEventListener("click", function (event) {
                event.preventDefault();
                console.log(" Search button clicked!");

                // Collect search form values
                const getInputValue = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value.trim() : "";
                };

                const searchParams = {
                    search: getInputValue("search-input"),
                    location: getInputValue("location"),
                    industry: getInputValue("industry"),
                    experience: getInputValue("experience"),
                    jobType: getInputValue("job-type"),
                    workPreference: getInputValue("remote-onsite"),
                    datePosted: getInputValue("date-posted"),
                    minSalary: getInputValue("min-salary"),
                    companyName: getInputValue("company-name"),
                    skills: getInputValue("skills")
                };

                if (!searchParams.search) {
                    console.warn(" No Job Title Entered!");
                    return;
                }

                // Redirect with query parameters
                const queryParams = new URLSearchParams(searchParams).toString();
                const redirectURL = `search.html?${queryParams}`;
                console.log(" Redirecting to:", redirectURL);
                window.location.href = redirectURL;
            });

            console.log(" Event listener ADDED to search button!");
        }
    }

    //  Search Functionality in `search.html`
    if (currentPage === "search.html") {
        console.log(" Pre-filling search form & Fetching jobs...");

        const urlParams = new URLSearchParams(window.location.search);
        const getParamValue = (param) => urlParams.get(param) || "";

        // Pre-fill form fields
        document.getElementById("search-input").value = getParamValue("search");
        document.getElementById("location").value = getParamValue("location");
        document.getElementById("industry").value = getParamValue("industry");
        document.getElementById("experience").value = getParamValue("experience");
        document.getElementById("job-type").value = getParamValue("jobType");
        document.getElementById("remote-onsite").value = getParamValue("workPreference");
        document.getElementById("date-posted").value = getParamValue("datePosted");
        document.getElementById("min-salary").value = getParamValue("minSalary");
        document.getElementById("company-name").value = getParamValue("companyName");
        document.getElementById("skills").value = getParamValue("skills");

        // Fetch jobs based on search input
        const jobTitle = getParamValue("search");
        const location = getParamValue("location") || "us";
        if (jobTitle) {
            fetchJobs(jobTitle, location);
        }

        // 🔹 Fix: Ensure Search Button in `search.html` Works
        const searchBtn = document.getElementById("search-btn");
        if (searchBtn) {
            searchBtn.addEventListener("click", function (event) {
                event.preventDefault();
                console.log("✅ Search button in search.html clicked!");

                const jobTitle = document.getElementById("search-input").value.trim();
                const location = document.getElementById("location").value || "us";

                if (!jobTitle) {
                    console.warn(" No Job Title Entered!");
                    return;
                }

                fetchJobs(jobTitle, location);
            });

            console.log(" Search button event listener added in search.html!");
        }
    }

    //  Fetch Jobs from API
    async function fetchJobs(jobTitle, location) {
        const apiKey = "c8f22d05e0msh10f113bb5ea3548p132972jsnd857298fef44"; //API key

        const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(jobTitle)}&page=1&num_pages=1&country=${location}`;

        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
            }
        };

        try {
            console.log("🔍 Fetching jobs for:", jobTitle, "| Location:", location);
            const response = await fetch(url, options);
            const data = await response.json();

            console.log("✅ Job Data Received:", data);

            if (data.data && data.data.length > 0) {
                displayJobs(data.data);
                saveJobsToLocalStorage(data.data);
            } else {
                document.querySelector(".job-results").innerHTML = "<p>No jobs found. Try another search.</p>";
            }
        } catch (error) {
            console.error("🚨 Error fetching jobs:", error);
        }
    }

    //  Display Jobs in `search.html`
    function displayJobs(jobs) {
        const jobsContainer = document.querySelector(".job-results");
        jobsContainer.innerHTML = "";

        jobs.forEach(job => {
            const jobElement = document.createElement("div");
            jobElement.classList.add("job-card");
            jobElement.innerHTML = `
                <h3>${job.job_title}</h3>
                <p><strong>Company:</strong> ${job.employer_name || "Not provided"}</p>
                <p><strong>Location:</strong> ${job.job_city || "Not specified"}</p>
                <p><strong>Salary:</strong> ${job.salary_info || "Not listed"}</p>
                <a href="${job.job_apply_link}" target="_blank">Apply Now</a>
            `;
            jobsContainer.appendChild(jobElement);
        });
    }

    //  Save Jobs to LocalStorage (Fix: Appends Instead of Overwriting)
    function saveJobsToLocalStorage(jobs) {
        let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        savedJobs = [...savedJobs, ...jobs]; // Append new jobs
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    }

    //  Load Saved Jobs in `your-jobs.html`
    if (currentPage === "your-jobs.html") {
        console.log("📂 Loading saved jobs in your-jobs.html...");
        displaySavedJobs();
    }

    //  Display Saved Jobs
    function displaySavedJobs() {
        const savedJobsContainer = document.getElementById("saved-jobs");
        
        if (!savedJobsContainer) {
            console.error(" ERROR: Saved jobs container NOT found in your-jobs.html!");
            return;
        }

        savedJobsContainer.innerHTML = ""; // Clear old content

        let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

        if (savedJobs.length === 0) {
            savedJobsContainer.innerHTML = "<p>No saved jobs found.</p>";
            return;
        }

        savedJobs.forEach((job, index) => {
            const jobElement = document.createElement("div");
            jobElement.classList.add("job-card");
            jobElement.innerHTML = `
                <h3>${job.job_title}</h3>
                <p><strong>Company:</strong> ${job.employer_name || "Not provided"}</p>
                <p><strong>Location:</strong> ${job.job_city || "Not specified"}</p>
                <p><strong>Salary:</strong> ${job.salary_info || "Not listed"}</p>
                <a href="${job.job_apply_link}" target="_blank">Apply Now</a>
            `;
            savedJobsContainer.appendChild(jobElement);
        });
    }
});