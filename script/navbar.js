document.addEventListener("DOMContentLoaded", function() {
    fetch('./script/navbar.json')
      .then(response => response.json())
      .then(data => populateHeader(data.header))
      .catch(error => console.error('Error fetching JSON:', error));

    // Function to populate the header with data from the JSON
    function populateHeader(headerData) {
      var header = document.querySelector(".header");
      var logo = header.querySelector(".logo img");
      logo.src = headerData.logo;
      var navbar = header.querySelector(".navbar");
      headerData.navigation.forEach(function(item) {

        if (item.dropdown) {
          var dropdown = createDropdown(item);
          navbar.appendChild(dropdown);
        } else {
          var navLink = createNavLink(item.label, item.url);
          navbar.appendChild(navLink);
        }
      });
    }

    //Function to create navigation links
    function createNavLink(label, url) {
      var link = document.createElement("a");
      link.href = url;
      link.textContent = label;
      return link;
    }

    //Function to create dropdown list
    function createDropdown(dropdownData) {
      var dropdownContainer = document.createElement("div");
      dropdownContainer.classList.add("dropdown");
      var dropdownToggle = createNavLink(dropdownData.label, "#");
      dropdownToggle.classList.add("dropdown-toggle");
      dropdownToggle.addEventListener("click", function(event) {

        event.preventDefault();

        dropdownContent.classList.toggle("show");
      });

      dropdownContainer.appendChild(dropdownToggle);

      var dropdownContent = document.createElement("div");
      dropdownContent.classList.add("dropdown-content");
      dropdownData.dropdown.forEach(function(item) {

        var dropdownItem = createNavLink(item.label, item.url);

        dropdownContent.appendChild(dropdownItem);
      });
      
      dropdownContainer.appendChild(dropdownContent);
      
      return dropdownContainer;
    }
});
