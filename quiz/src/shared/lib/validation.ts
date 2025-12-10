export function validateEmail(email: string): boolean {
    const regexpEmail =
        /^[A-Za-z0-9_]+([+.-][A-Za-z0-9_]+)*@([A-Za-z0-9]+[-]*[A-Za-z0-9]+)(\.[A-Za-z0-9]+){1,2}$/;
    return regexpEmail.test(email);
}