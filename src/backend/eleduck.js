import {Feed} from "feed";
import moment from "moment";

var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};
export let toFeed = function (result) {

    const feed = new Feed({
        title: "eleduck",
        description: "This is eleduck's feed!",
        id: "https://eleduck.com",
        link: "https://eleduck.com",
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: "https://eleduck.com//image.png",
        favicon: "https://eleduck.com/favicon.ico",
        // copyright: "All rights reserved 2019",
        // updated: new Date(2013, 6, 14), // optional, default = today
        // generator: "awesome", // optional, default = 'Feed for Node.js'
        // feedLinks: {
        //     json: "https://union.yuanjingtech.com/json",
        //     atom: "https://union.yuanjingtech.com/atom"
        // },
        // author: {
        //     name: "lotosbin",
        //     email: "lotosbin@gmail.com",
        //     link: "https://union.yuanjingtech.com/johndoe"
        // }
    });

    result.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://eleduck.com/posts/${post.id}`,
            description: '',
            content: '',
            // author: [
            //     {
            //         name: "Jane Doe",
            //         email: "janedoe@example.com",
            //         link: "https://example.com/janedoe"
            //     },
            //     {
            //         name: "Joe Smith",
            //         email: "joesmith@example.com",
            //         link: "https://example.com/joesmith"
            //     }
            // ],
            // contributor: [
            //     {
            //         name: "Shawn Kemp",
            //         email: "shawnkemp@example.com",
            //         link: "https://example.com/shawnkemp"
            //     },
            //     {
            //         name: "Reggie Miller",
            //         email: "reggiemiller@example.com",
            //         link: "https://example.com/reggiemiller"
            //     }
            // ],
            date: moment(post.published_at).toDate(),
            // image: post.image
        });
    });

    // feed.addCategory("Technologie");

    // feed.addContributor({
    //     name: "Johan Cruyff",
    //     email: "johancruyff@example.com",
    //     link: "https://example.com/johancruyff"
    // });
    return feed;
};
const def = {
    normal: async (ctx) => {
        const response = await fetch('https://svc.eleduck.com/api/v1/posts?category=5&page=1');
        const result = await response.json();
        console.log(result);
        const feed = toFeed(result.posts);
        // console.log(feed.rss2());
// Output: RSS 2.0

        console.log(feed.atom1());
// Output: Atom 1.0

        // console.log(feed.json1());
// Output: JSON Feed 1.0
        ctx.set('Content-type', 'application/xml');
        ctx.body = feed.atom1()
    }
};
export default def;
