import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo } from "apollo-angular";
import { BaseService } from "../../shared/services/base.service";
import { ConfigsService } from "../../shared/services/configs.service";
import { ContentItemService } from "./content-item.service";
import { WindowRefService } from "../../shared/services/windowref.service";
import { ContentItem } from "../../entities/content-item";
import { Config } from "../../entities/config";
import { OEmbedQuery } from "./oembed.queries";
import { OEmbedQueryResult } from './oembed-query-result';

@Injectable()
export class PluginService extends BaseService {
  accountUrl: string;
  pageSize = 40;

  public readonly SEGMENT_DELIM: string = "_";
  public readonly TYPE_DELIM: string = "~";
  public readonly SECTION_DELIM: string = "*";

  constructor(
    protected http: HttpClient,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject("BASE_URL") protected baseUrl: string,
    protected configsService: ConfigsService,
    protected contentItemService: ContentItemService,
    private apollo: Apollo
  ) {
    super(windowRefService, platformId);
    this.accountUrl = `${this.baseUrl}api/Account`;
  }

  public setPageSize(size: number) {
    this.pageSize = size;
  }

  public toSectionItems(contentItem: ContentItem): string {
    const contentSectionItems = contentItem.contentSectionItems;
    let output = "";

    contentSectionItems.forEach(function(contentSectionItem) {
      if (output) {
        output = output + this.SECTION_DELIM;
      }
      output =
        output +
        contentSectionItem.sectionItem.section +
        this.TYPE_DELIM +
        contentSectionItem.sectionItem.pathUrl;
    });

    return output;
  }

  public getOEmbed(service: string, url: string): Observable<string> {
    const result = this.apollo
      .watchQuery<OEmbedQueryResult>({
        query: OEmbedQuery,
        variables: {
          service: service,
          url: url
        }
      })
        .valueChanges.pipe(map(result => {
            return result.data.oEmbed.response;
        }));
    return result;
  }

  protected extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    const body = res.json();
    return body || {};
  }
}
