import express = require('express')
import cors = require('cors');

const app = express();
// TODO configure CORS
app.use(cors());

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/api/aphorism', (req, res) => {
	const aphorism = {
		text: 'Reissu on aina reissu',
		url: 'test.png'
	};
	res.json(aphorism);
});

const PORT = 3000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);