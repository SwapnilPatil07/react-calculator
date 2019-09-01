import React, { Component } from 'react';
import Button from '../../Components/Button/Button';
import Display from '../../Components/Display/Display';
import classes from './Calculator.module.css';
import operate from '../../Logic/Operate';

const initalState = {
    value1: '',  // First number 
    value2: '', // Second number
    op: '', // Operator 
    display: '', // Number to display
    isFirstNumber: true, // Click count to find which number to populate. (count 0 => first number, 1 => second number) 
    typeOfClick: '' // Type of click number/operator
}

class Calcualtor extends Component {

    state  = {
        layout : [
            [ {name: 'C', value:'clear', type: 'op', class:[classes.Sign]}, 
              {name: '+/-', value:'sign', type: 'op', class:[classes.Sign]}, 
              {name: '%', value:'percent', type: 'op', class:[classes.Sign]}, 
              {name: '÷', value:'divide', type: 'op', class:[classes.Operation]}],
            [ {name: '7', value: '7', class:[classes.Number]}, 
              {name: '8', value: '8', class:[classes.Number]}, 
              {name: '9', value: '9', class:[classes.Number]}, 
              {name: 'x', value:'multi', type: 'op', class:[classes.Operation]}],
            [ {name: '4', value: '4', class:[classes.Number]}, 
              {name: '5', value: '5', class:[classes.Number]}, 
              {name: '6', value: '6', class:[classes.Number]}, 
              {name: '-', value:'minus', type: 'op', class:[classes.Operation]}],
            [ {name: '1', value: '1', class:[classes.Number]}, 
              {name: '2', value: '2', class:[classes.Number]}, 
              {name: '3', value: '3', class:[classes.Number]}, 
              {name: '+', value:'add', type: 'op', class:[classes.Operation]}],
            [ {name: '0', value: '0', class:[classes.Number, classes.Zero], colspan: 2}, 
              {name: '.', value: '.', type: 'dot', class:[classes.Number]}, 
              {name: '=', value:'result', type: 'op', class:[classes.Operation]}],
        ],
        params: {...initalState }
      
    }

    onButtonClick = (rowId, colId) => {      
        const isOperator = this.state.layout[rowId][colId].type === 'op';
        let cellValue = this.state.layout[rowId][colId].value;          
        const { params } = this.state;
           
        //If error force user to clear display
        if(params.display === 'Error' &&  cellValue !== 'clear')
         return;
    
        if(isOperator){                      
            if(!params.isFirstNumber){
                this.setState({params: operate(params, cellValue)}); 
            } else if (cellValue === 'sign' || cellValue === 'clear'
                         || cellValue === 'percent' || cellValue === 'dot'){
                this.setState({params: operate(params, cellValue)}); 
            } else{
                this.setState({params: {...params, op: cellValue, isFirstNumber: false}});
            } 
            return;
        }           
      
        //User cannot enter number more than 15 digit long
        if((params.value1.length >= 15 && params.isFirstNumber)
            || (params.value2.length >= 15 && !params.isFirstNumber)){
            return;
        }

        if(cellValue === '.'){
            if(params.display.includes('.')) // if number already includes '.' then return           
                return;
            else if (params.display === '' || params.display === '0')
                cellValue = '0.';    

        }
        
        // if display is 0 and user enters 0 then return 
        if(params.display === '0' && cellValue === '0'){ 
            return;
        }
        
        if(params.isFirstNumber){  
            const value1 =  params.typeOfClick === 'number' ? params.value1 : '';         
            this.setState({params: { ...params, value1: value1 + cellValue, display: value1 + cellValue, typeOfClick: 'number' }});
        }

        if(params.isFirstNumber === false){            
            const value2 =  params.typeOfClick === 'number' ? params.value2 : '';         
            this.setState({params: { ...params, value2: value2 + cellValue, display: value2 + cellValue, typeOfClick: 'number' }});  
        }
    }

    render() {
        return (
            <React.Fragment>                
                <table className={classes.Table}>
                    <tbody>
                        <tr>
                            <td colSpan='4'>
                                <Display value={this.state.params.display || '0'}/>  
                            </td>
                        </tr>
                        {this.state.layout.map((row, rowId) => {
                        return <tr key={rowId}>
                                    {row.map((cell, colId) => {
                                        return <td className={classes.Td} colSpan={cell.colspan} key={colId}>
                                                    <Button classes={cell.class.join(' ')} 
                                                        click={() => this.onButtonClick(rowId, colId)}
                                                        name={cell.name}></Button>
                                            </td>
                                    })}
                                </tr>  
                        })}
                    </tbody> 
                </table>     
            </React.Fragment>            
        )
    }
}

export default Calcualtor;