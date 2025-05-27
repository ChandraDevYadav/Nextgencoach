import SkillAvatar from "../models/skillAvatar.Model.js";

export const createAvatar = async (req, res) => {
  try {
    const newAvatar = await SkillAvatar.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(newAvatar);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create avatar", error: error.message });
  }
};

export const getAvatarsByUser = async (req, res) => {
  try {
    const avatars = await SkillAvatar.find({ userId: req.user.id });
    res.status(200).json(avatars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching avatars", error: error.message });
  }
};

export const getAvatarById = async (req, res) => {
  try {
    const avatar = await SkillAvatar.findById(req.params.id);
    if (!avatar || avatar.userId.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Avatar not found or unauthorized" });
    }
    res.status(200).json(avatar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving avatar", error: error.message });
  }
};

export const deleteAvatar = async (req, res) => {
  try {
    const avatar = await SkillAvatar.findById(req.params.id);
    if (!avatar || avatar.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await avatar.remove();
    res.status(200).json({ message: "Avatar deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete avatar", error: error.message });
  }
};
