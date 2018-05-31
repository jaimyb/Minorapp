export class AssignmentImage{
    
    ImageId: number;
    ImagePath: string;
    File: File;

    
    constructor(imageId: number, imagePath: string){
        this.ImageId = imageId;
        this.ImagePath = imagePath
    }
}