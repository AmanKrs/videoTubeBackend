import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Below code uses normally/generally to call the healthcheck api

// const healthCheck = async(req,res)=>{
// try {
//     res.status(200).send({message: "this message without using apiresponse util"})
// } catch (error) {
//      res
//        .status(400)
//        .send({ message: "this message without using api error util" });
// }
// }

//We uses our custom utils for the api call

const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "ok", "Health check pass successfully"));
});

export { healthCheck };
