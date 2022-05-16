class MediaProvider {
    path: string

    constructor() {
        this.path = "upload" // for dev
    }

    getAvatar(pic: string): string {
        // return `${this.path}/profiles/${pic}`
        return pic
    } 

    getContent(pic: string): string {
        return `${this.path}/media/${pic}`
    }
}

export default MediaProvider