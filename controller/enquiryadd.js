const enquiryaddmodel = require("../model/enquiryadd");

class addenquiry {
  async Addenquiry(req, res) {
    try {
      // Generate the series number
      // const uniqueNumber = await generateSeriesNumber();
      let {
        enquirydate,
        executive,
        name,
        time,
        email,
        contact1,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
        deliveryAddress,
        // counter,
      } = req.body;

      const latestCustomer = await enquiryaddmodel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      // // firstname = toTitleCase(firstname);
      // const Email = await enquiryaddmodel.findOne({ email: email });
      // if (Email) {
      //   return res.status(500).json({ error: "Email already exits" });
      // }

      // const phone = await enquiryaddmodel.findOne({ contact1: contact1 });
      // if (phone) {
      //   return res.status(500).json({ error: "mobile number already exits" });
      // }
      const newVendor = new enquiryaddmodel({
        EnquiryId: newEquiry,
        enquirydate,
        executive,
        name,
        time,
        email,
        contact1,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
        deliveryAddress
        // counter,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }
  async addenquiry1(req, res) {
    try {
      const id = req.params.id;
      const { enquirydetails } = req.body;

      const doc = await enquiryaddmodel.findByIdAndUpdate(
        id,
        { $push: { enquirydetails: enquirydetails } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async addquotefollup(req, res) {
    try {
      const id = req.params.id;
      const { quotefollup } = req.body;

      const doc = await enquiryaddmodel.findByIdAndUpdate(
        id,
        { $push: { quotefollup: quotefollup } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async newenquiry(req, res) {
    let id = req.params.id;

    let {
      enquiryid,
      response,
      desc,
      enquiryfollowupdate,
      value,
      colorcode,
      nxtfoll,
    } = req.body;
    let data = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        enquiryid,
        response,
        desc,
        enquiryfollowupdate,
        value,
        colorcode,
        nxtfoll,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  //edit
  async editenquiry(req, res) {
    let id = req.params.id;

    let {
      enquiryid,
      enquirydate,
      executive,
      name,
      time,
      email,
      contact1,
      contact2,
      address,
      category,
      reference1,
      reference2,
      city,
      reference3,
      comment,
      intrestedfor,
      serviceID, //05-10
      responseType,
    } = req.body;
    let data = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        enquiryid,
        enquirydate,
        executive,
        name,
        time,
        email,
        contact1,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  // async updateDetails(req, res) {
  //   let id = req.params.id;
  //   let { technicianname, appoDate, appoTime } = req.body;
  //   let newData = await enquiryaddmodel.findOneAndUpdate(
  //     { _id: id },
  //     {
  //       technicianname,
  //       appoDate,
  //       appoTime,
  //     }
  //   );
  //   if (newData) {
  //     return res.status(200).json({ Success: "Added" });
  //   } else {
  //     return res.status(500).json({ error: "Something went wrong" });
  //   }
  // }
  async updatequote(req, res) {
    let id = req.params.id;
    let { projecttype, qamt, bookedby } = req.body;
    let newData = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        projecttype,
        qamt,
        bookedby,
      }
    );
    if (newData) {
      return res.status(200).json({ Success: "Added" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  // async cancelsurvey(req, res) {
  //   try {
  //     let id = req.params.id;
  //     let { reasonForCancel } = req.body;
  //     let newData = await enquiryaddmodel.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         reasonForCancel,
  //         cancelStatus: true, // Set cancelStatus to true when canceling the survey
  //       },
  //       { new: true } // Return the updated document
  //     );
  //     if (newData) {
  //       return res.status(200).json({ Success: "Added", cancelStatus: true });
  //     } else {
  //       return res.status(500).json({ error: "Something went wrong" });
  //     }
  //   } catch (error) {
  //     console.log("Error in controller : ", error);
  //     return res.status(403).send({
  //       message:
  //         "Something went wrong while updating your details Please try again later.",
  //     });
  //   }
  // }

  async postsubcategory(req, res) {
    let { category } = req.body;
    let data = await enquiryaddmodel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ enquiryadd: data });
    } else {
      return res.json({ error: "something went wrong" });
    }
  }

  async getallagreegate(req, res) {
    let quote = await enquiryaddmodel.aggregate([
      {
        $lookup: {
          from: "quotes",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotedata",
        },
      },
      {
        $lookup: {
          from: "treatments",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "treatmentdetails",
        },
      },
      {
        $lookup: {
          from: "quotefollowups",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotefollowup",
        },
      },
    ]);
    if (quote) {
      return res.json({ enquiryadd: quote });
    }
  }

  async  getEnquiryAndAggregate(req, res) {
    try {
      let EnquiryId = req.params.id; 

console.log("EnquiryId",EnquiryId)

      let aggregatedData = await enquiryaddmodel.aggregate([
        {
          $match: { EnquiryId: EnquiryId } // Match the EnquiryId obtained from the enquiry
        },
        {
          $lookup: {
            from: "quotes",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotedata",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentdetails",
          },
        },
        {
          $lookup: {
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
      ]);
  
      
      return res.json({ enquiryadd: aggregatedData});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  async getallnewfollow(req, res) {
    let quote = await enquiryaddmodel.aggregate([
      {
        $lookup: {
          from: "enquiryfollowups",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "enquiryFollow",
        },
      },
    
    ]);
    if (quote) {
      return res.json({ enquiryadd: quote });
    }
  }

  
  async  findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;
  
      const data = await enquiryaddmodel.find({ EnquiryId }).sort({ _id: -1 }).exec();
  
      if (data && data.length > 0) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.json({ enquiryadd: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
  //Get all
  async getallenquiryadd(req, res) {
    let data = await enquiryaddmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Get all
  async getallenquiryid(req, res) {
    let { id } = req.body;
    let data = await enquiryaddmodel.find({ EnquiryId: id });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //Delete
  async deleteenquiryadd(req, res) {
    let id = req.params.id;
    const data = await enquiryaddmodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const enquiryaddcontroller = new addenquiry();
module.exports = enquiryaddcontroller;
