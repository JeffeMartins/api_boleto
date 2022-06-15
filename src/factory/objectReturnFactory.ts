class ObjectReturn {
    public async objectReturnFactory(barCode: String, amount: String, expirationDate: String): Promise<Object> {

        return {
            barCode,
            amount,
            expirationDate
        }
    }
}

export default new ObjectReturn