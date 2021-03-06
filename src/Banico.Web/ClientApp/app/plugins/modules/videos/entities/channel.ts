import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Channel {
  id: string;
  name: string;
  alias: string;
  description: string;
  snippet: string;
  sectionItems: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  type: string;
  order: string;
  thumbnailUrl: string;
  thumbnailHeight: string;
  thumbnailWidth: string;

  constructor(private contentItem: ContentItem) {
    if (
      contentItem &&
      contentItem.module === "videos" &&
      contentItem.type === "channel"
    ) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.type = contentItem.type;
      this.description = contentItem.content;
      this.snippet = contentItem.snippet;
      this.sectionItems = contentItem.sectionItems;
      this.createdBy = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
      this.order = contentItem.attribute01;
      this.thumbnailUrl = contentItem.attribute02;
      this.thumbnailHeight = contentItem.attribute03;
      this.thumbnailWidth = contentItem.attribute04;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "videos";
    output.type = "channel";
    output.id = this.id;
    output.createdBy = this.createdBy;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    output.sectionItems = this.sectionItems;
    output.attribute01 = this.order;
    output.attribute02 = this.thumbnailUrl;
    output.attribute03 = this.thumbnailHeight;
    output.attribute04 = this.thumbnailWidth;

    return output;
  }

  public formattedCreatedDate(): string {
    return moment(this.createdDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public formattedUpdatedDate(): string {
    return moment(this.updatedDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public createdFromNow(): string {
    return moment(this.createdDate).fromNow();
  }

  public updatedFromNow(): string {
    return moment(this.updatedDate).fromNow();
  }
}
