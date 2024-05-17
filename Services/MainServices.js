const MainHandeler = require("../Handelers/MainHandeler");
const certificate = require("../Modals/Certificate");
const modal = require("../Modals/MainSchema");

class MainServices {

    static async createCertificate(pro) {

        return MainHandeler.createNewCertification(pro);

    };

    static async createPost(post) {

       return MainHandeler.createNewProduct(post);
    }

    static async filterCertification(filter) {

        return MainHandeler.certFilter(filter);

    }

    static async ReceiveAll(filerVaribles) {
        return MainHandeler.RecieveFilteration(filerVaribles);
    }
}

module.exports = MainServices