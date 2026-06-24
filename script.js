const API_URL = "/api";

async function register(){

    let email =
    document.getElementById("regEmail").value;

    let password =
    document.getElementById("regPassword").value;

    if(email === "" || password === ""){
        document.getElementById("regMsg").innerHTML =
        "Fill all fields";
        return;
    }

    try {
        let response = await fetch(API_URL + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        let data = await response.json();

        if (!response.ok) {
            document.getElementById("regMsg").innerHTML =
            data.message || "Registration failed";
            return;
        }

        document.getElementById("regMsg").innerHTML =
        "Registration Successful";

        setTimeout(()=>{
            window.location.href="login.html";
        },1000);
    }
    catch(error) {
        document.getElementById("regMsg").innerHTML =
        "Backend is not running";
    }
}


async function login(){

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    try {
        let response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        let data = await response.json();

        if(response.ok){
        localStorage.setItem(
            "currentUser",
            data.user.email
        );

        window.location.href =
        "dashboard.html";
        }
        else{
        document.getElementById("loginMsg").innerHTML =
        data.message || "Invalid Credentials";
        }
    }
    catch(error) {
        document.getElementById("loginMsg").innerHTML =
        "Backend is not running";
    }
}

function downloadVideo(title){

    let downloads =
    JSON.parse(
        localStorage.getItem("downloads")
    ) || [];

    downloads.push(title);

    localStorage.setItem(
        "downloads",
        JSON.stringify(downloads)
    );

    alert(
        title + " Downloaded Successfully"
    );

}
function likeVideo(btn){

    let count =
    btn.nextElementSibling;

    count.innerText =
    Number(count.innerText) + 1;

}
function subscribe(btn){

    if(btn.innerText === "Subscribe"){
        btn.innerText = "Subscribed";
    }
    else{
        btn.innerText = "Subscribe";
    }

}
function addComment(){

    let text =
    document.getElementById(
    "commentInput"
    ).value;

    let li =
    document.createElement("li");

    li.innerText = text;

    document
    .getElementById("comments")
    .appendChild(li);

}
function toggleDarkMode(){

    document.body.classList.toggle(
        "dark"
    );

}
