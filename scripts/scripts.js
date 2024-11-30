document.addEventListener('DOMContentLoaded', function() {
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

    // Courses array
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]

    const courseList = document.getElementById('courseList');
    const totalCredits = document.getElementById('totalCredits');

    // Function to display courses
    function displayCourses(courseArray) {
        courseList.innerHTML = '';

        let totalCreditsSum = 0;
        
        courseArray.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.innerHTML = `${course.subject} ${course.number}: ${course.title}<br>(${course.credits} credits)`;
            courseItem.classList.add(course.completed ? 'completed' : 'incomplete');
            courseList.appendChild(courseItem);

            totalCreditsSum += course.credits;
        });

        totalCredits.textContent = `Total Credits: ${totalCreditsSum}`;
    }

    // Filter functions
    function filterCourses(subject) {
        if (subject === 'all') {
            return courses;
        }
        return courses.filter(course => course.subject === subject);
    }

    // Event listeners for filter buttons
    document.getElementById('allCourses').addEventListener('click', () => displayCourses(filterCourses('all')));
    document.getElementById('wddCourses').addEventListener('click', () => displayCourses(filterCourses('WDD')));
    document.getElementById('cseCourses').addEventListener('click', () => displayCourses(filterCourses('CSE')));

    // Initial display of all courses
    displayCourses(courses);
});

document.addEventListener("DOMContentLoaded", async () => {
    // Fetch weather data
    const fetchWeather = async () => {
        const apiKey = "b91a523f5ebfaeb7404c1d6257bf6e42";
        const lat = "42.94";
        const lon = "-85.40";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Weather data fetch failed");
            return await response.json();
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    // Render weather card with icon
    const renderWeatherCard = (data) => {
        if (!data) {
            document.getElementById("weather-card").innerHTML = "Weather data unavailable.";
            return;
        }

        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherDescription = data.weather[0].description;
        const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        const weatherCard = `
            <div class="weather-info">
                <h3>${data.name}</h3>
                <img src="${weatherIcon}" alt="${capitalizedDescription}" class="weather-icon">
                <p>${capitalizedDescription}</p>
                <p>Temperature: <br>${data.main.temp} °F</p>
                <p>Humidity: <br>${data.main.humidity}%</p>
                <p>Wind Speed: <br>${data.wind.speed} mph</p>
            </div>
        `;
        document.getElementById("weather-card").innerHTML = weatherCard;
    };


    // Fetch and display weather
    const weatherData = await fetchWeather();
    renderWeatherCard(weatherData);
});
