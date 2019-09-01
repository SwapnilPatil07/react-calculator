import operate from './Operate';

describe('Operate', () => {
    
    it('should return undefined if operator not found', () => {        
        const value = operate({}, 'op_not_found');
        expect(value).toEqual(undefined);
    });

    it('should return result with operator "result"', () => {        
        const value = operate({value1: '10', value2: '50', op: 'add'}, 'result');
        expect(value.display).toEqual('60');
    });

    it('should return empty object with operator "clear"', () => {        
        const value = operate({value1: '10', value2: '50', op: 'add'}, 'clear');
        expect(value.display).toEqual('');
        expect(value.isFirstNumber).toEqual(true);
    });

    it('should return signed number with operator "sign"', () => {        
        const value = operate({display: '70', value1: '20', value2: '70', op: 'add'}, 'sign');
        expect(value.display).toEqual('-70');
        expect(value.value1).toEqual('20');
        expect(value.value2).toEqual('-70');
    });

    it('should multiply numbers with operator "multi"', () => {        
        const value = operate({display: '70', value1: '20', value2: '70', op: 'multi'}, 'multi');
        expect(value.display).toEqual('1400');
        expect(value.value1).toEqual('1400');
        expect(value.value2).toEqual('70');
    });

    it('should add numbers with operator "add"', () => {        
        const value = operate({display: '70', value1: '20', value2: '70', op: 'add'}, 'add');
        expect(value.display).toEqual('90');
        expect(value.value1).toEqual('90');
        expect(value.value2).toEqual('70');
    });

    it('should minus numbers with operator "minus"', () => {        
        const value = operate({display: '70', value1: '20', value2: '70', op: 'minus'}, 'minus');
        expect(value.display).toEqual('-50');
        expect(value.value1).toEqual('-50');
        expect(value.value2).toEqual('70');
    });

    it('should divide numbers with operator "divide"', () => {        
        const value = operate({display: '80', value1: '80', value2: '20', op: 'divide'}, 'divide');
        expect(value.display).toEqual('4');
        expect(value.value1).toEqual('4');
        expect(value.value2).toEqual('20');
    });

    it('should throw error when divided by zero', () => {        
        const value = operate({display: '80', value1: '80', value2: '0', op: 'divide'}, 'divide');
        expect(value.display).toEqual('Error');
        expect(value.value1).toEqual('Error');
        expect(value.value2).toEqual('0');
    });

    it('should return percentage of number with operator "percent"', () => {        
        const value = operate({display: '80', value1: '1', value2: '80', op: 'percent'}, 'percent');
        expect(value.display).toEqual('0.80');
        expect(value.value1).toEqual('1');
        expect(value.value2).toEqual('0.80');
    });

    it('should fix number to two decimal', () => {        
        const value = operate({display: '.8011111', value1: '1.23423423', value2: '.8011111', op: 'add'}, 'add');
        expect(value.display).toEqual('2.04');
        expect(value.value1).toEqual('2.04');
        expect(value.value2).toEqual('.8011111');
    });

});
