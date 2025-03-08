const doctorCategory = require("../models/options.model");

// Utility function to attach category details to doctors
const attachCategoriesToDoctors = async (doctors) => {
  const categoryIds = [
    ...new Set(
      doctors.map((doc) => doc.categoryId).filter((id) => id !== null)
    ),
  ];

  let categoriesMap = {};
  if (categoryIds.length > 0) {
    const categories = await doctorCategory.find({
      _id: { $in: categoryIds },
    });

    categoriesMap = categories.reduce((map, category) => {
      map[category._id.toString()] = category;
      return map;
    }, {});
  }

  const doctorsWithCategories = doctors.map((doc) => {
    const docObj = doc.toObject();
    if (docObj.categoryId && categoriesMap[docObj.categoryId]) {
      docObj.category = categoriesMap[docObj.categoryId];
    } else {
      docObj.category = null;
    }
    return docObj;
  });

  return doctorsWithCategories;
};

module.exports = { attachCategoriesToDoctors };
