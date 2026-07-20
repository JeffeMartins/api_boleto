import axios from 'axios';

export interface FinancialInstitution {
    ispb: string;
    name: string;
    code: number;
    fullName: string;
}

export class FinancialInstitutionNotFoundError extends Error {}

export async function getFinancialInstitution(code: string): Promise<FinancialInstitution> {
    try {
        const response = await axios.get<FinancialInstitution>(
            `https://brasilapi.com.br/api/banks/v1/${code}`,
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            const responseData = error.response.data as { message?: string } | undefined;

            throw new FinancialInstitutionNotFoundError(
                responseData?.message ?? 'Código bancário não encontrado',
            );
        }

        throw error;
    }
}
