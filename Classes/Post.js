
module.exports = class Post{
    constructor(id, username, content, timestamp) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.timestamp = timestamp;
    }
}