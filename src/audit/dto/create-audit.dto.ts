export class CreateAuditDTO {
  readonly id: String;
  readonly name: String; 
  readonly projectName: String; 
  readonly reviewerId: String;
  readonly categoryId: String;
  readonly status: String;
  readonly progress: Number;
  readonly priority: String;
  readonly creatorId: String;
  readonly createdOn: Date;
  readonly modifiedOn: Date;
}