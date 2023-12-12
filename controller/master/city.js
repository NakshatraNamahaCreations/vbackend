const cityymodel = require("../../model/master/city");

class city {
  async addcity(req, res) {
    let { city } = req.body;
    if (!city) {
      return res.status(500).json({ error: "field must not be empty" });
    } else {
      let addcity = new cityymodel({
        city: city,
      });
      let save = addcity.save();
      if (save) {
        return res.json({ sucess: "city name added successfully" });
      }
    }
  }

  //edit category
  async editcity(req, res) {
    let id = req.params.id;
    let { city } = req.body;

    let data = await cityymodel.findOneAndUpdate({ _id: id }, { city });
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async getcity(req, res) {
    let city = await cityymodel.find({}).sort({ _id: -1 });
    if (city) {
      return res.json({ mastercity: city });
    }
  }

  async postdeletecity(req, res) {
    let id = req.params.id;
    const data = await cityymodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const citycontroller = new city();
module.exports = citycontroller;
