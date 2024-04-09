document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/home.json')
        .then(response => response.json())
        .then(data => {
            // Populate the intro section
            populateIntro(data.sections.find(section => section.type === 'intro'));

            // Populate the habitats section
            populateHabitats(data.sections.find(section => section.type === 'habitats'));

            // Populate the conservation section
            populateConservation(data.sections.find(section => section.type === 'conservation'));

            // Store data in localStorage
            localStorage.setItem('homeData', JSON.stringify(data));
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

function populateConservation(conservationData) {
    var conservationSection = document.querySelector(".conservation");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = conservationData.title;
    conservationSection.appendChild(heading);

    var introParagraph = document.createElement("p");
    introParagraph.classList.add("section-intro");
    introParagraph.textContent = conservationData.intro;
    conservationSection.appendChild(introParagraph);

    // First container for images
    var sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    conservationData.items.forEach(item => {
        var box = document.createElement("div");
        box.classList.add("box");

        var image = document.createElement("img");
        image.src = item.imageSrc;
        image.alt = item.altText;

        box.appendChild(image);
        sectionContainer.appendChild(box);
    });

    conservationSection.appendChild(sectionContainer);

    // Second container for description
    var descriptionConservation = document.createElement("div");
    descriptionConservation.classList.add("description-conservation");
    descriptionConservation.innerHTML = conservationData.description;

    conservationSection.appendChild(descriptionConservation);
}
