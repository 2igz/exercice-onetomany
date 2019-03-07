

// je vais chercher le driver sqlite3 dans node_modules
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require ('express');

const cors = require ('cors');
const app = express();



const dbFile = 'musique2.db';
const db = new sqlite3.Database(dbFile);

 
// sans db.serialize.
// les operations sont lancées en même temps.
// le INSERT risque d'etre executé.
// avant que la creation de la table soit finie.


//table artistes

db.serialize( () => {

// if ( !fs.existsSync(dbFile) ) {
   
db.run('CREATE TABLE artistes (artiste_id INTEGER PRIMARY KEY AUTOINCREMENT, chanteurs TEXT)'); 
   
db.run('INSERT INTO artistes (chanteurs) VALUES (?)', 'quavo');
db.run('INSERT INTO artistes (chanteurs) VALUES (?)', 'offset');
db.run('INSERT INTO artistes (chanteurs) VALUES (?)', 'richgang');
   
db.run('CREATE TABLE chansons (chanson_id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, price INTEGER, artiste_id INTEGER, FOREIGN KEY(artiste_id) REFERENCES artistes(id))'); 
   
db.run('INSERT INTO chansons (titre, price, artiste_id) VALUES (?,?,?)', 'ice stray',4,1);
db.run('INSERT INTO chansons (titre, price, artiste_id) VALUES (?,?,?)', 'wicleaf jean',3,2);
db.run('INSERT INTO chansons (titre, price, artiste_id) VALUES (?,?,?)', 'life style',6,3);
   
  
db.run('CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, adresse TEXT, bank_info TEXT)');

db.run('INSERT INTO users (adresse, bank_info) VALUES (?,?)', 'rue du nord', 22222);
db.run('INSERT INTO users (adresse, bank_info) VALUES (?,?)', 'rue du sud',33333);
db.run('INSERT INTO users (adresse, bank_info) VALUES (?,?)', "rue de l'ouest",55555); 



db.run('CREATE TABLE achats (achat_id INTEGER PRIMARY KEY AUTOINCREMENT, date_achat TEXT, chanson_id INTEGER,user_id INTEGER, FOREIGN KEY(chanson_id) REFERENCES chanson(id),  FOREIGN KEY(user_id) REFERENCES users(id))');
    
db.run('INSERT INTO achats (date_achat, chanson_id, user_id) VALUES (?,?,?)', 'lundi',1,1);
db.run('INSERT INTO achats (date_achat, chanson_id, user_id) VALUES (?,?,?)', 'mardi',2,2);
db.run('INSERT INTO achats (date_achat, chanson_id, user_id) VALUES (?,?,?)', 'mercredi',3,3);
    
    
     });

  




  db.all('SELECT * FROM artistes NATURAL JOIN chansons', function (error, data) {
    if (!error) console.log(data);
    else console.log(error);
  });
   

app.get('/',function(request, response){
  db.all('SELECT * FROM artistes NATURAL JOIN  chansons, achats, users', function (error, data){
    
    response.send(data);

  });

  

 });
 app.listen(7000,function(error){console.log ('app listening port 7000');
 } )