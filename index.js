
const searchBtn = document.querySelector("#searchBtn");
const input = document.querySelector("input");
const themeBtn = document.querySelector("#themeBtn");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const changeTheme = document.querySelector(".change_theme")

let darkMode = true;
const header = document.querySelector(".top_level_container")
const theme = document.querySelector("#theme")
const themeImg = document.querySelector("#themeImg")
const search_container = document.querySelector(".search_container")
const profile_container = document.querySelector(".profile_container")

searchBtn.addEventListener("click", () => {
    if(input.value !== "") {
        fetchUserData(input.value)
    }
})

input.addEventListener("keydown", (e) => {
    if(e.key === 'Enter') {
        if(input.value !== "") {
            fetchUserData(input.value)
        }
    }
})

changeTheme.addEventListener("click", () => {
    if(darkMode == false) {
        darkThemeProperties()
    } else {
        lightThemeProperties()
    }
})

async function fetchUserData(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);

        const data = await response.json();
        renderUserData(data);
    } catch (err) {
        console.log(`error while fetch: ${err.message}`);
    }
}

function renderUserData(data) {
    const avatarImg = document.querySelector("#avatar");
    const name = document.querySelector("#name");
    const username = document.querySelector("#login-username");
    const created_at = document.querySelector("#created_at");

    const bio = document.querySelector(".user_bio");

    const repo_count = document.querySelector("[data-repo]");
    const followers_count = document.querySelector("[data-followers]");
    const following_count = document.querySelector("[data-following]");

    const location = document.querySelector("[data-location]");
    const blog = document.querySelector("[data-blog]");
    const twitter = document.querySelector("[data-twitter]");
    const company = document.querySelector("[data-company]");

    avatarImg.src = `${data.avatar_url}`
    name.innerText = `${data.name}`
    username.innerText = `@${data.login}`
    username.href = `${data.html_url}`

    const datesegment = data.created_at.split("T").shift().split("-")
    created_at.innerHTML = `Joined ${datesegment[2]} ${months[datesegment[1] - 1]} ${datesegment[0]}`

    if(data.bio === null) {
        bio.innerText = "This Profile has no bio"
    } else { 
        bio.innerText = `${data.bio}`
    }

    repo_count.innerText = `${data.public_repos}`
    followers_count.innerText = `${data.followers}`
    following_count.innerText = `${data.following}`

    location.innerText = `${data.location}`

    if(data.location === null) {
        location.innerText = "Not Available"
        location.style.opacity = "0.5"
    } else {
        location.innerText = `${data.location}`
        location.style.opacity = "1"
    }

    if(data.blog === "") {
        blog.innerText = "Not Available"
        blog.style.opacity = "0.5"
    } else {
        blog.innerText = `${data.blog}`
        blog.href = `https://${data.blog}`
        blog.style.opacity = "1"
    }

    if(data.twitter_username === null) {
        twitter.innerText = "Not Available"
        twitter.style.opacity = "0.5"
    } else {
        twitter.innerText = `${data.twitter_username}`
        twitter.href = `https://x.com/${data.twitter_username}`
        twitter.style.opacity = "1"
    }

    if(data.company === null) {
        company.innerText = "Not Available"
        company.style.opacity = "0.5"
    } else { 
        company.innerText = `${data.company}`
        company.style.opacity = "1"
    }
    
}

fetchUserData("Prince-Singh-05")

const prefersDarkMode = window.matchMedia && window.matchMedia("prefers-color-scheme: dark").matches;

if(localStorage.getItem("dark-mode") === null) {
    if(prefersDarkMode) {
        darkThemeProperties()
    } else {
        lightThemeProperties()
    }
} else {
    if(localStorage.getItem("dark-mode") === "true") {
        darkThemeProperties()
    } else {
        lightThemeProperties()
    }
}

function darkThemeProperties() {
    document.querySelector("body").style.backgroundColor = "#141d2f"
    header.classList.remove("active")
    search_container.classList.remove("active")
    profile_container.classList.remove("active")
    darkMode = true;
    theme.innerText = "LIGHT"
    themeImg.src = "./assets/sun-icon.svg"
    localStorage.setItem("dark-mode", true)
}

function lightThemeProperties() {
    document.querySelector("body").style.backgroundColor = "#f6f8ff"
    header.classList.add("active")
    search_container.classList.add("active")
    profile_container.classList.add("active")
    darkMode = false;
    theme.innerText = "DARK"
    themeImg.src = "./assets/moon-icon.svg"
    localStorage.setItem("dark-mode", false)
}


