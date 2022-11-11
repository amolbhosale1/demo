const sendCookie = (user:any, statusCode:any, res:any) => {
    const token = user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
    });
}

module.exports = sendCookie;