<template>
  <div id="app">
    <div class="calculator">
            <div class="result">
                <p v-text="resultLocale"></p>
            </div>
            <div class="calculator_buttons">
                <button @click="cancel" class="grey" v-text="expression.length == 0 ? 'AC' : 'C'"></button>
                <button @click="change" class="grey">+,-</button>
                <button @click="disable" class="grey">%</button>
                <button @click="oper('/')" :class="{ yellow: true, button_clicked: now_oper == '/' }">/</button>
                <button @click="add(7)">7</button>
                <button @click="add(8)">8</button>
                <button @click="add(9)">9</button>
                <button @click="oper('*')" :class="{ yellow: true, button_clicked: now_oper == '*' }">x</button>
                <button @click="add(4)">4</button>
                <button @click="add(5)">5</button>
                <button @click="add(6)">6</button>
                <button @click="oper('-')" :class="{ yellow: true, button_clicked: now_oper == '-' }">-</button>
                <button @click="add(1)">1</button>
                <button @click="add(2)">2</button>
                <button @click="add(3)">3</button>
                <button @click="oper('+')" :class="{ yellow: true, button_clicked: now_oper == '+' }">+</button>
                <button @click="add(0)" class="long">0</button>
                <button @click="add(',')">,</button>
                <button @click="equalize" class="yellow">=</button>
            </div>
        </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){ 
    return {
        result: 0, 
        expression: [],
        opers: ['-', '+', '%', '/', '*'],
        now_oper: null, 
    }
    },
    methods: {
        disable(){
            alert('Bad func!')
        },
        change(){
            if(this.expression[this.expression.length-1].toString().includes('-')) this.expression[this.expression.length-1] = this.expression[this.expression.length-1].slice(1)
            else this.expression[this.expression.length-1] = '-' + this.expression[this.expression.length-1]
            this.result = this.expression[this.expression.length-1]
            console.log(this.expression[this.expression.length-1]);
        },
        cancel(){
            if(!this.opers.includes(this.expression[this.expression.length-1]) && this.expression.length > 0) {
                this.expression.pop()
                this.now_oper = this.expression[this.expression.length-1]
                this.result = 0
            }
            else{
                this.expression = []
                this.result = 0
            }
            console.log(this.expression, this.result);
        },
        add(numb) {
            if(this.expression.length == 0 || this.opers.includes(this.expression[this.expression.length-1])) this.expression.push('0')
            this.expression[this.expression.length-1] += numb.toString()
            if(this.expression[this.expression.length-1][0] == 0 && this.expression[this.expression.length-1][1] != ',') {
                this.expression[this.expression.length-1] = this.expression[this.expression.length-1].substring(1)
            }
            if(numb == ',' && this.expression[this.expression.length-1] == ',') this.expression[this.expression.length-1] = '0,'
            else if(numb == ',' && this.countDot(this.expression[this.expression.length-1]) > 1) {
                this.expression[this.expression.length-1] = this.expression[this.expression.length-1].slice(0, -1); 
                return;
            }
            this.now_oper = null
            this.result = this.expression[this.expression.length-1]
            console.log(this.expression);
        },
        countDot(value){
            let count = 0
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) == ',') count++
            }
            return count
        },
        oper(oper){
            if(this.opers.includes(this.expression[this.expression.length-1])) this.expression[this.expression.length-1] = oper
            else this.expression.push(oper)
            this.now_oper = oper
            console.log(this.expression);
        },
        equalize(){
            if(this.expression.length == 0) return
            let res = this.expression.join('')
            res = res.replaceAll(',', '.')
            if(this.opers.includes(res.slice(-1))) res = res.slice(0, -1)
            this.result = eval(res)
            this.expression = [this.result]
        },
    },
    computed: {
        resultLocale(){
            if(this.result.toString().includes(',')) return this.result
            return Number(this.result).toLocaleString('KZ-kz')
        }
    },
    created(){
        console.log(1);
    }
}
</script>

<style>
body{
    margin: 0;
    background-color: #000;
    font-family: 'Roboto', sans-serif;
    color: #fff;
}
button { padding: 0; }
p{
    margin: 0;
    font-weight: 100;
}
.calculator{
    width: 300px;
    margin: calc((100vh - 600px) / 2) auto;
    height: 600px;
}
.result{
    font-size: 40px;
    text-align: right;
}
.calculator_buttons {
    margin-top: 20px;
}
.calculator_buttons button{
    background-color: rgb(52,52,52);
    border-radius: 40px;
    color: #FFF;
    font-size: 30px;
    border: 0px;
    height: 67px;
    width: 67px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    display: inline-block;
    margin: 0px 5px 10px 0;
    transition: 0.5s all ease;
}
.calculator_buttons button:hover {
    background-color: rgb(72,72,72);
}
.calculator_buttons button:nth-child(4n) {
    margin-right: 0px;
}
.calculator_buttons .grey{
    background-color: rgb(165, 165, 165);
    color: #000;
}
.calculator_buttons .grey:hover {
    background-color: rgb(185, 185, 185);
}
.calculator_buttons .yellow{
    background-color: rgb(220, 140, 0);
}
.calculator_buttons .yellow:hover{
    background-color: rgb(240, 160, 20);
}
.calculator_buttons .button_clicked{
    background-color: #FFF;
    color: rgb(220, 140, 0);
}
.calculator_buttons .long{
    width: 142px;
}
@media (orientation: portrait) {
    .calculator{
        width: 94vw;
        margin: 30vh 3vw 0 3vw;
        height: 70vh;
    }
    .result{
        font-size: 15vw;
    }
    .calculator_buttons {
        margin-top: 20px;
    }
    .calculator_buttons button{
        border-radius: 60px;
        font-size: 10vw;
        height: 21.8vw;
        width: 21.8vw;
        margin: 0px 2vw 10px 0;
    }
    .calculator_buttons .long{
        width: 44.4vw;
    }
}

</style>
