import {S3} from 'aws-sdk';

const aws_s3 = {
  accessKeyId: 'AKIA2UVW3BCLXRLWRTUW',
  secretAccessKey: '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',
  region: 'sa-east-1',
};

export const bucketName = 'borave-posts';

export const s3 = new S3(aws_s3);
