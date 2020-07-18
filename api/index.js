// const path = require('path');
const express = require('express');
const logger = require('morgan');
// const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// app.use(cors());
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials:true
// }));

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(logger('dev'));

//middleware for json
app.use(express.json());


//middleware for array or string
app.use(express.urlencoded({
    extended: false
}));






const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("_____VERIFY ERROR_____");
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

// router.get('/',cors(),(req,res) =>{
//
// });



// app.get('*', function(req, res,next) {
//     res.render('error');
// });

app.get('/', function (req, res) {
    res.send("HELLO") ;
})

app.post('/send', (req, res) => {
    console.log("_____REQUEST_____");
    console.log(req.body);
    try {
        const mailOptions = {
            from: req.body.email,
            to: 'daniel.jnw.lee@gmail.com',
            text: req.body.message
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log("____INFO______");
                console.info(err);
                res.status(500).send({
                    success: false,
                    message: 'Something went wrong. Try again later'
                });
            } else {
                res.send({
                    success: true,
                    message: 'Thanks for contacting us. We will get back to you shortly'
                });
            }
        });
    } catch (error) {
        console.log("CAUGHT ERROR");
        console.info(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong.. Try again later'
        });
    }
});



app.listen(port, () => {
    console.log(`server start on port ${port}`);
});
