import "dotenv/config";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getUser, isAuth } from "../isAuth";
import aws from "aws-sdk";
import { randomUUID } from "crypto";
import { File } from "../entities/File";
import { MyContext } from "src/types";

const MBtoBytes = (MB: number) => MB * 1024 * 1024;

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const FILE_TYPES_INFO = {
  "image/png": {
    isImage: true,
    maxFileSize: MBtoBytes(10),
  },
  "image/jpeg": {
    isImage: true,
    maxFileSize: MBtoBytes(10),
  },
  "image/jpg": {
    isImage: true,
    maxFileSize: MBtoBytes(10),
  },
  "image/gif": {
    isImage: true,
    maxFileSize: MBtoBytes(10),
  },
};

const SPACES_ENDPOINT = new aws.Endpoint(
  `${process.env.DO_SPACES_REGION}.digitaloceanspaces.com`
);

const S3 = new aws.S3({
  endpoint: SPACES_ENDPOINT,
  accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.DO_SPACES_SECRET_KEY,
  region: process.env.DO_SPACES_REGION,
});

@ObjectType()
export class GetSignedUrlResponse {
  @Field()
  signedUrl: string;

  @Field()
  key: string;
}

@Resolver()
export class FileResolver {
  @Query(() => File)
  async getFile(@Arg("key", () => String) key: string): Promise<File> {
    const file = await File.findOneOrFail({ key });
    return file;
  }

  @Mutation(() => GetSignedUrlResponse)
  @UseMiddleware(isAuth, getUser)
  async getSignedUrl(
    @Ctx() { payload }: MyContext,
    @Arg("fileName", () => String) fileName: string,
    @Arg("fileType", () => String) fileType: string,
    @Arg("fileSize", () => Number) fileSize: number,
    @Arg("imgWidth", () => Number, { nullable: true }) imgWidth: number,
    @Arg("imgHeight", () => Number, { nullable: true }) imgHeight: number
  ): Promise<{ signedUrl: string; key: string }> {
    const user = payload?.user;
    if (!user) {
      throw new Error("User not found");
    }

    const fileTypeInfo =
      FILE_TYPES_INFO[fileType as keyof typeof FILE_TYPES_INFO];

    if (!fileTypeInfo) {
      throw new Error("Invalid file type");
    }

    // Make sure if the file is an image, the width and height are provided
    // and are greater than 0
    if (
      fileTypeInfo.isImage &&
      (!imgWidth || !imgHeight || imgWidth < 1 || imgHeight < 1)
    ) {
      throw new Error(
        "Invalid image dimensions (not provided, or not greater than 0"
      );
    }

    if (fileSize > fileTypeInfo.maxFileSize) {
      throw new Error(
        `File size too large, limited to ${formatBytes(
          fileTypeInfo.maxFileSize
        )} for file type ${fileType}`
      );
    }

    const key = randomUUID();

    const fileEntity = File.create({
      key: key,
      fileName: fileName,
      fileType: fileType,
      fileSize: fileSize,
      isImage: fileTypeInfo.isImage,
      imgWidth: imgWidth,
      imgHeight: imgHeight,
      uploadedBy: user,
    });

    await fileEntity.save();

    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
      Expires: 60,
    };

    const signedUrl = await S3.getSignedUrlPromise("putObject", params);

    return { signedUrl, key };
  }
}
