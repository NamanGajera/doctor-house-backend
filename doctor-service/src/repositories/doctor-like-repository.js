const { DoctorLikes } = require("../models");
const CrudRepository = require("./crud-repository");

class DoctorLikesRepository extends CrudRepository {
    constructor() {
        super(DoctorLikes);
    }

    async toggleLike(userId, doctorId) {
        const existing = await DoctorLikes.findOne({
            where: { userId, doctorId },
        });

        if (existing) {
            await existing.destroy();
            return { liked: false, message: "Doctor disliked successfully" };
        } else {
            await DoctorLikes.create({ userId, doctorId });
            return { liked: true, message: "Doctor liked successfully" };
        }
    };
}

module.exports = DoctorLikesRepository;
