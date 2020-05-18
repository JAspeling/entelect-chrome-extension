import { BaseDto } from './base-dto';
import { isNullOrWhitespace } from '../../shared/utility-functions';

export class LinkDto extends BaseDto<LinkDto> {
    constructor(init?: Partial<LinkDto>) {
        super();
        Object.assign(this, init);
    }

    url: string;
    title: string;
    description: string;
    // image

    validate(): LinkDto {
        if (isNullOrWhitespace(this.url)) this.errors?.push('Url is missing on the Link DTO');
        if (isNullOrWhitespace(this.title)) this.errors?.push('Title is missing on the Link DTO');

        if (this.errors?.length > 0) {
            throw new Error(['Validation on LinkDto failed', ...this.errors].join('\n'));
        }
        
        return this;
    }
}