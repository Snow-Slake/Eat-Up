//----------------------------------------File----------------------------------------------------//
export const FILE_NAME = __dirname + "/follow-doc.json";
//----------------------------------------Validator-----------------------------------------------//
export const EMAIL_VALIDATOR = ["@gmail.com", "@yahoo.com", "@outlook.com"];
export const LENGTH = "length";
export const UPPERCASE = "uppercase";
export const LOWERCASE = "lowercase";
export const NUMBER = "number";
export const PASSWORD_VALIDATOR = {
    length: 8,
    uppercase: 2,
    lowercase: 4,
    number: 2,
};
//----------------------------------------Tokens----------------------------------------------------//
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const ENV_ACCESS_TOKEN =
    "8e510517093eda44edc5414166442bbce3b1307f3943f8c39357f09d41d0455c34dfef8fa33aa621c6b0d19b25ac8a5a9476e201156f2d258b0bf9b2f4332f23";
export const ENV_REFRESH_TOKEN =
    "5b09354f22c4795b486d6f03ee0f36c265dcb89d7a648489abb09a3084d051988daa2c9a7b5d0989f31f1c224d8af6a2e41eda336f8d4efbe969e7375a90eb77";
export const ACCESS_TOKEN_TIMELIMT = '60m';
export const REFRESH_TOKEN_TIMELIMT = '24h';
