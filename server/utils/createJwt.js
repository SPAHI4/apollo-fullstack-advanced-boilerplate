import jwt from 'jsonwebtoken';
import fs from 'fs';
import appRoot from 'app-root-path';

const cert = fs.readFileSync(appRoot.resolve('cert/jwt.pem'));

export default function createJwt(user) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			user,
			cert,
			{
				expiresIn: '10d',
			},
			(err, token) => {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			},
		);
	});
};
