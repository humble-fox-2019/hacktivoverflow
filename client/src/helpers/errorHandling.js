import Toast from "@/helpers/toast";

const ErrorHandling = (err) => {
    let errMsg = "";

    if (err.response.data.message) {
        errMsg = err.response.data.message.join("\n");
    } else {
        errMsg = "Internal server error";
    }

    Toast.fire({
        type: "error",
        title: errMsg
    });
}

export default ErrorHandling