let appError = require("./../utils/classError");
// let housemodel = require("./../models/houseModel");
// let ownermodel = require("./../models/ownerModel");
// let bookingModel = require("./../models/bookingModel");
// let locationModel = require("./../models/locationModel");
let Email = require("./../utils/email");

// let bookingmodel = require('./../models/bookingModel');
let userModel = require("./../models/userModel");
let AsyncError = require("./../utils/catchAsync");

exports.root = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_login", {});
});
exports.register = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_register", {});
});
exports.dash = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_home", {});
});
exports.mail = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_mail", {});
});
exports.domain = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_domain", {});
});
exports.projects = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_projects", {});
});
exports.profile = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_profile", {});
});
exports.invoice = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_invoice", {});
});
exports.payment = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_payment", {});
});
exports.domaindetails = AsyncError(async function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_domaindetails", {});
});
