import { Request, Response } from "express";
import { UrlModel } from "../modals/short-url.modal";

export const createUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullUrl } = req.body;
        console.log("full url is ", fullUrl);
        const urlFound = await UrlModel.find({ fullUrl });
        if(urlFound.length > 0) {
            res.status(409).json({ message: "url found", url: urlFound });
            return;
        }
        const shortUrl = await UrlModel.create({ fullUrl });
        res.status(201).json({ message: "url created successfully", shortUrl });
    } catch(error) {
        res.status(500).json({ message: "something went wrong while creating short url" });
    }
}

export const getAllUrl = async (req: Request, res: Response) => {
    try {
        const shortUrls = await UrlModel.find().sort({ createdAt: -1 });
        if(shortUrls.length <= 0) {
            res.status(404).json({ message: "short urls not found" });
            return;
        }
        res.status(200).json({ message: "urls found successfully", shortUrls });
    } catch (error) {
        res.status(500).json({ message: "something went wrong while fetching short url" });
    }
}

export const getUrl = async (req: Request, res: Response) => {
    try {
        const shortUrl = await UrlModel.findOne({ shortUrl: req.params.id });
        if(!shortUrl) {
            res.status(404).json({ message: "full url not found "});
            return;
        }
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`)
    } catch (error) {
        res.status(500).json({ message: "something went wrong while fetching short url" });
    }
}

export const deleteUrl = async (req: Request, res: Response) => {
    try {
        const shortUrl = await UrlModel.findByIdAndDelete({ _id: req.params.id });
        if(shortUrl) {
            res.status(204).json({ message: "requested url successfully delted"});
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong while deleting short url" });
    }
}