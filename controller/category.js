const categorymodel = require("../model/category");

class Category {
  async addcategory(req, res) {
    let { category } = req.body;
    let file = req.file?.filename;

    let add = new categorymodel({
      category: category,
      categoryImg: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Category name added successfully" });
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.ccid;
      const { category } = req.body;
      const file = req.file?.filename;

      const findCategory = await categorymodel.findOne({
        _id: categoryId,
      });
      if (!findCategory) {
        return res.json({ error: "No such record found" });
      }
      //
      findCategory.category = category || findCategory.category;
      if (file) {
        findCategory.categoryImg = file;
      }

      const updateCategory = await categorymodel.findOneAndUpdate(
        { _id: categoryId },
        findCategory,
        { new: true } // Return the updated document
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }




  

  async getcategory(req, res) {
    let category = await categorymodel.find({}).sort({ _id: -1 });
    if (category) {
      return res.json({ category: category });
    }
  }

  async getallcategory(req, res) {
    let category = await categorymodel.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "category",
          foreignField: "category",
          as: "subcategories",
        },
      },
    ]);
    if (category) {
      return res.json({ category: category });
    }
  }

  async postdeletecategory(req, res) {
    let id = req.params.id;
    const data = await categorymodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const categoryController = new Category();
module.exports = categoryController;
