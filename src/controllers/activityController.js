const activityService = require('../services/activityService');

const addActivity = async (req, res) => {
  const activityData = req.body;
  //console.log("Add activity :", activityData)
  try {
    const newActivity = await activityService.addActivity(activityData);
    res.status(200).json({ success: true, data: newActivity, message: 'Activity added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to add activity' });
  }
};

const updateActivity = async (req, res) => {
  const activityId = req.params.id;
  const updatedActivityData = req.body;
  try {
    const updatedActivity = await activityService.updateActivity(activityId, updatedActivityData);
    if (!updatedActivity) {
      return res.status(404).json({ success: false, message: 'Activity Not Found' });
    }
    res.status(200).json({ success: true, data: updatedActivity, message: 'Activity updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to update activity' });
  }
};

const deleteActivity = async (req, res) => {
  const activityId = req.params.id;
  try {
    const deletedActivity = await activityService.deleteActivity(activityId);
    if (!deletedActivity) {
      return res.status(404).json({ success: false, message: 'Activity Not Found' });
    }
    res.status(204).json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to delete activity' });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json({ success: true, data: activities, message: 'Retrieved all activities successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities' });
  }
};

const getActivityById = async (req, res) => {
  const activityId = req.params.id;
  try {
    const activity = await activityService.getActivityById(activityId);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity Not Found' });
    }
    res.status(200).json({ success: true, data: activity, message: 'Retrieved activity successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activity' });
  }
};

const findByImc = async (req, res) => {
  const imc = req.params.imc;
  try {
    const activities = await activityService.findByImc(imc);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by IMC successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by IMC' });
  }
};

const findByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const activities = await activityService.findByCategory(category);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by category successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by category' });
  }
};

const findByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const activities = await activityService.findByTitle(title);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by title successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by title' });
  }
};

const findByAgeGroup = async (req, res) => {
  const ageGroup = req.params.ageGroup;
  try {
    const activities = await activityService.findByAgeGroup(ageGroup);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by age group successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by age group' });
  }
};

const findByGoal = async (req, res) => {
  const goal = req.params.goal;
  try {
    const activities = await activityService.findByGoal(goal);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by goal successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by goal' });
  }
};

const findByAge = async (req, res) => {
  const age = req.params.age;
  try {
    const activities = await activityService.findByAge(age);
    res.status(200).json({ success: true, data: activities, message: 'Retrieved activities by age successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to retrieve activities by age' });
  }
};



const filterActivities = async (req, res) => {
  const filterData = req.body;
  //console.log("Filter :", filterData);
  try {
    const filteredActivities = await activityService.filterActivities(filterData);
    res.status(200).json({ success: true, data: filteredActivities, message: 'Activities filtered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'Failed to filter activities' });
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
  findByAgeGroup,
  findByAge,
  findByGoal,
  findByTitle,
  filterActivities,
};
