const path = require('path');
const express = require('express');
const logger = require('morgan');
// const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// app.use(cors());
const nodeoutlook = require('nodejs-nodemailer-outlook');
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



const auth = {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD
};




app.post('/api/send', (req, res) => {
    console.log("_____REQUEST_____");
    console.log(req.body);
    try {
        nodeoutlook.sendEmail({

                auth: {
                    user: auth.user,
                    pass: auth.pass
                },
                from: 'daniel.jnw.lee@outlook.com',
                to: 'daniel.jnw.lee@outlook.com',
                subject: req.body.name + req.body.email,
                html: req.body.message,
                text: req.body.message,
                onError: (e) => {res.status(500).send({
                                success: false,
                                message: 'ERROR 500: Something went wrong sending the email. Try again later'
                            });
                },
                onSuccess: (i) => res.send({
                                success: true,
                                message: 'Thanks for contacting me. I will get back to you shortly'
                            })
            }
        );
    } catch (error) {
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
