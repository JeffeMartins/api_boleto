export default class ApiError extends Error {

    public readonly status: number;

    constructor(message: string, name: string, status: number) {
        super(message);
        this.name = name;
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}

