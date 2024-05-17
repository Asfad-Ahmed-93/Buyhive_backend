const certificate = require("../Modals/Certificate");
const modal = require("../Modals/MainSchema");


class MainHandeler {

    static async createNewProduct(post){
        const card = new modal({
            Product_id: req.body.Product_id,
            Image: req.body.Image,
            Flag: req.body.Flag,
            Discription: req.body.Discription,
            Stock: req.body.Stock,
            Prices: req.body.Prices,
          });
          //saving the data into database
          card
            .save()
            .then((card) => {
              // res.json(card);
        
              res.send({
                message: "post new card data",
                data: card,
              });
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
          return;

    }

    static async createNewCertification(pro){

        const cert = new certificate({
            country: pro.country,
            product: pro.product,
            supplier: pro.supplier,
        });
        cert.save()
            .then((cert) => {
                res.send({
                    message: "post new data for certification",
                    certification: cert,
                });
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
        return;
    }

    static async RecieveFilteration(filteration) {
        const query = {};
    
        let searchQuery;
        if (filteration.name && filteration.name.length > 0) {
            query.Certification = { $in: filteration.name.split(",") };
        }
        if (filteration.stock) {
            query.Stock = { $lte: +filteration.stock };
        }
        if (filteration.country && filteration.country.length > 0) {
            query.Country = { $in: filteration.country.split(",") };
        }
        if (filteration.Supplier) {
            query.Supplier = { $in: filteration.Supplier.split(",") };
        }
        if (filteration.price_gte) {
            query.Price = { $lte: +filteration.price_gte };
        }
        if (filteration.price_lte) {
            query.Price = { $gte: +filteration.price_lte };
        }
        if (filteration.price_gte && filteration.price_lte) {
            query.Price = { $lte: +filteration.price_gte, $gte: +filteration.price_lte };
        }
        if (filteration.availability) {
            query.Availability = filteration.availability;
        }
        if (filteration.search) {
            searchQuery = { Discription: { $regex: filteration.search, $options: "i" } };
        }
        const limit = 10;
        const skip = (filteration.page - 1) * 10;
        const totalCards = await modal.countDocuments(query);
        const card = await modal.find(searchQuery || query).skip(skip).limit(limit);
        const cardLength = searchQuery ? card.length : totalCards;

        
        if (card) { 
            return {
                card: card,
                totalCards: cardLength,
            }
        }

    }
    static async certFilter (filter){
        let query = []
        
        if (filter.manufactureLocation) {
            query.push(
                { $unwind: '$country' },
                { $match: { 'country': filter.manufactureLocation } },
            )
        }
        if (filter.supplierCertification) {
            query.push(
                { $unwind: '$supplier' },
                { $match: { 'supplier': filter.supplierCertification } },
            )
        }
        if (filter.productCertification) {
            query.push(
                { $unwind: '$product' },
                { $match: { 'product': filter.productCertification } },
            )
        }
        try {
            let cert ;
            cert = query.length === 0 ? await certificate.find() :
                await certificate.aggregate(query)

            const newObject = [
                {
                    _id: cert[0]._id,
                    country: typeof (cert[0].country) === "object" ? cert[0].country : [cert[0].country],
                    product: typeof (cert[0].product) === "object" ? cert[0].product : [cert[0].product],
                    supplier: typeof (cert[0].supplier) === "object" ? cert[0].supplier : [cert[0].supplier],
                }
            ]
            return {
                cert : newObject
            }
            // res.send({
            //     cert: newObject,
            // });
        } catch (error) {
            // res.send({
            //     error: error.message,
            // });
            return error.message
        }
    }
}

module.exports = MainHandeler