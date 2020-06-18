export type Links = Link[];

export class Link {
    constructor(init?: Partial<Link>) {
        Object.assign(this, init);
    }

    url: string;
    description: string;
    title: string;
    image: string;
}