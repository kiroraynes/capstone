const jwt = require('jsonwebtoken');

const secret = 'PiboLovesYou'; //temporarily here

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret,{})
}

module.exports.verify = (request,response,next) => {
	let token = request.headers.authorization
	if(token){
		token = token.slice(7,token.length);
		if (token){
			return jwt.verify(token, secret, (error,data) => {
				if (error){
					response.send("Invalid Access Token.");
				} else {
					next();
				}
			})
		} else {
			return response.send("You must be logged in to do this.")
		}
	} else {
		return response.send("You must be logged in to do this.")
	}
}

module.exports.decode = (token) => {
	token = token.slice(7,token.length);
	return jwt.decode(token, {complete:true}).payload
}

