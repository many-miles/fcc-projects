const { useState } = React;

function Calculator(){
  const [expr,setExpr] = useState('');
  const [display,setDisplay] = useState('0');
  const [evaluated,setEvaluated] = useState(false);

  const getCurrent = (e)=>{
    const parts = e.split(/([+\-*/])/);
    for(let i=parts.length-1;i>=0;i--){
      if(parts[i]!=='' && !/[+\-*/]/.test(parts[i])) return parts[i];
    }
    return '';
  };

  const handleNumber = (n)=>{
    if(evaluated){
      setExpr(n);
      setDisplay(n);
      setEvaluated(false);
      return;
    }
    const current = getCurrent(expr);
    if(current==='0' && n==='0') return;
    if(current==='0' && n!=='0' && !current.includes('.')){
      const newExpr = expr.replace(/0$/,'') + n;
      setExpr(newExpr);
      setDisplay(newExpr);
      return;
    }
    const newExpr = expr + n;
    setExpr(newExpr);
    setDisplay(newExpr);
  };

  const handleDecimal = ()=>{
    if(evaluated){
      setExpr('0.');
      setDisplay('0.');
      setEvaluated(false);
      return;
    }
    const current = getCurrent(expr);
    if(current.includes('.')) return;
    if(current==='') {
      const newExpr = expr + '0.';
      setExpr(newExpr);
      setDisplay(newExpr);
    } else {
      const newExpr = expr + '.';
      setExpr(newExpr);
      setDisplay(newExpr);
    }
  };

  const handleOperator = (op)=>{
    if(expr==='' && op!=='-') return;
    if(evaluated){
      setExpr(display + op);
      setDisplay(display + op);
      setEvaluated(false);
      return;
    }
    if(op==='-'){
      if(/[\+\-*/]$/.test(expr)){
        setExpr(expr + '-');
        setDisplay(expr + '-');
      } else {
        setExpr(expr + '-');
        setDisplay(expr + '-');
      }
      return;
    }
    if(/[\+\-*/]$/.test(expr)){
      const replaced = expr.replace(/[\+\-*/]+$/,'') + op;
      setExpr(replaced);
      setDisplay(replaced);
    } else {
      setExpr(expr + op);
      setDisplay(expr + op);
    }
  };

  const handleClear = ()=>{
    setExpr('');
    setDisplay('0');
    setEvaluated(false);
  };

  const formatResult = (n)=>{
    if(!isFinite(n)) return '0';
    const rounded = Math.round(n * 1e10) / 1e10;
    return (rounded).toString();
  };

  const handleEquals = ()=>{
    if(expr==='') return;
    let cleanup = expr.replace(/[\+\-*/]+$/,'');
    cleanup = cleanup.replace(/--/g,'+');
    try{
      const result = eval(cleanup);
      const out = formatResult(result);
      setDisplay(out);
      setExpr(out);
      setEvaluated(true);
    }catch(e){
      setDisplay('Error');
      setExpr('');
      setEvaluated(true);
    }
  };

  return (
    <div id="calculator">
      <div className="display-wrap">
        <div id="display">{display}</div>
      </div>
      <div className="controls" id="drum-none">
        <div id="clear" className="button clear" onClick={handleClear}>AC</div>
        <div id="divide" className="button op" onClick={()=>handleOperator('/')}>/</div>
        <div id="multiply" className="button op" onClick={()=>handleOperator('*')}>*</div>
        <div id="seven" className="button" onClick={()=>handleNumber('7')}>7</div>
        <div id="eight" className="button" onClick={()=>handleNumber('8')}>8</div>
        <div id="nine" className="button" onClick={()=>handleNumber('9')}>9</div>
        <div id="subtract" className="button op" onClick={()=>handleOperator('-')}>-</div>
        <div id="four" className="button" onClick={()=>handleNumber('4')}>4</div>
        <div id="five" className="button" onClick={()=>handleNumber('5')}>5</div>
        <div id="six" className="button" onClick={()=>handleNumber('6')}>6</div>
        <div id="add" className="button op" onClick={()=>handleOperator('+')}>+</div>
        <div id="one" className="button" onClick={()=>handleNumber('1')}>1</div>
        <div id="two" className="button" onClick={()=>handleNumber('2')}>2</div>
        <div id="three" className="button" onClick={()=>handleNumber('3')}>3</div>
        <div id="equals" className="button equals" onClick={handleEquals}>=</div>
        <div id="zero" className="button grid-wide" onClick={()=>handleNumber('0')}>0</div>
        <div id="decimal" className="button" onClick={handleDecimal}>.</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
