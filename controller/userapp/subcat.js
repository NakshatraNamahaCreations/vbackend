const appsubcatModel = require("../../model/userapp/subcat");

class appsubcat {
  async addappsubcat(req, res) {
    let { subcategory, category, videolink, homePagetitle } = req.body;
    const receivedOthService = JSON.parse(req.body.othservice);
    let file = req.files[0]?.filename;
    let file1 = req.files[1]?.filename;

    let add = new appsubcatModel({
      subcategory: subcategory,
      category: category,
      videolink: videolink,
      subcatimg: file,
      subcatvideo: file1,
      homePagetitle: homePagetitle,
      othservice:receivedOthService
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Category name added successfully" });
    }
  }
  //edit user

  async editappsubcat(req, res) {
    const subcategoryId = req.params.id;
    const { subcategory, category, videolink, homePagetitle ,othservice} = req.body;

    const file = req.files[0]?.filename;
    const file1 = req.files[1]?.filename;

    // Decode file names
    const decodedFile = file ? decodeURIComponent(file) : null;
    const decodedFile1 = file1 ? decodeURIComponent(file1) : null;

    const findCategory = await appsubcatModel.findOne({
      _id: subcategoryId,
    });
    if (!findCategory) {
      return res.send("no data found");
    }
    findCategory.category = category || findCategory.category;
    findCategory.othservice = JSON.parse(othservice) || findCategory.othservice;
    findCategory.subcategory = subcategory || findCategory.subcategory;
    findCategory.homePagetitle = homePagetitle || findCategory.homePagetitle;

    findCategory.videolink = videolink || findCategory.videolink;

    if (req.files[0]) {
      if (
        decodedFile &&
        (req.files[0].mimetype.startsWith("image/") ||
          req.files[0].mimetype === "application/octet-stream" ||
          req.files[0].mimetype === "image/jpeg")
      ) {
        findCategory.subcatimg = decodedFile;
      }
      if (decodedFile && req.files[0].mimetype === "video/mp4") {
        findCategory.subcatvideo = decodedFile;
      }
    }

    if (req.files[1]) {
      if (
        decodedFile1 &&
        (req.files[1].mimetype.startsWith("image/") ||
          req.files[1].mimetype === "application/octet-stream" ||
          req.files[1].mimetype === "image/jpeg")
      ) {
        findCategory.subcatimg = decodedFile1;
      }
      if (decodedFile1 && req.files[1].mimetype === "video/mp4") {
        findCategory.subcatvideo = decodedFile1;
      }
    }

    let updatedData = await appsubcatModel.findOneAndUpdate(
      { _id: subcategoryId },
      findCategory,
      { new: true }
    );
    if (updatedData) {
      return res.json({ success: "Updated", data: updatedData });
    } else {
      return res.send("failed");
    }
  }

  async getappsubcat(req, res) {
    let subcategory = await appsubcatModel.find({});
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postappsubcat(req, res) {
    let { category } = req.body;
    console.log(category);

    let subcategory = await appsubcatModel.find({ category });

    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async deleteappsubcat(req, res) {
    let id = req.params.id;
    let data = await appsubcatModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const appsubcatcontroller = new appsubcat();
module.exports = appsubcatcontroller;
