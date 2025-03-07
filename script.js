document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded!");

    const currentPage = window.location.pathname.split("/").pop();
    console.log("📄 Current Page:", currentPage);

    if (currentPage === "index.html" || currentPage === "") {
        const searchBtn = document.getElementById("search-btn");

        if (searchBtn) {
            console.log("🔍 Search button found!");

            searchBtn.addEventListener("click", function (event) {
                console.log("✅ Search button clicked!");
                event.preventDefault();

                const getInputValue = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value.trim() : "";
                };

                // Capture all fields
                const searchQuery = getInputValue("search-input");
                const location = getInputValue("location");
                const industry = getInputValue("industry");
                const minSalary = getInputValue("min-salary");

                console.log("🔎 Captured Values:");
                console.log("📌 Job Title:", searchQuery);
                console.log("📍 Location:", location);
                console.log("🏢 Industry:", industry);
                console.log("💰 Min Salary:", minSalary);

                if (!searchQuery) {
                    console.log("❗ No Job Title Entered!");
                    return;
                }

                // Store values in URL
                const queryParams = new URLSearchParams({
                    search: searchQuery,
                    location: location,
                    industry: industry,
                    minSalary: minSalary
                });

                const redirectURL = `search.html?${queryParams.toString()}`;
                console.log("🔗 Redirecting to:", redirectURL);

                window.location.href = redirectURL;
            });

            console.log("🎯 Event listener ADDED to search button!");
        } else {
            console.log("❌ Search button NOT found!");
        }
    }

    // STEP 2: Pre-Fill Search Fields on search.html
    if (currentPage === "search.html") {
        console.log("🔄 Pre-filling search form...");

        const urlParams = new URLSearchParams(window.location.search);
        console.log("🌐 URL Parameters:", urlParams.toString());

        function prefillField(id, paramName) {
            const field = document.getElementById(id);
            if (field && urlParams.has(paramName)) {
                field.value = urlParams.get(paramName);
                console.log(`✅ Pre-filled ${id} with:`, field.value);
            } else {
                console.log(`⚠️ No value found for ${paramName}`);
            }
        }

        // Ensure all fields are pre-filled
        prefillField("search-input", "search");
        prefillField("location", "location");
        prefillField("industry", "industry");
        prefillField("min-salary", "minSalary");

        console.log("✅ Pre-filled search form on search.html");
    }
});