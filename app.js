const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express() ;

app.set('view engine', 'ejs');

app.use(express.static("public"));

//Coordinates of berlin API works for specific locations only
const xlat = 52.51 ;
const ylat = 13.40 ;


app.get("/" , function(req , res){

    const url = `https://discover.search.hereapi.com/v1/discover?in=circle:${xlat},${ylat};r=150&q=hotels&apiKey=H7Qb3XqXe9c3WTbYCaSkqH72KaF31RsEhotXCMFUaVg` ;

    https.get(url , function(response){

        response.on("data" , function(data){
            const val = JSON.parse(data);

            const array = val.items ;

            const name1 = array[0].title ;
            const xloc1 = array[0].position.lat ;
            const yloc1 = array[0].position.lng ;
            const name2 = array[1].title ;
            const xloc2 = array[1].position.lat ;
            const yloc2 = array[1].position.lng ;
            const name3 = array[2].title ;
            const xloc3 = array[2].position.lat ;
            const yloc3 = array[2].position.lng ;
            
            res.render("route" ,           {hotelName1 : name1 , x1 : xloc1 , y1 : yloc1 ,
                                           hotelName2 : name2 , x2 : xloc2 , y2 : yloc2 ,
                                           hotelName3 : name3 , x3 : xloc3 , y3 : yloc3 ,
            });

        });
    });
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT , function(){
    console.log("Server is running on port 3000.");
});

