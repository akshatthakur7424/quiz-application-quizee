const signupController = (req, resp) => {
    try {
        const email = req.body.email;
        console.log(email)
    } catch (error) {
        console.log(error)
    }
}

export {signupController};
