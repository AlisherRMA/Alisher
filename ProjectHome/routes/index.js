var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var Item = require("../models/items");

router.get("/", function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { users: user });
    }
  });
});

router.get("/add", function (req, res) {
  res.render("new");
});

router.post("/", function (req, res) {
  var name = req.body.lastName + " " + req.body.firstName[0] + ". " + req.body.middleName[0] + ".";
  var lastName = req.body.lastName;
  var firstName = req.body.firstName;
  var middlename = req.body.middleName;
  // var items = req.body.items;
  var nameOfProduct = req.body.nameOfProduct;
  var priceOfProduct = req.body.priceOfProduct;
  var items = { nameOfProduct: nameOfProduct, priceOfProduct: priceOfProduct };
  var quentity = req.body.quentity;
  var summ = req.body.overAllCost;

  var newUser = {
    name: name,
    lastName: lastName,
    firstName: firstName,
    middleName: middlename,
    quentity: quentity,
    overAllCost: summ
  };

  User.create(newUser, function (err, newlyCreatedUser) {
    if (err) {
      console.log(err);
    } else {
      User.findById(newlyCreatedUser._id, function (err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          Item.create(items, function (err, item) {
            if (err) {
              console.log(err);
            } else {
              item.save();
              foundUser.items.push(item);
              foundUser.save();
              console.log(foundUser);
              res.redirect('/');
            }
          });
        }
      });
    }
  });
});

router.get("/:id/edit", function (req, res) {
  User.findById(req.params.id).populate("items").exec(function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("edit", { user: foundUser });
    }
  });
});

router.put("/:id", function (req, res) {
  var editedData = {
    name: req.body.lastName + " " + req.body.firstName[0] + "." + req.body.middleName[0],
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    quentity: req.body.quentity,
    overAllCost: req.body.overAllCost
  };
  User.findByIdAndUpdate(req.params.id, { $set: editedData }, function (
    err,
    editedData
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(editedData);
      res.redirect("/");
    }
  });
});

router.get("/:id/delete", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("delete", { user: foundUser });
    }
  });
});

router.delete("/:id", function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("PROBLEM!");
    } else {
      res.redirect("/");
    }
  })
});

router.post("/:id", function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Item.create(req.body.items, function (err, item) {
        if (err) {
          console.log(err);
        } else {
          item.save();
          user.items.push(item);
          user.save();
          console.log(item);
          res.redirect('/' + req.params.id + "/edit");
        }
      });
    }
  });
});

module.exports = router;
