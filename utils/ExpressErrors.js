class ExpressError extends Error {
    constructur(statusCode, message){
        super();
        this.statusCode= statusCode;
        this.message= message;
    }
}
module.exports = ExpressError;