const calculate = (value1, value2, operator) => {
    let result = 0;
    const number1 = Number(value1);
    const number2 = Number(value2);
    switch(operator){            
        case 'multi' :
            result = number1 * number2;
            break;
        case 'add':
            result = number1 + number2;
            break;    
        case 'divide':
            if(number1 === 0 || number2 === 0)
                return 'Error'
             result = number1 / number2;    
            break;  
        case 'minus':
             result = number1 - number2;   
             break;
        case 'percent':
             result = number1 / 100;
             break;
        case 'sign':
             result = parseFloat(number1) * -1;
             break;                 
        default:
            console.log('Operator not found ' + operator);        
    }

    
    if(Math.round(result) !== result) {            
        result = result.toFixed(2);
    }
    
    if(result >= 999999999999999 && result !== 'Error' ){
        result = result.toExponential(1);
    }
    
    return result.toString();
}

export default calculate;