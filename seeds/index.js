const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
require("dotenv").config();

// const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
mongoose
    .connect(process.env.DB_URL)
    .then((c) => {
        console.log("CONNECTION TO DATABASE!");
    })
    .catch((e) => {
        console.log("DISCONNECT ERROR!!!");
        console.log(e);
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const ramdom1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "63a9af9f855b49215c66e224",
            location: `${cities[ramdom1000].city}, ${cities[ramdom1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsa asperiores nulla eligendi! Deserunt provident fuga unde ratione facere laborum? Nesciunt quidem aliquam, odio nemo quo ipsam aspernatur voluptate sed.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[ramdom1000].longitude,
                    cities[ramdom1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dwgwbo0tw/image/upload/v1671526223/YelpCamp/lhlckjzjbiv6hovahd43.jpg",
                    filename: "lhlckjzjbiv6hovahd43",
                },
                {
                    url: "https://res.cloudinary.com/dwgwbo0tw/image/upload/v1671526222/YelpCamp/zoejkge4jmftrlacfp4c.jpg",
                    filename: "zoejkge4jmftrlacfp4c",
                },
                {
                    url: "https://res.cloudinary.com/dwgwbo0tw/image/upload/v1671525398/YelpCamp/xerwkyvy5bntewgfueot.jpg",
                    filename: "xerwkyvy5bntewgfueot",
                },
                {
                    url: "https://res.cloudinary.com/dwgwbo0tw/image/upload/v1671525396/YelpCamp/ufh0zclhl3pprtg29cfr.jpg",
                    filename: "ufh0zclhl3pprtg29cfr",
                },
            ],
        });
        await camp.save();
    }
};

seedDB()
    .then((c) => {
        mongoose.connection.close();
        console.log("CONNECTION CLOSED!");
    })
    .catch((e) => {
        console.log("ERROR!!!");
        console.log(e);
    });
