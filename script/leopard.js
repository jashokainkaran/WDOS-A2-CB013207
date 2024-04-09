document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/leopard.json')
        .then(response => response.json())
        .then(data => {
            // Populate the intro section
            populateIntro(data.sections.find(section => section.type === 'intro'));

            // Populate the habitats section
            populateHabitats(data.sections.find(section => section.type === 'habitats'));

            // Populate the threats section
            populateThreats(data.sections.find(section => section.type === 'threats'));

            // Store data in localStorage
            localStorage.setItem('leopardData', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function populateIntro(introData) {
    var introSection = document.querySelector(".intro");
    var introImage = document.createElement("img");
    introImage.src = introData.imageSrc;
    introImage.alt = introData.altText;
    introSection.appendChild(introImage);

    var introText = document.createElement("div");
    introText.classList.add("intro-text");
    var heading = document.createElement("h3");
    heading.textContent = introData.content.title;
    var paragraph = document.createElement("p");
    paragraph.textContent = introData.content.description;
    introText.appendChild(heading);
    introText.appendChild(paragraph);
    introSection.appendChild(introText);
}

function populateHabitats(habitatsData) {
    var habitatsSection = document.querySelector(".habitats");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = habitatsData.title;
    habitatsSection.appendChild(heading);

    habitatsData.items.forEach(habitat => {
        var container = document.createElement("div");
        container.classList.add("container");

        var image = document.createElement("img");
        image.src = habitat.imageSrc;
        image.alt = habitat.altText;
        image.classList.add("photos");
        container.appendChild(image);

        var description = document.createElement("div");
        description.classList.add("description");

        var heading = document.createElement("h3");
        heading.textContent = habitat.title;

        var paragraph1 = document.createElement("p");
        paragraph1.textContent = habitat.description;

        description.appendChild(heading);
        description.appendChild(paragraph1);

        container.appendChild(description);

        // Add second container class
        if (habitatsData.items.indexOf(habitat) % 2 === 0) {
            container.classList.add("second-container");
        }

        habitatsSection.appendChild(container);
    });
}

function populateThreats(threatsData) {
    var threatsSection = document.querySelector(".threats");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = threatsData.title;
    threatsSection.appendChild(heading);

    threatsData.items.forEach(threat => {
        var container = document.createElement("div");
        container.classList.add("container");

        var image = document.createElement("img");
        image.src = threat.imageSrc;
        image.alt = threat.altText;
        image.classList.add("photos");
        container.appendChild(image);

        var description = document.createElement("div");
        description.classList.add("description");

        var heading = document.createElement("h3");
        heading.textContent = threat.title;

        var paragraph1 = document.createElement("p");
        paragraph1.textContent = threat.description;

        description.appendChild(heading);
        description.appendChild(paragraph1);

        container.appendChild(description);

        // Add second container class
        if (threatsData.items.indexOf(threat) % 2 === 0) {
            container.classList.add("second-container");
        }

        threatsSection.appendChild(container);
    });
}
