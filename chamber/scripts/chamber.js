document.addEventListener('DOMContentLoaded', async function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('show');
    });   

    // Updates for adding wayfinding in the nav menu
    const currentPage = window.location.pathname;
    const menuLinks = document.querySelectorAll('#nav-menu a');

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

     // Fetch JSON data
     const response = await fetch('data/members.json');
     const members = await response.json();
 
     const directory = document.getElementById('directory');
     const gridViewBtn = document.getElementById('gridView');
     const listViewBtn = document.getElementById('listView');
 
     // Render members
     function renderMembers(view) {
         directory.innerHTML = '';
         directory.className = view;
 
         members.forEach(member => {
             const memberCard = document.createElement('div');
             memberCard.classList.add('member-card');
             memberCard.innerHTML = `
                 <img src="images/${member.image}" alt="${member.name}">
                 <h3>${member.name}</h3>
                 <p>${member.address}</p>
                 <p>${member.phone}</p>
                 <a href="${member.website}" target="_blank">Visit Website</a>
                 <p>Membership Level: ${member.membershipLevel}</p>
             `;
             directory.appendChild(memberCard);
         });
     }
 
     // Event listeners for view toggle
     gridViewBtn.addEventListener('click', () => renderMembers('grid'));
     listViewBtn.addEventListener('click', () => renderMembers('list'));
 
     // Initial render
     renderMembers('grid');
 
     // Update footer with current year and last modified date
     document.getElementById('currentYear').textContent = new Date().getFullYear();
     document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});