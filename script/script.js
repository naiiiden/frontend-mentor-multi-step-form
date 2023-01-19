let stepIndex = 1;
showSteps(stepIndex);

function plusStep(n) {
    showSteps(stepIndex += n);
}
  
function currentStep(n) {
    showSteps(stepIndex = n);
}

function showSteps(n) {
    let i;
    let steps = document.getElementsByClassName("step");
    if (n > steps.length) {stepIndex = 1}    
    if (n < 1) {stepIndex = steps.length}
    for (i = 0; i < steps.length; i++) {
      steps[i].style.display = "none";  
    }
    steps[stepIndex-1].style.display = "grid";  
}

document.querySelector(".btn-back").addEventListener("click", (e) => {
    e.preventDefault();
    plusStep(-1);
});

document.querySelector(".btn-next").addEventListener("click", (e) => {
    e.preventDefault();
    plusStep(1);
});

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