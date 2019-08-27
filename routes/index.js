var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var User = require('../models/user');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
	var successmsg = req.flash('success')[0];
	if (req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Product.find({ title: regex }, function(err, foundtitle) {
			var found = [];
			var chunkSize = 3;
			for (var i = 0; i < foundtitle.length; i += chunkSize) {
				found.push(foundtitle.slice(i, i + chunkSize));
			}
			if (err) {
				console.log(err);
			} else {
				res.render('shop/index', {
					title: 'Express',
					products: found,
					successmsg: successmsg,
					noMessages: !successmsg
				});
			}
		});
	} else {
		Product.find(function(err, docs) {
			var productChunks = [];
			var chunkSize = 3;
			for (var i = 0; i < docs.length; i += chunkSize) {
				productChunks.push(docs.slice(i, i + chunkSize));
			}
			res.render('shop/index', {
				title: 'Express',
				products: productChunks,
				successmsg: successmsg,
				noMessages: !successmsg
			});
		});
	}
});

router.get('/add-to-cart/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		res.redirect('/');
	});
});
router.get('/reduce/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.reduceByOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});
router.get('/increase/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.increaseByOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});
router.get('/remove/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeItem(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});
router.get('/shopping-cart', function(req, res, next) {
	if (!req.session.cart) {
		return res.render('shop/shopping-cart', { product: null });
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);

	res.render('shop/checkout', { total: cart.totalPrice });
});

router.post('/checkout', isLoggedIn, function(req, res) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var date = new Date();
	var order = new Order({
		user: req.user,
		cart: cart,
		date: date,
		total: req.body.total,
		name: req.body.name,
		address: req.body.address,
		cardname: req.body.cardname,
		cardnumber: req.body.cardnumber,
		expirationmonth: req.body.expirationmonth,
		expirationyear: req.body.expirationyear,
		cvc: req.body.cvc
	});
	order.save().then((item) => {
		req.flash('success', 'Successfully bought products!');
		req.session.cart = null;
		res.redirect('/');
	});
});
module.exports = router;

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/user/signin');
}
