var Product = require('../models/product');
 var mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

var products = [
    new Product({
        imagePath:'https://images-na.ssl-images-amazon.com/images/I/51po2bu7VnL.jpg',
        title:'God of War' ,
        description:'The latest version of the god of war game will immerse you into the world of norse mythology, and test combat skills through brutal fights with mysterious creatures and monsters.',
        price: 2699
     }),
     new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Far_Cry_5_boxshot.jpg/220px-Far_Cry_5_boxshot.jpg',
        title:'Far Cry 5' ,
        description:'Far Cry 5 is a massive gameplay arena that filled with something new around every bend. The enemy AI behavior is more realistic, and the exploration is endless. Even when you feel like taking a break from the campaign, you can take in some leisurely fishing before diving back into your quest. Its your mission.',
        price:2840
     }),
     new Product({
        imagePath:'https://cf3.s3.souqcdn.com/item/2018/08/27/37/26/57/29/item_L_37265729_145250214.jpg',
        title:'Marvels Spider-Man' ,
        description:'We all know of the whimsical nerd who got superpowers after being bitten by a radioactive spider. Well, this is not the same',
        price:2099
     }),
     new Product({
        imagePath:'https://www.digiseller.ru/preview/642447/p1_2286007_96b6a456.jpg',
        title:'Need for Speed Playback' ,
        description:'Need for Speed Payback is a racing game set in an open world environment of Fortune Valley. It is focused on "action driving" and has three playable characters (each with different sets of skills) working together to pull off action movie like sequences.',
        price:1180
     }),
     new Product({
        imagePath:'https://i5.walmartimages.com/asr/31a8afd4-c3f6-4b48-b504-430a1542160e_2.bbdd2f439c6613fcedc7b882c1312049.jpeg',
        title:'Assassins Creed Origins' ,
        description:'Assassins Creed Origins is an action-adventure stealth game played from a third-person perspective. ... The player is able to take control of Senu and scout an area in advance, highlighting enemies which will then be visible when they return to controlling Bayek, the games main character.',
        price:1399
     }),
     new Product({
        imagePath:'https://i5.walmartimages.ca/images/Large/443/368/6000198443368.jpg',
        title:'The Crew 2 (Deluxe Editions)' ,
        description:'The Crew 2 is first and foremost a racing game, the same as its predecessor. In this game, the player assumes the persona of an unknown racer whose goal it is to become a champion in the United States. There is also the expected emphasis on multiplayer. In co-op, players can join different rally raid events together, as well as compete in street, boat, and plane races.',
        price:2929
     }),
     new Product({
        imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvUSqJhVcTg-kNcb74DabY95hQh0e906Bcp1NGwjLhn654AdQ',
        title:'Call of Duty: Infinite Warfare' ,
        description:'Infinite Warfares announcement trailer was met with a mixed reception from game critics and journalists and a negative reception from the Call of Duty community.',
        price:775
     }),
     new Product({
        imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyySDegy_ZWH4pc1Oc2mWxtvY5FGzRBsplw9NtOiurQJDJ6yG',
        title:'Grand Theft Auto V' ,
        description:'Grand theft auto, also referred to as “GTA,” is not just a video game. Rather, it is known as vehicle theft and / or just auto theft. It defined as the unauthorized taking of anothers car with the intent to permanently deprive the owner of the car. It may be by force, trick or false pretenses.',
        price:2175
     }),
     new Product({
        imagePath:'https://cdn8.bigcommerce.com/s-ua4dd/images/stencil/1280x1280/products/27887/56241/packArt.img-3__38850.1515094839.jpg?c=2&imbypass=on',
        title:'Star Wars Battlefront II' ,
        description:'Star Wars Battlefront II is an action shooter video game based on the Star Wars film franchise. ... These returning microtransactions are purely cosmetic, do not affect gameplay, and are purchased directly through in-game currency rather than through loot crates',
        price:1599
     })
];
var done=0;
for(var i = 0; i < products.length; i++)
{
    products[i].save(function(err,result)
    {
        done++;
        if(done === products.length)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
}
