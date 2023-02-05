/** load model for `members` table */
const memberModel = require(`../models/index`).member;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;

/** create function for read all data */
exports.getAllMember = async (request, response) => {
  /** call findAll() to get all data */
  let members = await memberModel.findAll();
  return response.json({
    success: true,
    data: members,
    message: `All Members have been loaded`,
  });
};
/** create function for filter */
exports.findMember = async (request, response) => {
  /** define keyword to find data */
  let keyword = request.body.keyword;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let members = await memberModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: keyword } },
        { gender: { [Op.substring]: keyword } },
        { address: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: members,
    message: `All Members have been loaded`,
  });
};

const upload = require("./upload-cover").single("profile");

/** create function for add new member */
exports.addMember = (request, response) => {
  // run function upload
  upload(request, response, async (error) => {
    // check if there are error when upload
    if (error) {
      return response.json({ message: error });
    }

    // check if file is empty
    if (!request.file) {
      return response.json({
        message: "Nothing to Upload",
      });
    }
    // prepare data from request
    let newMember = {
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      contact: request.body.contact,
      profile: request.file.filename,
    };

    // execute inserting data to book's table
    memberModel
      .create(newMember)
      .then((result) => {
        // if insert's procces succes
        return response.json({
          success: true,
          data: result,
          message: "New book has been inserted",
        });
      })
      .catch((error) => {
        // if insert's procces failed
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

/** create function for update member */
exports.updateMember = async (request, response) => {
  // run upload function
  upload(request, response, async (error) => {
    // check if there are error when upload
    if (error) {
      return response.json({ message: error });
    }

    // store selected book ID that will update
    let id = request.params.id;

    // prepare book's data that will update
    let member = {
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      contact: request.body.contact,
      profile: request.file.filename,
    };

    // check if file is not empty,
    // it means update data within reupload file
    if (request.file) {
      // get selected book's data
      const selectedMember = await memberModel.findOne({
        where: { id: id },
      });

      // get old filename of cover file
      const oldProfileMember = selectedMember.profile;

      // prepare path of old cover to delete file
      const pathCover = path.join(__dirname, "../profile", oldProfileMember);

      // check file existence
      if (fs.existsSync(pathCover)) {
        // delete old cover file
        fs.unlink(pathCover, (error) => console.log(error));
      }

      // add new cover filename to book object
      member.profile = request.file.filename;
    }

    // execute update data based on defined id book
    memberModel
      .update(member, { where: { id: id } })
      .then((result) => {
        // if update's procces succes
        return response.json({
          success: true,
          message: "Data member has been updated",
        });
      })
      .catch((error) => {
        // if update procces fail
        return response.json({});
      });
  });
};

/** create function for delete data */
exports.deleteMember = async (request, response) => {
  // store selected book's ID that will be delete
  const id = request.params.id;

  // delete cover file
  // get selected books data
  const member = await memberModel.findOne({ where: { id: id } });

  // get old filename of cover file
  const oldProfileMember = member.profile;

  // prepare path of old cover to delete file
  const pathProfile = path.join(__dirname, "../profile", oldProfileMember);

  // check file existence
  if (fs.existsSync(pathProfile)) {
    // delete old cover file
    fs.unlink(pathProfile, (error) => console.log(error));

    // end of delete cover file
    // execute delete data based on defined id book
    memberModel
      .destroy({ where: { id: id } })
      .then((result) => {
        // if update's procces succes
        return response.json({
          success: true,
          message: "Data member has been deleted",
        });
      })
      .catch((error) => {
        // if update procces fail
        return response.json({
          success: false,
          message: error.message,
        });
      });
  }
}
