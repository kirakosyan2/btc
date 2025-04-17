export const regexNameDatamart = /^[a-zA-Z_\-/0-9]*$/;
export const atLeastOneUppercase = /[A-Z]/g;
export const atLeastOneLowercase = /[a-z]/g;
export const atLeastOneNumeric = /[0-9]/g;
export const atLeastOneSpecialChar = /[#?!@$%^&*_\-/()]/g;
export const eightCharsOrMore = /.{8,}/g;

export const isValidNameDatamart = (name: string) => {
    return regexNameDatamart.test(name);
};
