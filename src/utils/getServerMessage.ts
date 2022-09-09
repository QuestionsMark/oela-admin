export function getServerMessage(message: string, validation: string[] | undefined = undefined): string {
    return validation ? `${message} ${validation.join(', ')}` : message;
}