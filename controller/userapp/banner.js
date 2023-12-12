const bannerModel = require("../../model/userapp/banner");

class banner {
  async postaddbanner(req, res) {
    let file = req.file?.filename;
    const { subcategory } = req.body;
    try {
      let newbanner = new bannerModel({
        banner: file,
        subcategory:subcategory
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallbanner(req, res) {

    let banner = await bannerModel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletebanner(req, res) {
    let id = req.params.id;
    const data = await bannerModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const bannerController = new banner();
module.exports = bannerController;
