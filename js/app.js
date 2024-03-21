(function(){

    const listNumbers = document.querySelectorAll("button:not(.operator):not(.equalSign)");

    const listOperators = document.querySelectorAll("button.operator");

    const listOptions = document.querySelectorAll("span.action");

    const resultElem = document.getElementById("inner-result");

    const quitButton = document.getElementsByClassName("quit")[0];

    const reduceButton = document.getElementsByClassName("reduce")[0];

    const increaseButton = document.getElementsByClassName("increase")[0];

    const equalSign = document.getElementsByClassName("equalSign")[0];

    let firstNumber = "";

    let secondNumber = "";

    let currentOperator = "";

    let result = 0;

    const calcul = {
        "x" : function(a, b) { return (a * b).toFixed(2)},
        "+" : function(a, b) { return (a + b).toFixed(2)},
        "-" : function(a, b) { return (a - b).toFixed(2)},
        "/" : function(a, b) { return (a / b).toFixed(2)},
        "%" : function(a, b) { return (a % b).toFixed(2)},
    }

    // Animation on hover
    // Animation on MOUSEOUT

    for(let i = 0;i<listOptions.length;i++){

        listOptions[i].addEventListener("mouseover",function() {
            showOptions(this);

        })        

        listOptions[i].addEventListener("mouseout",function() {
            showOptions(this);

        })
    }

    function showOptions(elemHTML){
        elemHTML.children[0].classList.add("text-opacity");
    }

    function hideOptions(elemHTML){
        elemHTML.children[0].classList.remove("text-opacity");
    }

    // quit

    quitButton.addEventListener("click",quit)

    function quit(){
        document.getElementById("calculatrice").style.display = "none"
    }

    // reduce 

    reduceButton.addEventListener("click",reduce)

    function reduce(){
        document.getElementsByClassName("buttons")[0].classList.toggle("hide");
        reduceButton.style.display = "none";
        increaseButton.style.display = "block";
    }

    // increase

    increaseButton.addEventListener("click",increase)


    function increase(){
        document.getElementsByClassName("buttons")[0].classList.toggle("hide");
        reduceButton.style.display = "block";
        increaseButton.style.display = "none";
    }

    // Animation sur les buttons on click

    for(let i = 0;i<listNumbers.length;i++){
        listNumbers[i].addEventListener("click",function() {
            animationOnbuttons(this);
            showValueOnScreen(this.innerHTML)
        });
    }

    for(let i = 0;i<listOperators.length;i++){
        listOperators[i].addEventListener("click",function(){
            animationOnbuttons(this);
            selectOperator(this.innerHTML)
        });
    }

    function animationOnbuttons(button){
        button.style.opacity = 0.6;
        setTimeout(function(){
            button.style.opacity = 1;
        },100)
    }

    // calcul

    function makeCalculation(){
        if(firstNumber != "" && secondNumber != "" && currentOperator != ""){
            result = calcul[currentOperator](parseFloat(firstNumber.replace(",",".")), parseFloat(secondNumber.replace(",",".")));
            resultElem.innerHTML = result;
            firstNumber = result.toString();
            secondNumber = "";
        }
    }

    // function showValueOnScreen(value){
    //     if(currentOperator == ""){
    //         firstNumber = checkStartingValue(firstNumber,value);
    //         resultElem.innerHTML = firstNumber;
    //     }else{
    //         if(firstNumber == ","){
    //             firstNumber = "0";
    //         }
    //         secondNumber = checkStartingValue(secondNumber,value);
    //         resultElem.innerHTML = secondNumber; 
            
    //     }
    // }

    function showValueOnScreen(value, isOperator=false){
        if(isOperator) {
            if (currentOperator && secondNumber === "") {
                resultElem.innerHTML = `${firstNumber} ${currentOperator} `;
            }
        } else {
            if(currentOperator == ""){
                firstNumber = checkStartingValue(firstNumber,value);
                resultElem.innerHTML = firstNumber;
            } else {
                secondNumber = checkStartingValue(secondNumber,value);
                resultElem.innerHTML = `${firstNumber} ${currentOperator} ${secondNumber}`;
            }
        }
    }

    function checkStartingValue(number, value){
        if(number == "0"){
            if(value == ","){
                number += value;
                return number;
            }
            number = value;
            return number;
        } else if (number == ","){
            number = "0" + number;
            return number;
        }else {
            number += value;
            return number;
        }

    }

    // function selectOperator (operator){
    //     if(operator != "AC"){
    //         if(firstNumber != "," && secondNumber != ","){
    //             makeCalculation();
    //         }
    //         currentOperator = operator;
    //     }else{
    //         reset();
    //     }
    // }

    function selectOperator(operator){
        if(operator != "AC"){
            if(firstNumber != "," && secondNumber != ","){
                makeCalculation();
                resultElem.innerHTML = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
            }
            currentOperator = operator != "=" ? operator : "";
            showValueOnScreen('', true);
        }else{
            reset();
        }
    }
    
    // reset with AC
    function reset(){
        resultElem.innerHTML = "0";
        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
    }

    // make the equal sign
    equalSign.addEventListener("click",function(){
        if(firstNumber != "," && secondNumber != ","){
            makeCalculation();
        }
    })


}())