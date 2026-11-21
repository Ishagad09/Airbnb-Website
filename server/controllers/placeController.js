const place = require("../models/Place"); // Exporting

exports.createPlace = async (req, res) => {
  try {
    const userData = req.user;

    // render everything you used for creating schema.
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;

    const places = await Place.create({
      owner: userData._id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    });
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

//   return the user specific places
exports.userPlaces = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData._id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

//   update the places
exports.updatePlace = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData._id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;
    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      place.maxGuests({
        title,
        address,
        addedPhotos,
        description,
        extraInfo,
        perks,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json({
        message: "Place updated",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Return all the places
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// return single places based on the id
exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: "Place not found",
      });
    }
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// searching the places in the db
exports.searchPlaces = async (req, res) => {
  try {
    const searchWord = req.param.key;
    if (searchWord === "") return res.status(200).json(await Place.find());
    const searchMatches = await Place.find({
      address: { $regex: searchWord, $options: "i" },
    });
    res.status(200).json({
      searchMatches,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
