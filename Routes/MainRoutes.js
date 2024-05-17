const express = require("express");
const MainControllers = require("../Controllers/MainControllers");
const routes = express.Router();

// routes.post("/upload", finalUplaod.single("fileUpload"),upload);

routes.post('/postdata',MainControllers.postdata);

routes.post("/postcertificate",MainControllers.postcertificate);


routes.get("/",MainControllers.Recieve); 

routes.get("/searchFilter",MainControllers.filterCert);


module.exports = routes;
