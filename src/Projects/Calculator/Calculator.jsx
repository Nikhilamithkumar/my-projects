import { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import { FaBackspace } from 'react-icons/fa';
import styles from './Calculator.module.css';

import Wrapper from './Components/Wrapper.jsx'
import Screen from './Components/Screen.jsx'
import ButtonBox from './Components/ButtonBox.jsx'
import Button from './Components/Button.jsx'
import OperatorBox from './Components/OperatorBox.jsx';

const btnValues = [
  
  ['7','8','9','x'],
  ['4','5','6','-'],
  ['1','2','3','+'],
  ['.','0','+-','='],
]
const operatorValues = ['%','CE','C','BS','1/x','exp','sqrt','/'];
const math = (a,b,sign) => sign === "+" ? a + b : sign === "-" ? a - b : sign === "x" ? a * b : sign==="exp"?a**b: a / b;

const zeroDivisionError = "Error";
const roundResult = (num) => {
  if (!isFinite(num)) return num;
  return parseFloat(num.toPrecision(12));
};


function Calculator() {

  const [calc,setCalc] = useState({
    sign:"",
    num : 0, 
    res : 0,
    expression:'',
    pendingFunction: null,
    signAdd: false,
    numActive: false,
  })

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        equalClickHandler();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [calc]);


  const numClickHandler = (e)=>{
    const value = e.target.innerHTML;
    console.log(value)

    setCalc({
      ...calc,
      num : calc.num.toString().includes('.')?calc.num+value:Number(calc.num + value),
      res: calc.sign?calc.res:0,
      expression:calc.num?calc.expression:calc.sign?calc.expression:'',
      signAdd: false,
      numActive: true,
    }
    )

  }

  const signClickHandler = (e) =>{
    const sig = e.target.innerHTML;
    const newRes = !calc.num ? calc.res: !calc.res ? calc.num:
        math(Number(calc.res),Number(calc.num),calc.sign);
    setCalc({
      ...calc,
      num:0,
      sign:sig,
      res: newRes,
      expression:`${newRes} ${sig}`,
      pendingFunction: null,
      signAdd: false,
      numActive: false,
    })
    console.log(calc.res);

  }

  const equalClickHandler = () => {
  if (!calc.sign) return;

  const operand = calc.num ? calc.num : calc.res; // no second number typed → reuse first operand

  const result = operand === 0 && calc.sign === '/'? zeroDivisionError: math(Number(calc.res), Number(operand), calc.sign);

  setCalc({
    ...calc,
    res: result,
    num: 0,
    sign: "",
    expression: calc.signAdd
      ? `${calc.expression} =`
      : `${calc.expression} ${operand} =`,
    pendingFunction: null,
    signAdd: false,
    numActive: false,
  });
  };

  const resetClickHandler = () =>{
    setCalc({
      ...calc,
      num:0,
      sign:'',
      res :0,
      expression:'',
      pendingFunction: null,
      signAdd: false,
      
    })
  }
  const percentClickHandler = () =>{

    setCalc({
      ...calc,
      num: calc.num? parseFloat(calc.num)/100:0,
      res: calc.res? parseFloat(calc.res)/100:0,
      pendingFunction: null,
      signAdd: false,
    })

  }
  const invertClickHandler = () =>{
    setCalc({
      ...calc,
      num:calc.num?(calc.num*-1):0,
      res:calc.res?(calc.res*-1):0,
      pendingFunction: null,
      signAdd: false,
    })
  }

  const decimalClickHandler= () =>{
    setCalc({
      ...calc,
      num: calc.num.toString()  .includes('.')?calc.num:(calc.num+'.'),
      pendingFunction: calc.pendingFunction,
      signAdd: calc.signAdd,
      expression: calc.num?calc.expression:calc.sign?calc.expression:'',
      numActive: true,
    })
  }
  const bsCLickHandler =() =>{
    if (calc.expression.endsWith('=')) {
    setCalc({
      ...calc,
      expression: "",
      sign: "",
      num: 0,
      pendingFunction: null,
      signAdd: false,
    });
    return;
    }
    
    if (calc.pendingFunction) {
      setCalc({
        ...calc,
        expression: calc.expression.slice(0, -1),
        pendingFunction: null,
        signAdd: false,
      });
      return;
    }

    const value = calc.num.toString();
    const sliced = value.slice(0,-1);
    setCalc({
      ...calc,
      num:(sliced ===''|| sliced === '0')?0:sliced,
      pendingFunction: null,
      signAdd: false,
    })

  }

  const reciprocClickHandler = () => {
    if (calc.num && calc.sign) {
      const result = 1 / Number(calc.num);
      setCalc({
        ...calc,
        num: result,
        expression: `${calc.expression} 1/(${calc.num})`,
        pendingFunction: null,
        signAdd: true,
      });
      return;
    }

    if (calc.num || calc.res) {
      const operand = calc.num ? calc.num : calc.res;
      const result = 1 / Number(operand);
      setCalc({
        ...calc,
        num: 0,
        res: result,
        expression: `1/(${operand}) =`,
        pendingFunction: null,
        signAdd: false,
      });
    }
  };

  const squareClickHandler = () => {
    if (calc.num && calc.sign) {
      const result = roundResult(math(Number(calc.num), 2, "exp"));
      setCalc({
        ...calc,
        num: result,
        expression: `${calc.expression} sqr(${calc.num})`,
        pendingFunction: null,
        signAdd: true,
      });
      return;
    }

    if (calc.num || calc.res) {
      const operand = calc.num ? calc.num : calc.res;
      const result = roundResult(math(Number(operand), 2, "exp"));
      setCalc({
        ...calc,
        num: 0,
        res: result,
        expression: `sqr(${operand}) =`,
        pendingFunction: null,
        signAdd: false,
      });
    }
  };

  const sqrtClickHandler = () => {
    if (calc.num && calc.sign) {
      const result = math(Number(calc.num), 0.5, 'exp'); 
      setCalc({
        ...calc,
        num: result,
        expression: `${calc.expression} sqrt(${calc.num})`,
        pendingFunction: null,
        signAdd: true,
      });
      return;
    }

    if (calc.num || calc.res) {
      const operand = calc.num ? calc.num : calc.res;
      const result = math(Number(operand), 0.5, 'exp');
      setCalc({
        ...calc,
        num: 0,
        res: result,
        expression: `sqrt(${operand}) =`,
        pendingFunction: null,
        signAdd: false,
      });
    }
  };

  const clearEntryClickHandler = () =>{
    if (calc.expression.endsWith('=')) {
      setCalc({
        num: 0,
        sign: '',
        res: 0,
        expression: '',
        pendingFunction: null,
        signAdd: false,
        numActive: false,
      });
      return;
    }
    
    setCalc({
      ...calc,
      num:0,
      expression: calc.sign ? `${calc.res} ${calc.sign}` : '',
      pendingFunction: null,
      signAdd: false,
      numActive: false,
    });
  }


  function buttonClickHandler(e,btn){
    console.log('Button Pressed')
    if(btn==='C'){
      resetClickHandler();
    }else if(btn === '='){
      equalClickHandler();
    }else if(btn ==='+'|| btn ==='-' || btn === '/' || btn ==='x'){
      signClickHandler(e);
    }else if(btn ==='.'){
      decimalClickHandler(e);
    }else if(btn ==='+-'){
      invertClickHandler();
    }else if(btn ==='%'){
      percentClickHandler();
    }else if (btn === 'BS'){
      bsCLickHandler();
    }else if(btn ==='1/x'){
      reciprocClickHandler();
    }else if(btn ==='exp'){
      squareClickHandler();
    }else if(btn ==='sqrt'){
      sqrtClickHandler();
    }else if(btn ==='CE'){
      clearEntryClickHandler();
    }
    else{
      numClickHandler(e);
    }
  }

  const getButtonType = (btn) => {
    const operators = ['+', '-', '/', 'x', 'C', '+-', '%',  'BS','1/x','exp','sqrt','CE']
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    
    if (operators.includes(btn)) return 'operator'
    if (numbers.includes(btn)) return 'number'
    return ''
  }

  return (
    <div className={styles.calculator}>
      {/* <div className={styles.Header}>
        <img src='/calculator.jpeg' />
        <h2>CALCULATOR</h2>
        <div className={styles.Name}><h3>By: NIKHIL A</h3></div>
      </div> */}
      <Wrapper>
        <Screen valueSign={calc.expression} value={calc.numActive ? calc.num : (calc.num ? calc.num : calc.res)} />
        <OperatorBox>
          {
            operatorValues.map((btn,i)=>{
              return(
                <Button key={i} className={btn} value={btn} type={getButtonType(btn)} onClick={(e)=>buttonClickHandler(e,btn)} />
              )
            })
          }
        </OperatorBox>
        <ButtonBox>
          {
            (btnValues.flat()).map((btn,i)=>{
              return(
                <Button
                  key={i}
                  className={btn === '=' ? 'equals' : ''}
                  value={btn}
                  type={getButtonType(btn)}
                  onClick={(e) => buttonClickHandler(e,btn)}
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  )
}

export default Calculator;
