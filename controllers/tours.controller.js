// const { getDb } = require("../utils/dbConnect");
const { Tour } = require("../models/Tour");

exports.getAllTours = async (req, res, next) => {
    let { sortBy = "", fields = "", page = "1", limit = "10", ...filters } = req.query;
    sortBy = sortBy.replaceAll(",", " ");
    page = Number(page);
    limit = Number(limit);

    if (filters) {
        filters = JSON.parse(JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (matched) => `$${matched}`));
    }

    try {
        const data = await Tour.find(filters)
            .select(fields.replaceAll(",", " "))
            .sort(sortBy).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));

        res.status(200).json({
            totalPage: 0,
            currentPage: page,
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.addTour = async (req, res, next) => {
    try {
        const tour = new Tour({ ...req.body, viewCount: 0 });
        const result = await tour.save();
        res.json(result);

    } catch (error) {
        res.json({ error, msg: "error" });
    }
}
exports.getTourDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } }, { runValidators: true })
        const data = await Tour.findById(id);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.updateTour = async (req, res, next) => {
    const { id } = req.params;
    const { viewCount, ...rest } = req.body;
    try {
        await Tour.updateOne({ _id: id }, { $set: rest }, { runValidators: true })
        const data = await Tour.findById(id);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.getTrending = async (req, res, next) => {
    try {
        const data = await Tour.find().sort("-viewCount").limit(3);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.getCheapest = async (req, res, next) => {
    try {
        const data = await Tour.find().sort("fare").limit(3);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}