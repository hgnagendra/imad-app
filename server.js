var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var config= {
  user: 'hgnagendra',
  host: 'db.imad.hasura-app.io',
  database: 'hgnagendra',
  password: process.env.DB_PASSWORD,
  port: 5432,
    
};
var app = express();
app.use(morgan('combined'));


var article = {
    'article-one': {
        title: 'artielce-one nagendra',
        heading:'artile - one',
        date: '12-august 2017',
        content: `
    <div>
    <p>
        My Name is nagendra working in NIEIT, Mysuru, My Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysurMy Name is nagendra working in NIEIT, MysuruuMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, Mysuru
        
    </p>
    </div>`
 },
    'article-two' : {
        title: 'artielce-Two nagendra',
        heading:'artile - TWO',
        date: '12-august 2017',
        content: `
    <div>
    <p>
        My Name is nagendra working in NIEIT, Mysuru, My Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysurMy Name is nagendra working in NIEIT, MysuruuMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, Mysuru
        
    </p>
    </div>`
},
    'article-three':  {
        title: 'artielce-Three nagendra',
   heading:'artile - Three',
   date: '12-august 2017',
   content: `
    <div>
    <p>
        My Name is nagendra working in NIEIT, Mysuru, My Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysurMy Name is nagendra working in NIEIT, MysuruuMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, Mysuru
        
    </p>
    </div>`
   },
   'article-four' : {
        title: 'artielce-Four nagendra',
        heading:'artile - Four',
        date: '12-august 2017',
        content: `
    <div>
    <p>
        My Name is nagendra working in NIEIT, Mysuru, My Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysurMy Name is nagendra working in NIEIT, MysuruuMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, MysuruMy Name is nagendra working in NIEIT, Mysuru
        
    </p>
    </div>`
   }
    };

function createtemplete(data) {
  var title =data.title;
   var date =data.date;
   var content =data.content;
   var heading =data.heading;

var htmltemplete= `
 <html>
    <head>
        <title>
            ${title}
        </title>
    
        <link href="/ui/style.css" rel="stylesheet" />
    
    
    </head>
    
<body>
    
    <div class="container">
    <div>
        <a href="/"> Home </a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
    ${date}
    </div>
        
    <div>
    ${content}
    </div>
    
</body>
    
 </html>
 
`;
return htmltemplete;

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new Pool(config);

app.get('/hgnagendra.db',function (req,res) {
    
    pool.query('SELECT * FROM test', function(err,res) {
       if (err) {
           res.status(500).send(error.tostring());
       }else {
           res.send(JSON.stringify(result));
       }
       
        
    });
});


app.get('/:articlename', function(req, res) {
    //articlename==article-one
    var articlename=req.params.articlename;
   res.send(createtemplete(article[articlename]));
   //article[articlename]==artcicle[article-one]
  });


/*app.get('/article-two', function(req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
}); */


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
}); 

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
