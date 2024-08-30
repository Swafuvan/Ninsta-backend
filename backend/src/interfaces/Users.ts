
export interface userObj{
    fullName:string;
    email:string;
    username:string;
    password:string;
    isAdmin:boolean
    image:String;
    DOB :String;
    bio:String
    Gender:string,
    isBlocked:boolean,
}

export interface ImageData {
    filepath: string;
    base64?:any
}

export interface userMessage{
    _id?:string;
    from: string;
    to: string;
    message: string;
    time:Date;
    seen:boolean;
    file:{
        filetype:String;
        Link?:string
    }

}

export interface userDetail extends userObj{
    _id:string;
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

export interface forgotPassword{
    email:string,
    password:string,
    confirmPassword:string,
}









