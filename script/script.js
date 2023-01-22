const steps = document.getElementsByClassName("step");
const circles = document.getElementsByClassName("step-circle"); 
const btn_back = document.querySelector(".btn-back"); 
const btn_next = document.querySelector(".btn-next");
const btn_submit = document.querySelector(".btn-submit");
let stepIndex = 1;

showSteps(stepIndex);

function plusStep(n) {
    showSteps(stepIndex += n);
}
  
function currentStep(n) {
    showSteps(stepIndex = n);
}

function showSteps(n) {
    for (let i = 0; i < steps.length; i++) {
      steps[i].style.display = "none";  
    }
    steps[stepIndex-1].style.display = "grid"; 
    if (stepIndex != steps.length) {
        for (i = 0; i < circles.length; i++) {
        circles[i].className = circles[i].className.replace(" active", "");
        }
        circles[stepIndex-1].className += " active";
    }

    const h1 = document.querySelector("h1");
    const p = document.querySelector("legend p");

    stepIndex == 1 ? (h1.textContent = "Personal info", p.textContent = "Please provide your name, email address, and phone number.", btn_back.style.display = "none") : btn_back.style.display = "unset";
    stepIndex == 2 ? (h1.textContent = "Select your plan", p.textContent = "You have the option of monthly or yearly billing") : ""; 
    stepIndex == 3 ? (h1.textContent = "Pick add-ons", p.textContent = "Add-ons help enhance your gaming experience") : "";
    stepIndex == 4 ? (h1.textContent = "Finishing up", p.textContent = "Double-check everything looks OK before confirming") : "";
}

btn_back.addEventListener("click", (e) => {
    e.preventDefault();
    stepIndex != 1 ? plusStep(-1) : "";
    stepIndex == steps.length - 1 ? (btn_next.style.display = "none", btn_submit.style.display = "block") : btn_submit.style.display = "none";
    stepIndex != steps.length - 1 ? btn_next.style.display = "block" : btn_next.style.display = "none";
});

btn_next.addEventListener("click", (e) => {
    e.preventDefault();
    if (stepIndex == 1) {
        validateStep1();
    } else if (stepIndex == 2) {
        validateStep2();
    } else if (stepIndex == 3) {
        validateStep3();
    }

    stepIndex == 2 ? first2ndFocus() : "";
    stepIndex == 3 ? first3rdFocus() : "";
    
    stepIndex == steps.length - 1 
    ? (btn_next.style.display = "none", btn_submit.style.display = "block")
    : (btn_submit.style.display = "none", btn_next.style.display = "block");
});

let first2ndStep = true;

function first2ndFocus() {
    first2ndStep == true ? (document.querySelector("#arcade").focus(), first2ndStep = false) : "";
}

let first3rdStep = true;

function first3rdFocus() {
    first3rdStep == true ? (document.querySelector("#online").focus(), first3rdStep = false) : "";
}

// form validation
const validateStep1 = () => {
    const name_input = document.querySelector("#name-input");
    const name_error = document.querySelector(".name-error");
    const email_input = document.querySelector("#email-input");
    const email_error = document.querySelector(".email-error");
    const tel_input = document.querySelector("#tel-input");
    const tel_error = document.querySelector(".tel-error");

    let nameValid, emailValid, telValid = false;

    // name input
    if (name_input.value == "") {
        name_error.textContent = "This field is required";
        name_input.classList.add("error-input"); 
    } else if (name_input.value.match(/\d/)) {
        name_error.textContent = "Name cannot contain numbers" 
        name_input.classList.add("error-input"); 
    } else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name_input.value)) {
        name_error.textContent = "Name cannot contain special characters";
        name_input.classList.add("error-input"); 
    } else {
        name_error.textContent = "";
        name_input.classList.remove("error-input"); 
        nameValid = true;
    }

    if (email_input.value == "") {
        email_error.textContent = "This field is required";
        email_input.classList.add("error-input"); 
    } else if (!/^\S+@\S+\.\S+$/.test(email_input.value)) {
        email_error.textContent = "Please provide a valid email address";
        email_input.classList.add("error-input"); 
    } else if (/^\S+@\S+\.\S+$/.test(email_input.value)) {
        email_error.textContent = "";
        email_input.classList.remove("error-input"); 
        emailValid = true;
    }

    if (tel_input.value == "") {
        tel_error.textContent = "This field is required";
        tel_input.classList.add("error-input"); 
    } else if (!/^\+?[1-9][0-9]{7,14}$/.test(tel_input.value)) {
        tel_error.textContent = "Please provide a valid phone number";
        tel_input.classList.add("error-input"); 
    } else if (/^\+?[1-9][0-9]{7,14}$/.test(tel_input.value)) {
        tel_error.textContent = "";
        tel_input.classList.remove("error-input"); 
        telValid = true;
    }

    nameValid == true
    && emailValid == true 
    && telValid == true 
    ? plusStep(1) : "";
}

