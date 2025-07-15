const { where } = require("sequelize");
const { DoctorLikes, Doctor, Specialization } = require("../models");
const CrudRepository = require("./crud-repository");

class DoctorLikesRepository extends CrudRepository {
  constructor() {
    super(DoctorLikes);
  }

  async toggleLike(userId, doctorId) {
    const existing = await DoctorLikes.findOne({
      where: { userId, doctorId },
    });
    const doctor = await Doctor.findOne({
      where: { userId: doctorId },
    });

    if (existing) {
      await existing.destroy();
      await doctor.decrement("likeCount", { by: 1 });
      await doctor.reload();
      return { liked: false, message: "Doctor disliked successfully" };
    } else {
      await DoctorLikes.create({ userId, doctorId });
      await doctor.increment("likeCount", { by: 1 });
      await doctor.reload();
      return { liked: true, message: "Doctor liked successfully" };
    }
  }
  async getAllLikedDoctor(userId) {
    const likes = await DoctorLikes.findAll({
      where: { userId },
      include: [
        {
          model: Doctor,
          required: true,
          include: [
            {
              model: Specialization,
              as: "specialization",
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return likes.map((like) => {
      const doctor = like.Doctor?.toJSON?.() || like.Doctor;
      return {
        ...doctor,
        isLiked: true,
      };
    });
  }
}

module.exports = DoctorLikesRepository;
