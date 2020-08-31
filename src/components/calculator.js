
import React from 'react'
import './calculator.css'
  class  Calculator extends React.Component{
  	constructor(props){
  		super(props)
  		this.state={
  			currentNumber:'0',
  			signs:['+','-','*','x','/'],
  			fromResult:false,
  			copy:[]
  		}
  		this.handleChange=this.handleChange.bind(this)
  		this.equal=this.equal.bind(this)
  		this.addingTo=this.addingTo.bind(this)
  		this.check=this.check.bind(this)
  		this.percent=this.percent.bind(this)
  		this.focus=this.focus.bind(this)
  		this.blur=this.blur.bind(this)
  	}

handleChange(event){
const {value}=event.target;
console.log(value);
let lastCharcter=value.slice(-1);
let c=lastCharcter.replace(/[^x+-/*0123456789]/ig,'');
if(c !==''){this.validate(value)}else{this.setState({currentNumber:''})}
}

  clear(){this.setState({currentNumber:'0'})}
  percent(){

  }
  check(event){
  	if(event.keyCode==13){this.equal();return false}
  		
  }
  focus(event){
  	if(this.state.currentNumber=='0'){this.setState({currentNumber:''})}	
  }
  blur(event){
  	if(this.state.currentNumber==''){this.setState({currentNumber:"0"})}	
  }
  back(){
  	const newResult=this.state.currentNumber.slice(0,-1);
  	this.setState({currentNumber:newResult})}
  	addingTo(number){
                let c=this.state.currentNumber;
                let addedNumber='';
				if(c=='0'){addedNumber=number}else{addedNumber=c+number}
					this.setState({currentNumber:addedNumber})
					this.validate(addedNumber);
				}
				validate(c){
				
			let getArray=c.split('');
			let characters=[];
			let digits=[];
			let digit='';
			let indexAlready='no index';

			for(let i=0;i<getArray.length;i++){
			if(getArray[i].search(/[0-9]/) !=-1){
				if(getArray[i]==='0' && i+1<getArray.length){
					if(getArray[i+1] =='.' && digit !=''){digit +=getArray[i]} 

				}else{digit +=getArray[i]}
			

			}else{
			if(getArray[i]=='.'){
			if(digit.indexOf('.') !=-1){indexAlready=digits.length;}else{digit +='.'}
			}else{
			if(digit !='' ){digits.push(digit); digit=''}
			characters.push(getArray[i]);
			}

			}
			}

			if(digit !=""){digits.push(digit)}

			if(digits.length<characters.length){
			this.setState({currentNumber:c.slice(0,c.length-1)})
			}

			let results='';
			for(let d=0;d<digits.length;d++){
			if(d==indexAlready){results +=this.state.copy[d]}else{results +=digits[d]}
			if(d<characters.length){results +=characters[d]}

			}
			this.setState({copy:digits,
			currentNumber:results})

			}
  	equal(){
  		this.state.currentNumber=="" && this.setState({currentNumber:'0'})
				let c=this.state.currentNumber;
				let lastCharcter=c.slice(-1);
				let indexLast=this.state.signs.indexOf(lastCharcter);
				if(indexLast !=-1 || lastCharcter =='.'){this.setState({currentNumber:c.slice(0,c.length-1)})}

				let finalResult=0;
				let firstArray=this.state.currentNumber.split('+').toString().split('-');
				for(let i=0;i<firstArray.length;i++){
				 if(i !=0 ){firstArray[i]='-'+firstArray[i];}
				}
				let final=firstArray.toString().split(',');

				let nextResult=final.map(block=>{
				let newblockX=block.split('x');
				let newblockM=block.split('*');
				let newblockD=block.split('/');
				let myResult1=0;
				let multiple='';
				if(newblockM.length>1 || newblockX.length>1){

				multiple=newblockM.length>1 ? newblockM : newblockX;
				myResult1= this.RunMultiples(multiple);
				}else if(newblockD.length>1){
				myResult1= this.RunDivisions(newblockD)
				}else{
					myResult1=block;
				}
				return myResult1;
				});
				for(let i=0;i<nextResult.length;i++){finalResult=finalResult+parseFloat(nextResult[i])}
				this.setState({currentNumber:finalResult.toString(),fromResult:true})

  	}

  				RunMultiples(multiple){
				let final=0;
				let results= this.RunDivision(multiple);
				for(let i=0;i<results.length;i++){
				i==0 ? final=parseFloat(results[i]):final=final * parseFloat(results[i]);
				}
				return final;
			}
			RunDivisions(division){
				let final=0;
				let results= division;
				for(let i=0;i<results.length;i++){
				i==0 ? final=parseFloat(results[i]):final=final / parseFloat(results[i]);
				}
				return final;
			}

			RunDivision(devision){
				let results= devision.map(item=>{
				let newItem=item.split('/');
				if(newItem.length>1){
				let prevResult=0;
				for(let i=0;i<newItem.length;i++){
				i==0 ? prevResult=parseFloat(newItem[i]):prevResult=prevResult / parseFloat(newItem[i]);
				}
				return prevResult;

				}else{
				return newItem;
				}

				});
				return results;
			}


  	render(){
		return (
			<div className="calculator-container">

			  <input className="result" onBlur={this.blur} onFocus={this.focus} type="text" value={this.state.currentNumber} onKeyUp={this.check} onChange={this.handleChange} />
			  <div>
			  <button onClick={()=>this.clear()}>AC</button>
			  <button onClick={()=>this.back()} >&times;</button>
			  <button onClick={this.percent}>%</button>
			  <button className="operator" onClick={()=>this.addingTo('/')}>/</button>
			  </div>
			  <div>
			  <button onClick={()=>this.addingTo('7')}>7</button>
			  <button onClick={()=>this.addingTo('8')} >8</button>
			  <button onClick={()=>this.addingTo('9')}>9</button>
			  <button className="operator" onClick={()=>this.addingTo('x')}>x</button>
			  </div>
			  <div>
			  <button onClick={()=>this.addingTo('4')}>4</button>
			  <button onClick={()=>this.addingTo('5')} >5</button>
			  <button onClick={()=>this.addingTo('6')}>6</button>
			  <button className="operator" onClick={()=>this.addingTo('-')}>-</button>
			  </div>
			  <div>
			  <button onClick={()=>this.addingTo('1')}>1</button>
			  <button onClick={()=>this.addingTo('2')} >2</button>
			  <button onClick={()=>this.addingTo('3')}>3</button>
			  <button className="operator" onClick={()=>this.addingTo('+')}>+</button>
			  </div>
			  <div>
			  <button className='zero' onClick={()=>this.addingTo('0')}>0</button>
			  <button onClick={()=>this.addingTo('.')} >.</button>
			  <button className="operator" onClick={this.equal}>=</button>
			  </div>
			  
			</div>
			)

		}	
}

export default Calculator;