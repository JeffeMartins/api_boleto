import axios from 'axios';

class HandleWithDigitableNumberBoleto {

    public async handleDueDate(code: string, cycle: string = 'legacy') {
        const factor = Number(code.slice(33,37));
        if(factor === 0) return '';
        if(!['legacy','2025'].includes(cycle))throw Object.assign(new Error('Invalid due date cycle'),{status:400});
        if(cycle==='2025' && factor<1000)throw Object.assign(new Error('Invalid factor for 2025 cycle'),{status:400});
        const base=cycle==='2025' ? Date.UTC(2025,1,22) : Date.UTC(1997,9,7);
        const date = new Date(base + (cycle==='2025' ? factor-1000 : factor) * 86400000);
        return date.toISOString().slice(0,10);
    }

    public async getFinancialInstitutionApi(code: string) {

        return await axios.get(`https://brasilapi.com.br/api/banks/v1/${code}`, {timeout:5000})
            .then(res => {
                return res.data;
            }).catch(err => {
                if(err.response)return err.response.data;throw Object.assign(new Error('Bank lookup unavailable'),{status:503});
            })

    }

    public handleFieldsBoleto(code: string): any {
        const dueDate = code.slice(33, 37);
        const financialInstitution = code.slice(0, 3);
        const coin = code.slice(3, 4);
        const amount = code.slice(37, 47);

        const formattedAmount = (Number(amount)/100).toFixed(2);

        return {
            dueDate,
            financialInstitution,
            coin,
            formattedAmount
        }
    }

    public handleBarCod(code: string): string {

        const fieldOne = code.slice(0, 4);
        const fieldsTwo = code.slice(32, 47);
        const fieldThreeA = code.slice(4, 9);
        const fieldThreeB = code.slice(10, 20);
        const fieldFor = code.slice(21, 31);

        const barCod: string = `${fieldOne}${fieldsTwo}${fieldThreeA}${fieldThreeB}${fieldFor}`;

        return barCod;

    }
}


export default new HandleWithDigitableNumberBoleto();
