import calculate from './Calculate';

const operate = (calcObj, operation) => {
    let result = 0;
    switch(operation){
        case 'result':            
            result = calculate(calcObj.value1, calcObj.value2, calcObj.op);
            return { ...calcObj, display: result, value1: result, isFirstNumber: false, typeOfClick: 'op'};
        case 'clear':
            return { value1: '', value2: '', op: '', display: '', isFirstNumber: true};
        case 'sign': 
            result = calculate(calcObj.display, 0, operation);
            return calcObj.isFirstNumber ? { ...calcObj, value1: result, display: result, typeOfClick: 'number' } : { ...calcObj, value2: result, display: result, typeOfClick: 'op' };
        case 'multi':
        case 'add': 
        case 'minus':
        case 'divide':
            result = calculate( calcObj.value1, calcObj.value2, operation );
            return { ...calcObj, display: result, value1: result, isFirstNumber: false, op: operation, typeOfClick: 'op'};
        case 'percent':
            result = calculate(calcObj.display, 0, operation);
            return calcObj.isFirstNumber ? { ...calcObj, value1: result, display: result, typeOfClick: 'number'} : { ...calcObj, value2: result, display: result, typeOfClick: 'number' };
        default:
            console.log('Operation not found ' + operation);    
    }
}

export default operate;