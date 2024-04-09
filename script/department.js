document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/department.json')
        .then(response => response.json())
        .then(data => {
            populateDeptIntro(data.sections.find(section => section.type === 'deptIntroduction'));
            populateProtectedAreas(data.sections.find(section => section.type === 'protectedAreas'));

            // Store data in localStorage
            localStorage.setItem('departmentData', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching JSON:', error));

    function populateDeptIntro(deptIntroData) {
        var deptIntroSection = document.querySelector(".deptIntroduction");
        var container = document.createElement("div");
        container.classList.add("container");

        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", deptIntroData.content.container.iframe.src);
        iframe.setAttribute("width", deptIntroData.content.container.iframe.width);
        iframe.setAttribute("height", deptIntroData.content.container.iframe.height);
        iframe.setAttribute("style", deptIntroData.content.container.iframe.style);
        iframe.setAttribute("allowfullscreen", deptIntroData.content.container.iframe.allowfullscreen);
        iframe.setAttribute("loading", deptIntroData.content.container.iframe.loading);
        iframe.setAttribute("referrerpolicy", deptIntroData.content.container.iframe.referrerpolicy);
        iframe.classList.add("photos");

        var description = document.createElement("div");
        description.classList.add("description");

        var heading = document.createElement("h3");
        heading.textContent = deptIntroData.content.container.description.heading;

        var paragraph = document.createElement("p");
        paragraph.textContent = deptIntroData.content.container.description.paragraph;

        description.appendChild(heading);
        description.appendChild(paragraph);

        container.appendChild(iframe);
        container.appendChild(description);

        deptIntroSection.appendChild(container);
    }

    function populateProtectedAreas(protectedAreasData) {
        var protectedAreasSection = document.querySelector(".protectedAreas");

        var heading = document.createElement("h2");
        heading.classList.add("section-heading");
        heading.textContent = protectedAreasData.heading;
        protectedAreasSection.appendChild(heading);

        var introParagraph = document.createElement("p");
        introParagraph.classList.add("section-intro");
        introParagraph.textContent = protectedAreasData.intro;
        protectedAreasSection.appendChild(introParagraph);

        var sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        protectedAreasData.items.forEach(item => {
            var box = document.createElement("div");
            box.classList.add("box");

            var image = document.createElement("img");
            image.src = item.imageSrc;
            image.alt = item.altText;

            box.appendChild(image);

            var title = document.createElement("h4");
            title.textContent = item.title;
            box.appendChild(title);

            sectionContainer.appendChild(box);
        });

        protectedAreasSection.appendChild(sectionContainer);
    }
});
