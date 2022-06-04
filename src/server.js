/* Simple express server to statically serve files */

var express = require("express");
var app = express();
app.use(express.static("build"));
var PORT = 9000;
const axios = require('axios');


app.get('/search', async (req, res) => {
	const response = await axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=4937c1ef6a334f3fe830cf838628bbc7&per_page=20', {
		params: {
			tags: req.query.tags,
		},
	});

	return res.send(response.data);
});


app.listen(PORT, function(err) {
	if (err) {
		console.error("Server Error: " + err);
	}
	console.info("==> ✅ Server is running on port: " + PORT);
});
