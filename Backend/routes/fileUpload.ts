import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const prisma = new PrismaClient();
const uploadLocation = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadLocation);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024, 
  },
});

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: `File is too big. File uploads must be smaller than 8 MB.` });
    } else if (err) {
      return res.status(500).json({ message: "An error occurred during file upload." });
    }
    next();
  });
};

const compressAudioFile = async (inputFilePath: string): Promise<string> => {
  const fileName = path.basename(inputFilePath);
  const compressedFileName = `compressed_${fileName}`;
  const compressedFilePath = path.join(uploadLocation, compressedFileName);

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .outputOptions([
        "-y",                      
        "-acodec", "libmp3lame",   
        "-b:a", "128k",           
      ])
      .output(compressedFilePath)
      .on("start", (commandLine) => {
        console.log("FFmpeg command:", commandLine);
      })
      .on("error", (error) => {
        console.error("FFmpeg error:", error.message);
        reject(new Error("Audio compression failed. Please check file format and paths."));
      })
      .on("end", () => {
        console.log("Compression completed:", compressedFilePath);
        resolve(compressedFilePath);
      })
      .run();
  });
};

export const handleFileUpload = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomname, sender, content } = req.body;

    if (!roomname || !sender) {
      return res.status(400).json({ message: "Missing required fields (roomname, sender)." });
    }

    const room = await prisma.room.findUnique({
      where: { roomname: roomname },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const messageData: any = {
      roomId: room.id,
      sender,
      content,
    };

    if (req.file) {
      const originalPath = path.join(uploadLocation, req.file.filename);
      const compressedPath = await compressAudioFile(originalPath);

      fs.unlink(originalPath, (err) => {
        if (err) {
          console.error("Error deleting the original file:", err);
        }
      });

      messageData.fileUrl = `/uploads/${path.basename(compressedPath)}`;
      messageData.fileType = req.file.mimetype;
    }

    const message = await prisma.message.create({
      data: messageData,
    });

    return res.status(200).json({ message: "Message sent", data: message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
