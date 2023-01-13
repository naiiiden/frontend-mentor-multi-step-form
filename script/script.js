// form step 2 input container style when focused
let step2Inputs = document.querySelectorAll(".form-step-2 input");
for (let i = 0; i < step2Inputs.length; i++) {
    step2Inputs[i].addEventListener("change", () => {
        for (let i = 0; i < step2Inputs.length; i++) {
            step2Inputs[i].parentNode.style.background = step2Inputs[i].checked ? "hsl(217, 100%, 97%)" : "#fff";
            step2Inputs[i].parentNode.style.border = step2Inputs[i].checked ? "1px solid hsl(243, 100%, 62%)" : "1px solid hsl(229, 24%, 87%)";
        };
    });
};

// form step 2 monthly/yearly toggle
document.getElementById("toggle").addEventListener("click", () => {
    document.querySelector(".form-step-2").classList.toggle("show-yearly");
    document.querySelector(".form-step-2").classList.contains("show-yearly") 
        ? Array.from(document.querySelectorAll(".price")).map(x => (console.log(x), x.textContent += "0"))
        : Array.from(document.querySelectorAll(".price")).map(x => x.textContent = x.textContent.slice(0, -1));

    document.querySelector(".sr-only").textContent == "Monthly pricing" 
        ? document.querySelector(".sr-only").textContent = "Yearly pricing" 
        : document.querySelector(".sr-only").textContent = "Monthly pricing";
});