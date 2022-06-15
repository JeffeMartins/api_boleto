import axios from 'axios';

class HandleWithDigitableNumberBoleto {

    public async handleDueDate(code: string) {
        //const codigoDeBarras = "3419109032618-40830675039.2216000 1589480000231 500";

        const dueDate: any = code.slice(33, 37); //8948 é o que precisamos
        const date = new Date('10/07/1997');

        date.setTime(date.getTime() + dueDate * 24 * 60 * 60 * 1000); // criando a data de vencimento

        const dateFinal = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2)+ '-' + ("0" + (date.getDate() + 1)).slice(-2); // exibição da data


        return dateFinal;

    }

    public async getFinancialInstitutionApi(code: string) {

        return await axios.get(`https://brasilapi.com.br/api/banks/v1/${code}`)
            .then(res => {
                return res.data;
            }).catch(err => {
                return err.response.data;
            })

    }

    public handleFieldsBoleto(code: string): any {
        const dueDate = code.slice(33, 37);
        const financialInstitution = code.slice(0, 3);
        const coin = code.slice(3, 4);
        const amount = code.slice(37, 45);

        let formattedAmount: string = parseInt(amount).toLocaleString('pt-br', {minimumFractionDigits: 2});

        if(formattedAmount.length <= 6) {
            formattedAmount = formattedAmount.replace(',', '.')
        }

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