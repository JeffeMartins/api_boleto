import {vi} from 'vitest';
vi.mock('axios',()=>({__esModule:true,default:{get:vi.fn(async(url:string)=>{const code=url.split('/').pop();if(['999','211'].includes(code || ''))throw {response:{data:{message:'Código bancário não encontrado',type:'BANK_CODE_NOT_FOUND'}}};return {data:{code:Number(code),fullName:code==='001'?'Banco do Brasil S.A.':'Banco de demonstração'}};})}}));
