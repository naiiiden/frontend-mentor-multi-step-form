let steps = document.getElementsByClassName("step");
let circles = document.getElementsByClassName("step-circle"); 
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

    stepIndex == 1 ? (h1.textContent = "Personal info", p.textContent = "Please provide your name, email address, and phone number.", document.querySelector(".btn-back").style.display = "none") : document.querySelector(".btn-back").style.display = "unset";
    stepIndex == 2 ? (h1.textContent = "Select your plan", p.textContent = "You have the option of monthly or yearly billing") : ""; 
    stepIndex == 3 ? (h1.textContent = "Pick add-ons", p.textContent = "Add-ons help enhance your gaming experience") : "";
    stepIndex == 4 ? (h1.textContent = "Finishing up", p.textContent = "Double-check everything looks OK before confirming") : "";
}

document.querySelector(".btn-back").addEventListener("click", (e) => {
    e.preventDefault();
    stepIndex != 1 ? plusStep(-1) : "";
    stepIndex == steps.length - 1 ? (document.querySelector(".btn-next").style.display = "none", document.querySelector(".btn-submit").style.display = "block") : document.querySelector(".btn-submit").style.display = "none" ;
    stepIndex != steps.length -1 ? document.querySelector(".btn-next").style.display = "block" : document.querySelector(".btn-next").style.display = "none";
});

document.querySelector(".btn-next").addEventListener("click", (e) => {
    e.preventDefault();
    stepIndex != steps.length ? plusStep(1) : "";
    stepIndex == steps.length - 1 ? (document.querySelector(".btn-next").style.display = "none", document.querySelector(".btn-submit").style.display = "block") : document.querySelector(".btn-submit").style.display = "none" ;
    stepIndex != steps.length -1 ? document.querySelector(".btn-next").style.display = "block" : document.querySelector(".btn-next").style.display = "none";
});

document.querySelector(".btn-submit").addEventListener("click", (e) => {
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