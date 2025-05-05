const AsyncHandler = (requestHandler) => (req, res, next) => {
  return Promise.resolve(requestHandler(req, res, next)).catch((error) =>
    next(error)
  );
};

export { AsyncHandler };

const AsyncHandlertwo = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next).catch((error) => next(error)));
};

// const asyncHandle2 = (fn) => async (err, req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }; // we can pass the function to another function by this in high oder function

// const promiseNew = new Promise = (resolve, reject) => {
//   const  response = fetch("api/new/user")
//   .then(response => response.json())
//   .then(data => resolve(data))

//   return response
// }
