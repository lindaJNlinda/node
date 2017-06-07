var express = require('express');

var app = express();
app.use(express.static(__dirname+'/public'));
var handlebars = require('express3-handlebars').create({defaultLayout:"mian"});

var fortuns = [
	"Conquer your fears or they will  conquer you.",
	"Rivers need springs.",
	"Do not fear what you don`t know.",
	"You will have a pleasant surprise.",
	"Whenever possible,keep it simple."
];

var fortune = require('./lib/fortune.js');

app.engine('handlebars',handlebars.engine);
app.set("view engine",'handlebars');
app.set('port',process.env.PORT || 3000);

app.get("/",function(req,res){
	res.render('home');
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
});

app.get("/about",function(req,res){
	var randomFortune = fortuns[Math.floor(Math.random()*fortuns.length)]
	res.render('about',{fortune:fortune.getFortune()});
	/*res.type('text/plain');
	res.send('About Meadowlark Travel');*/
});

//制定404页面
app.use(function(req,res){
	res.render('404');
	/*res.type("text/plain");
	res.status(404);
	res.send("404 - NOT　FUOND");*/
});

//制定500页面
app.use(function(err,req,res,next){
	res.render('500');
	/*console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error')*/
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get("port")+";press Ctrl - C to terminate");
});



