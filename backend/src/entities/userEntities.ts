
class userEntity{
    constructor(
        public username:string,
        public email : String,
        public fullname :String,
        public password : String,
        public isAdmin : Boolean
    ){
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}