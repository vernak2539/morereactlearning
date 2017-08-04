// var fs = require('fs');
//
// fs.readFile('./small.txt',  { encoding: 'utf-8' }, function(err, data) {
//   console.log(err, data)
// });
// console.log('OMGGGGGG HERE ASDFASDF')
//
// var test = fs.readFileSync('./small.txt',  { encoding: 'utf-8' });
// console.log(test)



// var function1 = (callback) => {
//   for(var i =0; i < 10; i++) {
//     console.log('--> ', i)
//   }
//   callback()
// }
//
// function1(function() {
//   console.log('im in the callback')
// })



var FuelRest = require('fuel-rest');
var FuelAuth = require('fuel-auth');

var auth = {
	clientId: 'r533set3scsffcdwcabnbhsy',
	clientSecret: 'TX9mVJ6KESCM42bV4Yuurpwy',
	authUrl: 'https://auth.exacttargetapis.com/v1/requestToken'
};

var client = FuelRest({
	// origin: 'https://www.qa.exacttargetapis.com',
	auth: auth
});

client
	.get({
		uri: '/platform-internal/v1/applications/455e80f9-8fb8-4100-9efc-ad3f5bdfe975/resourceSets/key:activeaudiences.main?culture=de'
	})
	.then(res => {
		var items = res.body;

		// console.log(data)

		console.log(JSON.stringify(items, null, 2))
	})
	.catch(err => console.log(err));

// var authClient = new FuelAuth(auth);
//
// authClient.getAccessToken().then(data => console.log(data)).catch(err => console.log(err));
