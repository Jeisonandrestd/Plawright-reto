import { error } from "node:console"

export class Environment {
    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')

    private static getRequired(key: string): string {
        const value = process.env[key]

        if (!value) {
            throw new Error('Enviroment variable' + key + 'does not exist')
        }
        return value
    }

}