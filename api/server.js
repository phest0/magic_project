const express = require("express");
const cors = require("cors");
const https = require("https");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Phesto',
    password: '',
    database: 'magic_project'
});

let corsOptions = {
    origin: "*"
};

const app = express();

app.use(cors(corsOptions));

const port = 3000;

app.set("port", port);

app.listen(port, function () {
    console.log("API running on port: " + port);
});

// request https on scryfall to have json file with all cards of ikoria
// let test = https.get('https://api.scryfall.com/cards/iko/1/fr', (res) => {
//     console.log("API scryfall code status: " + res.statusCode);
//     let cards = "";
//     res.on('data', (chunkData) => {
//         console.log('chunk');

//         cards += chunkData;
//     });
//     res.on('end', () => {
//         try {
//             console.log('i return all cards');
//             const parsedCards = JSON.parse(cards);
//             console.log(params.parsedCards);
//         } catch (e) {
//             console.error(e.message);

//         }
//     });

// }).on('error', (e) => {
//     console.error(`Got error: ${e.message}`);
// });

function getAllCardsIkoria() {
    let path = 'https://api.scryfall.com/cards/iko/';
    let languagePath = '/fr';
    for (let i = 1; i < 276; i++) {
        https.get(path + i + languagePath, (res) => {
            let cards = "";
            res.on('data', (chunkData) => {
                cards += chunkData;
            });
            res.on('end', () => {
                try {
                    const parsedCards = JSON.parse(cards);
                    // const sql = "INSERT INTO cards_ikoria(card_name, card_image_url, mana_cost, card_type, colors, card_text, card_history_text, set_name, card_rarity, artist) VALUES(?,?,?,?,?,?,?,?,?,?)";
                    // const r = parsedCards;
                    console.log(i);
                    // connection.query(sql, [r.printed_name, r.image_uris.border_crop, r.mana_cost, r.printed_type_line, r.colors, r.printed_text, r.flavor_text, r.set_name, r.rarity, r.artist], function (err, rows, fields) {});
                    //printed_name, image_uris, mana_cost, printed_type_line, colors
                    // printed_text, flavor_text,  artist, set, set_name, rarity

                } catch (e) {
                    console.error(e.message);

                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
    console.log('getter ikoria cards done!');
}
// getAllCardsIkoria();

// end of request

// route get on all /cards
app.get('/cards', function (req, res) {
    console.log('request get on /cards');
    res.send(connection.query());
})