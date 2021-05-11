export const GifyService = {
    methods: {
        getGiffies(query) {
            const url = `https://api.giphy.com/v1/gifs/search?q=${ query }&api_key=SktZ5bMSoIzv9Iwu76mKLvJIVSXN1QQf&limit=10`
            return fetch(url)
                .then(response => response.json())
                .then(data => data.data.map(g => {
                    return {
                        username: g.username,
                        title: g.title,
                        bitly_url: g.bitly_url,
                        gif_url: g.images.fixed_height_small.url,
                    }
                }));
        }
    }
}