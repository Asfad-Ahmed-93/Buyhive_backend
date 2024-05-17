const multer = require("multer");
const model = require("../Modals/MainSchema");
const certificate = require("../Modals/Certificate");
const MainServices = require("../Services/MainServices");

class MainControllers {

  static async postcertificate(req, res) {
    try {
      const data = await MainServices.createCertificate(req.body);
      res.json({
        success: true,
        data
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "new data cannot post  for certification"
      });
    }
  }
  //posting the data from the coulmn (calling model)
  static async postdata(req, res) {
    try {
      const data = await MainServices.createPost(req.body);
      res.json({
        success: true,
        data
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "new post controlleer error"
      });
    }
  };


  static async filterCert(req, res) {
    try {
      const data = await MainServices.filterCertification(req.query);
      res.json({
        success: true,
        data
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "error into filter certification controllers"
      });
    }
  };


  //Api for getting all the data

  static async Recieve(req, res) {
    try {
      const data = await MainServices.ReceiveAll(req.query);

      res.json({
        success: true,
        data
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "error into receive all controllers"
      });
    }
  };

}

module.exports = MainControllers