const validateStep2 = () => {
    document.querySelector("#arcade").checked 
    || document.querySelector("#advanced").checked 
    || document.querySelector("#pro").checked 
    ? plusStep(1) : "";
}

const validateStep3 = () => {
    document.querySelector("#online").checked 
    || document.querySelector("#storage").checked 
    || document.querySelector("#customizable").checked
    ? plusStep(1) : "";
}

btn_submit.addEventListener("click", (e) => {
    e.preventDefault();
    stepIndex != steps.length ? plusStep(1) : "";
    stepIndex == steps.length ? document.querySelector("form").style.display = "none" : "";
})

// form step 2 input container style when focused
let step2Inputs = document.querySelectorAll(".form-step-2 input[type='radio']");
for (let i = 0; i < step2Inputs.length; i++) {
    step2Inputs[i].addEventListener("change", () => {
        for (let i = 0; i < step2Inputs.length; i++) {
            step2Inputs[i].parentNode.style.background = step2Inputs[i].checked ? "hsl(217, 100%, 97%)" : "#fff";
            step2Inputs[i].parentNode.style.border = step2Inputs[i].checked ? "1px solid hsl(243, 100%, 62%)" : "1px solid hsl(229, 24%, 87%)";
        };
    });
};

// form step 2 & 4 monthly/yearly toggle
document.querySelectorAll(".yearly-input").forEach(input => {
    input.addEventListener("change", (e) => {
        document.querySelectorAll(".yearly-input").forEach(input => {
            if(input !== e.target)
                input.checked = e.target.checked;
        });

        (document.querySelector(".form-step-2").classList.toggle("show-yearly") && document.querySelector(".form-step-2").classList.contains("show-yearly"))
            ? (
                Array.from(document.querySelectorAll(".price")).map(price => price.textContent += "0"),
                Array.from(document.querySelectorAll(".monthly-yearly")).map(moYr => moYr.textContent = "yr"),
                Array.from(document.querySelectorAll(".free")).map(free => free.style.display = "block"),
                document.querySelector(".plan-type").textContent = "(Yearly)",
                document.querySelector(".price-per").textContent = "(per year)",
                document.querySelector(".yearly").style.color = "hsl(213, 96%, 18%)",
                document.querySelector(".monthly").style.color = "hsl(225, 11%, 49%)"
            )
            : (
                Array.from(document.querySelectorAll(".price")).map(price => price.textContent = price.textContent.slice(0, -1)),
                Array.from(document.querySelectorAll(".monthly-yearly")).map(moYr => moYr.textContent = "mo"),
                Array.from(document.querySelectorAll(".free")).map(free => free.style.display = "none"), 
                document.querySelector(".plan-type").textContent = "(Monthly)",
                document.querySelector(".price-per").textContent = "(per month)",
                document.querySelector(".yearly").style.color = "hsl(225, 11%, 49%)",
                document.querySelector(".monthly").style.color = "hsl(213, 96%, 18%)"
            );
    
        document.querySelector(".sr-only").textContent == "Monthly pricing" 
            ? document.querySelector(".sr-only").textContent = "Yearly pricing" 
            : document.querySelector(".sr-only").textContent = "Monthly pricing";
    });
});

// form step 3 input container style when focused
document.querySelectorAll(".form-step-3 input[type='checkbox']").forEach(input => {
    input.addEventListener("change", () => {
        input.parentNode.style.background = input.checked == true ? "hsl(217, 100%, 97%)" : "#fff";
        input.parentNode.style.border = input.checked == true ? "1px solid hsl(243, 100%, 62%)" : "1px solid hsl(229, 24%, 87%)";
    });
});