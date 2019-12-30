import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'


/**
 * Common S3 functions
 */
export class StorageHelper{

    constructor(
        private readonly XAWS = AWSXRay.captureAWS(AWS),
        private readonly  s3:AWS.S3 = new XAWS.S3({
            signatureVersion: 'v4',
            region: process.env.region,
            params: {Bucket: process.env.IMAGES_BUCKET}
          }),
          private readonly  signedUrlExpireSeconds = 60 * 5
    ){
        
    }

    /**
     * Generate attachment presigned Get-Url 
     * @param todoId ToDo id
     */
    async getTodoAttachmentUrl(todoId: string): Promise<string>{
        
        try{
            await this.s3.headObject({
            Bucket: process.env.IMAGES_BUCKET,
            Key: `${todoId}.png` 
        }).promise();
        
        return  this.s3.getSignedUrl('getObject', {
            Bucket: process.env.IMAGES_BUCKET,
            Key: `${todoId}.png`,
            Expires: this.signedUrlExpireSeconds
            });
        }catch(err){
            console.log(err)
        }
        return null
    }

    /**
     * Generate attachment presigned Put-Url
     * @param todoId ToDo Id
     */
    getPresignedUrl(todoId: string): string{
        return this.s3.getSignedUrl('putObject', {
            Bucket: process.env.IMAGES_BUCKET,
            Key: `${todoId}.png`,
            Expires: this.signedUrlExpireSeconds
          }) as string ;
    }
}