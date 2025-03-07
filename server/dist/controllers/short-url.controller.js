"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const short_url_modal_1 = require("../modals/short-url.modal");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        console.log("full url is ", fullUrl);
        const urlFound = yield short_url_modal_1.UrlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409).json({ message: "url found", url: urlFound });
            return;
        }
        const shortUrl = yield short_url_modal_1.UrlModel.create({ fullUrl });
        res.status(201).json({ message: "url created successfully", shortUrl });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong while creating short url" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield short_url_modal_1.UrlModel.find().sort({ createdAt: -1 });
        if (shortUrls.length <= 0) {
            res.status(404).json({ message: "short urls not found" });
            return;
        }
        res.status(200).json({ message: "urls found successfully", shortUrls });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong while fetching short url" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield short_url_modal_1.UrlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).json({ message: "full url not found " });
            return;
        }
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`);
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong while fetching short url" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield short_url_modal_1.UrlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(204).json({ message: "requested url successfully delted" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong while deleting short url" });
    }
});
exports.deleteUrl = deleteUrl;
