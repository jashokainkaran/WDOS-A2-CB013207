document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/wilpattu.json')
        .then(response => response.json())
        .then(data => {
            // Populate the intro section
            populateIntro(data.sections.find(section => section.type === 'intro'));

            // Populate the Visit Wilpattu section
            populateWilpattu(data.sections.find(section => section.type === 'wilpattu'));

            // Store data in localStorage
            localStorage.setItem('wilpattuData', JSON.stringify(data));
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
    paragraph.innerHTML = introData.content.description;
    introText.appendChild(heading);
    introText.appendChild(paragraph);
    introSection.appendChild(introText);
}

function populateWilpattu(wilpattuData) {
    var wilpattuSection = document.querySelector(".wilpattu");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = wilpattuData.title;
    wilpattuSection.appendChild(heading);

    wilpattuData.items.forEach(aspect => {
        var container = document.createElement("div");
        container.classList.add("container");

        var image = document.createElement("img");
        image.src = aspect.imageSrc;
        image.alt = aspect.altText;
        image.classList.add("photos");
        container.appendChild(image);

        var description = document.createElement("div");
        description.classList.add("description");

        var heading = document.createElement("h3");
        heading.textContent = aspect.title;

        var paragraph = document.createElement("p");
        paragraph.textContent = aspect.description;

        description.appendChild(heading);
        description.appendChild(paragraph);

        container.appendChild(description);

        // Add second container class
        if (wilpattuData.items.indexOf(aspect) % 2 === 0) {
            container.classList.add("second-container");
        }

        wilpattuSection.appendChild(container);
    });
}
