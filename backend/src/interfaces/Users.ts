
export interface userObj{
    fullName:string;
    email:string;
    username:string;
    password:string;
    isAdmin:boolean
    image:String;
    DOB :String;
    bio:String
}

export interface Loginuser{
    email:string;
    password:string;

}

export interface OTPData{
    email:string;
    otp:string;
}

export interface SignupUser{
    email:string,
    password:string,
    username:string,
    
}

export interface googleUser{
    email:string,
    password:string,
    username:string,
    fullName:string,
    image:string
}









