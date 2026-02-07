const asyncHandler = (requestHandler) =>{
    (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((error)=>{
            next(error);
        })
    }
}

export {asyncHandler}



//  ----some more syntax-----
// const asyncHandler =() =>{}
// const asyncHandler = (func)= () =>{}
// const asyncHandler = async (func)= () =>{}

    // -----try-catch methode...------
// const asyncHandler = (fn)=>{
//     async (req, res, next)=>{
//         try {
//             await fn(req,res, next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message
//             })

//         }
//     }
// } 