const Activity = require('../models/activityModel');

const addActivity = async (activityData) => {
  try {
    const newActivity = new Activity(activityData);
    return await newActivity.save();
  } catch (error) {
    throw error;
  }
};

const updateActivity = async (activityId, updatedActivityData) => {
  try {
    return await Activity.findByIdAndUpdate(activityId, updatedActivityData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (activityId) => {
  try {
    return await Activity.findByIdAndDelete(activityId);
  } catch (error) {
    throw error;
  }
};

const getAllActivities = async () => {
  try {
    return await Activity.find();
  } catch (error) {
    throw error;
  }
};

const getActivityById = async (activityId) => {
  try {
    return await Activity.findById(activityId);
  } catch (error) {
    throw error;
  }
};

const findByImc = async (imc) => {
    try {
      return await Activity.find({ $and: [{ imcMin: { $lte: imc } }, { imcMax: { $gte: imc } }] });
    } catch (error) {
      throw error;
    }
};
  
const findByCategory = async (category) => {
    try {
      return await Activity.find({ category: category });
    } catch (error) {
      throw error;
    }
};

const findByAgeGroup = async (adult) => {
    try {
      return await Activity.find({ ageGroup: adult });
    } catch (error) {
      throw error;
    }
};

const findByGoal = async (goal) => {
  try {
    return await Activity.find({ goals: goal });
  } catch (error) {
    throw error;
  }
};
const findByAge = async (age) => {
    try {
        return await Activity.find({ $and: [{ ageMin: { $lte: age } }, { ageMax: { $gte: age } }] });
    } catch (error) {
        throw error;
    }
};

const findByTitle = async (title) => {
  try {
      return await Activity.find({ title : title });
  } catch (error) {
      throw error;
  }
};

const filterActivities = async (filterData) => {
  const { category, goals, ageGroup } = filterData;
  const filter = {};

  if (category && category.length > 0) {
    filter.category = { $in: category };
  }

  if (goals && goals.length > 0) {
    filter.goals = { $in: goals };
  }

  if (ageGroup && ageGroup.length > 0) {
    filter.ageGroup = { $in: ageGroup };
  }

  try {
    return await Activity.find(filter);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
  getActivityById,
  findByImc,
  findByCategory,
  findByAge,
  findByAgeGroup,
  findByGoal,
  findByTitle,
  filterActivities,
};
