var app = new Vue({
    el: '#app',
    data: {
        result: 0, 
        expression: [],
        opers: ['-', '+', '%', '/', '*'],
        now_oper: null, 
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
})